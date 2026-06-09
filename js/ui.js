// Centralized Document Node Selector Cache Object
const DOM = {
    step1: document.getElementById('step-1'),
    step2: document.getElementById('step-2'),
    step3: document.getElementById('step-3'),
    step4: document.getElementById('step-4'),

    // Target fields map
    inputs: {
        fullName: document.getElementById('fullName'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        address: document.getElementById('address'),
        city: document.getElementById('city'),
        zip: document.getElementById('zip'),
        cardNumber: document.getElementById('cardNumber'),
        cardExpiry: document.getElementById('cardExpiry'),
        cardCvv: document.getElementById('cardCvv')
    },

    // Progress bar informational nodes
    trackers: [
        document.getElementById('track-step-1'),
        document.getElementById('track-step-2'),
        document.getElementById('track-step-3'),
        document.getElementById('track-step-4')
    ],

    // Confirmation output objects
    reviewContact: document.getElementById('review-contact'),
    reviewShipping: document.getElementById('review-shipping'),
    reviewPayment: document.getElementById('review-payment'),

    form: document.getElementById('checkoutForm'),
    submitBtn: document.getElementById('submitBtn'),
    statusModal: document.getElementById('statusModal'),
    statusIcon: document.getElementById('statusIcon'),
    statusTitle: document.getElementById('statusTitle'),
    statusMessage: document.getElementById('statusMessage')
};

function switchSections(hideSection, showSection) {
    hideSection.classList.add('hidden');
    hideSection.classList.remove('active');

    showSection.classList.remove('hidden');
    showSection.classList.add('active');
}

export const UI = {
    // Passive Indicator Controller Subroutine logic
    updateTracker(activeStepNum) {
        DOM.trackers.forEach((trackNode, index) => {
            if (index < activeStepNum) {
                trackNode.classList.add('active');
            } else {
                trackNode.classList.remove('active');
            }
        });
    },

    // Forward Navigation Triggers
    goToStep2() {
        switchSections(DOM.step1, DOM.step2);
        this.updateTracker(2);
    },
    goToStep3() {
        switchSections(DOM.step2, DOM.step3);
        this.updateTracker(3);
    },
    goToStep4() {
        this.compileReviewData();
        switchSections(DOM.step3, DOM.step4);
        this.updateTracker(4);
    },

    // Backward Navigation Triggers
    goBackToStep1() {
        switchSections(DOM.step2, DOM.step1);
        this.updateTracker(1);
    },
    goBackToStep2() {
        switchSections(DOM.step3, DOM.step2);
        this.updateTracker(2);
    },
    goBackToStep3() {
        switchSections(DOM.step4, DOM.step3);
        this.updateTracker(3);
    },

    getInputValue(fieldName) {
        return DOM.inputs[fieldName] ? DOM.inputs[fieldName].value : '';
    },

    displayFieldError(fieldName, errorMessage) {
        const inputField = DOM.inputs[fieldName];
        if (!inputField) return;

        const errorContainer = inputField.nextElementSibling;

        if (errorMessage) {
            inputField.classList.add('invalid');
            if (errorContainer && errorContainer.classList.contains('error-message')) {
                errorContainer.textContent = errorMessage;
            }
        } else {
            inputField.classList.remove('invalid');
            if (errorContainer && errorContainer.classList.contains('error-message')) {
                errorContainer.textContent = '';
            }
        }
    },

    compileReviewData() {
        DOM.reviewContact.innerHTML = `
            ${DOM.inputs.fullName.value}<br>
            ${DOM.inputs.email.value}<br>
            ${DOM.inputs.phone.value}
        `;
        DOM.reviewShipping.innerHTML = `
            ${DOM.inputs.address.value}<br>
            ${DOM.inputs.city.value}, ${DOM.inputs.zip.value}
        `;

        const cardVal = DOM.inputs.cardNumber.value.replace(/\s+/g, '');
        DOM.reviewPayment.textContent = `Card ending in •••• ${cardVal.slice(-4)}`;
    },

    setLoading(isLoading) {
        if (!DOM.submitBtn) return;
        DOM.submitBtn.disabled = isLoading;

        const spinner = DOM.submitBtn.querySelector('.spinner');
        const btnText = DOM.submitBtn.querySelector('.btn-text');

        if (spinner) spinner.classList.toggle('hidden', !isLoading);
        if (btnText) btnText.style.opacity = isLoading ? '0' : '1';
    },

    showStatusModal(type, title, message) {
        DOM.statusIcon.className = `icon ${type}`;
        DOM.statusTitle.textContent = title;
        DOM.statusMessage.textContent = message;
        DOM.statusModal.classList.remove('hidden');
    },

    hideStatusModal() {
        DOM.statusModal.classList.add('hidden');
    },

    resetForm() {
        DOM.form.reset();
        Object.keys(DOM.inputs).forEach(field => this.displayFieldError(field, ''));
        switchSections(DOM.step4, DOM.step1);
        this.updateTracker(1);
    }
};