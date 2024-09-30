document.addEventListener('DOMContentLoaded', function() {
  const contactButton = document.querySelector('.button');
  const contactForm = document.getElementById('contactForm');
  const form = document.querySelector('.form-container');

  contactButton.addEventListener('click', function(event) {
    event.preventDefault();
    contactForm.style.display = 'block';
  });

  form.addEventListener('submit', async function(event) {
    event.preventDefault();
    if (validateForm()) {
      const formData = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
      };

      try {
        const response = await fetch('https://emails.marc-maninang.workers.dev/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          alert('Form submitted successfully!');
          closeForm();
        } else {
          alert('Failed to submit form.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to submit form.');
      }
    }
  });
});

function closeForm() {
  document.getElementById('contactForm').style.display = 'none';
}

function validateForm() {
  const name = document.querySelector('input[name="name"]');
  const email = document.querySelector('input[name="email"]');
  const message = document.querySelector('textarea[name="message"]');
  let isValid = true;

  // Clear previous error messages
  clearErrors();

  if (name.value.trim() === '') {
    showError(name, 'Name is required');
    isValid = false;
  }

  if (email.value.trim() === '') {
    showError(email, 'Email is required');
    isValid = false;
  } else if (!validateEmail(email.value.trim())) {
    showError(email, 'Invalid email format');
    isValid = false;
  }

  if (message.value.trim() === '') {
    showError(message, 'Message is required');
    isValid = false;
  }

  return isValid;
}

function showError(input, message) {
  const error = document.createElement('div');
  error.className = 'error-message';
  error.innerText = message;
  input.parentElement.appendChild(error);
}

function clearErrors() {
  const errors = document.querySelectorAll('.error-message');
  errors.forEach(error => error.remove());
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}