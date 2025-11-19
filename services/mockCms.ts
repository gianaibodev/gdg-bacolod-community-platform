import {
  Event,
  TeamMember,
  Partner,
  SocialPost,
  CertificateTemplate,
  CertificateAttendee,
  Certificate,
} from '../types';
import { getCollection, saveDocument, deleteDocument } from './firebaseService';

// INITIAL SEED DATA
const DEFAULT_EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'DevFest Bacolod 2024',
    date: 'November 16, 2024',
    time: '',
    venue: '',
    description: '',
    registrationLink: '',
    imageUrl: 'https://scontent-sin6-2.xx.fbcdn.net/v/t39.30808-6/473830459_122183337692100644_51410807122020925_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=86c6b0&_nc_eui2=AeFHZUMUbiWJGZMe5e96nwmaj5APboR8xz-PkA9uhHzHP31ED-qCMeftk_1UOsM-tD_h6DBqfF5SQRpDCLduipzP&_nc_ohc=78xSlvRrNtwQ7kNvwFJ50IT&_nc_oc=AdkWJEF3eCRLQdMTnZmNic8Yzmqiu5UPTTeQPfMgehcivd3-o4FtcT2wlgKvD_mOb4A&_nc_zt=23&_nc_ht=scontent-sin6-2.xx&_nc_gid=yMOkKfiOmhq1L-nGwBcTfQ&oh=00_AfihBNi5VMQBSOH2eqMyjffGPfOONAm-maSzcqvygj2XPw&oe=6923A904',
    category: 'Social',
    status: 'past'
  },
  {
    id: 'e2',
    title: 'Google I/O Extended Bacolod',
    date: 'July 27, 2024',
    time: '',
    venue: '',
    description: '',
    registrationLink: '',
    imageUrl: 'https://scontent-sin2-2.xx.fbcdn.net/v/t39.30808-6/466926425_122175173912100644_8522813837842720168_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=86c6b0&_nc_eui2=AeFYmRRIoBhAIEbOgk3dttH2ccbImREzd5BxxsiZETN3kADqKQezpkpJGyFCbS9llCuof5cVcfeO86RK67bDJk7r&_nc_ohc=-efqGLJAiJEQ7kNvwGxj-eX&_nc_oc=AdnlR6m_D2HWySDooEjcgztNek9PPzec9poLQy59VD8WENpVlIgH8_lu1-QrgcCgfXs&_nc_zt=23&_nc_ht=scontent-sin2-2.xx&_nc_gid=VjDe98wx8Fbgueug7fRFng&oh=00_AfhOw9LBM9yA9trV9kKXjdSELrTEro5iS365bO1KniBOuQ&oe=6923A6AA',
    category: 'Talk',
    status: 'past'
  },
  {
    id: 'e3',
    title: 'Women Techmakers 2024',
    date: 'April 13, 2024',
    time: '',
    venue: '',
    description: '',
    registrationLink: '',
    imageUrl: 'https://scontent-sin6-2.xx.fbcdn.net/v/t39.30808-6/399936282_122104125434100644_4641908214210992902_n.png?stp=dst-jpg_tt6&_nc_cat=109&ccb=1-7&_nc_sid=86c6b0&_nc_eui2=AeH8ZbZrWMLH-3cZVrueLY_bBkZKabX6racGRkpptfqtpzlt_Pzr76DaqdLmQWwTHbZSoW52RTbIaFGDQPGiepFB&_nc_ohc=p8hMW4WL6sQQ7kNvwEM5Ueo&_nc_oc=Adl1V3gzF1rcqqcHLGFlcJbI4dLfD45AWfQ6dcPAMa7pgQg3u91cBwgjy9FWYahdQG4&_nc_zt=23&_nc_ht=scontent-sin6-2.xx&_nc_gid=RmftI3sw2b-6FHXe8wnmlg&oh=00_Afhe7kGCj3zY8UdK2OoH4kkRNc4QyqHA98Mo2SCkKCb38A&oe=6923B7AB',
    category: 'Workshop',
    status: 'past'
  }
];

const DEFAULT_TEAM: TeamMember[] = [
  { 
    id: 't1', 
    name: 'Dave Celo', 
    role: 'Chapter Lead', 
    photoUrl: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/featured_attendees/LEE_8494_2tETto1.jpg'
  },
  { 
    id: 't2', 
    name: 'Alyssa Melody Paglumotan', 
    role: 'Chapter Co-Lead | Communications Lead', 
    photoUrl: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/alyssa_melody_paglumotan.jpg'
  },
  { 
    id: 't3', 
    name: 'Dairin Janagap', 
    role: 'WTM Ambassador', 
    photoUrl: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/featured_attendees/4%20-%20Copy%20%282%29.png'
  },
  { 
    id: 't4', 
    name: 'Ken Espiritu', 
    role: 'AI Events Head', 
    photoUrl: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/ken_espiritu_JWEdsGG.JPG'
  },
  { 
    id: 't5', 
    name: 'Arvie Duane Maño', 
    role: 'Technical Head', 
    photoUrl: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/arvie_duane_ma%C3%B1o.jpg'
  },
  { 
    id: 't6', 
    name: 'Carlos Miguel Valderrama', 
    role: 'Creatives Lead', 
    photoUrl: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/carlos_miguel_valderrama_9D6CqDJ.png'
  },
  { 
    id: 't7', 
    name: 'Mitchel Mariano', 
    role: 'Creatives Co-Lead', 
    photoUrl: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/mitchel_mariano.png'
  },
  { 
    id: 't8', 
    name: 'Gift Delos Santos', 
    role: 'Creative Consultant / Event Host', 
    photoUrl: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/gift_delos_santos_ZLed5Ps.png'
  },
  { 
    id: 't9', 
    name: 'Ysa belle David', 
    role: 'Registration Lead', 
    photoUrl: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/ysa_belle_david_g6f2BxP'
  }
];

const SOCIAL_POSTS: SocialPost[] = []; 

const DEFAULT_PARTNERS: Partner[] = [
  { id: 'p1', name: 'Google', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg', websiteUrl: 'https://developers.google.com', tier: 'Platinum' },
];

const DEFAULT_CERTIFICATE_TEMPLATES: CertificateTemplate[] = [];
const DEFAULT_CERTIFICATE_ATTENDEES: CertificateAttendee[] = [];
const DEFAULT_CERTIFICATES_ISSUED: Certificate[] = [];

// --- PUBLIC API ---

export const getUpcomingEvents = async (): Promise<Event[]> => {
  const allEvents = await getCollection<Event>('events', DEFAULT_EVENTS);
  return allEvents.filter(e => e.status === 'upcoming');
};

export const getPastEvents = async (): Promise<Event[]> => {
  const allEvents = await getCollection<Event>('events', DEFAULT_EVENTS);
  return allEvents.filter(e => e.status === 'past');
};

export const getTeamMembers = async (): Promise<TeamMember[]> => {
  return getCollection<TeamMember>('team', DEFAULT_TEAM);
};

export const getPartners = async (): Promise<Partner[]> => {
  return getCollection<Partner>('partners', DEFAULT_PARTNERS);
};

export const getSocialFeed = async (): Promise<SocialPost[]> => {
  return new Promise(resolve => setTimeout(() => resolve(SOCIAL_POSTS), 800));
};

// --- ADMIN API (CRUD) ---

export const getAllEvents = async (): Promise<Event[]> => {
  return getCollection<Event>('events', DEFAULT_EVENTS);
};

export const saveEvent = async (event: Event): Promise<void> => {
  await saveDocument<Event>('events', event);
};

export const deleteEvent = async (id: string): Promise<void> => {
  await deleteDocument('events', id);
};

export const saveTeamMember = async (member: TeamMember): Promise<void> => {
  await saveDocument<TeamMember>('team', member);
};

export const deleteTeamMember = async (id: string): Promise<void> => {
  await deleteDocument('team', id);
};

export const savePartner = async (partner: Partner): Promise<void> => {
  await saveDocument<Partner>('partners', partner);
};

export const deletePartner = async (id: string): Promise<void> => {
  await deleteDocument('partners', id);
};

// --- CERTIFICATES ---

export const getCertificateTemplates = async (): Promise<CertificateTemplate[]> => {
  return getCollection<CertificateTemplate>('certificate_templates', DEFAULT_CERTIFICATE_TEMPLATES);
};

export const saveCertificateTemplate = async (template: CertificateTemplate): Promise<void> => {
  await saveDocument<CertificateTemplate>('certificate_templates', template);
};

export const deleteCertificateTemplate = async (id: string): Promise<void> => {
  await deleteDocument('certificate_templates', id);
};

export const getCertificateAttendeesByEvent = async (eventId: string): Promise<CertificateAttendee[]> => {
  const attendees = await getCollection<CertificateAttendee>('certificate_attendees', DEFAULT_CERTIFICATE_ATTENDEES);
  return attendees.filter(att => att.eventId === eventId);
};

export const bulkSaveCertificateAttendees = async (
  eventId: string,
  attendees: CertificateAttendee[],
): Promise<void> => {
  const existing = await getCertificateAttendeesByEvent(eventId);
  await Promise.all(existing.map(att => deleteDocument('certificate_attendees', att.id)));
  await Promise.all(attendees.map(att => saveDocument<CertificateAttendee>('certificate_attendees', att)));
};

export const saveIssuedCertificate = async (certificate: Certificate): Promise<void> => {
  const doc: Certificate = {
    ...certificate,
    id: certificate.uniqueId,
  };
  await saveDocument<Certificate>('certificates_issued', doc);
};

export const getIssuedCertificateById = async (uniqueId: string): Promise<Certificate | undefined> => {
  const issued = await getCollection<Certificate>('certificates_issued', DEFAULT_CERTIFICATES_ISSUED);
  return issued.find(cert => cert.uniqueId === uniqueId);
};
