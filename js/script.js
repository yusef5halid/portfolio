/**
 * YOUSEF KHALID — AI Automation Engineer & n8n Developer Portfolio
 * Vanilla JavaScript implementation
 * Features:
 * - Dark/Light mode theme toggle with localStorage persistence
 * - Mobile navigation menu toggle & click-outside detection
 * - Active scroll spy for navigation items
 * - Subtle scroll reveal animations via IntersectionObserver
 * - Project details modal with deep dive data for all 7 projects
 * - Client-side contact form handler with WhatsApp integration
 * - Dynamic copyright year update
 */

(function () {
  'use strict';

  // --- 1. Theme Management (Dark Mode by Default) ---
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('yk_theme') || 'dark';

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('yk_theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  // Initial theme setup
  setTheme(storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  // --- 2. Mobile Navigation Toggle ---
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function closeMobileNav() {
    if (mobileNavToggle && mobileNavDrawer) {
      mobileNavToggle.classList.remove('open');
      mobileNavDrawer.classList.remove('open');
      mobileNavToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  function openMobileNav() {
    if (mobileNavToggle && mobileNavDrawer) {
      mobileNavToggle.classList.add('open');
      mobileNavDrawer.classList.add('open');
      mobileNavToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  }

  if (mobileNavToggle && mobileNavDrawer) {
    mobileNavToggle.addEventListener('click', function () {
      const isOpen = mobileNavToggle.classList.contains('open');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    mobileNavLinks.forEach(function (link) {
      link.addEventListener('click', closeMobileNav);
    });

    // Close when resizing above 768px
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768 && mobileNavDrawer.classList.contains('open')) {
        closeMobileNav();
      }
    });
  }

  // --- 3. Active Navigation Scroll Spy ---
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.pageYOffset;
    sections.forEach(function (current) {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        desktopNavLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // --- 4. Subtle Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback for older browsers
    revealElements.forEach(function (el) {
      el.classList.add('active');
    });
  }

  // --- 5. Project Details Data (All 7 Featured Projects) ---
  const projectsData = {
    '1': {
      number: 'PROJECT 01',
      title: 'Meta Ads Campaign Analysis & Reporting Automation',
      overview: 'A Telegram-based automation concept that allows media buyers to request campaign information and receive organized performance insights.',
      challenge: 'Media buyers spend valuable time logging into Ads Manager, pulling scattered metrics across multiple campaigns and ad sets, and manually compiling status updates for stakeholders.',
      solution: 'An on-demand n8n workflow integrated with Telegram Bot API and Meta Marketing API that authenticates queries, extracts performance figures, computes ROAS/CTR/CPA differentials, and formats conversational summaries.',
      capabilities: [
        'Campaign-level metrics retrieval',
        'Ad-level performance insights',
        'Campaign monitoring and comparison',
        'Conversational Telegram reports'
      ],
      workflowSteps: ['Telegram Request', 'n8n Webhook', 'Meta Ads Data', 'Metric Processing', 'Analysis', 'Telegram Response'],
      tools: ['n8n', 'Meta Marketing API', 'Telegram Bot API', 'JavaScript', 'Docker'],
      workflowImage: 'assets/images/project-01-workflow.png',
      workflowImageFallback: 'assets/images/project-01-workflow.png',
      notes: 'Independent demo / experimental project concept. Designed to demonstrate practical workflow architecture, parameter parsing, and API error resilience without requiring manual dashboard compilation.'
    },
    '2': {
      number: 'PROJECT 02',
      title: 'AI-Powered Lead Management & Follow-up Automation',
      overview: 'A multi-channel lead management workflow with AI-assisted qualification, prioritization, and automated follow-up.',
      challenge: 'Inbound leads from ad forms, landing pages, and web chat arrive unorganized with varied intent, leaving sales teams to manually score, qualify, and initiate contact with significant response lag.',
      solution: 'An automated lead processing pipeline that intercepts inbound form payloads, normalizes contact parameters, evaluates purchase fit using structured LLM classification, assigns priority tiers in Google Sheets/CRM, and triggers personalized multi-channel outreach.',
      capabilities: [
        'Multi-channel lead capture',
        'Lead data normalization',
        'AI-powered qualification',
        'Lead prioritization',
        'Automated follow-up'
      ],
      workflowSteps: ['Lead Source', 'Data Capture', 'Validation', 'AI Qualification', 'Prioritization', 'CRM / Google Sheets', 'Follow-up'],
      tools: ['n8n', 'OpenAI API', 'Google Sheets API', 'Webhooks', 'REST APIs'],
      workflowImage: 'assets/images/project-02-workflow.png',
      workflowImageFallback: 'assets/images/project-02-workflow.png',
      notes: 'Independent demo / experimental project concept. Focuses on robust schema validation, deterministic prompt scoring, and preventing lead drop-off through sub-minute dispatch.'
    },
    '3': {
      number: 'PROJECT 03',
      title: 'Instagram & Facebook Messenger Customer Support Automation',
      overview: 'An automated customer support concept for dental clinics using Instagram and Facebook Messenger.',
      challenge: 'Dental clinics experience frequent after-hours inquiries regarding treatment options, pricing, and operating times, leading to missed patient booking opportunities and high staff communication load.',
      solution: 'A conversational support automation connecting Meta Graph webhooks to an n8n processing pipeline, utilizing structured FAQ logic and conversational AI to answer dental treatment inquiries and assist appointment booking.',
      capabilities: [
        'Automated customer responses',
        'Frequently asked questions',
        'Dental services and pricing information',
        'Appointment-related conversations'
      ],
      workflowSteps: ['Incoming Message', 'Webhook', 'Message Processing', 'AI / Response Logic', 'Automated Reply'],
      tools: ['n8n', 'Meta Graph API', 'OpenAI API', 'Webhooks', 'JavaScript'],
      workflowImage: 'assets/images/project-03-workflow.png',
      workflowImageFallback: 'assets/images/project-03-workflow.png',
      notes: 'Independent demo / experimental project concept. Designed to demonstrate webhook handshake authentication, natural conversational answers, and structured appointment data collection.'
    },
    '4': {
      number: 'PROJECT 04',
      title: 'AI-Powered Gym Customer Support & Booking Automation',
      overview: 'A RAG-powered gym assistant that retrieves information from a knowledge base and supports appointment booking.',
      challenge: 'Fitness centers struggle to answer nuanced questions regarding class times, guest policies, membership tiers, and trainer schedules while maintaining a reliable calendar booking roster.',
      solution: 'A Retrieval-Augmented Generation (RAG) assistant connected to gym policy and schedule data sources (Qdrant/Pinecone/Sheets), delivering grounded answers and capturing confirmed booking details into Google Sheets.',
      capabilities: [
        'Knowledge-based customer support',
        'Membership and pricing information',
        'Gym schedules and policies',
        'Appointment data collection',
        'Google Sheets booking records'
      ],
      workflowSteps: ['Customer Message', 'Knowledge Retrieval', 'Relevant Context', 'AI Response', 'Booking Details', 'Google Sheets'],
      tools: ['n8n', 'Qdrant / Pinecone', 'OpenAI / Claude', 'Google Sheets API', 'RAG'],
      workflowImage: 'assets/images/project-04-workflow.png',
      workflowImageFallback: 'assets/images/project-04-workflow.png',
      notes: 'Independent demo / experimental project concept. Demonstrates semantic search over unstructured gym policy docs and structured data insertion for reception staff.'
    },
    '5': {
      number: 'PROJECT 05',
      title: 'AI-Powered Invoice Data Extraction & Automation',
      overview: 'An automation workflow that receives invoice images, extracts structured information, and organizes the results in Google Sheets.',
      challenge: 'Manual invoice data entry into accounting systems is slow, tedious, and prone to costly transcription errors across tax IDs, line item subtotals, and currency variations.',
      solution: 'A document intake workflow that receives uploaded invoice receipts, utilizes multimodal LLM / OCR to parse structured JSON fields (vendor, invoice number, line items, taxes, total), validates calculations, and appends rows to Google Sheets.',
      capabilities: [
        'Invoice image submission',
        'AI / OCR-based data extraction',
        'Structured field processing',
        'Data validation',
        'Google Sheets integration'
      ],
      workflowSteps: ['Bot Upload', 'Image Processing', 'Data Extraction', 'Validation', 'Google Sheets'],
      tools: ['n8n', 'OpenAI Vision / Claude', 'Google Sheets API', 'Telegram Bot', 'JavaScript'],
      workflowImage: 'assets/images/project-05-workflow.png',
      workflowImageFallback: 'assets/images/project-05-workflow.png',
      notes: 'Independent demo / experimental project concept. Highlights JSON schema enforcement, mathematical parity checks (subtotal + tax = total), and reliable sheet logging.'
    },
    '6': {
      number: 'PROJECT 06',
      title: 'AI-Powered Product Photography & Ad Creative Generation',
      overview: 'An AI-assisted creative generation workflow that transforms submitted product images into marketing-oriented visuals.',
      challenge: 'E-commerce brands and agencies need high volumes of seasonal, promotional, and studio-grade marketing visuals for product lines without ongoing studio costs and manual graphic staging.',
      solution: 'An automated image pipeline that processes raw product photos, analyzes the physical attributes, constructs contextual staging prompts (lighting, pedestal, seasonal ambiance), renders variations via generative image models, and delivers ready-to-use visuals directly to Telegram.',
      capabilities: [
        'Product image submission',
        'Creative prompt preparation',
        'AI image generation',
        'Marketing visual creation',
        'Telegram delivery'
      ],
      workflowSteps: ['Form Submission', 'Image Retrieval', 'Prompt Preparation', 'Image Generation', 'Telegram Delivery'],
      tools: ['n8n', 'Generative Vision APIs', 'Telegram Bot API', 'Cloud Storage', 'JavaScript'],
      workflowImage: 'assets/images/project-06-workflow.png',
      workflowImageFallback: 'assets/images/project-06-workflow.png',
      notes: 'Independent demo / experimental project concept. Explores automated prompt synthesis, background object isolation, and multi-format delivery workflows.'
    },
    '7': {
      number: 'PROJECT 07',
      title: 'E-commerce Order Management & Customer Support Automation',
      overview: 'An automation concept that coordinates order events, customer communication, and shipping notifications.',
      challenge: 'Disjointed communication between e-commerce stores, warehouses, and shipping carriers creates tracking blind spots and spikes inbound "Where is my order?" customer support tickets.',
      solution: 'An event-driven orchestration that listens for order status updates, validates customer shipping data, synchronizes carrier tracking identifiers, and automatically fires multi-channel transactional status updates via WhatsApp and email.',
      capabilities: [
        'Order processing',
        'Order confirmations',
        'Order status updates',
        'Shipping notifications',
        'Customer inquiry handling'
      ],
      workflowSteps: ['Order Event', 'Data Validation', 'Order Update', 'Shipping Trigger', 'Customer Notification'],
      tools: ['n8n', 'Shopify / WooCommerce Webhooks', 'Shipping APIs', 'Messaging APIs', 'Google Sheets'],
      workflowImage: 'assets/images/project-07-workflow.png',
      workflowImageFallback: 'assets/images/project-07-workflow.png',
      notes: 'Independent demo / experimental project concept. Built to test idempotent webhook consumption, carrier webhook retries, and automated proactive customer messaging.'
    }
  };

  // --- 6. Project Details Modal Logic ---
  const projectModalBackdrop = document.getElementById('project-modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  // Modal elements
  const modalNumber = document.getElementById('modal-project-number');
  const modalTitle = document.getElementById('modal-project-title');
  const modalOverview = document.getElementById('modal-project-overview');
  const modalChallenge = document.getElementById('modal-project-challenge');
  const modalSolution = document.getElementById('modal-project-solution');
  const modalCapabilities = document.getElementById('modal-project-capabilities');
  const modalWorkflowChain = document.getElementById('modal-workflow-chain');
  const modalTools = document.getElementById('modal-project-tools');
  const modalWorkflowImg = document.getElementById('modal-workflow-img');
  const modalNotes = document.getElementById('modal-project-notes');

  function openProjectModal(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    modalNumber.textContent = data.number;
    modalTitle.textContent = data.title;
    modalOverview.textContent = data.overview;
    modalChallenge.textContent = data.challenge;
    modalSolution.textContent = data.solution;
    modalNotes.textContent = data.notes;

    // Capabilities list
    modalCapabilities.innerHTML = '';
    data.capabilities.forEach(function (cap) {
      const item = document.createElement('div');
      item.className = 'modal-cap-item';
      item.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${cap}</span>
      `;
      modalCapabilities.appendChild(item);
    });

    // Workflow concept chain
    modalWorkflowChain.innerHTML = '';
    data.workflowSteps.forEach(function (step, index) {
      const node = document.createElement('span');
      node.className = 'chain-node';
      node.textContent = step;
      modalWorkflowChain.appendChild(node);

      if (index < data.workflowSteps.length - 1) {
        const arrow = document.createElement('span');
        arrow.className = 'chain-arrow';
        arrow.textContent = '→';
        modalWorkflowChain.appendChild(arrow);
      }
    });

    // Tools tags
    modalTools.innerHTML = '';
    data.tools.forEach(function (tool) {
      const tag = document.createElement('span');
      tag.className = 'tech-tag';
      tag.textContent = tool;
      modalTools.appendChild(tag);
    });

    // Workflow screenshot placeholder
    modalWorkflowImg.src = data.workflowImage;
    modalWorkflowImg.alt = data.title + ' — n8n Workflow Architecture Screenshot';

    // Show modal
    projectModalBackdrop.classList.add('active');
    projectModalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    if (modalCloseBtn) {
      modalCloseBtn.focus();
    }
  }

  function closeProjectModal() {
    if (!projectModalBackdrop) return;
    projectModalBackdrop.classList.remove('active');
    projectModalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Bind project card "View Details" buttons
  const viewDetailBtns = document.querySelectorAll('[data-project-target]');
  viewDetailBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-target');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModalBackdrop) {
    projectModalBackdrop.addEventListener('click', function (e) {
      if (e.target === projectModalBackdrop) {
        closeProjectModal();
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && projectModalBackdrop && projectModalBackdrop.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // --- 7. Contact Form Handler (Client-side with WhatsApp Integration) ---
  const contactForm = document.getElementById('portfolio-contact-form');
  const formStatus = document.getElementById('form-status');
  const whatsappSendBtn = document.getElementById('whatsapp-send-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const contactInfoInput = document.getElementById('contact-info');
      const serviceInput = document.getElementById('contact-service');
      const messageInput = document.getElementById('contact-message');

      const name = nameInput ? nameInput.value.trim() : '';
      const contactInfo = contactInfoInput ? contactInfoInput.value.trim() : '';
      const service = serviceInput ? serviceInput.value : 'General Inquiry';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !message) {
        alert('Please fill in your name and message.');
        return;
      }

      // Build prepared WhatsApp message
      const textToEncode = `Hi Yousef, I'm ${name} (${contactInfo}).\nTopic: ${service}\nMessage: ${message}`;
      const whatsappUrl = `https://wa.me/201060447869?text=${encodeURIComponent(textToEncode)}`;

      if (formStatus) {
        formStatus.innerHTML = `
          <strong>Message Prepared!</strong><br>
          This form runs client-side. Click below to send your message directly to Yousef on WhatsApp or via email.
          <div style="margin-top: 0.75rem;">
            <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="display:inline-flex;">
              Open in WhatsApp Now →
            </a>
          </div>
        `;
        formStatus.className = 'form-status success';
        formStatus.style.display = 'block';
      }

      if (whatsappSendBtn) {
        whatsappSendBtn.href = whatsappUrl;
      }
    });
  }

  // --- 8. Dynamic Copyright Year ---
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --- 9. Smooth Scroll for internal anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

})();
