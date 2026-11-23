# AARAV ESTATES – Real Estate Builder & Property Agency Demo

**Live demo:** https://aaravestates-demo.pages.dev

A premium, responsive single-page website for a **fictional** real estate developer and property consultancy based in Sangli, Maharashtra.

Built with plain **HTML5, CSS3 and vanilla JavaScript**: no frameworks, no build step and no backend. Open `index.html` in a browser to run it.

> ⚠️ **Demo content notice**
> All brand information, property names, prices, areas, amenities, statistics, testimonials, contact details and images are **placeholders for demonstration only**. AARAV ESTATES is a fictional company. Testimonials are sample text, not genuine customer reviews. Photos are from Unsplash and do not depict real projects.

## Structure

```
aarav-estates/
├── index.html        # All sections and markup
├── css/style.css     # Design tokens (CSS variables), layout, responsive rules
├── js/script.js      # Property data + all interactions
└── assets/images/    # Favicon (add client photos/logo here)
```

## Features

- Sticky header with active-section highlighting and a mobile hamburger drawer
- Hero property search (type, location, budget) that filters the demo listings
- Category filters (All / Apartments / Villas / Plots / Commercial)
- Property details modal with image gallery, specs and amenities
- Enquire / Site-visit buttons that prefill the relevant form
- Gallery with keyboard- and swipe-friendly lightbox
- Auto-playing testimonial carousel (pauses on hover/focus, swipe on mobile)
- FAQ accordion, horizontal → vertical buying-process timeline
- Enquiry and site-visit forms with validation (required fields, Indian mobile format, email)
- WhatsApp buttons with prefilled messages, back-to-top button, scroll-reveal animations
- SEO: title, meta description, Open Graph, semantic HTML, alt text, `RealEstateAgent` JSON-LD

Forms are frontend-only. **Nothing is sent or stored.**

## Replace before a real client launch

| What | Where |
|---|---|
| Statistics (15+, 25+, 500+, 10+) | `index.html` → `.highlights` (`data-count` attributes) |
| Properties, prices, areas, amenities, images | `js/script.js` → `PROPERTIES` array |
| WhatsApp number | `js/script.js` → `WHATSAPP_NUMBER` |
| Phone, email, address, business hours | `index.html` → Contact section and footer |
| Google Map | `index.html` → `.map-card iframe` `src` |
| Social profile URLs | `index.html` → footer `.socials` |
| Testimonials | `index.html` → `#testimonials` (use real, consented reviews only) |
| Structured data | `index.html` `<head>` JSON-LD (add verified phone, street address, URL) |
| Open Graph image / URL | `index.html` `<head>` |
| Form handling | `js/script.js` → `setupForm` callbacks (connect to a form service or CRM) |

Colours and fonts are CSS variables at the top of `css/style.css`.

© 2026 AARAV ESTATES (fictional). Demo project.
