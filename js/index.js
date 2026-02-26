// Index Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Animate geometric shapes
  const shapes = document.querySelectorAll('.shape');
  shapes.forEach((shape, index) => {
    animateShape(shape, index);
  });

  function animateShape(shape, index) {
    const duration = 10000 + (index * 2000);
    const delay = index * 500;
    
    setTimeout(() => {
      setInterval(() => {
        const randomX = Math.random() * 200 - 100;
        const randomY = Math.random() * 200 - 100;
        const randomRotate = Math.random() * 360;
        const randomScale = 0.5 + Math.random() * 1.5;
        
        shape.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg) scale(${randomScale})`;
      }, duration);
    }, delay);
  }

  // Animate energy waves
  const waves = document.querySelectorAll('.wave');
  waves.forEach((wave, index) => {
    animateWave(wave, index);
  });

  function animateWave(wave, index) {
    const duration = 3000 + (index * 1000);
    const delay = index * 300;
    
    setTimeout(() => {
      setInterval(() => {
        const scale = 1 + Math.sin(Date.now() / duration) * 0.3;
        const opacity = 0.3 + Math.sin(Date.now() / duration) * 0.2;
        
        wave.style.transform = `scale(${scale})`;
        wave.style.opacity = opacity;
      }, 50);
    }, delay);
  }

  // Animate hero stats on scroll
  const stats = document.querySelectorAll('.stat-number');
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStat(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  stats.forEach(stat => {
    statsObserver.observe(stat);
  });

function animateStat(statElement) {
  const finalText = statElement.textContent;

  const hasPlus = finalText.includes('+');
  const hasPercent = finalText.includes('%');
  const hasSlash = finalText.includes('/');

  // SPECIAL CASE: 24/7
  if (hasSlash) {
    const parts = finalText.split('/');
    const finalNumber = parseInt(parts[0]);
    const suffix = '/' + parts[1];

    let currentNumber = 0;
    const increment = finalNumber / 40;

    const timer = setInterval(() => {
      currentNumber += increment;

      if (currentNumber >= finalNumber) {
        currentNumber = finalNumber;
        clearInterval(timer);
      }

      statElement.textContent = Math.floor(currentNumber) + suffix;
    }, 30);

    return; // stop here so normal logic doesn't run
  }

  // NORMAL CASE (10K+, 98%)
  let finalNumber = parseInt(finalText.replace(/[^\d]/g, ''));
  let currentNumber = 0;
  const increment = finalNumber / 50;

  const timer = setInterval(() => {
    currentNumber += increment;

    if (currentNumber >= finalNumber) {
      currentNumber = finalNumber;
      clearInterval(timer);
    }

    let displayText = Math.floor(currentNumber).toString();

    if (hasPlus) displayText += '+';
    if (hasPercent) displayText += '%';

    statElement.textContent = displayText;
  }, 30);
}

  // Animate feature cards on scroll
  const featureCards = document.querySelectorAll('.feature-card');
  const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        featureObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    featureObserver.observe(card);
  });

  // Animate process steps
  const processSteps = document.querySelectorAll('.process-step');
  const processObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, index * 200);
        processObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  processSteps.forEach(step => {
    processObserver.observe(step);
  });

  // Coach rings animation
  const rings = document.querySelectorAll('.ring');
  rings.forEach((ring, index) => {
    animateRing(ring, index);
  });

  function animateRing(ring, index) {
    const duration = 2000 + (index * 500);
    const delay = index * 200;
    
    setTimeout(() => {
      setInterval(() => {
        const scale = 1 + Math.sin(Date.now() / duration) * 0.2;
        const opacity = 0.3 + Math.sin(Date.now() / duration + index) * 0.3;
        
        ring.style.transform = `scale(${scale})`;
        ring.style.opacity = opacity;
      }, 50);
    }, delay);
  }

  // Testimonial cards animation
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const testimonialObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }, index * 150);
        testimonialObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  testimonialCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px) scale(0.9)';
    card.style.transition = 'all 0.6s ease';
    testimonialObserver.observe(card);
  });

  // Parallax effect for hero background
  const heroHeader = document.querySelector('.hero-header');
  const heroBackground = document.querySelector('.hero-background');
  
  if (heroHeader && heroBackground) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;
      
      heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      heroHeader.style.transform = `translateY(${scrolled * 0.3}px)`;
    });
  }

  // Button hover effects
  const primaryBtn = document.querySelector('.primary-btn');
  const secondaryBtn = document.querySelector('.secondary-btn');
  
  if (primaryBtn) {
    primaryBtn.addEventListener('mouseenter', () => {
      createButtonRipple(primaryBtn);
    });
  }
  
  if (secondaryBtn) {
    secondaryBtn.addEventListener('mouseenter', () => {
      createButtonRipple(secondaryBtn);
    });
  }

  function createButtonRipple(button) {
    const ripple = document.createElement('div');
    ripple.className = 'btn-ripple';
    button.appendChild(ripple);
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = Math.random() * rect.width - size / 2;
    const y = Math.random() * rect.height - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
