# Firebase Configuration

To enable shared data storage across all users, you need to set up Firebase Firestore:

## Steps:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable Firestore Database:
   - Go to Firestore Database
   - Click "Create database"
   - Start in test mode (we'll add security rules later)
   - Choose a location

4. Get your Firebase config:
   - Go to Project Settings > General
   - Scroll to "Your apps" section
   - Click the web icon (</>)
   - Copy the config values

5. Add environment variables to Vercel:
   - Go to your Vercel project settings
   - Navigate to "Environment Variables"
   - Add these variables:
     - `VITE_FIREBASE_API_KEY`
     - `VITE_FIREBASE_AUTH_DOMAIN`
     - `VITE_FIREBASE_PROJECT_ID`
     - `VITE_FIREBASE_STORAGE_BUCKET`
     - `VITE_FIREBASE_MESSAGING_SENDER_ID`
     - `VITE_FIREBASE_APP_ID`

6. Set Firestore Security Rules (in Firebase Console > Firestore > Rules):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to everyone
    match /{collection}/{document} {
      allow read: if true;
      allow write: if true; // For now, allow writes. In production, add authentication!
    }
  }
}
```

**Note:** The app will work with localStorage if Firebase is not configured, but changes will only be visible to the user who made them.

