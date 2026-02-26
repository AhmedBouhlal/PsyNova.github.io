// Problem Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Character counter for textarea
  const problemTextarea = document.getElementById('problem');
  const charCount = document.getElementById('charCount');
  
  if (problemTextarea && charCount) {
    problemTextarea.addEventListener('input', () => {
      const count = problemTextarea.value.length;
      charCount.textContent = count;
      
      if (count > 500) {
        problemTextarea.value = problemTextarea.value.substring(0, 500);
        charCount.textContent = 500;
      }
      
      // Change color based on character count
      if (count > 450) {
        charCount.style.color = '#ff6b6b';
      } else if (count > 400) {
        charCount.style.color = '#ffd700';
      } else {
        charCount.style.color = '#00d4ff';
      }
    });
  }

  // Floating label animations
  const inputs = document.querySelectorAll('.input-wrapper input, .input-wrapper textarea');
  inputs.forEach(input => {
    // Check initial state
    if (input.value) {
      input.parentElement.classList.add('has-value');
    }
    
    // Add focus/blur events
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
      if (!input.value) {
        input.parentElement.classList.remove('has-value');
      }
    });
    
    input.addEventListener('input', () => {
      if (input.value) {
        input.parentElement.classList.add('has-value');
      } else {
        input.parentElement.classList.remove('has-value');
      }
    });
  });

  // Animate floating orbs
  const orbs = document.querySelectorAll('.orb');
  orbs.forEach((orb, index) => {
    animateOrb(orb, index);
  });

  function animateOrb(orb, index) {
    const duration = 3000 + (index * 1000);
    const delay = index * 500;
    
    setTimeout(() => {
      setInterval(() => {
        const randomX = Math.random() * 100 - 50;
        const randomY = Math.random() * 100 - 50;
        const randomScale = 0.8 + Math.random() * 0.4;
        
        orb.style.transform = `translate(${randomX}px, ${randomY}px) scale(${randomScale})`;
      }, duration);
    }, delay);
  }

  // Form submission enhancement
  const form = document.getElementById('problemForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      const submitBtn = form.querySelector('.submit-btn');
      const btnText = submitBtn.querySelector('.btn-text');
      const btnIcon = submitBtn.querySelector('.btn-icon');
      
      // Change button state during submission
      btnText.textContent = 'Analyzing...';
      btnIcon.textContent = '⚡';
      submitBtn.classList.add('submitting');
      
      // Reset after 2 seconds (simulated processing)
      setTimeout(() => {
        btnText.textContent = 'Generating Protocol...';
        btnIcon.textContent = '🎯';
      }, 2000);
    });
  }

  // Add hover effects to feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Parallax effect for header
  const header = document.querySelector('.problem-header');
  if (header) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;
      header.style.transform = `translateY(${parallax}px)`;
    });
  }
});
