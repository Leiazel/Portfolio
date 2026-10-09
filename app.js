document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     1. Navigation and Mobile Menu
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navLinksList = document.querySelectorAll('.nav-link');
  let lastScrollY = window.scrollY;

  // Hiding navbar on scroll down, showing on scroll up
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scroll-up');
    } else {
      navbar.classList.remove('scroll-up');
    }

    if (window.scrollY > lastScrollY && window.scrollY > 150) {
      navbar.classList.add('scroll-down');
    } else {
      navbar.classList.remove('scroll-down');
    }
    lastScrollY = window.scrollY;
    
    highlightNavOnScroll();
  });

  // Mobile Menu Toggle
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.className = 'fa-solid fa-xmark';
    } else {
      icon.className = 'fa-solid fa-bars';
    }
  });

  // Close Mobile Menu on Link Click
  navLinksList.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.querySelector('i').className = 'fa-solid fa-bars';
    });
  });

  // Highlight Nav Links on Scroll
  function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < (section.offsetTop + section.offsetHeight)) {
        navLinksList.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${section.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  /* ==========================================================================
     2. Interactive Terminal Simulator
     ========================================================================== */
  const terminal = document.getElementById('terminal');
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');

  // Focus terminal input on click anywhere inside the terminal
  terminal.addEventListener('click', () => {
    terminalInput.focus();
  });

  // Command History
  let commandHistory = [];
  let historyIndex = -1;

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const inputVal = terminalInput.value.trim();
      processCommand(inputVal);
      if (inputVal) {
        commandHistory.push(inputVal);
        historyIndex = commandHistory.length;
      }
      terminalInput.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
    }
  });

  function processCommand(cmd) {
    const cleanCmd = cmd.toLowerCase().trim();
    
    // Create element for old prompt & command
    const commandLine = document.createElement('div');
    commandLine.className = 'terminal-line';
    commandLine.innerHTML = `<span class="t-prompt">damian@pc:~$</span> <span class="t-command">${escapeHtml(cmd)}</span>`;
    
    // Insert before the input line
    const activeLine = document.querySelector('.active-line');
    terminalBody.insertBefore(commandLine, activeLine);

    // Command Router
    if (cleanCmd === '') {
      // Just press Enter
    } else if (cleanCmd === 'help') {
      printOutput(`Comandos disponibles:<br>
  &nbsp;&nbsp;<span class="text-cyan">about</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Perfil profesional de Damián.<br>
  &nbsp;&nbsp;<span class="text-cyan">projects</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Lista de proyectos con enlaces directos.<br>
  &nbsp;&nbsp;<span class="text-cyan">skills</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Análisis de tecnologías, cloud y metodologías.<br>
  &nbsp;&nbsp;<span class="text-cyan">certificados</span>&nbsp;- Certificaciones oficiales y credenciales verificables.<br>
  &nbsp;&nbsp;<span class="text-cyan">education</span>&nbsp;&nbsp;&nbsp;&nbsp;- Trayectoria académica y formación continua.<br>
  &nbsp;&nbsp;<span class="text-cyan">contact</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Información de contacto (mail, cel, redes).<br>
  &nbsp;&nbsp;<span class="text-cyan">cv</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Descarga del CV actualizado 2026 en PDF.<br>
  &nbsp;&nbsp;<span class="text-cyan">clear</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Limpia la pantalla de la terminal.`);
    } else if (cleanCmd === 'about') {
      printOutput(`Damián Ezequiel Fernández - Estudiante de Licenciatura en Informática (UNLP).<br>
Perfil proactivo y analítico orientado a desarrollo backend, arquitectura modular y gestión de proyectos (Project Management &amp; Scrum).<br>
Experiencia práctica en Python, Java, APIs REST, servicios Cloud en AWS y análisis de datos, integrando IA Generativa (Gemini) en flujos técnicos y de gestión.<br>
📍 Ubicación: Ensenada, Buenos Aires, Argentina.`);
    } else if (cleanCmd === 'projects') {
      printOutput(`Proyectos destacados:<br><br>
  <span class="text-green font-mono">1. Mini-Football [Godot Engine, GDScript]</span><br>
  &nbsp;&nbsp;Videojuego completo de fútbol 2D con control fluido, modular y físicas.<br>
  &nbsp;&nbsp;Repo: <a href="https://github.com/Leiazel/Mini-Football" target="_blank" class="text-cyan underline">github.com/Leiazel/Mini-Football</a><br><br>
  <span class="text-green font-mono">2. Bob el Alquilador [Python, REST APIs, Scrum]</span><br>
  &nbsp;&nbsp;Backend académico basado en patrones de diseño y OOP en Python.<br>
  &nbsp;&nbsp;Repo: <a href="https://github.com/juani48/IS2-BEA" target="_blank" class="text-cyan underline">github.com/juani48/IS2-BEA</a><br><br>
  <span class="text-green font-mono">3. SICURA [React 19, TypeScript, Node.js, Express, MySQL]</span><br>
  &nbsp;&nbsp;Monorepo e-commerce de seguridad privada y productos ADT.<br>
  &nbsp;&nbsp;Repo: <a href="https://github.com/franpa13/sicura" target="_blank" class="text-cyan underline">github.com/franpa13/sicura</a><br><br>
  <span class="text-green font-mono">4. ComfyChair [React, TypeScript, Tailwind CSS, Shadcn/ui] (En curso)</span><br>
  &nbsp;&nbsp;Proyecto académico en grupos (MAPAW - UNLP). Módulo asignado: Tareas de Administración (Admin/Chair), conferencias, sesiones, usuarios y corte de aceptación.<br>
  &nbsp;&nbsp;Repo: <a href="https://github.com/MAPAW-UNLP/comfy-chair-2026" target="_blank" class="text-cyan underline">github.com/MAPAW-UNLP/comfy-chair-2026</a><br><br>
  <span class="text-green font-mono">5. Tienda DELB [HTML5, CSS3, JS, Bootstrap 5]</span><br>
  &nbsp;&nbsp;Catálogo web interactivo y pedidos para el programa Full Stack CILSA.<br>
  &nbsp;&nbsp;Repo: <a href="https://github.com/ludmirz/tienda-curso-Full-Stack" target="_blank" class="text-cyan underline">github.com/ludmirz/tienda-curso-Full-Stack</a>`);
    } else if (cleanCmd === 'skills') {
      printOutput(`Fichero de competencias técnicas cargado:<br>
  &nbsp;&nbsp;- <span class="text-cyan">Lenguajes:</span> Python, Java, SQL, JavaScript, HTML5, CSS3, GDScript, Pascal<br>
  &nbsp;&nbsp;- <span class="text-cyan">Cloud &amp; Datos:</span> AWS Cloud &amp; Serverless, REST APIs, Flask, Pandas, SQLite<br>
  &nbsp;&nbsp;- <span class="text-cyan">Gestión &amp; Ágil:</span> Project Management (Fundación YPF), Scrum, IA Generativa (Gemini)<br>
  &nbsp;&nbsp;- <span class="text-cyan">Herramientas:</span> Git, GitHub, GitLab, Postman, Godot Engine<br>
  &nbsp;&nbsp;- <span class="text-cyan">Idiomas:</span> Español (Nativo), Inglés (B1 - Intermedio / Técnico)`);
    } else if (cleanCmd === 'certificados' || cleanCmd === 'certs' || cleanCmd === 'certificaciones') {
      printOutput(`Certificaciones técnicas oficiales y verificables:<br><br>
  <span class="text-yellow font-mono">1. Fundamentos de AWS: Cloud, Serverless y Operación</span><br>
  &nbsp;&nbsp;Emisor: Commit Academy | Titular: Damián Ezequiel Fernández<br>
  &nbsp;&nbsp;Credencial ID: <span class="font-mono text-cyan">cert_y9aBrU6p8h</span><br>
  &nbsp;&nbsp;Verificación: <a href="https://www.commitacademy.io/app/verify-certificate/cert_y9aBrU6p8h" target="_blank" class="text-cyan underline">Verificar en Commit Academy</a><br><br>
  <span class="text-magenta font-mono">2. Inmersión Inteligencia Artificial en la Práctica</span><br>
  &nbsp;&nbsp;Emisor: Daxus Latam (8 hs) | Titular: Damián Ezequiel Fernández<br>
  &nbsp;&nbsp;Fecha: Octubre 2026<br><br>
  <span class="text-cyan font-mono">3. Domina la IA con Gemini</span><br>
  &nbsp;&nbsp;Emisor: Santander Open Academy &amp; Google Gemini<br>
  &nbsp;&nbsp;Serial ID: <span class="font-mono text-cyan">OA-2026-0913003188378</span> (Septiembre 2026)<br><br>
  <span class="text-yellow font-mono">4. Liderazgo</span><br>
  &nbsp;&nbsp;Emisor: Santander Open Academy | Titular: Damián Ezequiel Fernández<br>
  &nbsp;&nbsp;Serial ID: <span class="font-mono text-cyan">OA-2026-1008003302801</span> (Octubre 2026 | 8.0 hs)`);
    } else if (cleanCmd === 'education' || cleanCmd === 'formacion') {
      printOutput(`Trayectoria académica y formación continua:<br>
  &nbsp;&nbsp;◈ <span class="text-cyan">Licenciatura en Informática</span> — UNLP (2018 – Actualidad)<br>
  &nbsp;&nbsp;◈ <span class="text-cyan">Project Management</span> — Fundación YPF (Ago 2026 – Sep 2026)<br>
  &nbsp;&nbsp;◈ <span class="text-cyan">Análisis de Datos con Python</span> — Fundación CILSA (Jul 2026 – Sep 2026)<br>
  &nbsp;&nbsp;◈ <span class="text-cyan">Desarrollo Web Full Stack</span> — Fundación CILSA (Ago 2026 – Actualidad)`);
    } else if (cleanCmd === 'contact') {
      printOutput(`Información de contacto oficial:<br>
  &nbsp;&nbsp;- <span class="text-cyan">Correo:</span> <a href="mailto:Fz.damian99@gmail.com" class="text-cyan">Fz.damian99@gmail.com</a><br>
  &nbsp;&nbsp;- <span class="text-cyan">Celular:</span> <a href="tel:+542214358177" class="text-cyan">+54 221 4358177</a><br>
  &nbsp;&nbsp;- <span class="text-cyan">LinkedIn:</span> <a href="https://www.linkedin.com/in/fz-damian99" target="_blank" class="text-cyan">linkedin.com/in/fz-damian99</a><br>
  &nbsp;&nbsp;- <span class="text-cyan">GitHub:</span> <a href="https://github.com/Leiazel" target="_blank" class="text-cyan">github.com/Leiazel</a>`);
    } else if (cleanCmd === 'cv') {
      printOutput(`<span class="text-green">Iniciando descarga de CV actualizado en formato PDF...</span>`);
      // Trigger download
      const link = document.createElement('a');
      link.href = 'CV%20-%20Fernandez,%20Damian%20Ezequiel%202026.pdf';
      link.download = 'CV - Fernandez, Damian Ezequiel 2026.pdf';
      link.click();
    } else if (cleanCmd === 'clear') {
      clearTerminal();
      return;
    } else {
      printOutput(`<span class="text-magenta">bash: comando no encontrado: ${escapeHtml(cleanCmd)}.</span> Escribe <span class="text-cyan">'help'</span> para ver los comandos de consola disponibles.`);
    }

    // Scroll terminal to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function printOutput(outputHtml) {
    const outputLine = document.createElement('div');
    outputLine.className = 'terminal-line';
    outputLine.innerHTML = `<span class="t-output">${outputHtml}</span>`;
    
    const activeLine = document.querySelector('.active-line');
    terminalBody.insertBefore(outputLine, activeLine);
  }

  function clearTerminal() {
    // Keep only active line
    const activeLine = document.querySelector('.active-line');
    terminalBody.innerHTML = '';
    terminalBody.appendChild(activeLine);
    
    printOutput(`<span class="t-output font-mute">[SYSTEM] Terminal limpia. Escribe 'help' para obtener ayuda.</span>`);
    terminalBody.scrollTop = 0;
  }

  function escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
  }

  /* ==========================================================================
     3. Programmer Contact Form Simulation
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status-output');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    const subject = `Nuevo mensaje de contacto de ${name} (Portfolio)`;
    const body = `Nombre: ${name}\nEmail: ${email}\n\n${message}`;

    formStatus.className = 'form-status-output font-mono';
    formStatus.style.display = 'block';
    formStatus.classList.remove('success', 'error');
    formStatus.innerHTML = '&gt; Transmitiendo mensaje al servidor...';

    const isGitHubPages = window.location.hostname.includes('github.io');
    const isFileProtocol = window.location.protocol === 'file:';

    let delivered = false;
    let feedbackMsg = '';

    // 1. Try local Python Flask backend or Vercel serverless /api/contact if not on static GitHub Pages
    if (!isGitHubPages && !isFileProtocol) {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ subject, body })
        });

        if (response.ok) {
          const text = await response.text();
          let result = {};
          try { result = JSON.parse(text); } catch (err) { result = { message: text }; }
          delivered = true;
          feedbackMsg = result.message || 'Mensaje enviado exitosamente.';
        }
      } catch (err) {
        // Backend not available or 404, fallback to client-side FormSubmit below
        console.warn('Backend /api/contact no disponible, probando servicio estático...', err);
      }
    }

    // 2. If not delivered (e.g. GitHub Pages static deploy or local static), send via FormSubmit.co AJAX
    if (!delivered) {
      try {
        const fsResponse = await fetch('https://formsubmit.co/ajax/Fz.damian99@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            _subject: subject,
            message: message,
            _captcha: 'false'
          })
        });

        if (fsResponse.ok) {
          delivered = true;
          feedbackMsg = 'Mensaje transmitido y enviado a Fz.damian99@gmail.com con éxito.';
        } else {
          throw new Error('Servicio de correo externo no respondió.');
        }
      } catch (fsError) {
        // 3. Ultimate Fallback: open mailto
        window.location.href = `mailto:Fz.damian99@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        delivered = true;
        feedbackMsg = 'Abriendo tu cliente de correo (Fz.damian99@gmail.com)...';
      }
    }

    if (delivered) {
      formStatus.classList.add('success');
      formStatus.innerHTML = `&gt; ${feedbackMsg}`;
      contactForm.reset();
    } else {
      formStatus.classList.add('error');
      formStatus.innerHTML = '&gt; Error al enviar el mensaje. Puedes escribirme directamente a Fz.damian99@gmail.com';
    }
  });

  /* ==========================================================================
     4. Project Media Galleries (Carousels)
     ========================================================================== */
  const galleries = document.querySelectorAll('.project-gallery');
  
  galleries.forEach(gallery => {
    const track = gallery.querySelector('.gallery-track');
    const slides = Array.from(gallery.querySelectorAll('.gallery-slide'));
    const prevBtn = gallery.querySelector('.prev-arrow');
    const nextBtn = gallery.querySelector('.next-arrow');
    const indicatorsContainer = gallery.querySelector('.gallery-indicators');
    
    // Only set up carousel if there are multiple slides
    if (slides.length <= 1) {
      return; // Leave controls hidden
    }
    
    // Show arrows
    prevBtn.classList.add('visible');
    nextBtn.classList.add('visible');
    
    // Setup indicators
    indicatorsContainer.innerHTML = '';
    slides.forEach((_, index) => {
      const indicator = document.createElement('span');
      indicator.className = `indicator visible ${index === 0 ? 'active' : ''}`;
      indicator.setAttribute('data-index', index);
      indicatorsContainer.appendChild(indicator);
    });
    
    const indicators = Array.from(indicatorsContainer.querySelectorAll('.indicator'));
    let currentSlideIndex = 0;
    
    const updateGallery = (newIndex) => {
      // Pause any video playing in the active slide
      const currentActiveSlide = slides[currentSlideIndex];
      const video = currentActiveSlide.querySelector('video');
      if (video) {
        video.pause();
      }
      
      // Update slide index
      currentSlideIndex = newIndex;
      if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
      } else if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
      }
      
      // Set active classes
      slides.forEach((slide, idx) => {
        if (idx === currentSlideIndex) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
      
      indicators.forEach((indicator, idx) => {
        if (idx === currentSlideIndex) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
    };
    
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateGallery(currentSlideIndex - 1);
    });
    
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateGallery(currentSlideIndex + 1);
    });
    
    indicatorsContainer.addEventListener('click', (e) => {
      const clickedIndicator = e.target.closest('.indicator');
      if (!clickedIndicator) return;
      e.stopPropagation();
      const targetIndex = parseInt(clickedIndicator.getAttribute('data-index'), 10);
      updateGallery(targetIndex);
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    gallery.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    gallery.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeDistance = touchEndX - touchStartX;
      if (swipeDistance > 45) {
        updateGallery(currentSlideIndex - 1);
      } else if (swipeDistance < -45) {
        updateGallery(currentSlideIndex + 1);
      }
    }, { passive: true });
  });

  /* ==========================================================================
     5. Lightbox — Image Zoom Viewer
     ========================================================================== */
  const lightboxOverlay = document.getElementById('lightbox-overlay');
  const lightboxImg     = document.getElementById('lightbox-img');
  const lightboxClose   = document.getElementById('lightbox-close');
  const lightboxPrev    = document.getElementById('lightbox-prev');
  const lightboxNext    = document.getElementById('lightbox-next');
  const lightboxCounter = document.getElementById('lightbox-counter');

  let lbImages = [];   // array of { src, alt } for the current gallery
  let lbIndex  = 0;    // current position in lbImages

  function openLightbox(images, startIndex) {
    lbImages = images;
    lbIndex  = startIndex;
    renderLightbox();
    lightboxOverlay.classList.add('active');
    // Prevent background scroll while lightbox is open
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightboxOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function renderLightbox() {
    const item = lbImages[lbIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    lightboxCounter.textContent = `${lbIndex + 1} / ${lbImages.length}`;

    // Show/hide arrows
    if (lbImages.length <= 1) {
      lightboxPrev.classList.add('hidden');
      lightboxNext.classList.add('hidden');
    } else {
      lightboxPrev.classList.remove('hidden');
      lightboxNext.classList.remove('hidden');
    }
  }

  function lbNavigate(dir) {
    lbIndex = (lbIndex + dir + lbImages.length) % lbImages.length;
    // Fade-swap the image
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      renderLightbox();
      lightboxImg.style.opacity = '1';
    }, 160);
  }

  // Attach click listener to every gallery image
  document.querySelectorAll('.project-gallery').forEach(gallery => {
    gallery.addEventListener('click', (e) => {
      const clickedMedia = e.target.closest('.project-media');
      if (!clickedMedia || clickedMedia.tagName === 'VIDEO') return;

      // Build image list from this gallery's slides
      const allSlides = Array.from(gallery.querySelectorAll('.gallery-slide'));
      const images = allSlides
        .map(slide => {
          const img = slide.querySelector('img.project-media');
          return img ? { src: img.src, alt: img.alt } : null;
        })
        .filter(Boolean);

      // Find which image was clicked
      const clickedSlide = clickedMedia.closest('.gallery-slide');
      const clickedImgSrc = clickedMedia.src;
      const startIndex = images.findIndex(img => img.src === clickedImgSrc);

      openLightbox(images, startIndex >= 0 ? startIndex : 0);
    });
  });

  // Attach click listeners to certificate previews and view buttons
  const certElements = Array.from(document.querySelectorAll('.cert-card'));
  const certImages = certElements.map(card => {
    const img = card.querySelector('.cert-preview-trigger');
    if (!img) return null;
    return {
      src: img.getAttribute('data-full') || img.src,
      alt: img.getAttribute('data-title') || img.alt || 'Certificado Oficial'
    };
  }).filter(Boolean);

  certElements.forEach((card, index) => {
    const triggerBox = card.querySelector('.cert-preview-box');
    const viewBtn = card.querySelector('.cert-view-action');

    const handleOpen = (e) => {
      e.preventDefault();
      e.stopPropagation();
      openLightbox(certImages, index);
    };

    if (triggerBox) triggerBox.addEventListener('click', handleOpen);
    if (viewBtn) viewBtn.addEventListener('click', handleOpen);
  });

  // Controls
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click',  (e) => { e.stopPropagation(); lbNavigate(-1); });
  lightboxNext.addEventListener('click',  (e) => { e.stopPropagation(); lbNavigate(1);  });

  // Click outside the image to close
  lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) closeLightbox();
  });

  // Keyboard: Escape = close, ArrowLeft/Right = navigate
  document.addEventListener('keydown', (e) => {
    if (!lightboxOverlay.classList.contains('active')) return;
    if (e.key === 'Escape')      { closeLightbox();    }
    if (e.key === 'ArrowLeft')   { lbNavigate(-1);     }
    if (e.key === 'ArrowRight')  { lbNavigate(1);      }
  });

  // Touch swipe support for lightbox modal on mobile
  let lbTouchStartX = 0;
  let lbTouchStartY = 0;
  let lbTouchEndX = 0;
  let lbTouchEndY = 0;

  lightboxOverlay.addEventListener('touchstart', (e) => {
    lbTouchStartX = e.changedTouches[0].screenX;
    lbTouchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  lightboxOverlay.addEventListener('touchend', (e) => {
    lbTouchEndX = e.changedTouches[0].screenX;
    lbTouchEndY = e.changedTouches[0].screenY;
    const diffX = lbTouchEndX - lbTouchStartX;
    const diffY = lbTouchEndY - lbTouchStartY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        lbNavigate(-1);
      } else {
        lbNavigate(1);
      }
    } else if (diffY > 90) {
      closeLightbox();
    }
  }, { passive: true });

});

