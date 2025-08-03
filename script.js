document.addEventListener('DOMContentLoaded', () => {
  // --- Image Carousel ---
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');
  let currentIndex = 0;

  // Position slides
  slides.forEach((slide, index) => {
    slide.style.left = `${index * 100}%`;
  });

  function moveToSlide(index) {
    track.style.transform = `translateX(-${index * 100}%)`;
    document.querySelector('.carousel-slide.current-slide').classList.remove('current-slide');
    slides[index].classList.add('current-slide');
    currentIndex = index;
    updateCaption();
  }

  function updateCaption() {
    const currentImage = slides[currentIndex].querySelector('img');
    const caption = currentImage ? currentImage.alt : '';
    document.getElementById('carousel-caption').textContent = caption;
  }

  nextButton.addEventListener('click', () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    moveToSlide(nextIndex);
  });

  prevButton.addEventListener('click', () => {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    moveToSlide(prevIndex);
  });

  moveToSlide(0);

  // --- Form Validation ---
  const form = document.getElementById('contact-form');
  const confirmation = document.getElementById('form-confirmation');
  const mailtoLink = document.getElementById('mailto-link');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    let valid = true;

    // Clear errors
    [nameError, emailError, messageError].forEach(error => {
      error.textContent = '';
      error.classList.remove('show');
    });

    confirmation.classList.remove('show');

    // Validate name
    if (!name.value.trim()) {
      nameError.textContent = 'Please enter your name.';
      nameError.classList.add('show');
      valid = false;
    }

    // Validate email
    if (!email.value.trim()) {
      emailError.textContent = 'Please enter your email.';
      emailError.classList.add('show');
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
      emailError.textContent = 'Please enter a valid email address.';
      emailError.classList.add('show');
      valid = false;
    }

    // Validate message
    if (!message.value.trim()) {
      messageError.textContent = 'Please enter your message.';
      messageError.classList.add('show');
      valid = false;
    }

    // If all valid
    if (valid) {
      // Set dynamic mailto link
      const subject = encodeURIComponent("New message from portfolio");
      const body = encodeURIComponent(`Name: ${name.value}\nEmail: ${email.value}\n\n${message.value}`);
      mailtoLink.href = `mailto:averypickard@protonmail.com?subject=${subject}&body=${body}`;

      confirmation.classList.add('show');
      form.reset();

      // Hide after delay
      setTimeout(() => {
        confirmation.classList.remove('show');
      }, 6000);
    }
  });
});
