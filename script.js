document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll('.fade').forEach(section => observer.observe(section));

  const slides = Array.from(document.querySelectorAll('.hero__gallery .slide'));
  if (slides.length > 1) {
    let current = 0;
    setInterval(() => {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 2000);
  }

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const whatsappForm = document.getElementById('whatsapp-form');
  const whatsappStatus = document.getElementById('whatsapp-status');
  if (whatsappForm) {
    whatsappForm.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(whatsappForm);
      const name = String(data.get('name') || '').trim();
      const phone = String(data.get('phone') || '').trim();
      const message = String(data.get('message') || '').trim();

      const text = encodeURIComponent(`שם: ${name}\nטלפון: ${phone}\nהודעה: ${message}`);
      const url = `https://wa.me/972501234567?text=${text}`;
      if (whatsappStatus) whatsappStatus.textContent = 'פותחים WhatsApp...';
      window.open(url, '_blank', 'noopener');
    });
  }
});
