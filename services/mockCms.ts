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
    imageUrl:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Cdefs%3E%3ClinearGradient id='devfest-grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%234285F4'/%3E%3Cstop offset='50%25' stop-color='%23DB4437'/%3E%3Cstop offset='100%25' stop-color='%23F4B400'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23devfest-grad)'/%3E%3Ctext x='50%25' y='45%25' text-anchor='middle' fill='white' font-family='system-ui' font-size='40' font-weight='700'%3EDevFest Bacolod%3C/text%3E%3Ctext x='50%25' y='58%25' text-anchor='middle' fill='white' font-family='system-ui' font-size='24' font-weight='500'%3E2024 • Google Developer Group%3C/text%3E%3C/svg%3E",
    category: 'Social',
    status: 'past',
  },
  {
    id: 'e2',
    title: 'Google I/O Extended Bacolod',
    date: 'July 27, 2024',
    time: '',
    venue: '',
    description: '',
    registrationLink: '',
    imageUrl:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='800' height='600' fill='%230F172A'/%3E%3Ccircle cx='200' cy='300' r='80' fill='%234285F4'/%3E%3Crect x='360' y='180' width='40' height='240' rx='20' fill='%23F4B400'/%3E%3Ctext x='50%25' y='80' text-anchor='middle' fill='white' font-family='system-ui' font-size='40' font-weight='700'%3EGoogle I/O Extended%3C/text%3E%3Ctext x='50%25' y='130' text-anchor='middle' fill='%239CA3AF' font-family='system-ui' font-size='22'%3EBacolod • 2024%3C/text%3E%3C/svg%3E",
    category: 'Talk',
    status: 'past',
  },
  {
    id: 'e3',
    title: 'Women Techmakers 2024',
    date: 'April 13, 2024',
    time: '',
    venue: '',
    description: '',
    registrationLink: '',
    imageUrl:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Cdefs%3E%3ClinearGradient id='wtm-grad' x1='0%25' y1='0%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='%23EC4899'/%3E%3Cstop offset='50%25' stop-color='%238B5CF6'/%3E%3Cstop offset='100%25' stop-color='%2343B581'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='%23102032'/%3E%3Crect x='140' y='180' width='160' height='240' rx='24' fill='url(%23wtm-grad)' opacity='0.9'/%3E%3Crect x='340' y='180' width='160' height='240' rx='24' fill='url(%23wtm-grad)' opacity='0.7'/%3E%3Crect x='540' y='180' width='160' height='240' rx='24' fill='url(%23wtm-grad)' opacity='0.5'/%3E%3Ctext x='50%25' y='120' text-anchor='middle' fill='white' font-family='system-ui' font-size='38' font-weight='700'%3EWomen Techmakers%3C/text%3E%3Ctext x='50%25' y='165' text-anchor='middle' fill='%23E5E7EB' font-family='system-ui' font-size='22'%3EBacolod • 2024%3C/text%3E%3C/svg%3E",
    category: 'Workshop',
    status: 'past',
  },
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
