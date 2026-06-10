import { UI } from './ui.js';
import * as Check from './validation.js';

// BUTTON CLICK ROUTING ACTION INTERCEPT CONTROLLERS
document.addEventListener('click', (e) => {

    // --- STEP 1 ACTIONS ---
    if (e.target.id === 'nextToStep2') {
        const data = {
            fullName: UI.getInputValue('fullName'),
            email: UI.getInputValue('email'),
            phone: UI.getInputValue('phone')
        };
        const errors = Check.validateStep1(data);

        UI.displayFieldError('fullName', errors.fullName);
        UI.displayFieldError('email', errors.email);
        UI.displayFieldError('phone', errors.phone);

        if (Object.keys(errors).length === 0) UI.goToStep2();
    }

    // --- STEP 2 ACTIONS ---
    if (e.target.id === 'nextToStep3') {
        const data = {
            address: UI.getInputValue('address'),
            city: UI.getInputValue('city'),
            zip: UI.getInputValue('zip')
        };
        const errors = Check.validateStep2(data);

        UI.displayFieldError('address', errors.address);
        UI.displayFieldError('city', errors.city);
        UI.displayFieldError('zip', errors.zip);

        if (Object.keys(errors).length === 0) UI.goToStep3();
    }
    if (e.target.id === 'backToStep1') {
        UI.goBackToStep1();
    }

    // --- STEP 3 ACTIONS ---
    if (e.target.id === 'nextToStep4') {
        const data = {
            cardNumber: UI.getInputValue('cardNumber'),
            cardExpiry: UI.getInputValue('cardExpiry'),
            cardCvv: UI.getInputValue('cardCvv')
        };
        const errors = Check.validateStep3(data);

        UI.displayFieldError('cardNumber', errors.cardNumber);
        UI.displayFieldError('cardExpiry', errors.cardExpiry);
        UI.displayFieldError('cardCvv', errors.cardCvv);

        if (Object.keys(errors).length === 0) UI.goToStep4();
    }
    if (e.target.id === 'backToStep2') {
        UI.goBackToStep2();
    }

    // --- STEP 4 ACTIONS ---
    if (e.target.id === 'backToStep3') {
        UI.goBackToStep3();
    }

    // --- POPUP CLOSE DIALOGUE ---
    if (e.target.id === 'closeModalBtn') {
        UI.hideStatusModal();
    }
});

// LIVE MASK INPUT KEYSTROKE FORMATTING SYSTEMS & ERROR CLEARING
document.addEventListener('input', (e) => {

    // --- FULL NAME: Strictly letters and spaces ---
    if (e.target.id === 'fullName') {
        e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    }

    // --- CITY: Strictly letters and spaces ---
    if (e.target.id === 'city') {
        e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    }

    // --- EMAIL: Strictly letters, numbers, @, and . ---
    if (e.target.id === 'email') {
        e.target.value = e.target.value.replace(/[^a-zA-Z0-9.@]/g, '');
    }

    // --- ZIP / POSTAL ---
    if (e.target.id === 'zip') {
        e.target.value = e.target.value.replace(/\D/g, '');
    }

    // --- CVV ---
    if (e.target.id === 'cardCvv') {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
    }

    // --- PHONE NUMBER ---
    if (e.target.id === 'phone') {
        let value = e.target.value;
        const hadPlusAtStart = value.includes('+');
        let cleanDigits = value.replace(/\D/g, '');
        e.target.value = hadPlusAtStart ? '+' + cleanDigits.substring(0, 14) : cleanDigits.substring(0, 15);
    }

    // --- CARD NUMBER MASK ENGINE ---
    if (e.target.id === 'cardNumber') {
        let value = e.target.value.replace(/\D/g, '');
        let formatted = value.match(/.{1,4}/g);
        e.target.value = formatted ? formatted.join(' ').substring(0, 19) : value;
    }

    // --- CARD EXPIRY MASK ENGINE ---
    if (e.target.id === 'cardExpiry') {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            e.target.value = value.substring(0, 2) + '/' + value.substring(2, 4);
        } else {
            e.target.value = value;
        }
    }

    // 2. Clear any error visual warnings cleanly as they type
    if (e.inputType && ['fullName', 'email', 'phone', 'address', 'city', 'zip', 'cardNumber', 'cardExpiry', 'cardCvv'].includes(e.target.id)) {
        UI.displayFieldError(e.target.id, '');
    }
});

// ASYNC PAYLOAD SUBMISSION API SIMULATOR FUNNEL
document.getElementById('checkoutForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    UI.setLoading(true);

    try {
        await new Promise((resolve, reject) => {
            setTimeout(() => Math.random() > 0.2 ? resolve() : reject(), 2000);
        });

        UI.showStatusModal('success', 'Payment Authorized! 🎉', 'Your payment was completed and tracked successfully.');
        UI.resetForm();
    } catch {
        UI.showStatusModal('error', 'Transaction Blocked', 'There was an issue processing your billing records.');
    } finally {
        UI.setLoading(false);
    }
});