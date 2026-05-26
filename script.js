/* ============================================
   TRAVIX — script.js
   All interactive & AI simulation logic
   ============================================ */

/* ===== INITIALIZATION ===== */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initStars();
  initNavbar();
  initTyping();
  initStatCounters();
  initDestinations();
  initFeatures();
  initTestimonials();
  initScrollReveal();
  initScrollTop();
  initSuggestions();
  lucide.createIcons();           // render all lucide icons
  calcTotal();                    // initial calculator render
});

/* ===== LOADER ===== */
function initLoader() {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    document.body.style.overflow = 'auto';
    // Re-trigger lucide after DOM settle
    setTimeout(() => lucide.createIcons(), 100);
  }, 2400);
  document.body.style.overflow = 'hidden';
}

/* ===== STARS ===== */
function initStars() {
  const container = document.getElementById('stars');
  for (let i = 0; i < 90; i++) {
    const s = document.createElement('div');
    const size = Math.random() * 2.5 + 0.5;
    s.className = 'star';
    s.style.cssText = `
      width:${size}px; height:${size}px;
      top:${Math.random()*100}%; left:${Math.random()*100}%;
      animation-duration:${2 + Math.random()*4}s;
      animation-delay:${Math.random()*4}s;
    `;
    container.appendChild(s);
  }
}

/* ===== NAVBAR ===== */
function initNavbar() {
  const nav = document.getElementById('navbar');
  const ham = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
    document.getElementById('scrollTop').classList.toggle('visible', window.scrollY > 400);
  });

  ham.addEventListener('click', () => {
    links.classList.toggle('open');
    // Animate hamburger lines
    const spans = ham.querySelectorAll('span');
    if (links.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close mobile nav on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      const spans = ham.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
}

/* ===== TYPING EFFECT ===== */
function initTyping() {
  const el = document.getElementById('typingText');
  const words = ['Dream Trip', 'Perfect Vacation', 'Next Adventure', 'Ideal Getaway', 'Budget Journey'];
  let wi = 0, ci = 0, deleting = false;

  function type() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ci + 1);
      ci++;
      if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      el.textContent = word.slice(0, ci - 1);
      ci--;
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(type, deleting ? 65 : 110);
  }
  setTimeout(type, 1200);
}

/* ===== ANIMATED COUNTERS ===== */
function initStatCounters() {
  const counters = document.querySelectorAll('.stat-num');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCount(e.target);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

function animateCount(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1600;
  const step = 20;
  const increment = target / (duration / step);
  let current = 0;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) { el.textContent = target; clearInterval(timer); }
    else el.textContent = Math.floor(current);
  }, step);
}

/* ===== DESTINATION DATA ===== */
const DESTINATIONS = [
  {
    name: 'Goa', emoji: '🏖️', tag: 'beach',
    img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80',
    desc: 'Sun-soaked beaches, vibrant nightlife & Portuguese heritage.',
    budget: '₹8,000 – ₹25,000',
    highlights: ['Baga Beach','Dudhsagar Falls','Old Goa Churches','Night Markets'],
    hotels: ['The Park Baga River – ₹3,500/n','Sea Shell Resort – ₹1,800/n','Zostel Goa – ₹700/n'],
    food: ['Fish Curry Rice','Prawn Balchão','Bebinca','Chorizo Pao'],
    transport: 'Rent a scooter (₹300/day). Buses & app cabs available.',
    season: 'Nov–Feb (winter)',
    tips: ['Book early for peak season','Stay in North Goa for budget','Try beach shacks for cheap food']
  },
  {
    name: 'Manali', emoji: '🏔️', tag: 'mountain',
    img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80',
    desc: 'Snow-capped peaks, adventure sports & serene valleys.',
    budget: '₹10,000 – ₹30,000',
    highlights: ['Rohtang Pass','Hadimba Temple','Solang Valley','Old Manali'],
    hotels: ['Snow Valley Resort – ₹4,000/n','The Orchard Greens – ₹2,200/n','Zostel Manali – ₹600/n'],
    food: ['Sidu','Trout Fish','Momos','Thukpa'],
    transport: 'Volvo from Delhi (₹1,500). Hire bikes/jeeps locally.',
    season: 'Dec–Feb for snow, May–Jun for treks',
    tips: ['Carry warm clothes even in summer','Book Rohtang permits in advance','Avoid monsoon season']
  },
  {
    name: 'Jaipur', emoji: '🏛️', tag: 'culture',
    img: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80',
    desc: 'The Pink City — royal palaces, bazaars & Rajputana grandeur.',
    budget: '₹6,000 – ₹20,000',
    highlights: ['Amber Fort','Hawa Mahal','City Palace','Nahargarh Fort'],
    hotels: ['Dera Rawatsar Haveli – ₹3,800/n','Umaid Mahal – ₹2,000/n','Zostel Jaipur – ₹550/n'],
    food: ['Dal Baati Churma','Laal Maas','Pyaaz Kachori','Ghewar'],
    transport: 'Auto-rickshaws & e-rickshaws. Metro within city.',
    season: 'Oct–Mar (winter)',
    tips: ['Composite ticket saves money at forts','Bargain at Johari Bazaar','Hire a local guide for forts']
  },
  {
    name: 'Kerala', emoji: '🌴', tag: 'beach',
    img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80',
    desc: 'Backwaters, houseboat stays & God\'s Own Country tranquility.',
    budget: '₹12,000 – ₹35,000',
    highlights: ['Alleppey Backwaters','Munnar Tea Gardens','Wayanad','Varkala Beach'],
    hotels: ['Fragrant Nature Backwaters – ₹5,000/n','Houseboat stay – ₹6,500/n','TripXOXO Hostel – ₹800/n'],
    food: ['Kerala Fish Curry','Puttu & Kadala','Appam & Stew','Pazham Pori'],
    transport: 'Govt. ferries for backwaters. Hire car for hill stations.',
    season: 'Sep–Mar (post-monsoon & winter)',
    tips: ['Monsoon has scenic beauty & fewer crowds','Book houseboats directly for better rates','Try Ayurveda packages at good spas']
  },
  {
    name: 'Dubai', emoji: '🌆', tag: 'international',
    img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
    desc: 'Futuristic skyline, luxury malls & desert adventures.',
    budget: '₹60,000 – ₹1,50,000',
    highlights: ['Burj Khalifa','Dubai Mall','Desert Safari','Palm Jumeirah'],
    hotels: ['Rove Downtown – ₹8,000/n','Premier Inn Al Jaddaf – ₹5,500/n','Dubai Hostel – ₹2,500/n'],
    food: ['Shawarma','Al Harees','Camel Milk Ice Cream','Mezze Platter'],
    transport: 'Dubai Metro is cheapest. Careem app for rides.',
    season: 'Oct–Apr (mild weather)',
    tips: ['Dubai Visa on arrival for Indians','Book desert safari in advance','Use Nol card for metro']
  },
  {
    name: 'Bali', emoji: '🌺', tag: 'international',
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80',
    desc: 'Tropical paradise with temples, rice terraces & surf culture.',
    budget: '₹50,000 – ₹1,20,000',
    highlights: ['Tanah Lot Temple','Ubud Rice Terraces','Kuta Beach','Sacred Monkey Forest'],
    hotels: ['Komaneka at Bisma – ₹12,000/n','Alam Kulkul Boutique – ₹5,000/n','Capsule Hostel – ₹1,200/n'],
    food: ['Nasi Goreng','Babi Guling','Satay','Balinese Black Rice Pudding'],
    transport: 'Rent a scooter ($5/day). Go-Jek for rides.',
    season: 'Apr–Oct (dry season)',
    tips: ['Dress modestly at temples','Bargain at Ubud market','Exchange USD cash for best rates']
  }
];

/* ===== RENDER DESTINATIONS ===== */
function initDestinations() {
  renderDests(DESTINATIONS);
}

function renderDests(data) {
  const grid = document.getElementById('destGrid');
  grid.innerHTML = '';
  if (data.length === 0) {
    grid.innerHTML = '<p style="color:var(--muted);grid-column:1/-1;text-align:center;padding:3rem 0;">No destinations found. Try a different search.</p>';
    return;
  }
  data.forEach((d, i) => {
    const card = document.createElement('div');
    card.className = 'dest-card reveal';
    card.style.animationDelay = `${i * 0.08}s`;
    card.innerHTML = `
      <div class="dest-img-wrap">
        <img src="${d.img}" alt="${d.name}" loading="lazy"/>
        <div class="dest-tag">${d.emoji} ${d.tag.toUpperCase()}</div>
      </div>
      <div class="dest-body">
        <div class="dest-name">${d.name}</div>
        <p class="dest-desc">${d.desc}</p>
        <div class="dest-footer">
          <span class="dest-budget">From ${d.budget}</span>
          <button class="dest-btn" onclick="exploreDestination('${d.name}')">Explore →</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
  // Trigger reveal
  setTimeout(() => {
    grid.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    lucide.createIcons();
  }, 50);
}

let activeTag = 'all';

function filterByTag(tag, btn) {
  activeTag = tag;
  document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  applyFilters();
}

function filterDestinations() {
  applyFilters();
}

function applyFilters() {
  const q = document.getElementById('destSearch').value.toLowerCase();
  let filtered = DESTINATIONS.filter(d => {
    const matchTag = activeTag === 'all' || d.tag === activeTag;
    const matchSearch = d.name.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q) || d.tag.toLowerCase().includes(q);
    return matchTag && matchSearch;
  });
  renderDests(filtered);
}

function exploreDestination(name) {
  const dest = DESTINATIONS.find(d => d.name === name);
  if (!dest) return;
  // Pre-fill planner form
  document.getElementById('destination').value = name;
  document.getElementById('planner').scrollIntoView({ behavior: 'smooth' });
  showToast(`✈️ ${name} selected! Fill in your details to generate a plan.`);
}

/* ===== SUGGESTION BOX ===== */
const DEST_NAMES = DESTINATIONS.map(d => d.name).concat([
  'Mumbai','Delhi','Bangalore','Chennai','Kolkata','Agra','Varanasi',
  'Rishikesh','Shimla','Darjeeling','Coorg','Ooty','Udaipur','Pushkar',
  'Leh Ladakh','Andaman Islands','Mysore','Hampi','Paris','Tokyo','Singapore'
]);

function initSuggestions() {
  const input = document.getElementById('destination');
  const box = document.getElementById('suggBox');

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    box.innerHTML = '';
    if (q.length < 1) { box.classList.remove('open'); return; }
    const matches = DEST_NAMES.filter(n => n.toLowerCase().includes(q)).slice(0, 6);
    if (matches.length === 0) { box.classList.remove('open'); return; }
    matches.forEach(m => {
      const item = document.createElement('div');
      item.className = 'sugg-item';
      item.textContent = m;
      item.onclick = () => { input.value = m; box.classList.remove('open'); };
      box.appendChild(item);
    });
    box.classList.add('open');
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.input-group')) box.classList.remove('open');
  });
}

/* ===== AI TRIP GENERATOR ===== */
document.getElementById('generateBtn').addEventListener('click', generateTrip);

// Travel data bank
const TRAVEL_DATA = {
  adventure: {
    activities: ['River rafting','Trekking trails','Rock climbing','Paragliding','Bungee jumping','Mountain biking','Camping under stars'],
    tips: ['Pack light but carry rain gear','Book adventure activities in advance','Travel in groups for safety','Carry a basic first-aid kit','Download offline maps']
  },
  solo: {
    activities: ['Café hopping','Museum trails','Street photography','Local workshops','Hostel meetups','Cooking classes','Walking tours'],
    tips: ['Stay in hostels to meet travellers','Use apps like Couchsurfing for meetups','Keep emergency contacts saved','Inform hotel of your day plans','Travel by day to new cities']
  },
  family: {
    activities: ['Theme parks','Wildlife sanctuaries','Heritage walks','Boating','Cultural shows','Beach activities','Amusement centres'],
    tips: ['Book family rooms in advance','Choose child-friendly restaurants','Carry snacks & medicines','Plan 1–2 rest days in itinerary','Opt for guided tours for kids']
  },
  romantic: {
    activities: ['Sunset cruises','Candle-lit dinners','Spa & wellness','Stargazing','Couple photoshoots','Heritage walks','Vineyard visits'],
    tips: ['Book couple packages for better value','Surprise experiences add magic','Avoid peak tourist hours for photos','Pack light & match packing style','Choose boutique hotels over chains']
  },
  luxury: {
    activities: ['Private yacht charters','Helicopter tours','Michelin dining','Exclusive spa retreats','Concierge-led city tours','Private safari','Chef-curated meals'],
    tips: ['Book 5-star directly for best loyalty perks','Arrange airport transfer in advance','Carry a travel card for forex','Use premium travel insurance','Tip generously for personalized service']
  },
  budget: {
    activities: ['Free walking tours','Street food trails','Public beach time','Local markets','Heritage sites (free/low cost)','Bike rentals','Hostel common area events'],
    tips: ['Book buses/trains over flights','Stay in hostels or guesthouses','Eat where locals eat','Use free city passes','Plan off-peak to save 40%']
  }
};

const GENERIC_HOTELS = {
  luxury: ['5-Star Heritage Hotel – ₹15,000/n','Boutique Resort – ₹10,000/n','Luxury Villa – ₹18,000/n'],
  high: ['4-Star Hotel – ₹5,000–8,000/n','Premium Resort – ₹6,500/n','Serviced Apartment – ₹4,500/n'],
  mid: ['3-Star Hotel – ₹2,000–3,500/n','OYO Premium – ₹1,800/n','Airbnb Apartment – ₹2,500/n'],
  budget: ['Budget Guesthouse – ₹600–1,200/n','Zostel Hostel (dorm) – ₹500/n','Airbnb Budget Room – ₹900/n']
};

function getHotelTier(budget, days) {
  const perDay = budget / days;
  if (perDay > 8000) return 'luxury';
  if (perDay > 4000) return 'high';
  if (perDay > 2000) return 'mid';
  return 'budget';
}

function generateItinerary(dest, days, travelType, budget) {
  const typeData = TRAVEL_DATA[travelType] || TRAVEL_DATA['budget'];
  const activities = [...typeData.activities];
  const destData = DESTINATIONS.find(d => d.name.toLowerCase() === dest.toLowerCase());
  const highlights = destData ? destData.highlights : ['City exploration','Local markets','Cultural sites','Hidden gems'];
  const itinerary = [];

  for (let i = 0; i < days; i++) {
    const dayActivities = [];
    // Morning
    dayActivities.push(highlights[i % highlights.length] || 'Explore local sights');
    // Afternoon
    dayActivities.push(activities[i % activities.length]);
    // Evening
    dayActivities.push(i === 0 ? 'Arrive, check in & freshen up' : i === days - 1 ? 'Pack & prepare for departure' : 'Evening stroll & local dining');

    itinerary.push({
      day: i + 1,
      plan: `🌅 Morning: Visit ${dayActivities[0]} | 🌞 Afternoon: ${dayActivities[1]} | 🌙 Evening: ${dayActivities[2]}`
    });
  }
  return itinerary;
}

function generateTrip() {
  // Get form values
  const dest = document.getElementById('destination').value.trim();
  const budget = parseInt(document.getElementById('budget').value);
  const days = parseInt(document.getElementById('days').value);
  const travelType = document.getElementById('travelType').value;
  const season = document.getElementById('season').value;
  const travellers = parseInt(document.getElementById('travellers').value) || 1;

  // Validation
  if (!dest) { showToast('⚠️ Please enter a destination', 'warn'); return; }
  if (!budget || budget < 1000) { showToast('⚠️ Please enter a valid budget (min ₹1,000)', 'warn'); return; }
  if (!days || days < 1) { showToast('⚠️ Please enter number of days', 'warn'); return; }
  if (!travelType) { showToast('⚠️ Please select travel type', 'warn'); return; }

  // Show loading state
  const btn = document.getElementById('generateBtn');
  btn.innerHTML = '<span style="display:inline-flex;gap:8px;align-items:center"><svg class="spin" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Generating your plan...</span>';
  btn.disabled = true;
  btn.style.opacity = '0.8';

  setTimeout(() => {
    btn.innerHTML = '<span style="display:inline-flex;gap:8px;align-items:center">✦ Generate My AI Plan</span>';
    btn.disabled = false;
    btn.style.opacity = '1';
    renderTrip({ dest, budget, days, travelType, season, travellers });
  }, 1800);
}

function renderTrip({ dest, budget, days, travelType, season, travellers }) {
  const destData = DESTINATIONS.find(d => d.name.toLowerCase() === dest.toLowerCase());
  const typeData = TRAVEL_DATA[travelType] || TRAVEL_DATA['budget'];
  const tier = getHotelTier(budget / travellers, days);
  const hotels = destData ? destData.hotels : GENERIC_HOTELS[tier];
  const food = destData ? destData.food : ['Local cuisine','Street food','Restaurant dining','Café culture'];
  const transport = destData ? destData.transport : 'Use public transport, app cabs, and local buses for best rates.';
  const itinerary = generateItinerary(dest, days, travelType, budget);
  const perPerson = Math.round(budget / travellers);
  const seasonText = season || 'Year-round';
  const emoji = destData ? destData.emoji : '🌍';

  // Result cards data
  const cards = [
    { icon: '🌍', label: 'Destination', text: `${emoji} ${dest}` },
    { icon: '💰', label: 'Total Budget', text: `₹${budget.toLocaleString('en-IN')} (₹${perPerson.toLocaleString('en-IN')}/person)` },
    { icon: '📅', label: 'Duration', text: `${days} Day${days > 1 ? 's' : ''} Trip` },
    { icon: '🧳', label: 'Travel Style', text: capitalize(travelType) },
    { icon: '🌤️', label: 'Best Season', text: seasonText === 'Year-round' ? 'Year-round' : capitalize(seasonText) },
    { icon: '👥', label: 'Travellers', text: `${travellers} Person${travellers > 1 ? 's' : ''}` },
    { icon: '🏨', label: 'Hotel Pick', text: hotels[0] || 'Budget guesthouse recommended' },
    { icon: '🍽️', label: 'Must Try', text: food.slice(0, 3).join(', ') },
    { icon: '🚗', label: 'Transport', text: transport },
    { icon: '🎯', label: 'Top Activity', text: typeData.activities[0] },
  ];

  // Render header
  document.getElementById('resultDest').textContent = dest;

  // Render result cards
  const grid = document.getElementById('resultGrid');
  grid.innerHTML = '';
  cards.forEach((c, i) => {
    const card = document.createElement('div');
    card.className = 'result-card';
    card.style.animationDelay = `${i * 0.07}s`;
    card.innerHTML = `<div class="result-card-icon">${c.icon}</div><h5>${c.label}</h5><p>${c.text}</p>`;
    grid.appendChild(card);
    setTimeout(() => card.style.opacity = '1', 50 + i * 70);
  });

  // Render itinerary
  const itList = document.getElementById('itineraryList');
  itList.innerHTML = '';
  itinerary.forEach((item, i) => {
    const row = document.createElement('div');
    row.className = 'day-item';
    row.style.animationDelay = `${i * 0.1}s`;
    row.innerHTML = `<div class="day-badge">Day ${item.day}</div><p>${item.plan}</p>`;
    itList.appendChild(row);
    setTimeout(() => row.style.opacity = '1', 100 + i * 100);
  });

  // Render tips
  const tipsList = document.getElementById('tipsList');
  tipsList.innerHTML = '';
  typeData.tips.forEach(tip => {
    const li = document.createElement('li');
    li.textContent = tip;
    tipsList.appendChild(li);
  });

  // Show result section
  const resultSection = document.getElementById('resultSection');
  resultSection.style.display = 'block';
  setTimeout(() => resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);

  // Also fill budget calculator
  const hotelEstimate = tier === 'luxury' ? 12000 : tier === 'high' ? 5500 : tier === 'mid' ? 2500 : 900;
  document.getElementById('hotelCost').value = hotelEstimate;
  document.getElementById('foodCost').value = tier === 'luxury' ? 2000 : tier === 'high' ? 1200 : 800;
  document.getElementById('transportCost').value = Math.round(budget * 0.15);
  document.getElementById('actCost').value = tier === 'luxury' ? 3000 : 600;
  document.getElementById('calcDays').value = days;
  calcTotal();

  lucide.createIcons();
  showToast(`🎉 Your ${days}-day ${dest} plan is ready!`, 'success');
}

/* ===== BUDGET CALCULATOR ===== */
const BAR_COLORS = ['#1a6fff','#8b5cf6','#06d6a0','#f59e0b'];
const BAR_LABELS = ['Hotel','Food','Transport','Activities'];

function syncSlider(inputId, sliderId) {
  document.getElementById(inputId).value = document.getElementById(sliderId).value;
}

function calcTotal() {
  const hotel = parseFloat(document.getElementById('hotelCost').value) || 0;
  const food = parseFloat(document.getElementById('foodCost').value) || 0;
  const transport = parseFloat(document.getElementById('transportCost').value) || 0;
  const act = parseFloat(document.getElementById('actCost').value) || 0;
  const days = parseInt(document.getElementById('calcDays').value) || 1;

  const hotelTotal = hotel * days;
  const foodTotal = food * days;
  const actTotal = act * days;
  const total = hotelTotal + foodTotal + transport + actTotal;
  const perDay = Math.round(total / days);

  // Animate total
  animateValue('totalCost', total);
  animateValue('perDay', perDay);

  // Sync sliders
  document.getElementById('hotelSlider').value = hotel;
  document.getElementById('foodSlider').value = food;
  document.getElementById('transportSlider').value = transport;
  document.getElementById('actSlider').value = act;

  // Breakdown bars
  const values = [hotelTotal, foodTotal, transport, actTotal];
  const max = Math.max(...values, 1);
  const barsContainer = document.getElementById('breakdownBars');
  barsContainer.innerHTML = '';

  values.forEach((v, i) => {
    const pct = Math.round((v / total) * 100) || 0;
    const barRow = document.createElement('div');
    barRow.className = 'bar-row';
    barRow.innerHTML = `
      <div class="bar-label">
        <span>${BAR_LABELS[i]}</span>
        <span>₹${v.toLocaleString('en-IN')} (${pct}%)</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill" style="width:${pct}%;background:${BAR_COLORS[i]}"></div>
      </div>
    `;
    barsContainer.appendChild(barRow);
  });
}

let countTimers = {};
function animateValue(elId, target) {
  const el = document.getElementById(elId);
  if (!el) return;
  clearInterval(countTimers[elId]);
  const start = parseInt(el.textContent.replace(/,/g, '')) || 0;
  const diff = target - start;
  const steps = 30;
  let s = 0;
  countTimers[elId] = setInterval(() => {
    s++;
    const val = Math.round(start + (diff * s / steps));
    el.textContent = val.toLocaleString('en-IN');
    if (s >= steps) { el.textContent = target.toLocaleString('en-IN'); clearInterval(countTimers[elId]); }
  }, 16);
}

function applyToPlanner() {
  const total = document.getElementById('totalCost').textContent.replace(/,/g,'');
  document.getElementById('budget').value = total;
  document.getElementById('days').value = document.getElementById('calcDays').value;
  document.getElementById('planner').scrollIntoView({ behavior: 'smooth' });
  showToast('💰 Budget applied to planner!', 'success');
}

/* ===== FEATURES ===== */
const FEATURES = [
  { icon: '🤖', label: 'AI Recommendations', text: 'Get hyper-personalized destination and activity suggestions powered by intelligent travel logic.', color: '#1a6fff' },
  { icon: '💸', label: 'Budget Optimization', text: 'Our system analyzes your budget and finds the best value options for stays, food & transport.', color: '#8b5cf6' },
  { icon: '🗓️', label: 'Smart Itinerary', text: 'Day-by-day plans crafted around your travel style — adventure, romantic, family, or budget.', color: '#06d6a0' },
  { icon: '📍', label: 'Nearby Attractions', text: 'Discover hidden gems, off-the-beaten-path spots, and local favourites near your destination.', color: '#f59e0b' },
  { icon: '🏨', label: 'Hotel Suggestions', text: 'Curated hotel, resort & hostel picks across all budget tiers with real pricing ranges.', color: '#ef4444' },
  { icon: '🌤️', label: 'Weather Insights', text: 'Season-smart recommendations to help you pick the best time to visit any destination.', color: '#38bdf8' }
];

function initFeatures() {
  const grid = document.getElementById('featuresGrid');
  FEATURES.forEach((f, i) => {
    const card = document.createElement('div');
    card.className = 'feature-card reveal';
    card.style.animationDelay = `${i * 0.1}s`;
    card.innerHTML = `
      <div class="feat-icon" style="background:${f.color}22;border:1px solid ${f.color}33">${f.icon}</div>
      <h4>${f.label}</h4>
      <p>${f.text}</p>
    `;
    grid.appendChild(card);
  });
}

/* ===== TESTIMONIALS ===== */
const TESTIMONIALS = [
  { name: 'Priya Sharma', loc: 'Mumbai', stars: 5, initials: 'PS', color: '#1a6fff',
    quote: 'TRAVIX planned my Goa trip in 30 seconds flat! The budget breakdown was spot-on and I saved over ₹4,000 by following their tips. Absolutely love this tool!' },
  { name: 'Arjun Mehta', loc: 'Bangalore', stars: 5, initials: 'AM', color: '#8b5cf6',
    quote: 'As a solo traveller, finding safe and affordable options is tough. TRAVIX gave me a detailed itinerary with hostel picks for Manali that fit my ₹15K budget perfectly.' },
  { name: 'Sneha Reddy', loc: 'Hyderabad', stars: 5, initials: 'SR', color: '#06d6a0',
    quote: 'Planned our family trip to Kerala using TRAVIX and everyone loved it. The day-by-day plan was super helpful and we had zero last-minute chaos. Highly recommended!' },
  { name: 'Rahul Gupta', loc: 'Delhi', stars: 5, initials: 'RG', color: '#f59e0b',
    quote: 'The budget calculator alone is worth it. I could see exactly where my money was going and optimize it. Went to Jaipur with a crystal-clear plan and had a blast!' },
  { name: 'Meera Nair', loc: 'Chennai', stars: 5, initials: 'MN', color: '#ef4444',
    quote: 'Our honeymoon to Bali was magical, and TRAVIX helped us plan every romantic detail within budget. The romantic travel type suggestions were incredibly thoughtful.' }
];

let currentTestimonial = 0;
let testimonialTimer;

function initTestimonials() {
  const track = document.getElementById('testimonialsTrack');
  const dotsContainer = document.getElementById('sliderDots');

  TESTIMONIALS.forEach((t, i) => {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.innerHTML = `
      <div class="tcard-inner">
        <div class="tcard-stars">${'★'.repeat(t.stars)}</div>
        <p class="tcard-quote">"${t.quote}"</p>
        <div class="tcard-user">
          <div class="tcard-avatar" style="background:${t.color}33;color:${t.color};border:2px solid ${t.color}44">${t.initials}</div>
          <div>
            <div class="tcard-name">${t.name}</div>
            <div class="tcard-loc">📍 ${t.loc}</div>
          </div>
        </div>
      </div>
    `;
    track.appendChild(card);

    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goToTestimonial(i);
    dotsContainer.appendChild(dot);
  });

  startTestimonialAuto();
}

function goToTestimonial(index) {
  currentTestimonial = (index + TESTIMONIALS.length) % TESTIMONIALS.length;
  document.getElementById('testimonialsTrack').style.transform = `translateX(-${currentTestimonial * 100}%)`;
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === currentTestimonial));
  restartTestimonialAuto();
}

function changeTestimonial(dir) {
  goToTestimonial(currentTestimonial + dir);
}

function startTestimonialAuto() {
  testimonialTimer = setInterval(() => changeTestimonial(1), 5000);
}
function restartTestimonialAuto() {
  clearInterval(testimonialTimer);
  startTestimonialAuto();
}

/* ===== SCROLL REVEAL ===== */
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  // Observe section headers
  document.querySelectorAll('.section-label, .section-title, .section-sub, .feature-card, .dest-card, .glass-card, .result-section').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

/* ===== SCROLL TO TOP ===== */
function initScrollTop() {
  // Handled by navbar scroll listener
}

/* ===== CHATBOT ===== */
const CHAT_RESPONSES = {
  goa: 'Goa is great for beach lovers! 🏖️ Best time: November to February. Budget range: ₹8,000–₹25,000. Try the fish curry and explore the night markets!',
  manali: 'Manali is perfect for adventure seekers! 🏔️ Best time: December–February for snow. Budget: ₹10,000–₹30,000. Don\'t miss Rohtang Pass!',
  bali: 'Bali is a tropical paradise! 🌺 Best time: April–October. Budget from India: ₹50,000–₹1,20,000. Nasi Goreng is a must-try!',
  budget: 'For budget travel in India, aim for ₹800–1,200/night on stays, ₹300–500/day on food, and use state transport buses. Hostels are great for solo travellers!',
  solo: 'Solo travel tips: 📍 Stay in hostels to meet people, use apps like Maps.me offline, share your itinerary with family, and book day tours to explore safely.',
  family: 'Family travel tip: Book accommodations with kitchenettes to save on food. Visit wildlife sanctuaries and heritage sites — kids love them! Plan 2 rest days per week.',
  romantic: 'For a romantic trip, consider Kerala backwaters 🌴 or Udaipur\'s lake palaces! Book couple spa packages and sunset cruises for magical experiences.',
  visa: 'For international trips from India, Dubai offers visa on arrival, Bali requires e-visa (easy online process), and most Southeast Asian countries are very visa-friendly!',
  weather: 'Checking weather before booking is crucial! 🌤️ Use our season filter in the planner to get season-specific recommendations for your chosen destination.',
  default: 'Great question! 🤖 I\'m TRAVIX AI. Try asking me about specific destinations like "Goa", "Bali", "Manali", or topics like "budget tips", "solo travel", "romantic getaway"!'
};

function toggleChat() {
  const win = document.getElementById('chatWindow');
  win.classList.toggle('open');
}

function sendChat() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;

  addChatMsg(msg, 'user');
  input.value = '';

  // Simulate typing delay
  setTimeout(() => {
    const lower = msg.toLowerCase();
    let response = CHAT_RESPONSES.default;
    for (const [key, val] of Object.entries(CHAT_RESPONSES)) {
      if (lower.includes(key)) { response = val; break; }
    }
    addChatMsg(response, 'bot');
  }, 700);
}

function addChatMsg(text, role) {
  const container = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  div.textContent = text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

/* ===== TOAST NOTIFICATION ===== */
function showToast(msg, type = 'info') {
  // Remove existing
  document.querySelectorAll('.toast').forEach(t => t.remove());

  const toast = document.createElement('div');
  const colors = { success: '#06d6a0', warn: '#f59e0b', info: '#1a6fff' };
  toast.className = 'toast';
  toast.style.cssText = `
    position:fixed; bottom:7rem; left:50%; transform:translateX(-50%);
    background:#0d1425; border:1px solid ${colors[type] || colors.info};
    color:white; padding:0.75rem 1.5rem; border-radius:100px;
    font-family:'DM Sans',sans-serif; font-size:0.88rem;
    z-index:9999; white-space:nowrap;
    box-shadow:0 8px 30px rgba(0,0,0,0.5);
    animation:toastIn 0.4s ease;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);

  // Add CSS for animation if not present
  if (!document.getElementById('toastStyle')) {
    const style = document.createElement('style');
    style.id = 'toastStyle';
    style.textContent = '@keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}';
    document.head.appendChild(style);
  }

  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.4s'; setTimeout(() => toast.remove(), 400); }, 3200);
}

/* ===== UTILS ===== */
function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

function scrollTo(selector) {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
}

// CSS for spin animation (used in loader btn)
const spinStyle = document.createElement('style');
spinStyle.textContent = '.spin{animation:spin 1s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}';
document.head.appendChild(spinStyle);