document.addEventListener('DOMContentLoaded', () => {
  const contactButton = document.querySelector('.button');
  const contactForm = document.getElementById('contactForm');
  const form = document.querySelector('.form-container');

  setupContactButton(contactButton, contactForm);
  setupFormSubmission(form);
});

function setupContactButton(contactButton, contactForm) {
  if (!contactButton) {
    console.error('Contact button not found');
    return;
  }

  contactButton.addEventListener('click', (event) => {
    event.preventDefault();
    toggleFormDisplay(contactForm, true);
  });
}

function setupFormSubmission(form) {
  if (!form) {
    console.error('Form container not found');
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (validateForm(form)) {
      const formData = gatherFormData(form);
      await submitForm(formData);
    }
  });
}

function gatherFormData(form) {
  return {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    message: form.message.value.trim(),
  };
}

async function submitForm(formData) {
  try {
    const response = await fetch('https://emails.marc-maninang.workers.dev/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Form submitted successfully!');
      toggleFormDisplay(document.getElementById('contactForm'), false);
    } else {
      alert('Failed to submit form.');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Failed to submit form.');
  }
}

function toggleFormDisplay(formElement, isVisible) {
  if (formElement) {
    formElement.style.display = isVisible ? 'block' : 'none';
  } else {
    console.error('Contact form not found');
  }
}

function validateForm(form) {
  const name = form.name;
  const email = form.email;
  const message = form.message;
  let isValid = true;

  clearErrors();

  if (!validateField(name, 'Name is required')) isValid = false;
  if (!validateEmailField(email)) isValid = false;
  if (!validateField(message, 'Message is required')) isValid = false;

  return isValid;
}

function validateField(field, errorMessage) {
  if (field.value.trim() === '') {
    showError(field, errorMessage);
    return false;
  }
  return true;
}

function validateEmailField(emailField) {
  if (!validateField(emailField, 'Email is required')) return false;
  
  if (!validateEmail(emailField.value.trim())) {
    showError(emailField, 'Invalid email format');
    return false;
  }
  
  return true;
}

function showError(input, message) {
  const error = document.createElement('div');
  error.className = 'error-message';
  error.innerText = message;
  input.parentElement.appendChild(error);
}

function clearErrors() {
  document.querySelectorAll('.error-message').forEach(error => error.remove());
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}