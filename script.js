document.addEventListener('DOMContentLoaded', () => {
  
  // --- 1. BARRE DE PROGRESSION DE SCROLL & STYLE HEADER ---
  const scrollProgress = document.getElementById('scroll-progress');
  const header = document.getElementById('main-header');
  
  window.addEventListener('scroll', () => {
    // Calcul de la progression du défilement
    const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;
    
    if (scrollProgress) {
      scrollProgress.style.width = scrolled + '%';
    }
    
    // Header compact lors du scroll
    if (header) {
      if (windowScroll > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  // --- 2. MENU MOBILE TOGGLE ---
  const menuToggle = document.getElementById('menu-toggle');
  const navLinksContainer = document.getElementById('nav-links');
  
  if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
    
    // Fermer le menu mobile quand on clique sur un lien
    const links = navLinksContainer.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }

  // --- 3. SCROLL SPY (HIGHLIGHT ACTIVE LINK ON SCROLL) ---
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  function scrollSpy() {
    let currentSectionId = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140; // Décale pour tenir compte du header
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', scrollSpy);

  // --- 4. FRISES CHRONOLOGIQUES DE LA ROUTINE (ONGLETS) ---
  const timelineControls = document.getElementById('timeline-controls');
  const timelineContentCard = document.getElementById('timeline-content-card');
  
  if (timelineControls && timelineContentCard) {
    const buttons = timelineControls.querySelectorAll('.timeline-btn');
    const phases = timelineContentCard.querySelectorAll('.phase-detail');
    
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const phaseId = button.getAttribute('data-phase');
        
        // Active le bouton
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Active la phase
        phases.forEach((phase, index) => {
          if (index === parseInt(phaseId) - 1) {
            phase.classList.add('active');
          } else {
            phase.classList.remove('active');
          }
        });
      });
    });
  }

  // --- 5. DEMO INTERACTIVE DES METHODES D'ALGEBRE ---
  const methodSelector = document.getElementById('method-selector');
  const methodResultDisplay = document.getElementById('method-result-display');
  
  if (methodSelector && methodResultDisplay) {
    const methodBtns = methodSelector.querySelectorAll('.method-btn');
    const steps = methodResultDisplay.querySelectorAll('.method-step');
    
    methodBtns.forEach(button => {
      button.addEventListener('click', () => {
        const methodType = button.getAttribute('data-method');
        
        // Active le bouton cliqué
        methodBtns.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Affiche l'étape correspondante
        steps.forEach(step => {
          if (step.getAttribute('id') === `step-${methodType}`) {
            step.classList.add('active');
          } else {
            step.classList.remove('active');
          }
        });
      });
    });
  }


});
