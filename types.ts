
// Represents the CMS Schema for an Event
export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  registrationLink: string;
  imageUrl: string;
  category: 'Workshop' | 'Talk' | 'Hackathon' | 'Social';
  status: 'upcoming' | 'past';
}

// Represents the CMS Schema for a Team Member
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
}

// Represents the CMS Schema for a Partner/Sponsor
export interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  tier: 'Platinum' | 'Gold' | 'Silver' | 'Community';
}

// Represents the Schema for Social Media Posts (Facebook Graph API adaptation)
export interface SocialPost {
  id: string;
  content: string;
  imageUrl?: string;
  postUrl: string;
  timestamp: string;
  likes: number;
}
