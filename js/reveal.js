// Reveal Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Animate mystical particles
  const particles = document.querySelectorAll('.particle');
  particles.forEach((particle, index) => {
    animateParticle(particle, index);
  });

  function animateParticle(particle, index) {
    const duration = 8000 + (index * 2000);
    const delay = index * 300;
    
    setTimeout(() => {
      setInterval(() => {
        const randomX = Math.random() * 300 - 150;
        const randomY = Math.random() * 300 - 150;
        const randomScale = 0.5 + Math.random() * 1.5;
        const randomOpacity = 0.3 + Math.random() * 0.7;
        
        particle.style.transform = `translate(${randomX}px, ${randomY}px) scale(${randomScale})`;
        particle.style.opacity = randomOpacity;
      }, duration);
    }, delay);
  }

  // Animate energy field rings
  const fieldRings = document.querySelectorAll('.field-ring');
  fieldRings.forEach((ring, index) => {
    animateFieldRing(ring, index);
  });

  function animateFieldRing(ring, index) {
    const duration = 4000 + (index * 1000);
    const delay = index * 200;
    
    setTimeout(() => {
      setInterval(() => {
        const scale = 1 + Math.sin(Date.now() / duration) * 0.3;
        const opacity = 0.2 + Math.sin(Date.now() / duration + index) * 0.3;
        
        ring.style.transform = `scale(${scale})`;
        ring.style.opacity = opacity;
      }, 50);
    }, delay);
  }

  // Mystery box animations
  const mysteryBox = document.querySelector('.mystery-box');
  const boxLid = document.querySelector('.box-lid');
  const lidGlow = document.querySelector('.lid-glow');
  
  if (mysteryBox && boxLid) {
    // Initial hover effect
    mysteryBox.addEventListener('mouseenter', () => {
      boxLid.style.transform = 'rotateX(-15deg) translateY(-5px)';
      lidGlow.style.opacity = '1';
    });
    
    mysteryBox.addEventListener('mouseleave', () => {
      boxLid.style.transform = 'rotateX(0deg) translateY(0)';
      lidGlow.style.opacity = '0.5';
    });

    // Box floating animation
    setInterval(() => {
      const floatY = Math.sin(Date.now() / 3000) * 10;
      mysteryBox.style.transform = `translateY(${floatY}px)`;
    }, 50);
  }

  // Item reveal animations on scroll
  const itemReveals = document.querySelectorAll('.item-reveal');
  const itemObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('reveal-animate');
        }, index * 200);
        itemObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  itemReveals.forEach(item => {
    itemObserver.observe(item);
  });

  // Kit features animation
  const kitFeatures = document.querySelectorAll('.kit-feature');
  const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('feature-animate');
          // Animate progress bar
          const barFill = entry.target.querySelector('.bar-fill');
          if (barFill) {
            const width = barFill.style.width;
            barFill.style.width = '0';
            setTimeout(() => {
              barFill.style.width = width;
            }, 100);
          }
        }, index * 150);
        featureObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  kitFeatures.forEach(feature => {
    featureObserver.observe(feature);
  });

  // Flow timeline animation
  const flowSteps = document.querySelectorAll('.flow-step');
  const flowObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('flow-animate');
        }, index * 200);
        flowObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  flowSteps.forEach(step => {
    flowObserver.observe(step);
  });

  // Testimonial carousel
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  let currentSlide = 0;

  function showSlide(index) {
    testimonialSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
  }

  // Auto-rotate testimonials
  setInterval(nextSlide, 5000);

  // Button hover effects
  const primaryBtn = document.querySelector('.primary-reveal-btn');
  const secondaryBtn = document.querySelector('.secondary-reveal-btn');
  
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

  // Preview button functionality
  const previewBtn = document.querySelector('.secondary-reveal-btn');
  if (previewBtn) {
    previewBtn.addEventListener('click', () => {
      // Reveal items with animation
      itemReveals.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('preview-reveal');
        }, index * 100);
      });
      
      // Change button text
      const btnText = previewBtn.querySelector('.btn-text');
      const btnIcon = previewBtn.querySelector('.btn-icon');
      btnText.textContent = 'Items Revealed';
      btnIcon.textContent = '✨';
      
      // Disable button after click
      previewBtn.disabled = true;
      previewBtn.style.opacity = '0.7';
    });
  }

  // Parallax effect for header
  const revealHeader = document.querySelector('.reveal-header');
  const headerBackground = document.querySelector('.header-background');
  
  if (revealHeader && headerBackground) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.6;
      
      headerBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      revealHeader.style.transform = `translateY(${scrolled * 0.3}px)`;
    });
  }

  // Mystery box glow pulse
  if (lidGlow) {
    setInterval(() => {
      const intensity = 0.5 + Math.sin(Date.now() / 2000) * 0.5;
      lidGlow.style.opacity = intensity;
    }, 50);
  }

  // Circle glow animations
  const circleGlows = document.querySelectorAll('.circle-glow');
  circleGlows.forEach((glow, index) => {
    const duration = 2000 + (index * 500);
    setInterval(() => {
      const scale = 1 + Math.sin(Date.now() / duration) * 0.3;
      const opacity = 0.4 + Math.sin(Date.now() / duration) * 0.3;
      glow.style.transform = `scale(${scale})`;
      glow.style.opacity = opacity;
    }, 50);
  });
});
