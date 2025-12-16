import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, setDoc, deleteDoc, getDocs, query } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { Event, TeamMember, Partner } from './types';
// Additional certificate types are not required directly here; collections are generic.

// Firebase configuration - will use environment variables or defaults
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
};

// Initialize Firebase only if config is provided
let db: ReturnType<typeof getFirestore> | null = null;
let storage: ReturnType<typeof getStorage> | null = null;
let useFirebase = false;

try {
  if (firebaseConfig.projectId && firebaseConfig.apiKey) {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    storage = getStorage(app);
    useFirebase = true;
    console.log('✅ Firebase connected - using shared storage');
  } else {
    console.log('⚠️ Firebase not configured - using localStorage (changes are local only)');
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
  console.log('⚠️ Falling back to localStorage');
}

// Fallback to localStorage helpers
const STORAGE_KEYS = {
  EVENTS: 'gdg_bacolod_events_v2',
  TEAM: 'gdg_bacolod_team',
  PARTNERS: 'gdg_bacolod_partners',
  certificate_templates: 'gdg_bacolod_certificate_templates',
  certificate_attendees: 'gdg_bacolod_certificate_attendees',
  certificates_issued: 'gdg_bacolod_certificates_issued',
};

const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  const stored = localStorage.getItem(key);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(key, JSON.stringify(defaultValue));
  return defaultValue;
};

const setLocalStorage = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
};

// Firestore helpers
export const getCollection = async <T>(collectionName: string, defaultValue: T[]): Promise<T[]> => {
  if (!useFirebase || !db) {
    return getLocalStorage(STORAGE_KEYS[collectionName as keyof typeof STORAGE_KEYS] || collectionName, defaultValue);
  }

  try {
    const q = query(collection(db, collectionName));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      // Initialize with default data if collection is empty
      if (defaultValue.length > 0) {
        await Promise.all(defaultValue.map(item => 
          setDoc(doc(db, collectionName, (item as any).id), item)
        ));
      }
      return defaultValue;
    }
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
  } catch (error) {
    console.error(`Error fetching ${collectionName}:`, error);
    return getLocalStorage(STORAGE_KEYS[collectionName as keyof typeof STORAGE_KEYS] || collectionName, defaultValue);
  }
};

export const saveDocument = async <T extends { id: string }>(collectionName: string, item: T): Promise<void> => {
  if (!useFirebase || !db) {
    const current = getLocalStorage(STORAGE_KEYS[collectionName as keyof typeof STORAGE_KEYS] || collectionName, []);
    const index = current.findIndex((i: T) => i.id === item.id);
    if (index >= 0) {
      current[index] = item;
    } else {
      current.push(item);
    }
    setLocalStorage(STORAGE_KEYS[collectionName as keyof typeof STORAGE_KEYS] || collectionName, current);
    return;
  }

  try {
    await setDoc(doc(db, collectionName, item.id), item);
  } catch (error) {
    console.error(`Error saving ${collectionName}:`, error);
    throw error;
  }
};

export const deleteDocument = async (collectionName: string, id: string): Promise<void> => {
  if (!useFirebase || !db) {
    const current = getLocalStorage(STORAGE_KEYS[collectionName as keyof typeof STORAGE_KEYS] || collectionName, []);
    const filtered = current.filter((item: { id: string }) => item.id !== id);
    setLocalStorage(STORAGE_KEYS[collectionName as keyof typeof STORAGE_KEYS] || collectionName, filtered);
    return;
  }

  try {
    await deleteDoc(doc(db, collectionName, id));
  } catch (error) {
    console.error(`Error deleting ${collectionName}:`, error);
    throw error;
  }
};

// Firebase Storage helpers
export const uploadImage = async (file: File, folder: string = 'images'): Promise<string> => {
  if (!storage || !useFirebase) {
    // Fallback: convert to data URL (not ideal for large files)
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }

  try {
    const timestamp = Date.now();
    const fileName = `${folder}/${timestamp}_${file.name}`;
    const storageRef = ref(storage, fileName);
    
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    // Fallback to data URL
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }
};

export const deleteImage = async (imageUrl: string): Promise<void> => {
  if (!storage || !useFirebase) return;
  
  try {
    // Extract path from Firebase Storage URL
    const url = new URL(imageUrl);
    if (url.hostname.includes('firebasestorage.googleapis.com')) {
      const path = decodeURIComponent(url.pathname.split('/o/')[1]?.split('?')[0] || '');
      if (path) {
        const storageRef = ref(storage, path);
        await deleteObject(storageRef);
      }
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    // Silently fail - image might not be in Firebase Storage
  }
};

export const isValidImageUrl = (url: string): boolean => {
  if (!url) return false;
  try {
    const urlObj = new URL(url);
    // Check if it's a direct image URL
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const pathname = urlObj.pathname.toLowerCase();
    return imageExtensions.some(ext => pathname.endsWith(ext)) || 
           urlObj.searchParams.has('format') ||
           url.includes('data:image');
  } catch {
    return false;
  }
};

// Check if an image URL is likely to expire (Facebook CDN, temporary hosting, etc.)
export const isTemporaryImageUrl = (url: string): boolean => {
  if (!url) return false;
  const temporaryHosts = [
    'fbcdn.net',
    'scontent-',
    'postimg.cc',
    'imgur.com/a/', // Imgur albums expire
    'dropbox.com/s/', // Dropbox temporary links
  ];
  return temporaryHosts.some(host => url.includes(host));
};

// Download and re-host an image from a URL to Firebase Storage
export const rehostImage = async (imageUrl: string, folder: string = 'images'): Promise<string> => {
  if (!storage || !useFirebase) {
    // Fallback: return original URL
    return imageUrl;
  }

  try {
    // Fetch the image
    const response = await fetch(imageUrl, { mode: 'cors' });
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }
    
    const blob = await response.blob();
    const file = new File([blob], `rehosted_${Date.now()}.${blob.type.split('/')[1] || 'jpg'}`, { type: blob.type });
    
    // Upload to Firebase Storage
    const timestamp = Date.now();
    const fileName = `${folder}/rehosted_${timestamp}_${file.name}`;
    const storageRef = ref(storage, fileName);
    
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error re-hosting image:', error);
    // Return original URL if re-hosting fails
    return imageUrl;
  }
};

export { useFirebase };

