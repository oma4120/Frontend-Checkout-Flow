import { validateData } from './validation.js';
import { UI } from './ui.js';

let currentStep = 1;

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkoutForm');

    form.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-next')) {
            if (handleStepValidation()) {
                currentStep++;
                if (currentStep === 4) {
                    UI.compileReviewData();
                }
                UI.navigateToStep(currentStep);
            }
        } else if (e.target.classList.contains('btn-prev')) {
            currentStep--;
            UI.navigateToStep(currentStep);
        }
    });

    form.addEventListener('input', (e) => {
        if (e.target.tagName === 'INPUT') {
            if (e.target.id === 'cardNumber') UI.formatCardInput(e.target);
            if (e.target.id === 'cardExpiry') UI.formatExpiryInput(e.target);

            const fieldData = {};
            fieldData[e.target.name] = e.target.value;
            const errors = validateData(fieldData);
            UI.displayErrors(currentStep, errors);
        }
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        UI.setLoading(true);

        try {
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    Math.random() > 0.2 ? resolve() : reject();
                }, 2000);
            });

            UI.showStatusModal('success', 'Payment Successful! 🎉', 'Thank you for your order.');
            UI.resetForm();
            currentStep = 1;
            UI.navigateToStep(1);
        } catch (error) {
            UI.showStatusModal('error', 'Payment Rejected', 'There was a problem processing your card transaction. Please verify card entries.');
        } finally {
            UI.setLoading(false);
        }
    });

    document.getElementById('statusCloseBtn').addEventListener('click', () => {
        UI.hideStatusModal();
    });
});

function handleStepValidation() {
    const data = UI.getStepData(currentStep);
    const errors = validateData(data);
    return UI.displayErrors(currentStep, errors);
}