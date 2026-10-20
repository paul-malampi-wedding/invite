const WEDDING = {
  start: new Date("2026-11-21T09:00:00+02:00"),
  churchMap: "https://www.google.com/maps/search/?api=1&query=-12.970409422362602,28.641622770637557",
  receptionMap: "https://maps.app.goo.gl/UH8mLAkQSzAgvjht5",
  contacts: [
    { name: "James Kaimba", phone: "260977403271" },
    { name: "Micah Kambe", phone: "260967440813" }
  ]
};

const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

async function loadGuest() {
  const slug = new URLSearchParams(window.location.search).get("g");
  if (!slug) return null;

  try {
    const response = await fetch("assets/data/guests.json?v=20261003", {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`Guest list could not be loaded: ${response.status}`);
    }

    const guests = await response.json();
    return guests.find((item) => item.slug === slug) || null;
  } catch (error) {
    console.error("Could not load guest:", error);
    return null;
  }
}
function showInvitationUnavailable() {
  document.title = "Invitation unavailable | Paul & Malampi";
  document.documentElement.style.overflow = "";

  document.body.innerHTML = `
    <main style="
      min-height:100svh;
      display:grid;
      place-items:center;
      padding:24px;
      background:#050506;
      color:#fbf7ed;
      font-family:Arial,Helvetica,sans-serif;
      text-align:center;
    ">
      <section style="
        width:min(100%,520px);
        padding:56px 28px 46px;
        border:1px solid rgba(198,160,72,.38);
        border-radius:220px 220px 18px 18px;
        background:linear-gradient(180deg,#17130f,#09090b);
        box-shadow:0 28px 80px rgba(0,0,0,.65);
      ">
        <div
          aria-hidden="true"
          style="
            margin-bottom:18px;
            color:#c6a048;
            font:400 2rem Georgia,'Times New Roman',serif;
            letter-spacing:.08em;
          "
        >
          P &amp; M
        </div>

        <div style="
          width:64px;
          height:1px;
          margin:0 auto 24px;
          background:#c6a048;
        "></div>

        <h1 style="
          margin:0 0 18px;
          font:400 clamp(2rem,8vw,3rem)/1.1 Georgia,'Times New Roman',serif;
          color:#f0d78d;
        ">
          Invitation unavailable
        </h1>

        <p style="
          margin:0 auto 12px;
          max-width:390px;
          color:#fbf7ed;
          font-size:1rem;
          line-height:1.7;
        ">
          This personal invitation link is no longer active.
        </p>

        <p style="
          margin:0 auto;
          color:#cbc4b5;
          font-size:.9rem;
          line-height:1.65;
        ">
          Please contact the hosts if you believe this is an error.
        </p>

        <p style="
          margin:28px 0 0;
          color:#c6a048;
          font:italic 1rem Georgia,'Times New Roman',serif;
        ">
          21 · 11 · 2026
        </p>
      </section>
    </main>
  `;
}
function renderGuest(guest) {
  if (!guest) return;

  const guestName = $("#guestName");
  const guestMeta = $("#guestMeta");
  const ticketName = $("#ticketName");
  const ticketParty = $("#ticketParty");
  const ticketId = $("#ticketId");
  const ticketQr = $("#ticketQr");
  const downloadTicket = $("#downloadTicket");

  if (guestName) guestName.textContent = `Dear ${guest.name}`;
  if (guestMeta) {
    guestMeta.textContent = guest.size > 1
      ? `Invitation for ${guest.size} guests`
      : "Personal invitation";
  }
  if (ticketName) ticketName.textContent = guest.name;
  if (ticketParty) {
    ticketParty.textContent = `Admits ${guest.size} ${guest.size === 1 ? "guest" : "guests"}`;
  }
  if (ticketId) ticketId.textContent = guest.id;
  if (ticketQr) ticketQr.src = guest.ticket;

  document.title = `${guest.name} | Paul & Malampi`;

  if (downloadTicket) {
    downloadTicket.addEventListener("click", async () => {
      try {
        const response = await fetch(guest.ticket, { cache: "no-store" });
        if (!response.ok) throw new Error("Ticket could not be downloaded");

        const blob = await response.blob();
        const fileUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = `${guest.id}-${guest.slug}.png`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.setTimeout(() => URL.revokeObjectURL(fileUrl), 1000);
      } catch (error) {
        window.open(guest.ticket, "_blank", "noopener,noreferrer");
      }
    });
  }
}

function startCountdown() {
  const requiredElements = ["#cd-days", "#cd-hours", "#cd-min", "#cd-sec"];
  if (requiredElements.some((selector) => !$(selector))) return;

  const tick = () => {
    const milliseconds = Math.max(0, WEDDING.start.getTime() - Date.now());
    const seconds = Math.floor(milliseconds / 1000);

    $("#cd-days").textContent = Math.floor(seconds / 86400);
    $("#cd-hours").textContent = String(Math.floor((seconds % 86400) / 3600)).padStart(2, "0");
    $("#cd-min").textContent = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    $("#cd-sec").textContent = String(seconds % 60).padStart(2, "0");
  };

  tick();
  window.setInterval(tick, 1000);
}

function setupDirections() {
  const churchButton = $("#dirChurch");
  const receptionButton = $("#dirReception");

  if (churchButton) {
    churchButton.href = WEDDING.churchMap;
    churchButton.target = "_blank";
    churchButton.rel = "noopener noreferrer";
  }

  if (receptionButton) {
    receptionButton.href = WEDDING.receptionMap;
    receptionButton.target = "_blank";
    receptionButton.rel = "noopener noreferrer";
  }
}

function setupRsvp(guest) {
  const rsvpButtons = $("#rsvpButtons");
  if (!rsvpButtons) return;

  const guestName = guest ? guest.name : "a guest";

  rsvpButtons.innerHTML = WEDDING.contacts.map((contact) => {
    const message = encodeURIComponent(
      `Hello ${contact.name}, this is ${guestName}. I would like to RSVP for Paul & Malampi's wedding on 21 November 2026.`
    );

    return `<a class="button" target="_blank" rel="noopener noreferrer" href="https://wa.me/${contact.phone}?text=${message}">RSVP with ${contact.name.split(" ")[0]}</a>`;
  }).join("");
}

function setupCalendar() {
  const button = $("#addToCalendar");
  if (!button) return;

  button.addEventListener("click", () => {
    const useGoogleCalendar = window.confirm(
      "Add to Google Calendar?\n\nSelect OK for Google Calendar.\nSelect Cancel for Apple Calendar or Outlook."
    );

    if (useGoogleCalendar) {
      const googleCalendarUrl =
        "https://calendar.google.com/calendar/render?action=TEMPLATE" +
        "&text=" + encodeURIComponent("Paul & Malampi's Wedding") +
        "&dates=20261121T070000Z/20261121T170000Z" +
        "&details=" + encodeURIComponent(
          "Marriage Blessing at 9:00 AM at Bethel Church International. Picture Session at 12:00 PM and Reception at 4:00 PM at Minsundu Recreation Park."
        ) +
        "&location=" + encodeURIComponent("Bethel Church International, Ndola, Zambia");

      window.location.href = googleCalendarUrl;
      return;
    }

    const calendarContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Paul and Malampi Wedding//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:paul-malampi-wedding-20261121@wedding",
      "DTSTAMP:20261003T080000Z",
      "DTSTART:20261121T070000Z",
      "DTEND:20261121T170000Z",
      "SUMMARY:Paul & Malampi's Wedding",
      "DESCRIPTION:Marriage Blessing at 9:00 AM at Bethel Church International. Picture Session at 12:00 PM and Reception at 4:00 PM at Minsundu Recreation Park.",
      "LOCATION:Bethel Church International, Ndola, Zambia",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([calendarContent], { type: "text/calendar;charset=utf-8" });
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "paul-and-malampi-wedding.ics";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(fileUrl), 1000);
  });
}

function setupGallery() {
  const lightbox = $("#lightbox");
  if (!lightbox) return;

  const enlargedImage = $("img", lightbox);
  const closeButton = $("button", lightbox);
  if (!enlargedImage || !closeButton) return;

  $$("#gallery img").forEach((image) => {
    image.addEventListener("click", () => {
      enlargedImage.src = image.src;
      lightbox.classList.add("open");
    });
  });

  closeButton.addEventListener("click", () => lightbox.classList.remove("open"));
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.classList.remove("open");
  });
}

(async function init() {
  const guest = await loadGuest();

  if (!guest) {
    showInvitationUnavailable();
    return;
  }

  renderGuest(guest);
  startCountdown();
  setupDirections();
  setupRsvp(guest);
  setupCalendar();
  setupGallery();
})();
