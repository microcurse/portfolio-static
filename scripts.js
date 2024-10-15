document.addEventListener('DOMContentLoaded', () => {
  const contactButton = document.querySelector('.button');
  const contactForm = document.getElementById('contactForm');
  const form = document.querySelector('.form-container');
  form.addEventListener('submit', onClick);

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
      closeForm();
    } else {
      alert('Failed to submit form.');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Failed to submit form.');
  }
}

function closeForm() {
  const contactForm = document.getElementById('contactForm');
  toggleFormDisplay(contactForm, false);
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

function onClick(e) {
  e.preventDefault();
  grecaptcha.enterprise.ready(async () => {
    const token = await grecaptcha.enterprise.execute('6LfAAFkqAAAAAEXidCVBWUWlW0a0GItFKkelGnyG', {action: 'SUBMIT'});
  });
}

async function loadMyWork() {
  try {
    const RESPONSE = await fetch('myWork.json');
    const DATA = await RESPONSE.json();

    const MY_WORK_CONTAINER = document.getElementById('stuff-i-made');

    const createProjectCard = (item, type) => {
      const PROJECT_CARD = document.createElement('div');
      PROJECT_CARD.classList.add('project-card', 'card', 'pad-sm');

      PROJECT_CARD.innerHTML = `
        <div class="project-card-content">
          <img src="${item.image}" alt="${item.name} Image" class="project-image">
          <div class="project-details">
            <div class="sm-caption">${type}</div>
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <ul class="built-with flex flex-flow-rw">
              ${item.technologies.map(tech => `<li><i class="devicon-${tech.icon}-plain tech-${tech.icon}"></i> ${tech.name}</li>`).join('')}
            </ul>
            <a class="button main-btn" href="${item.url}" target="_blank" rel="noreferrer">Visit ${type}</a>
          </div>
        </div>
      `;

      MY_WORK_CONTAINER.appendChild(PROJECT_CARD);
    };

    DATA.sites.forEach(site => createProjectCard(site, 'Website'));

    DATA.projects.forEach(project => createProjectCard(project, 'Project'));

    DATA.plugins.forEach(plugin => createProjectCard(plugin, 'Plugin'));

  } catch (error) {
    console.log('Error loading JSON file:', error);
  }
}

loadMyWork();