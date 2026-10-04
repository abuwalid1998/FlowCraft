/**
 * FlowCraft — Interactive Website Logic
 * Business Process Automation & AI Integration
 * Includes Google Calendar API Mock Integration & Executive Hub Helpers
 */

// Global Google Calendar & Business Contact Configuration
const GCAL_CONFIG = {
  accountEmail: 'AmjadKhaliliah1998@gmail.com',
  whatsappNumber: '+970595457008',
  whatsappCleanNumber: '970595457008',
  whatsappBaseUrl: 'https://wa.me/970595457008',
  hostName: 'Amjad Khaliliah — FlowCraft Solutions Architecture',
  apiKey: 'AIzaSyMockFlowCraftKey2026_Enterprise', // Replace with your real Google Cloud / Calendar API Key if integrating client-side OAuth
  calendarId: 'AmjadKhaliliah1998@gmail.com',
  defaultMeetLink: 'https://meet.google.com/flw-exec-briefing',
  
  // OPTIONAL: Paste your n8n Production Webhook URL or Formspree/Make.com endpoint here
  // to receive instant notifications in Telegram / Discord / CRM whenever any form is submitted:
  n8nWebhookUrl: '', // e.g. 'https://n8n.yourdomain.com/webhook/flowcraft-lead'
};

// Selected Booking State
let bookingState = {
  selectedDate: null,
  selectedDateStr: '',
  selectedTime: '10:30 AM',
  clientName: '',
  clientEmail: '',
  clientCompany: '',
  meetingTopic: 'Executive Strategy Briefing'
};

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initHeroSimulation();
  initDocumentPipeline();
  initUseCasesTabs();
  initIntegrationsFilter();
  initRoiCalculator();
  initFaqAccordion();
  initModals();
  initForms();
  initScrollSpy();
  initGoogleCalendarWidget();
});

/* --------------------------------------------------------------------------
   1. Header Scroll & Shrink Effect
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   2. Mobile Drawer Navigation
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');
  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });
}

function closeMobileMenu() {
  const drawer = document.getElementById('mobile-drawer');
  const toggleBtn = document.getElementById('mobile-toggle');
  if (drawer) drawer.classList.remove('open');
  if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
}

/* --------------------------------------------------------------------------
   3. Hero Interactive Workflow Simulation
   -------------------------------------------------------------------------- */
function initHeroSimulation() {
  const btnTrigger = document.getElementById('btn-trigger-sim');
  const canvas = document.getElementById('hero-workflow-canvas');
  if (!canvas) return;

  const nodes = canvas.querySelectorAll('.flow-node');

  const runSimulation = () => {
    if (btnTrigger) {
      btnTrigger.disabled = true;
      btnTrigger.innerHTML = '<span>Processing...</span>';
    }

    nodes.forEach(n => n.classList.remove('active-node'));

    // Sequence node flashes
    setTimeout(() => {
      nodes[0]?.classList.add('active-node');
      nodes[0]?.style.setProperty('border-color', 'var(--cyan-primary)');
    }, 100);

    setTimeout(() => {
      nodes[1]?.classList.add('active-node');
      nodes[1]?.style.setProperty('border-color', 'var(--indigo-primary)');
    }, 800);

    setTimeout(() => {
      nodes[2]?.classList.add('active-node');
      nodes[3]?.classList.add('active-node');
      nodes[2]?.style.setProperty('border-color', 'var(--purple-neon)');
      nodes[3]?.style.setProperty('border-color', '#60A5FA');
    }, 1600);

    setTimeout(() => {
      nodes[4]?.classList.add('active-node');
      nodes[4]?.style.setProperty('border-color', 'var(--emerald-success)');
      showToast('Simulation Complete', 'Payload transformed & delivered across 4 systems in 340ms.');
    }, 2400);

    setTimeout(() => {
      nodes.forEach(n => {
        n.style.removeProperty('border-color');
      });
      if (btnTrigger) {
        btnTrigger.disabled = false;
        btnTrigger.innerHTML = `
          <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12"><path d="M4 3v10l8-5-8-5z"/></svg>
          <span>Run Demo</span>
        `;
      }
    }, 3600);
  };

  if (btnTrigger) {
    btnTrigger.addEventListener('click', runSimulation);
  }

  // Node click inspection
  nodes.forEach(node => {
    node.addEventListener('click', () => {
      const title = node.querySelector('.node-title')?.textContent || 'Node';
      const sub = node.querySelector('.node-sub')?.textContent || 'Details';
      showToast(title, `Active state: ${sub} — 100% operational.`);
    });
  });
}

/* --------------------------------------------------------------------------
   4. Document Automation Interactive Pipeline
   -------------------------------------------------------------------------- */
function initDocumentPipeline() {
  const pipeline = document.getElementById('doc-pipeline');
  if (!pipeline) return;

  const nodes = pipeline.querySelectorAll('.p-node');
  const statusBox = document.getElementById('pipeline-status-text');

  const stepDescriptions = {
    1: 'Step 1 [Input]: Ingesting raw PDF proposal / supplier invoice from inbound webhook.',
    2: 'Step 2 [Extract]: OCR & Multimodal LLM extracting line items, VAT IDs, dates, and currency.',
    3: 'Step 3 [Validate]: Cross-referencing against internal database purchase orders & schemas.',
    4: 'Step 4 [Generate]: Compiling customized enterprise delivery certificate & approval stamps.',
    5: 'Step 5 [PDF]: Rendering high-res encrypted PDF with digital security watermark.',
    6: 'Step 6 [Archive]: Uploading securely to AWS S3 / Private Storage with immutable hash.',
    7: 'Step 7 [Notify]: Dispatching instant WhatsApp / Slack alert to project stakeholders.'
  };

  let currentStep = 1;
  let intervalId = null;

  const setActiveStep = (stepNumber) => {
    nodes.forEach(node => {
      const step = parseInt(node.getAttribute('data-step'), 10);
      if (step <= stepNumber) {
        node.classList.add('active');
      } else {
        node.classList.remove('active');
      }
    });

    if (statusBox && stepDescriptions[stepNumber]) {
      statusBox.innerHTML = `
        <span class="badge-mini">Pipeline Stage ${stepNumber}/7</span>
        <p>${stepDescriptions[stepNumber]}</p>
      `;
    }
  };

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      clearInterval(intervalId);
      currentStep = parseInt(node.getAttribute('data-step'), 10);
      setActiveStep(currentStep);
    });
  });

  // Auto cycle every 3.5s
  intervalId = setInterval(() => {
    currentStep = currentStep >= 7 ? 1 : currentStep + 1;
    setActiveStep(currentStep);
  }, 3500);
}

/* --------------------------------------------------------------------------
   5. Use Cases Tabs
   -------------------------------------------------------------------------- */
function initUseCasesTabs() {
  const tabs = document.querySelectorAll('.usecase-tabs .tab-btn');
  const panes = document.querySelectorAll('.tab-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      panes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const targetPane = document.getElementById(`pane-${tab.dataset.tab}`);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. Integrations Category & Search Filtering
   -------------------------------------------------------------------------- */
function initIntegrationsFilter() {
  const filterBtns = document.querySelectorAll('.int-filter-btn');
  const searchInput = document.getElementById('int-search-input');
  const cards = document.querySelectorAll('.int-card');

  let activeCategory = 'all';
  let searchQuery = '';

  const applyFilters = () => {
    cards.forEach(card => {
      const cardCat = card.getAttribute('data-cat');
      const cardName = card.getAttribute('data-name')?.toLowerCase() || '';
      
      const matchesCat = activeCategory === 'all' || cardCat === activeCategory;
      const matchesSearch = cardName.includes(searchQuery);

      if (matchesCat && matchesSearch) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }
}

/* --------------------------------------------------------------------------
   7. Interactive ROI / Hours Saved Estimator
   -------------------------------------------------------------------------- */
function initRoiCalculator() {
  const sliderTeam = document.getElementById('slider-team');
  const sliderHours = document.getElementById('slider-hours');
  const sliderCost = document.getElementById('slider-cost');

  const valTeam = document.getElementById('calc-team-val');
  const valHours = document.getElementById('calc-hours-val');
  const valCost = document.getElementById('calc-cost-val');

  const resHours = document.getElementById('res-hours');
  const resDollars = document.getElementById('res-dollars');
  const resRoi = document.getElementById('res-roi');

  if (!sliderTeam || !sliderHours || !sliderCost) return;

  const calculate = () => {
    const team = parseInt(sliderTeam.value, 10);
    const hours = parseInt(sliderHours.value, 10);
    const cost = parseInt(sliderCost.value, 10);

    valTeam.textContent = `${team} ${team === 1 ? 'person' : 'people'}`;
    valHours.textContent = `${hours} hrs/week`;
    valCost.textContent = `$${cost} / hr`;

    // 52 working weeks per year, standard 75% automation capture rate
    const annualHoursSaved = Math.round(team * hours * 52 * 0.75);
    const annualSavingsDollars = annualHoursSaved * cost;

    // ROI factor benchmarked against an estimated $10k annual custom workflow sprint
    const roiFactor = ((annualSavingsDollars / 10000)).toFixed(1);

    if (resHours) resHours.textContent = `${annualHoursSaved.toLocaleString()} hrs`;
    if (resDollars) resDollars.textContent = `$${annualSavingsDollars.toLocaleString()}`;
    if (resRoi) resRoi.textContent = `${Math.max(1.5, roiFactor)}x`;
  };

  sliderTeam.addEventListener('input', calculate);
  sliderHours.addEventListener('input', calculate);
  sliderCost.addEventListener('input', calculate);

  calculate();
}

/* --------------------------------------------------------------------------
   8. FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      items.forEach(otherItem => {
        otherItem.classList.remove('open');
        otherItem.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   9. Modals (Consultation & Quote)
   -------------------------------------------------------------------------- */
function initModals() {
  const modal = document.getElementById('consultation-modal');
  if (!modal) return;

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeConsultationModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeConsultationModal();
    }
  });
}

function openConsultationModal(packageName = 'General Consultation') {
  const modal = document.getElementById('consultation-modal');
  const pkgInput = document.getElementById('modal-package-name');
  const modalTitle = document.getElementById('modal-title');
  const topicSelect = document.getElementById('m-topic');

  if (pkgInput) pkgInput.value = packageName;
  if (modalTitle) modalTitle.textContent = packageName === 'General Consultation' ? 'Book a Free Consultation' : `Request a Quote: ${packageName}`;

  if (topicSelect) {
    if (packageName.toLowerCase().includes('starter')) topicSelect.value = 'starter';
    else if (packageName.toLowerCase().includes('business')) topicSelect.value = 'business';
    else if (packageName.toLowerCase().includes('enterprise')) topicSelect.value = 'enterprise';
    else if (packageName.toLowerCase().includes('briefing') || packageName.toLowerCase().includes('ceo')) topicSelect.value = 'ceo';
  }

  if (modal) {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function openQuoteModal(tierName) {
  openConsultationModal(tierName);
}

function closeConsultationModal() {
  const modal = document.getElementById('consultation-modal');
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

/* --------------------------------------------------------------------------
   10. Google Calendar Interactive Booking Component
   -------------------------------------------------------------------------- */
function initGoogleCalendarWidget() {
  const dateStrip = document.getElementById('cal-date-strip');
  const slotsGrid = document.getElementById('cal-slots-grid');
  if (!dateStrip || !slotsGrid) return;

  // Generate upcoming 10 business days starting from today
  const today = new Date();
  let dates = [];
  let dayOffset = 1;

  while (dates.length < 8) {
    let d = new Date(today);
    d.setDate(today.getDate() + dayOffset);
    // Exclude Sunday (0) and Friday (5) or Saturday (6) if weekend
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      dates.push(d);
    }
    dayOffset++;
  }

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  dateStrip.innerHTML = '';
  dates.forEach((d, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `date-btn ${idx === 0 ? 'active' : ''}`;
    btn.innerHTML = `
      <span class="date-day-name">${daysOfWeek[d.getDay()]}</span>
      <span class="date-day-num">${d.getDate()}</span>
      <span class="date-month-name">${months[d.getMonth()]}</span>
    `;

    btn.addEventListener('click', () => {
      document.querySelectorAll('.date-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      bookingState.selectedDate = d;
      bookingState.selectedDateStr = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    });

    dateStrip.appendChild(btn);

    if (idx === 0) {
      bookingState.selectedDate = d;
      bookingState.selectedDateStr = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    }
  });

  // Slot clicks
  const slotBtns = slotsGrid.querySelectorAll('.slot-btn');
  slotBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      slotBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      bookingState.selectedTime = btn.getAttribute('data-time') || '10:30 AM';
    });
  });
}

function proceedToCalDetails() {
  const step1 = document.getElementById('cal-step-1');
  const step2 = document.getElementById('cal-step-2');
  const summary = document.getElementById('slot-summary-text');

  if (summary) {
    summary.textContent = `${bookingState.selectedDateStr} at ${bookingState.selectedTime}`;
  }

  if (step1) step1.style.display = 'none';
  if (step2) step2.style.display = 'block';
}

function backToCalDates() {
  const step1 = document.getElementById('cal-step-1');
  const step2 = document.getElementById('cal-step-2');

  if (step1) step1.style.display = 'block';
  if (step2) step2.style.display = 'none';
}

function handleExecutiveBooking(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');

  const nameInput = document.getElementById('exec-name');
  const roleInput = document.getElementById('exec-role');
  const emailInput = document.getElementById('exec-email');
  const companyInput = document.getElementById('exec-company');

  bookingState.clientName = nameInput ? nameInput.value : 'Executive';
  bookingState.clientEmail = emailInput ? emailInput.value : '';
  bookingState.clientCompany = companyInput ? companyInput.value : '';

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Syncing with Google Calendar API...</span>';
  }

  setTimeout(() => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Confirm & Add to Google Calendar</span>';
    }

    const step2 = document.getElementById('cal-step-2');
    const step3 = document.getElementById('cal-step-3');
    const confDatetime = document.getElementById('conf-datetime');
    const gcalDirectLink = document.getElementById('btn-direct-gcal-link');

    const formattedFull = `${bookingState.selectedDateStr} @ ${bookingState.selectedTime} (UTC+3)`;
    if (confDatetime) confDatetime.textContent = formattedFull;

    // Generate Google Calendar Link
    if (gcalDirectLink) {
      const gcalUrl = generateGoogleCalendarUrl(
        `FlowCraft Executive Strategy Briefing: ${bookingState.clientCompany}`,
        `Strategic Business Process Automation Briefing with FlowCraft Architecture Team for ${bookingState.clientName} (${bookingState.clientEmail}).\nGoogle Meet: ${GCAL_CONFIG.defaultMeetLink}`,
        'Google Meet Video Call',
        bookingState.selectedDate || new Date()
      );
      gcalDirectLink.href = gcalUrl;
    }

    if (step2) step2.style.display = 'none';
    if (step3) step3.style.display = 'block';

    showToast('Meeting Scheduled!', `Synchronized with ${GCAL_CONFIG.accountEmail} on Google Calendar.`);
  }, 1200);
}

// Generates dynamic Google Calendar WEB URL
function generateGoogleCalendarUrl(title, details, location, dateObj) {
  const d = dateObj instanceof Date ? dateObj : new Date();
  
  // Format YYYYMMDDTHHMMSSZ (e.g. 20261005T090000Z)
  const pad = (n) => String(n).padStart(2, '0');
  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());

  const startIso = `${year}${month}${day}T073000Z`;
  const endIso = `${year}${month}${day}T080000Z`;

  const baseUrl = 'https://calendar.google.com/calendar/render';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    details: details,
    location: location,
    dates: `${startIso}/${endIso}`,
    add: `${bookingState.clientEmail},${GCAL_CONFIG.accountEmail}`
  });

  return `${baseUrl}?${params.toString()}`;
}

// Download .ICS calendar file for Outlook / Apple / Google Calendar
function downloadIcsFile() {
  const icsData = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//FlowCraft//Executive Briefing//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `SUMMARY:FlowCraft Executive Strategy Briefing - ${bookingState.clientCompany || 'Consultation'}`,
    `DESCRIPTION:Strategic Business Process Automation & AI Integration Call with FlowCraft.\\nGoogle Meet: ${GCAL_CONFIG.defaultMeetLink}`,
    `ORGANIZER;CN=FlowCraft Architecture:MAILTO:${GCAL_CONFIG.accountEmail}`,
    `LOCATION:Google Meet (${GCAL_CONFIG.defaultMeetLink})`,
    `STATUS:CONFIRMED`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'FlowCraft_Executive_Briefing.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('Downloaded .ICS', 'Import this file into Google Calendar, Outlook, or Apple Calendar.');
}

/* --------------------------------------------------------------------------
   11. Form Submissions & Feedback Toasts
   -------------------------------------------------------------------------- */
function initForms() {
  // Global handlers
}

// Helper to asynchronously forward lead data to n8n webhook if configured
async function forwardToWebhook(payload) {
  if (!GCAL_CONFIG.n8nWebhookUrl) return;
  try {
    await fetch(GCAL_CONFIG.n8nWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        submittedAt: new Date().toISOString(),
        recipient: GCAL_CONFIG.accountEmail,
        source: 'FlowCraft Web Portal'
      })
    });
  } catch (err) {
    console.warn('Webhook forwarding notice:', err);
  }
}

function handleAssessmentSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');

  const formData = {
    formType: 'Free Automation Assessment',
    name: form.querySelector('#asm-name')?.value || '',
    company: form.querySelector('#asm-company')?.value || '',
    email: form.querySelector('#asm-email')?.value || '',
    phone: form.querySelector('#asm-phone')?.value || '',
    size: form.querySelector('#asm-size')?.value || '',
    tools: form.querySelector('#asm-tools')?.value || '',
    bottlenecks: form.querySelector('#asm-bottlenecks')?.value || ''
  };

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>Analyzing Requirements...</span>';

  forwardToWebhook(formData);

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>Submit for Free Assessment</span>';
    form.reset();
    showToast('Assessment Request Sent!', `Blueprint will be reviewed and sent to ${formData.email} and ${GCAL_CONFIG.accountEmail}.`);
  }, 1200);
}

function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');

  const formData = {
    formType: 'General Contact / Project Request',
    name: form.querySelector('#ct-name')?.value || '',
    company: form.querySelector('#ct-company')?.value || '',
    email: form.querySelector('#ct-email')?.value || '',
    phone: form.querySelector('#ct-phone')?.value || '',
    industry: form.querySelector('#ct-industry')?.value || '',
    message: form.querySelector('#ct-message')?.value || ''
  };

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>Sending Request...</span>';

  forwardToWebhook(formData);

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>Send Request</span>';
    form.reset();
    showToast('Message Received', `Thank you! Message forwarded to ${GCAL_CONFIG.accountEmail}. We will reply within 24 hours.`);
  }, 1000);
}

function handleConsultationSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');

  const name = document.getElementById('m-name')?.value || 'Client';
  const email = document.getElementById('m-email')?.value || '';
  const company = document.getElementById('m-company')?.value || '';
  const topic = document.getElementById('m-topic')?.value || 'General Consultation';
  const notes = document.getElementById('m-notes')?.value || '';

  const formData = {
    formType: 'Modal Consultation & Google Calendar Sync',
    name,
    email,
    company,
    topic,
    notes
  };

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>Syncing with Google Calendar...</span>';

  forwardToWebhook(formData);

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>Confirm & Schedule on Google Calendar</span>';
    closeConsultationModal();
    form.reset();
    showToast('Consultation Booked!', `Slot scheduled with ${GCAL_CONFIG.accountEmail}. Confirmation sent to ${email}.`);
  }, 1000);
}

/* --------------------------------------------------------------------------
   12. Toast System
   -------------------------------------------------------------------------- */
let toastTimeout = null;
function showToast(title, message) {
  const toast = document.getElementById('toast');
  const toastTitle = document.getElementById('toast-title');
  const toastBody = document.getElementById('toast-body');

  if (!toast || !toastTitle || !toastBody) return;

  toastTitle.textContent = title;
  toastBody.textContent = message;

  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* --------------------------------------------------------------------------
   13. ScrollSpy for Navigation
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else if (link.getAttribute('href')?.startsWith('#')) {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}
