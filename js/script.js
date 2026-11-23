/* ==========================================================================
   AARAV ESTATES – Site interactions (vanilla JS, no dependencies)
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------------
     CONFIG – edit before a client launch
     ------------------------------------------------------------------ */
  // Leave empty to open WhatsApp's "choose a chat" screen with the message.
  // Add the business number in international format (e.g. "91XXXXXXXXXX") to send directly.
  const WHATSAPP_NUMBER = "";

  /* ------------------------------------------------------------------
     DEMO PROPERTY DATA
     All names, prices, areas and amenities are FICTIONAL sample content.
     price = starting price in Lakhs (used by the budget search).
     searchTypes = values matched by the hero "Property Type" select.
     ------------------------------------------------------------------ */
  const IMG = (id, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

  const PROPERTIES = [
    {
      id: "grand-residency",
      name: "The Grand Residency",
      location: "Sangli",
      city: "Sangli",
      category: "apartment",
      searchTypes: ["Apartments"],
      typeLabel: "2 & 3 BHK Apartments",
      price: 65,
      priceLabel: "₹65 Lakhs",
      config: "2 & 3 BHK",
      area: "1,050 – 1,480 sq. ft.",
      status: "Ready to Move",
      images: ["1545324418-cc1a3fa10c00", "1600607687939-ce8a6c25118c", "1616486338812-3dadae4b4ace"],
      description: "A landmark residential address in the heart of Sangli, The Grand Residency pairs generous, light-filled apartments with a calm, landscaped setting. Homes are ready for immediate possession, ideal for families who want to move in without waiting.",
      amenities: ["Landscaped garden", "Children's play area", "Clubhouse & gym", "Covered parking", "24×7 security", "Power backup for common areas"]
    },
    {
      id: "aarav-heights",
      name: "Aarav Heights",
      location: "Miraj",
      city: "Miraj",
      category: "apartment",
      searchTypes: ["Apartments"],
      typeLabel: "2 & 3 BHK Apartments",
      price: 52,
      priceLabel: "₹52 Lakhs",
      config: "2 & 3 BHK",
      area: "920 – 1,320 sq. ft.",
      status: "Under Construction",
      images: ["1574362848149-11496d93a7c7", "1560448204-e02f11c3d0e2", "1595526114035-0d45ed16cfbf"],
      description: "Aarav Heights offers thoughtfully planned apartments in Miraj with efficient layouts, good cross-ventilation and family-focused amenities. A value-driven choice for first-time buyers and growing families.",
      amenities: ["Rooftop terrace", "Children's play area", "Multipurpose hall", "Lift with backup", "CCTV surveillance", "Rainwater harvesting"]
    },
    {
      id: "green-valley-plots",
      name: "Green Valley Plots",
      location: "Near Sangli",
      city: "Sangli",
      category: "plot",
      searchTypes: ["Residential Plots"],
      typeLabel: "Residential Plots",
      price: 25,
      priceLabel: "₹25 Lakhs",
      config: "Plots of various sizes",
      area: "1,200 – 3,000 sq. ft.",
      status: "Available",
      images: ["1500382017468-9049fed747ef", "1416331108676-a22ccb276e35", "1558036117-15d82a90b9b1"],
      description: "Build the home you've always imagined at Green Valley, a planned plotted layout on the outskirts of Sangli surrounded by open greenery. Wide internal roads and a peaceful setting make it suited to independent homes.",
      amenities: ["Internal roads", "Street lighting", "Compound wall", "Water connection provision", "Green open spaces", "Gated entrance"]
    },
    {
      id: "elite-villas",
      name: "The Elite Villas",
      location: "Kolhapur",
      city: "Kolhapur",
      category: "villa",
      searchTypes: ["Villas"],
      typeLabel: "Premium Villas",
      price: 125,
      priceLabel: "₹1.25 Crore",
      config: "4 BHK Villas",
      area: "2,600 – 3,400 sq. ft.",
      status: "Upcoming",
      images: ["1613490493576-7fde63acd811", "1512917774080-9991f1c4c750", "1600210492486-724fe5c67fb0"],
      description: "An exclusive collection of contemporary villas in Kolhapur, designed for privacy, space and refined living. Each villa features double-height living areas, private gardens and premium finishes.",
      amenities: ["Private garden", "Swimming pool", "Clubhouse", "Jogging track", "Gated community", "Dedicated parking"]
    },
    {
      id: "business-square",
      name: "Business Square",
      location: "Sangli",
      city: "Sangli",
      category: "commercial",
      searchTypes: ["Commercial Spaces", "Office Spaces"],
      typeLabel: "Commercial Offices",
      price: 40,
      priceLabel: "₹40 Lakhs",
      config: "Office units & showrooms",
      area: "450 – 2,000 sq. ft.",
      status: "Ready to Move",
      images: ["1486406146926-c627a92ad1ab", "1497366216548-37526070297c", "1497366811353-6870744d04b2"],
      description: "A modern commercial address in Sangli with flexible office units and ground-floor showrooms. Ideal for professionals, clinics, consultancies and retail brands looking for a prominent location.",
      amenities: ["High-speed lifts", "Visitor parking", "Power backup", "Reception lobby", "Fire safety systems", "CCTV & security"]
    },
    {
      id: "lakeview-homes",
      name: "Lakeview Homes",
      location: "Pune",
      city: "Pune",
      category: "apartment",
      searchTypes: ["Apartments"],
      typeLabel: "2 & 3 BHK Apartments",
      price: 78,
      priceLabel: "₹78 Lakhs",
      config: "2 & 3 BHK",
      area: "980 – 1,420 sq. ft.",
      status: "Under Construction",
      images: ["1567496898669-ee935f5f647a", "1502672260266-1c1ef2d93688", "1631049307264-da0ec9d70304"],
      description: "Lakeview Homes brings serene, open-view living to Pune with well-planned apartments, landscaped decks and a full suite of lifestyle amenities for working professionals and families.",
      amenities: ["Swimming pool", "Fitness centre", "Landscaped podium", "Indoor games room", "Co-working lounge", "EV charging provision"]
    }
  ];

  const STATUS_CLASS = {
    "Ready to Move": "ready",
    "Under Construction": "construction",
    "Upcoming": "upcoming",
    "Available": "available"
  };

  /* ------------------------------------------------------------------
     Helpers
     ------------------------------------------------------------------ */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const byId = (id) => PROPERTIES.find((p) => p.id === id);

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  let toastTimer;
  function showToast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 3200);
  }

  /* Keep keyboard focus inside an open dialog */
  function trapFocus(container, e) {
    const focusable = $$('button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', container)
      .filter((el) => el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ------------------------------------------------------------------
     1. Sticky header, back-to-top, active nav state
     ------------------------------------------------------------------ */
  const header = $("#siteHeader");
  const backToTop = $("#backToTop");
  const navLinks = $$(".nav-link");
  const navSections = navLinks.map((l) => document.querySelector(l.getAttribute("href"))).filter(Boolean);

  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 40);
    backToTop.classList.toggle("visible", y > 700);

    // Active nav: the last nav section whose top has passed the header line
    const line = y + window.innerHeight * 0.35;
    let current = navSections[0];
    navSections.forEach((sec) => { if (sec.offsetTop <= line) current = sec; });
    navLinks.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + current.id));
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ------------------------------------------------------------------
     2. Mobile hamburger menu
     ------------------------------------------------------------------ */
  const navToggle = $("#navToggle");
  const mainNav = $("#mainNav");

  function setNav(open) {
    mainNav.classList.toggle("open", open);
    document.body.classList.toggle("nav-open", open);
    document.body.classList.toggle("no-scroll", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  navToggle.addEventListener("click", () => setNav(!mainNav.classList.contains("open")));
  $$("a", mainNav).forEach((a) => a.addEventListener("click", () => setNav(false)));
  document.addEventListener("click", (e) => {
    if (mainNav.classList.contains("open") && !mainNav.contains(e.target) && !navToggle.contains(e.target)) setNav(false);
  });
  window.addEventListener("resize", () => { if (window.innerWidth > 1024) setNav(false); });

  /* ------------------------------------------------------------------
     3. Property cards, category filter & hero search
     ------------------------------------------------------------------ */
  const grid = $("#propertyGrid");
  const emptyState = $("#emptyState");
  const summary = $("#searchSummary");
  const summaryText = $("#searchSummaryText");
  const filterBtns = $$(".filter-btn");

  const state = { category: "all", search: null }; // search = {type, location, budget}

  function cardHTML(p) {
    return `
      <article class="property-card" data-id="${p.id}">
        <div class="pc-media">
          <img src="${IMG(p.images[0], 800)}" alt="${p.name}, ${p.typeLabel} in ${p.location}" loading="lazy" width="800" height="600">
          <span class="badge ${STATUS_CLASS[p.status] || ""}">${p.status}</span>
          <div class="pc-price"><small>Starting from</small><strong>${p.priceLabel}</strong></div>
        </div>
        <div class="pc-body">
          <span class="pc-type">${p.typeLabel}</span>
          <h3>${p.name}</h3>
          <p class="pc-loc"><i class="fa-solid fa-location-dot"></i>${p.location}</p>
          <div class="pc-specs">
            <span><i class="fa-solid fa-layer-group"></i>${p.config}</span>
            <span><i class="fa-solid fa-ruler-combined"></i>${p.area}</span>
          </div>
          <div class="pc-actions">
            <button type="button" class="btn btn-outline" data-action="details" data-id="${p.id}">View Details</button>
            <button type="button" class="btn btn-gold" data-action="enquire" data-id="${p.id}">Enquire Now</button>
          </div>
        </div>
      </article>`;
  }

  function matchesSearch(p, s) {
    if (!s) return true;
    if (s.type && !p.searchTypes.includes(s.type)) return false;
    if (s.location && p.city !== s.location) return false;
    if (s.budget) {
      const [min, max] = s.budget.split("-").map(Number);
      if (p.price < min || p.price > max) return false;
    }
    return true;
  }

  function renderProperties() {
    const list = PROPERTIES.filter((p) =>
      (state.category === "all" || p.category === state.category) && matchesSearch(p, state.search)
    );
    grid.innerHTML = list.map(cardHTML).join("");
    emptyState.hidden = list.length > 0;

    if (state.search) {
      const s = state.search;
      const budgetLabel = s.budget ? $(`#searchBudget option[value="${s.budget}"]`).textContent : "";
      const parts = [s.type, s.location && `in ${s.location}`, budgetLabel && `(${budgetLabel})`].filter(Boolean);
      summaryText.innerHTML = `<strong>${list.length}</strong> ${list.length === 1 ? "property" : "properties"} found${parts.length ? " for " + parts.join(" ") : ""}.`;
      summary.hidden = false;
    } else {
      summary.hidden = true;
    }
  }

  function setCategory(cat) {
    state.category = cat;
    filterBtns.forEach((b) => {
      const on = b.dataset.filter === cat;
      b.classList.toggle("active", on);
      b.setAttribute("aria-selected", String(on));
    });
    renderProperties();
  }

  function clearSearch() {
    state.search = null;
    $("#searchForm").reset();
  }

  filterBtns.forEach((b) => b.addEventListener("click", () => setCategory(b.dataset.filter)));

  // Hero search
  $("#searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const type = $("#searchType").value;
    const location = $("#searchLocation").value;
    const budget = $("#searchBudget").value;
    state.search = type || location || budget ? { type, location, budget } : null;
    setCategory("all");
    scrollToId("properties");
  });

  $("#clearSearch").addEventListener("click", () => { clearSearch(); renderProperties(); });
  $("#resetFilters").addEventListener("click", () => { clearSearch(); setCategory("all"); });

  // "View properties" buttons in other sections (category or location shortcuts)
  $$("[data-show-category]").forEach((btn) => btn.addEventListener("click", () => {
    clearSearch();
    setCategory(btn.dataset.showCategory);
    setNav(false);
    scrollToId("properties");
  }));
  $$("[data-search-location]").forEach((btn) => btn.addEventListener("click", () => {
    const loc = btn.dataset.searchLocation;
    $("#searchForm").reset();
    $("#searchLocation").value = loc;
    state.search = { type: "", location: loc, budget: "" };
    setCategory("all");
    scrollToId("properties");
  }));

  // Card buttons (event delegation)
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const p = byId(btn.dataset.id);
    if (btn.dataset.action === "details") openModal(p, btn);
    if (btn.dataset.action === "enquire") goToEnquiry(p);
  });

  renderProperties();

  /* ------------------------------------------------------------------
     4. Property details modal
     ------------------------------------------------------------------ */
  const modal = $("#propertyModal");
  const modalDialog = $(".modal-dialog", modal);
  let modalProperty = null;
  let lastFocus = null;

  function setModalImage(i) {
    const p = modalProperty;
    const main = $("#modalMainImg");
    main.src = IMG(p.images[i], 1200);
    main.alt = `${p.name} – image ${i + 1} of ${p.images.length}`;
    $$("#modalThumbs button").forEach((b, idx) => b.classList.toggle("active", idx === i));
  }

  function openModal(p, trigger) {
    modalProperty = p;
    lastFocus = trigger || document.activeElement;

    $("#modalType").textContent = p.typeLabel;
    $("#modalTitle").textContent = p.name;
    $("#modalLocation").textContent = p.location;
    $("#modalPrice").textContent = "Starting " + p.priceLabel;
    $("#modalDesc").textContent = p.description;
    $("#modalConfig").textContent = p.config;
    $("#modalArea").textContent = p.area;
    $("#modalStatusText").textContent = p.status;
    const badge = $("#modalStatus");
    badge.textContent = p.status;
    badge.className = "badge " + (STATUS_CLASS[p.status] || "");

    $("#modalThumbs").innerHTML = p.images.map((id, i) =>
      `<button type="button" data-index="${i}" aria-label="Show image ${i + 1}"><img src="${IMG(id, 300)}" alt=""></button>`
    ).join("");
    $("#modalAmenities").innerHTML = p.amenities.map((a) => `<li><i class="fa-solid fa-check"></i>${a}</li>`).join("");
    setModalImage(0);

    modal.hidden = false;
    document.body.classList.add("no-scroll");
    modalDialog.scrollTop = 0;
    $(".modal-close", modal).focus();
  }

  function closeModal() {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("no-scroll");
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }

  $("#modalThumbs").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (b) setModalImage(Number(b.dataset.index));
  });
  $$("[data-close-modal]", modal).forEach((el) => el.addEventListener("click", closeModal));
  $("#modalEnquire").addEventListener("click", () => { const p = modalProperty; closeModal(); goToEnquiry(p); });
  $("#modalVisit").addEventListener("click", () => { const p = modalProperty; closeModal(); goToVisit(p); });

  /* Prefill helpers used by cards and the modal */
  const INTEREST_BY_CATEGORY = { apartment: "Apartments", villa: "Villas", plot: "Residential Plots", commercial: "Commercial Spaces" };

  function goToEnquiry(p) {
    $("#enqInterest").value = INTEREST_BY_CATEGORY[p.category];
    $("#enqLocation").value = p.city;
    const msg = $("#enqMessage");
    if (!msg.value.trim()) msg.value = `I'm interested in ${p.name} (${p.typeLabel}, ${p.location}). Please share more details.`;
    scrollToId("enquiry");
    setTimeout(() => $("#enqName").focus({ preventScroll: true }), 700);
  }

  function goToVisit(p) {
    $("#visitProperty").value = p.id;
    scrollToId("site-visit");
    setTimeout(() => $("#visitName").focus({ preventScroll: true }), 700);
  }

  /* ------------------------------------------------------------------
     5. Gallery lightbox
     ------------------------------------------------------------------ */
  const lightbox = $("#lightbox");
  const galleryItems = $$("#galleryGrid .g-item");
  let lbIndex = 0;
  let lbLastFocus = null;

  function showLightbox(i) {
    lbIndex = (i + galleryItems.length) % galleryItems.length;
    const item = galleryItems[lbIndex];
    const img = $("img", item);
    const lbImg = $("#lbImg");
    lbImg.src = img.src.replace(/w=\d+/, "w=1800");
    lbImg.alt = img.alt;
    $("#lbCaption").innerHTML = `${item.dataset.caption}<small>${lbIndex + 1} / ${galleryItems.length}</small>`;
  }
  function openLightbox(i) {
    lbLastFocus = document.activeElement;
    showLightbox(i);
    lightbox.hidden = false;
    document.body.classList.add("no-scroll");
    $("#lbClose").focus();
  }
  function closeLightbox() {
    if (lightbox.hidden) return;
    lightbox.hidden = true;
    document.body.classList.remove("no-scroll");
    if (lbLastFocus) lbLastFocus.focus({ preventScroll: true });
  }

  galleryItems.forEach((item, i) => item.addEventListener("click", () => openLightbox(i)));
  $("#lbClose").addEventListener("click", closeLightbox);
  $("#lbPrev").addEventListener("click", () => showLightbox(lbIndex - 1));
  $("#lbNext").addEventListener("click", () => showLightbox(lbIndex + 1));
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox || e.target.tagName === "FIGURE") closeLightbox(); });

  // Swipe on touch devices
  let lbTouchX = null;
  lightbox.addEventListener("touchstart", (e) => { lbTouchX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener("touchend", (e) => {
    if (lbTouchX === null) return;
    const dx = e.changedTouches[0].clientX - lbTouchX;
    if (Math.abs(dx) > 50) showLightbox(lbIndex + (dx < 0 ? 1 : -1));
    lbTouchX = null;
  });

  /* Global keyboard handling for modal & lightbox */
  document.addEventListener("keydown", (e) => {
    if (!lightbox.hidden) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showLightbox(lbIndex + 1);
      if (e.key === "ArrowLeft") showLightbox(lbIndex - 1);
      if (e.key === "Tab") trapFocus(lightbox, e);
      return;
    }
    if (!modal.hidden) {
      if (e.key === "Escape") closeModal();
      if (e.key === "Tab") trapFocus(modalDialog, e);
      return;
    }
    if (e.key === "Escape" && mainNav.classList.contains("open")) { setNav(false); navToggle.focus(); }
  });

  /* ------------------------------------------------------------------
     6. Testimonial carousel
     ------------------------------------------------------------------ */
  const track = $("#carouselTrack");
  const slides = $$(".t-card", track);
  const dotsWrap = $("#carouselDots");
  const carousel = $("#testimonialCarousel");
  let slideIndex = 0;
  let autoTimer;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  slides.forEach((s, i) => {
    s.setAttribute("aria-label", `${i + 1} of ${slides.length}`);
    const d = document.createElement("button");
    d.type = "button";
    d.className = "c-dot";
    d.setAttribute("role", "tab");
    d.setAttribute("aria-label", `Show testimonial ${i + 1}`);
    d.addEventListener("click", () => { goToSlide(i); restartAuto(); });
    dotsWrap.appendChild(d);
  });
  const dots = $$(".c-dot", dotsWrap);

  function goToSlide(i) {
    slideIndex = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${slideIndex * 100}%)`;
    dots.forEach((d, idx) => {
      d.classList.toggle("active", idx === slideIndex);
      d.setAttribute("aria-selected", String(idx === slideIndex));
    });
    slides.forEach((s, idx) => s.setAttribute("aria-hidden", String(idx !== slideIndex)));
  }
  function startAuto() { if (!reduceMotion) autoTimer = setInterval(() => goToSlide(slideIndex + 1), 6000); }
  function stopAuto() { clearInterval(autoTimer); }
  function restartAuto() { stopAuto(); startAuto(); }

  $("#prevSlide").addEventListener("click", () => { goToSlide(slideIndex - 1); restartAuto(); });
  $("#nextSlide").addEventListener("click", () => { goToSlide(slideIndex + 1); restartAuto(); });
  carousel.addEventListener("mouseenter", stopAuto);
  carousel.addEventListener("mouseleave", startAuto);
  carousel.addEventListener("focusin", stopAuto);
  carousel.addEventListener("focusout", startAuto);

  let touchX = null;
  track.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; stopAuto(); }, { passive: true });
  track.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) goToSlide(slideIndex + (dx < 0 ? 1 : -1));
    touchX = null;
    startAuto();
  });

  goToSlide(0);
  startAuto();

  /* ------------------------------------------------------------------
     7. FAQ accordion (one open at a time)
     ------------------------------------------------------------------ */
  $$(".acc-trigger").forEach((btn) => btn.addEventListener("click", () => {
    const item = btn.closest(".acc-item");
    const willOpen = !item.classList.contains("open");
    $$(".acc-item.open").forEach((other) => {
      other.classList.remove("open");
      $(".acc-trigger", other).setAttribute("aria-expanded", "false");
    });
    item.classList.toggle("open", willOpen);
    btn.setAttribute("aria-expanded", String(willOpen));
  }));

  /* ------------------------------------------------------------------
     8. Forms – validation & demo submission (nothing is sent or stored)
     ------------------------------------------------------------------ */
  const MOBILE_RE = /^(?:\+?91|0)?[6-9]\d{9}$/;           // Indian mobile: 10 digits starting 6–9
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const REQUIRED_MSG = {
    name: "Please enter your name.",
    mobile: "Please enter your mobile number.",
    email: "Please enter your email address.",
    interest: "Please choose what you're interested in.",
    property: "Please select a property.",
    date: "Please choose a preferred date.",
    time: "Please choose a preferred time."
  };

  // Populate site-visit property select from PROPERTIES
  const visitSelect = $("#visitProperty");
  PROPERTIES.forEach((p) => {
    const o = document.createElement("option");
    o.value = p.id;
    o.textContent = `${p.name} – ${p.location}`;
    visitSelect.appendChild(o);
  });

  // Visit date: earliest = today
  const today = new Date();
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  $("#visitDate").min = iso(today);

  function setError(input, msg) {
    const group = input.closest(".form-group");
    group.classList.toggle("invalid", !!msg);
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    const err = $(".error-msg", group);
    if (err) err.textContent = msg || "";
    return !msg;
  }

  function validateField(input) {
    const v = input.value.trim();
    if (input.required && !v) return setError(input, REQUIRED_MSG[input.name] || "This field is required.");
    if (input.type === "tel" && v && !MOBILE_RE.test(v.replace(/[\s-]/g, ""))) return setError(input, "Enter a valid 10-digit Indian mobile number (starting with 6–9).");
    if (input.type === "email" && v && !EMAIL_RE.test(v)) return setError(input, "Enter a valid email address, e.g. name@example.com.");
    if (input.name === "name" && v && v.length < 2) return setError(input, "Name looks too short.");
    if (input.type === "date" && v && v < input.min) return setError(input, "Please choose today or a future date.");
    return setError(input, "");
  }

  function setupForm(formId, successId, onSuccess) {
    const form = document.getElementById(formId);
    const success = document.getElementById(successId);
    const fields = $$("input, select, textarea", form).filter((f) => f.required || f.type === "email" || f.type === "tel");

    fields.forEach((f) => {
      f.addEventListener("blur", () => { if (f.value.trim() || f.closest(".invalid")) validateField(f); });
      f.addEventListener("input", () => { if (f.closest(".invalid")) validateField(f); });
      f.addEventListener("change", () => { if (f.closest(".invalid")) validateField(f); });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const results = fields.map(validateField);
      if (results.includes(false)) {
        const firstBad = fields[results.indexOf(false)];
        firstBad.focus();
        showToast("Please check the highlighted fields.");
        return;
      }
      const data = Object.fromEntries(new FormData(form).entries());
      onSuccess(data, success);
      form.hidden = true;
      success.hidden = false;
      success.focus();
    });
  }

  setupForm("enquiryForm", "enquirySuccess", (data, box) => {
    $(".success-name", box).textContent = ", " + data.name.split(" ")[0];
  });

  setupForm("visitForm", "visitSuccess", (data) => {
    const p = byId(data.property);
    const date = new Date(data.date + "T00:00:00").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    $("#visitSuccessText").textContent =
      `Thank you, ${data.name.split(" ")[0]}. Your visit to ${p.name} on ${date} at ${data.time} has been requested. Our team will call you to confirm.`;
  });

  // "Send another" buttons
  $$("[data-reset-form]").forEach((btn) => btn.addEventListener("click", () => {
    const form = document.getElementById(btn.dataset.resetForm);
    form.reset();
    $$(".form-group", form).forEach((g) => g.classList.remove("invalid"));
    $$(".error-msg", form).forEach((m) => (m.textContent = ""));
    btn.closest(".form-success").hidden = true;
    form.hidden = false;
    $("input", form).focus();
  }));

  /* ------------------------------------------------------------------
     9. WhatsApp buttons (prefilled message)
     ------------------------------------------------------------------ */
  $$(".js-whatsapp").forEach((btn) => btn.addEventListener("click", () => {
    const msg = encodeURIComponent(btn.dataset.waMessage || "Hello AARAV ESTATES, I'd like to enquire about a property.");
    const url = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}` : `https://wa.me/?text=${msg}`;
    window.open(url, "_blank", "noopener");
  }));

  /* ------------------------------------------------------------------
     10. Scroll reveal & stat counters
     ------------------------------------------------------------------ */
  function animateCounter(el) {
    const target = Number(el.dataset.count);
    if (reduceMotion) { el.textContent = target; return; }
    const duration = 1600;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        // Small stagger for siblings revealed together
        const siblings = $$(".reveal:not(.in)", el.parentElement);
        const delay = Math.max(0, siblings.indexOf(el)) * 70;
        setTimeout(() => el.classList.add("in"), Math.min(delay, 420));
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal").forEach((el) => io.observe(el));

    const counterIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { animateCounter(entry.target); counterIO.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    $$(".counter").forEach((c) => counterIO.observe(c));
  } else {
    $$(".reveal").forEach((el) => el.classList.add("in"));
    $$(".counter").forEach((c) => (c.textContent = c.dataset.count));
  }
})();
