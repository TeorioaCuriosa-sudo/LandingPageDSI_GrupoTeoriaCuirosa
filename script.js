/* ── SLIDER ──────────────────────────────────────────────── */
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let current = 0;
let timer;

function goSlide(n) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (n + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
  resetTimer();
}

function nextSlide() { goSlide(current + 1); }

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(nextSlide, 5000);
}

resetTimer();

/* ── HEADER SCROLL ───────────────────────────────────────── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── STORE DATA ──────────────────────────────────────────── */
const SVG = {
  morada: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  horario: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  contacto: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69l3-.01a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.09a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  maps: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>`,
  email: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
};

const ico = (svg) => `<span class="ico">${svg}</span>`;

function showPin(idx) { }
function hidePin() { }

function renderCard(s, idx) {
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(s.mapsQuery)}`;
  const mailUrl = `mailto:${s.email}?subject=Pedido%20de%20Informa%C3%A7%C3%A3o%20-%20${encodeURIComponent(s.city)}`;
  return `<div class="store-card" onmouseenter="showPin(${idx})" onmouseleave="hidePin()">
    <div class="city">${s.city}</div>
    <div class="brand">${s.brand}</div>
    <div class="detail">${ico(SVG.morada)} ${s.address}</div>
    <div class="detail">${ico(SVG.horario)} ${s.hours}</div>
    <div class="detail">${ico(SVG.contacto)} ${s.phone}</div>
    <hr/>
    <div class="links">
      <a href="${mapsUrl}" target="_blank" rel="noopener">${ico(SVG.maps)} Ver no Google Maps</a>
      <a href="${mailUrl}">${ico(SVG.email)} Falar com a loja</a>
    </div>
  </div>`;
}

const stores = [
  { city: "Póvoa de Varzim",        brand: "DS Intermediários de Crédito", address: "Póvoa de Varzim, Praça do Almada, n.º 5 RC, CV 44 ", hours: "Seg-Sex: 09h00-13h00 | 14h30 - 19h30", phone: "916 117 890", email: "povoadevarzim@dsicredito.pt", mapsQuery: "Praça do Almada 5, Póvoa de Varzim", lat: 41.3794, lng: -8.7602, district: "porto" },
  { city: "Barcelos",               brand: "DS Intermediários de Crédito", address: "Av. dos Combatentes da Grande Guerra, 37 R/C",       hours: "Seg-Sex: 09h00-13h00 | 14h30 - 18h00", phone: "916 117 890", email: "barceloscentro@dsicredito.pt", mapsQuery: "Avenida dos Combatentes da Grande Guerra 37, Barcelos", lat: 41.1496, lng: -8.6109, district: "braga" },
  { city: "Viana do Castelo",       brand: "DS Intermediários de Crédito", address: "Estrada da Papanata, 220",                           hours: "Seg-Sex: 09h00-13h00 | 14h30 - 18h00", phone: "916 117 890", email: "vianadocastelo@dsicredito.pt", mapsQuery: "Estrada da Papanata 220, Viana do Castelo", lat: 41.6938, lng: -8.8339, district: "viana do castelo" },
  { city: "Arcos de Valdevez",      brand: "DS Intermediários de Crédito", address: "Rua Dr. Félix Alves Pereira, Fração D, nº 228",      hours: "Seg-Sex: 09h0012h30 | 14h00 - 18h30", phone: "916 117 890", email: "arcosdevaldevez@dsicredito.pt", mapsQuery: "Rua Dr. Félix Alves Pereira 228, Arcos de Valdevez", lat: 41.8482, lng: -8.4197, district: "viana do castelo" },
  { city: "Esposende",              brand: "DS Intermediários de Crédito", address: "Rua Eng.º Losa Faria, 133",                          hours: "Seg-Sex: 09h00-19h00",                 phone: "916 117 890", email: "esposende@dsicredito.pt", mapsQuery: "Rua Engenheiro Losa Faria 133, Esposende", lat: 41.5354, lng: -8.7829, district: "braga" },
  { city: "Trofa",                  brand: "DS Intermediários de Crédito", address: "Rua Engenheiro António Dias Costa Serra, Loja 6/10", hours: "Seg-Sex: 09h00-13h00 | 14h30 - 18h00", phone: "916 117 890", email: "trofa@dsicredito.pt", mapsQuery: "Rua Engenheiro António Dias Costa Serra, Trofa", lat: 41.5454, lng: -8.4265, district: "porto" },
  { city: "Vila do Conde",          brand: "DS Intermediários de Crédito", address: "Av. Dr. Carlos Pinto Ferreira, n.º 373",             hours: "Seg-Sex: 09h-18h30",                   phone: "916 117 890", email: "viladoconde@dsicredito.pt", mapsQuery: "Avenida Dr. Carlos Pinto Ferreira 373, Vila do Conde", lat: 41.3514, lng: -8.7479, district: "porto" },
  { city: "Silvares - Lousada",     brand: "DS Intermediários de Crédito", address: "Av. Dr. Carlos Pinto Ferreira, n.º 373",             hours: "Seg-Sex: 09h-18h30",                   phone: "916 117 890", email: "lousadacentro@dsicredito.pt", mapsQuery: "Avenida Dr. Carlos Pinto Ferreira 373, Lousada", lat: 41.2786, lng: -8.2838, district: "porto" },
  { city: "Porto - Damião de Góis", brand: "DS Intermediários de Crédito", address: "Rua de Alves Redol, n.º 446",                        hours: "Seg-Sex: 09h-18h30",                   phone: "916 117 890", email: "portodamiaogois@dsicredito.pt", mapsQuery: "Rua de Alves Redol 446, Porto", lat: 41.1579, lng: -8.6291, district: "porto" },
  { city: "Canedo",                 brand: "DS Intermediários de Crédito", address: "Rua do Centro Social, n.º 14",                       hours: "Seg-Sex: 09h00-13h00 | 14h30 - 19h30", phone: "916 117 890", email: "canedo@dsicredito.pt", mapsQuery: "Rua do Centro Social 14, Canedo, Santa Maria da Feira", lat: 40.9269, lng: -8.5382, district: "aveiro" },
  { city: "Maia - Águas Santas",    brand: "DS Intermediários de Crédito", address: "Rua do Camilo Castelo Branco, 206",                  hours: "Seg-Sex: 09h-18h00",                   phone: "916 117 890", email: "aguassantas@dsicredito.pt", mapsQuery: "Rua Camilo Castelo Branco 206, Águas Santas, Maia", lat: 41.2348, lng: -8.6177, district: "porto" },
  { city: "Lisboa - Linda-a-Velha", brand: "DS Intermediários de Crédito", address: "Calçada do Chafariz, 2-C",                           hours: "Seg-Sex: 10h00-13h00 | 14h30 - 18h00", phone: "916 117 890", email: "lindaavelha@dsicredito.pt", mapsQuery: "Calçada do Chafariz 2, Linda-a-Velha", lat: 38.7069, lng: -9.2388, district: "lisboa" },
];

function filterStores() {
  const q = document.getElementById('searchInput').value.toLowerCase().trim();
  const filtered = q
    ? stores.filter(s => s.district.includes(q) || s.city.toLowerCase().includes(q) || s.address.toLowerCase().includes(q))
    : stores;
  document.getElementById('storeList').innerHTML = filtered.length
    ? filtered.map((s, i) => renderCard(s, stores.indexOf(s))).join('')
    : `<p style="color:#999;font-size:.88rem;padding:20px 0">Nenhuma loja encontrada para "<strong>${q}</strong>".</p>`;
}

filterStores();