# 💍 Paul & Malampi Wedding Website

A personalized wedding website for the wedding of

**Dr. Paul Kambe**
&
**Malampi A. Mbula**

📅 **21 November 2026**
📍 **Ndola, Zambia**

---

## 🌐 Website

Hosted for free using GitHub Pages.

Current Website:

https://paul-malampi-wedding.github.io/paul-malampi-wedding

Each guest receives a personalized invitation link.

Example:

https://paul-malampi-wedding.github.io/paul-malampi-wedding/guest.html?g=mr-and-mrs-bwalya

---

# ✨ Features

The website includes:

✅ Personalized invitations

✅ Individual guest pages

✅ Personalized welcome screen

✅ Wedding intro animation

✅ Countdown to the wedding

✅ Photo gallery

✅ Wedding schedule

✅ Google Maps directions

✅ RSVP via WhatsApp

✅ Personal admission ticket

✅ Individual ticket QR code

✅ Mobile-friendly design

✅ Black, ivory and champagne-gold theme

---

# 📂 Important Files

## Guest List

assets/data/guests.json

Contains:

- guest name
- group size
- guest ID
- slug
- ticket reference

---

## Website Logic

assets/app.js

Handles:

- guest loading
- countdown
- RSVP buttons
- directions
- calendar integration
- gallery
- ticket downloads

---

## Website Style

assets/css/style.css

Contains the complete visual appearance and animations.

---

## Personal Tickets

assets/tickets

Each guest has a personal admission ticket.

Example:

assets/tickets/mr-and-mrs-bwalya.png

---

## Invitation QR Codes

invitation-qr-codes

Each QR code opens a personalized invitation page.

Example:

invitation-qr-codes/mr-and-mrs-bwalya.png

---

# 👥 Updating the Guest List

Edit:

assets/data/guests.json

Example:

```json
{
  "name": "Mr & Mrs Bwalya",
  "size": 2,
  "slug": "mr-and-mrs-bwalya",
  "id": "PM-001",
  "ticket": "assets/tickets/mr-and-mrs-bwalya.png"
}
```

## Important

After invitations have been sent:

DO NOT change:

- slug
- guest ID
- ticket filename

Otherwise personal invitation links and QR codes will stop working.

---

# 📱 Sending Invitations

Recommended WhatsApp message:

✨ Paul & Malampi Wedding ✨

Dear Guest,

We are delighted to invite you to celebrate our special day with us.

💌 Open your personal invitation:

[PERSONAL LINK]

Please RSVP before 10 October 2026.

With love,

Paul & Malampi ❤️

---

# 🔄 Future Updates

You can safely update:

- photos
- animations
- texts
- schedule
- directions
- RSVP information
- gallery
- ticket design

All existing guest links will continue to work.

Do NOT change:

- guest.html
- slug values
- repository name

after invitations have been distributed.

---

# 🎨 Theme

Primary colors:

Black:       #09090b

Gold:        #c6a048

Champagne:   #f0d78d

Ivory:       #fbf7ed

---

# ❤️ Created For

Dr. Paul Kambe

&

Malampi A. Mbula

21 November 2026

Ndola, Zambia
