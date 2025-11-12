'use strict';

// modal variables
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

// modal function
const modalCloseFunc = function () { modal.classList.add('closed') }

// modal eventListener
modalCloseOverlay.addEventListener('click', modalCloseFunc);
modalCloseBtn.addEventListener('click', modalCloseFunc);

// registration modal variables
const registerBtn = document.getElementById('action-register');
const registerModal = document.getElementById('register-modal');
const registerCloseBtn = registerModal?.querySelector('[data-modal-close]');
const registerCloseOverlay = registerModal?.querySelector('[data-modal-overlay]');
const registerForm = document.getElementById('register-form');

// registration modal functionality
if (registerBtn && registerModal) {
  const registerModalCloseFunc = function () { 
    registerModal.classList.add('closed');
    overlay.classList.remove('active');
  }

  registerBtn.addEventListener('click', function () {
    registerModal.classList.remove('closed');
    overlay.classList.add('active');
  });

  if (registerCloseBtn) {
    registerCloseBtn.addEventListener('click', registerModalCloseFunc);
  }

  if (registerCloseOverlay) {
    registerCloseOverlay.addEventListener('click', registerModalCloseFunc);
  }
}

// registration form handling
if (registerForm) {
  registerForm.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const formProps = Object.fromEntries(formData);
    
    // Basic validation
    if (formProps.password !== formProps['confirm-password']) {
      alert('Passwords do not match!');
      return;
    }
    
    if (formProps.password.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    
    if (!formProps.terms) {
      alert('Please accept the Terms & Conditions');
      return;
    }
    
    // Here you would typically send the data to your backend
    console.log('Registration data:', {
      fullname: formProps.fullname,
      email: formProps.email,
      newsletter: formProps.newsletter === 'on'
    });
    
    // Show success message
    alert('Registration successful! Welcome to Anon.');
    
    // Close modal and reset form
    registerModal.classList.add('closed');
    overlay.classList.remove('active');
    this.reset();
  });
}

// login link functionality
const loginLink = document.getElementById('login-link');
if (loginLink) {
  loginLink.addEventListener('click', function (e) {
    e.preventDefault();
    // Close registration modal
    if (registerModal) {
      registerModal.classList.add('closed');
    }
    // Here you can add functionality to open login modal
    console.log('Switch to login - implement login modal here');
  });
}

// notification toast variables
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

// notification toast eventListener
toastCloseBtn.addEventListener('click', function () {
  notificationToast.classList.add('closed');
});

// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {

  // mobile menu function
  const mobileMenuCloseFunc = function () {
    mobileMenu[i].classList.remove('active');
    overlay.classList.remove('active');
  }

  mobileMenuOpenBtn[i].addEventListener('click', function () {
    mobileMenu[i].classList.add('active');
    overlay.classList.add('active');
  });

  mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
  overlay.addEventListener('click', mobileMenuCloseFunc);

}

// accordion variables
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

for (let i = 0; i < accordionBtn.length; i++) {

  accordionBtn[i].addEventListener('click', function () {

    const clickedBtn = this.nextElementSibling.classList.contains('active');

    for (let i = 0; i < accordion.length; i++) {

      if (clickedBtn) break;

      if (accordion[i].classList.contains('active')) {

        accordion[i].classList.remove('active');
        accordionBtn[i].classList.remove('active');

      }

    }

    this.nextElementSibling.classList.toggle('active');
    this.classList.toggle('active');

  });

}

// Enhanced overlay click handler to close all modals
overlay.addEventListener('click', function () {
  // Close all modals
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.classList.add('closed');
  });
  // Close mobile menus
  mobileMenu.forEach(menu => {
    menu.classList.remove('active');
  });
  this.classList.remove('active');
});