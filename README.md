<div align="center">
  <h1>GDG Bacolod Community Platform</h1>
  <p>
    Official community platform for Google Developer Group (GDG) Bacolod – events, team, partners, and a full certificate issuing system in one modern web app.
  </p>
</div>

---

## Overview

The **GDG Bacolod Community Platform** is a production-ready web application built for the GDG Bacolod chapter.  
It combines:

- A public marketing site for events, team, and partners  
- A lightweight CMS for non-technical organizers  
- A complete certificate generation, sharing, and validation flow  

The goal is to make it easy for the organizers to:

- Announce upcoming events and showcase past “moments”  
- Highlight the team and sponsor partners  
- Issue and validate participation certificates without touching code  

---

## Tech Stack

- **Frontend**: React 19, TypeScript, React Router
- **Styling & UX**: Tailwind CSS v4, custom theme tokens for Google colors
- **Data & Backend**:
  - Firebase Firestore (when environment variables are configured)
  - LocalStorage fallback with the same API when Firebase is not configured
- **Certificates & Media**:
  - `html-to-image` for DOM → PNG
  - `jsPDF` for PDF export
- **Tooling & Hosting**: Vite, Vercel (`vercel.json` SPA routing)

---

## Features

### 1. Public Marketing Site

**Landing & Navigation**
- Google-inspired landing page with hero section, custom cursor, dark/light mode, and smooth scrolling.
- Sticky navbar that transforms on scroll, with anchor links to `About`, `Moments`, `Team`, and `Certificates`.

**Upcoming Events**
- Card-based layout showing:
  - Title, date, time, venue, category (Social / Talk / Workshop / Hackathon)
  - Registration link (e.g. to the GDG community page)
- Responsive from mobile to desktop with hover and motion effects.
- Graceful empty state when there are no upcoming events.

**Past Events Gallery (“Moments”)**
- Masonry-style gallery of past events with:
  - 3D tilt on hover
  - Strong visual hierarchy and typography
- Fullscreen modal viewer:
  - Click to open in full view
  - `Esc` key and background click to close
  - Scroll locking for focus
- Robust `onError` fallbacks that replace broken/expired URLs with SVG placeholders using the event title.

**Team**
- Showcases the GDG Bacolod core team:
  - Name, role, and photo
  - Hover animations and gradient “glow” effects
- Avatar fallback using initials when a photo URL fails to load.

**Partners**
- Partner logos grouped by tier (Platinum, Gold, Silver, Community).
- Responsive logo grid that preserves logo aspect ratio.
- Partner cards link to partner websites.

**Social Feed**
- “Latest Update” hero card mirroring a Facebook announcement:
  - Highlighted visual, hashtags, and official venue.
  - CTA to open the chapter’s Facebook page.
- Also used to feature large upcoming events like DevFest.

**Footer**
- GDG-branded footer with:
  - Logo and chapter name
  - Quick links (About, Moments, Team, Admin Portal)
  - Social link (Facebook)
  - Copyright line and a short closing message

---

### 2. Certificates Platform

**Certificate Templates**
- Admins can create templates that define:
  - Event ID and event name
  - Background design (image URL)
  - Text color theme (light/dark)
  - Name position (percentage-based X/Y for responsive correctness)
- Templates are stored in Firestore/localStorage and reused across events.

**Certificate Generator**
- Renders certificates by combining:
  - Selected template
  - Recipient name and event metadata
- Generates:
  - High-resolution PNG via `html-to-image`
  - PDF certificates via `jsPDF` with correct A4 aspect ratio and margins
- Handles image loading, cross-origin constraints, and scaling for print quality.

**Certificate Issuance & Lookup**
- Each certificate has:
  - Unique ID
  - Event ID and name
  - Recipient name and date
- Admin workflows:
  - Create templates
  - Upload attendee lists (e.g. as structured data)
  - Issue certificates in batch
- Public-facing certificate lookup:
  - Users can open a special route and enter an ID to retrieve their certificate.
  - Viewer page allows viewing and downloading of certificates.

**Share Cards**
- Dedicated `ShareCard` component generates an Instagram-story–friendly layout:
  - Large certificate preview
  - Clear share URL and ID
- Exportable as an image for social media sharing.

---

### 3. Admin CMS Dashboard

The admin area is a single-page CMS intended for non-technical organizers.

**Global Layout**
- Tabs for:
  - Events
  - Team
  - Partners
  - Certificates
- Uses a shared data layer (`mockCms` + `firebaseService`) so all CRUD operations are routed through one API.

**Events Manager**
- List view:
  - Events table with thumbnail, title, date, status, and quick actions.
- Editor:
  - Form fields for title, date, time, venue, category, status, description, registration link.
  - Image section:
    - Upload local image (`<input type="file">`) with size validation
    - Or paste a direct image URL
    - Live preview with `onError` feedback if the URL is invalid
- All event changes persist via Firestore or localStorage depending on environment.

**Team Manager**
- CRUD for team members:
  - Name, role, photo URL/upload.
- Inline preview showing how the avatar will look.
- Image errors are surfaced so admins can quickly replace broken avatars.

**Partners Manager**
- CRUD for partners:
  - Name, sponsor tier, logo URL/upload, website URL.
- Preview block that respects logo aspect ratio and centers the brand.

**Certificates Manager**
- Templates:
  - Create, edit, and delete certificate templates.
  - Configure event ID/name, background design URL, name position, color theme.
- Attendees:
  - Load and manage attendee lists per event.
  - Persist issued certificates with unique IDs.
- Issuance:
  - Bulk issue certificates for a given template and attendee list.
  - Certificates can then be looked up and shared by recipients.

---

### 4. Data Layer & Storage Strategy

The project is designed to work both with and without a backend configured.

**Firebase Mode**
- When Firebase environment variables are set, the app:
  - Initializes Firebase App + Firestore + Storage.
  - Uses Firestore collections for:
    - `events`
    - `team`
    - `partners`
    - `certificate_templates`
    - `certificate_attendees`
    - `certificates_issued`
- First-run behavior seeds Firestore with default data if a collection is empty.

**LocalStorage Mode**
- If Firebase is **not** configured:
  - The same `getCollection`, `saveDocument`, and `deleteDocument` functions operate on localStorage keys.
  - This makes the application usable for:
    - Local development
    - Offline demos
    - Environments without backend access

This abstraction allows the UI and admin workflows to be identical across environments.

---

### 5. AI Assistant (Extensible Stub)

- Floating chat widget on the main site.
- Currently in a “maintenance mode”:
  - Welcomes visitors as the GDG Bacolod AI Assistant.
  - Responds with a friendly placeholder message and directs users to official social channels.
- Architected so it can later be wired up to an LLM (e.g., Gemini) by swapping the simulated response with an API call.

---

## Running the Project Locally

**Prerequisites**
- Node.js (LTS recommended)

**Install & Run**

```bash
npm install
npm run dev
```

By default, the app will use the **localStorage** data mode.

---

## Optional: Firebase Setup (Shared Data Mode)

To enable shared data across users and sessions, configure Firebase Firestore and Storage.

1. Create a Firebase project and a Web App in the Firebase Console.
2. Enable Firestore Database.
3. In your Vercel project (or locally), add these environment variables:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

4. Deploy or restart the dev server.

On startup, the app will:

- Connect to Firestore
- Seed default collections if they are empty
- Store all future admin changes in Firestore instead of localStorage

---

## Deployment

This project is optimized for deployment on **Vercel**.

- SPA behavior is configured via `vercel.json` to rewrite all routes to `index.html`.
- Vite build output is served as a static site.

Typical deployment flow:

```bash
npm run build
vercel --prod
```

You can also connect the GitHub repository to Vercel for automatic deployments on `main` branch pushes.

---

## License

This project is intended for use by the GDG Bacolod community.  
You may adapt it for other GDG chapters or communities, but please:

- Respect branding guidelines for Google Developer Groups.
- Replace chapter-specific assets and content as appropriate.

