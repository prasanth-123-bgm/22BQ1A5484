document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
  });

  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }

  // Enhanced Custom cursor
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      
      setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
      }, 100);
    });

    // Cursor hover effects for interactive elements
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item, .certification-card, .social-icon, .tech-tag, .interest-tag, .experience-card, .education-card');
    
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.5)';
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });
  }

  // Enhanced Role text rotation in hero section
  const roleTexts = document.querySelectorAll('.role-text');
  let currentRole = 0;

  function rotateRoles() {
    // Remove active class from all
    roleTexts.forEach(text => text.classList.remove('active'));
    
    // Add active class to current
    if (roleTexts[currentRole]) {
      roleTexts[currentRole].classList.add('active');
    }
    
    currentRole = (currentRole + 1) % roleTexts.length;
  }

  // Start the animation
  if (roleTexts.length > 0) {
    rotateRoles();
    setInterval(rotateRoles, 3000);
  }

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        
        // Add animate class for custom animations
        if (target.classList.contains('slide-in-left') || target.classList.contains('fade-in-up')) {
          target.classList.add('animate');
        }
        
        // Animate skill bars
        if (target.classList.contains('skills-container')) {
          animateSkillBars();
        }
        
        // Animate progress bars in education
        if (target.classList.contains('education-container')) {
          animateProgressBars();
        }
        
        observer.unobserve(target);
      }
    });
  }, observerOptions);

  // Observe elements for animations
  document.querySelectorAll('.slide-in-left, .fade-in-up, .skills-container, .education-container').forEach(el => {
    observer.observe(el);
  });

  // Skill bars animation
  function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach((bar, index) => {
      const skillLevel = bar.getAttribute('data-skill');
      setTimeout(() => {
        bar.style.width = skillLevel + '%';
      }, index * 200);
    });
  }

  // Progress bars animation for education
  function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach((bar, index) => {
      const currentWidth = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = currentWidth;
      }, index * 300 + 500);
    });
  }

  // Enhanced form submission with loading states
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.submit-btn');
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoader = submitBtn.querySelector('.btn-loader');
      
      // Add loading state
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with actual form handling)
      setTimeout(() => {
        // Success state
        submitBtn.classList.remove('loading');
        btnText.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #4caf50, #66bb6a)';
        
        // Reset form
        contactForm.reset();
        
        // Revert button after 3 seconds
        setTimeout(() => {
          btnText.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      }, 2000);
    });

    // Enhanced input focus effects
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
      const focusLine = input.nextElementSibling;
      
      input.addEventListener('focus', () => {
        if (focusLine && focusLine.classList.contains('input-focus')) {
          focusLine.style.width = '100%';
        }
      });
      
      input.addEventListener('blur', () => {
        if (focusLine && focusLine.classList.contains('input-focus')) {
          focusLine.style.width = '0%';
        }
      });
    });
  }

  // Skill icons hover tooltips in hero section
  const skillIcons = document.querySelectorAll('.skill-icon[data-skill]');
  
  skillIcons.forEach(icon => {
    const tooltip = document.createElement('div');
    tooltip.className = 'skill-tooltip';
    tooltip.textContent = icon.getAttribute('data-skill');
    tooltip.style.cssText = `
      position: absolute;
      bottom: -40px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--accent-primary);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s ease;
      z-index: 1000;
    `;
    
    icon.appendChild(tooltip);
    
    icon.addEventListener('mouseenter', () => {
      tooltip.style.opacity = '1';
      tooltip.style.bottom = '-50px';
    });
    
    icon.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
      tooltip.style.bottom = '-40px';
    });
  });

  // Enhanced background shapes animation on mouse move
  document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
      const speedX = (index + 1) * 0.05;
      const speedY = (index + 1) * 0.05;
      const currentTransform = shape.style.transform || '';
      
      // Only apply mouse movement if not already animated
      if (!currentTransform.includes('translate')) {
        shape.style.transform = `translate(${mouseX * 30 * speedX}px, ${mouseY * 30 * speedY}px)`;
      }
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Parallax effect for hero section
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero');
    const skillsAnimation = document.querySelector('.skills-animation');
    
    if (heroSection && skillsAnimation) {
      const rate = scrolled * -0.5;
      skillsAnimation.style.transform = `translateY(${rate}px)`;
    }
  });

  // Enhanced project card interactions
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    const overlay = card.querySelector('.project-overlay');
    const image = card.querySelector('.project-image img');
    
    card.addEventListener('mouseenter', () => {
      if (overlay) overlay.style.opacity = '1';
      if (image) image.style.transform = 'scale(1.1)';
    });
    
    card.addEventListener('mouseleave', () => {
      if (overlay) overlay.style.opacity = '0';
      if (image) image.style.transform = 'scale(1)';
    });
  });

  // Certification cards flip effect enhancement
  const certCards = document.querySelectorAll('.certification-card');
  
  certCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) rotateY(5deg)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotateY(0deg)';
    });
  });

  // Interest tags animation
  const interestTags = document.querySelectorAll('.interest-tag');
  
  interestTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
    
    tag.addEventListener('mouseenter', () => {
      tag.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', () => {
      tag.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Contact floating icons animation
  const floatingIcons = document.querySelectorAll('.floating-icon');
  
  floatingIcons.forEach((icon, index) => {
    // Random animation delays and durations for more organic movement
    const delay = Math.random() * 2;
    const duration = 4 + Math.random() * 4;
    
    icon.style.animationDelay = `${delay}s`;
    icon.style.animationDuration = `${duration}s`;
  });

  // Enhanced experience card animations
  const experienceCards = document.querySelectorAll('.experience-card');
  
  experienceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.experience-icon');
      if (icon) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('.experience-icon');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });

  // Loading animation for page
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger hero animations
    const heroElements = document.querySelectorAll('.hero-greeting, .hero-name, .hero-description, .hero-buttons');
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 200);
    });
  });

  // Performance optimization: Throttle scroll events
  let ticking = false;
  
  function updateOnScroll() {
    // Update navbar
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  });

  // Keyboard navigation support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Close mobile menu if open
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });

  // Focus management for accessibility
  const focusableElements = document.querySelectorAll('a, button, input, textarea, [tabindex]:not([tabindex="-1"])');
  
  focusableElements.forEach(el => {
    el.addEventListener('focus', () => {
      el.style.outline = '2px solid var(--accent-primary)';
      el.style.outlineOffset = '2px';
    });
    
    el.addEventListener('blur', () => {
      el.style.outline = 'none';
    });
  });

  // Console welcome message
  console.log(`
    🚀 Welcome to Prasanth Kunchanapalli's Portfolio!
    
    ✨ Features:
    • Dark theme with pink accent highlights
    • Animated skill orbits in hero section
    • AOS (Animate On Scroll) integration
    • Custom cursor interactions
    • Responsive design
    • Enhanced form handling
    
    📧 Contact: prasanthkunchanapalli2010@gmail.com
    🔗 LinkedIn: https://www.linkedin.com/in/180904-kprasanth/
    🐙 GitHub: https://github.com/prasanth-123-bgm
    
    Built with ❤️ and modern web technologies
  `);
});