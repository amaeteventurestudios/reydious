# Reydious — Execution Governance Platform

A high-impact, single-page marketing website for **Reydious**, an execution governance platform for autonomous systems.

---

## Completed Features

- **Sticky Navbar** — blurred glassmorphic header with active-link highlighting and smooth-scroll offset
- **Mobile Hamburger Menu** — animated toggle with full-screen overlay on small viewports
- **Hero Section** — animated governance pipeline diagram, status badges, and CTA buttons
- **Problem Section** — three highlighted risk items with icons
- **Solution Section** — three solution cards with icons
- **Platform Section** — narrative text + three core capability cards
- **Architecture Section** — three pillar cards + four-step "How It Works" flow
- **Applications Section** — four industry application cards
- **Demo Section** — pulsing "coming soon" placeholder for the Autonomy Lab
- **Closing Section** — mission statement with repeat CTAs
- **Contact Form** — saves submissions to the Table API (`contact_requests`)
- **Footer** — minimal brand + tagline + dynamic copyright year
- **Scroll Animations** — staggered fade-in via IntersectionObserver
- **Responsive Design** — multi-column desktop layout, 2-column tablet, single-column mobile

---

## Entry Points

| Path         | Description              |
|--------------|--------------------------|
| `/index.html`| Main landing page        |

### Anchor Links

| Hash            | Section                |
|-----------------|------------------------|
| `#hero`         | Hero                   |
| `#problem`      | The Problem            |
| `#solution`     | The Solution           |
| `#platform`     | Platform               |
| `#architecture` | Architecture / Steps   |
| `#applications` | Applications           |
| `#demo`         | Demo                   |
| `#contact`      | Contact Form           |

---

## Data

### Table: `contact_requests`

| Field     | Type       | Description                   |
|-----------|------------|-------------------------------|
| id        | text       | Unique record ID (auto)       |
| name      | text       | Sender full name              |
| org       | text       | Sender organization           |
| email     | text       | Sender email address          |
| message   | rich_text  | Message body                  |

**API endpoint:** `tables/contact_requests`

---

## Features Not Yet Implemented

- Real demo of the Autonomy Lab (Reydious Autonomy Lab section)
- Email notification on form submission
- Admin dashboard to review contact submissions

---

## Recommended Next Steps

1. Replace "Demo coming soon" with an interactive demo (e.g., embedded simulation)
2. Add a blog or press page for news/announcements
3. Connect the contact form to an email notification service
4. Add analytics (e.g., Plausible, PostHog)

---

## Tech Stack

- Pure HTML5, CSS3, vanilla JavaScript
- Google Fonts: Inter + JetBrains Mono
- Font Awesome 6 (icons via CDN)
- RESTful Table API for contact form persistence
