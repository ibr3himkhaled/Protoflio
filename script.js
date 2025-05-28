document.addEventListener('DOMContentLoaded', function() {
  // Initialize Particles.js
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#00f0ff" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: { 
        enable: true, 
        distance: 150, 
        color: "#00f0ff", 
        opacity: 0.4, 
        width: 1 
      },
      move: { 
        enable: true, 
        speed: 2, 
        direction: "none", 
        random: true 
      }
    }
  });

  // Update Year
  document.getElementById('year').textContent = new Date().getFullYear();
  
  // Update Last Modified Date
  document.getElementById('lastUpdated').textContent = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const notifSound = document.getElementById('notifSound');
  
  function updateThemeIcon() {
    themeToggle.innerHTML = document.body.classList.contains('light-mode') ? 
      '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
  }
  
  themeToggle.addEventListener('click', () => {
    notifSound.play();
    themeToggle.classList.add('animate');
    
    document.body.classList.toggle('light-mode');
    updateThemeIcon();
    
    // Save preference
    localStorage.setItem('themePreference', 
      document.body.classList.contains('light-mode') ? 'light' : 'dark');
    
    themeToggle.addEventListener('animationend', () => {
      themeToggle.classList.remove('animate');
    }, { once: true });
  });
  
  // Load saved theme
  const savedTheme = localStorage.getItem('themePreference');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
  }
  updateThemeIcon();
  
  // Animate Skills on Scroll
  const skillBars = document.querySelectorAll('.skill-progress');
  const animateSkillBars = () => {
    skillBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });
  };
  
  const skillsSection = document.querySelector('.skills-container');
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateSkillBars();
      observer.unobserve(skillsSection);
    }
  }, { threshold: 0.5 });
  
  if (skillsSection) {
    observer.observe(skillsSection);
  }
  
  // Hover Effects
  const cards = document.querySelectorAll('.section, .project-card, .cert-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
});