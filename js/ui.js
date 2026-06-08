const DOM = {
    form: document.getElementById('checkoutForm'),
    steps: document.querySelectorAll('.form-step'),
    indicators: document.querySelectorAll('.step'),
    progressBar: document.querySelector('.progress-bar'),
    submitBtn: document.getElementById('submitBtn'),
    overlay: document.getElementById('statusOverlay'),
    statusTitle: document.getElementById('statusTitle'),
    statusMessage: document.getElementById('statusMessage'),
    statusIcon: document.getElementById('statusIcon'),
    statusCloseBtn: document.getElementById('statusCloseBtn'),
    reviewContact: document.getElementById('review-contact'),
    reviewShipping: document.getElementById('review-shipping'),
    reviewPayment: document.getElementById('review-payment')
};

export const UI = {
    getStepData(stepNumber) {
        const stepSection = document.getElementById(`step-${stepNumber}`);
        if (!stepSection) return {};
        const inputs = stepSection.querySelectorAll('input');
        const data = {};
        inputs.forEach(input => { data[input.name] = input.value; });
        return data;
    },

    displayErrors(stepNumber, errors) {
        const stepSection = document.getElementById(`step-${stepNumber}`);
        const inputs = stepSection.querySelectorAll('input');
        let isValid = true;

        inputs.forEach(input => {
            const errorElement = input.parentElement.querySelector('.error-message');
            if (errors[input.name]) {
                input.classList.add('invalid');
                if (errorElement) errorElement.textContent = errors[input.name];
                isValid = false;
            } else {
                input.classList.remove('invalid');
                if (errorElement) errorElement.textContent = '';
            }
        });
        return isValid;
    },

    navigateToStep(stepNumber) {
        DOM.steps.forEach((step, idx) => {
            step.classList.toggle('hidden', idx !== (stepNumber - 1));
        });
        DOM.indicators.forEach((indicator, idx) => {
            indicator.classList.toggle('active', idx < stepNumber);
        });
        DOM.progressBar.setAttribute('aria-valuenow', stepNumber);
    },

    compileReviewData() {
        const name = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const zip = document.getElementById('zip').value;
        const card = document.getElementById('cardNumber').value;

        DOM.reviewContact.innerHTML = `${name}<br>${email}<br>${phone}`;
        DOM.reviewShipping.innerHTML = `${address}<br>${city}, ${zip}`;
        DOM.reviewPayment.textContent = `Card ending in •••• ${card.slice(-4)}`;
    },

    setLoading(isLoading) {
        if (!DOM.submitBtn) return;

        const spinner = DOM.submitBtn.querySelector('.spinner');
        const btnText = DOM.submitBtn.querySelector('.btn-text');

        DOM.submitBtn.disabled = isLoading;

        if (spinner) spinner.classList.toggle('hidden', !isLoading);
        if (btnText) btnText.style.opacity = isLoading ? '0' : '1';
    },

    showStatusModal(type, title, message) {
        DOM.statusTitle.textContent = title;
        DOM.statusMessage.textContent = message;
        DOM.statusIcon.className = `icon ${type}`;
        DOM.overlay.classList.remove('hidden');
    },

    hideStatusModal() {
        DOM.overlay.classList.add('hidden');
    },

    formatCardInput(inputElement) {
        let value = inputElement.value.replace(/\D/g, '');
        let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
        inputElement.value = formatted.substring(0, 19);
    },

    formatExpiryInput(inputElement) {
        let value = inputElement.value.replace(/\D/g, '');
        if (value.length > 2) {
            inputElement.value = value.substring(0, 2) + '/' + value.substring(2, 4);
        } else {
            inputElement.value = value;
        }
    },

    resetForm() {
        DOM.form.reset();
    }
};