export const validators = {
    fullName: (value) => value.trim().length >= 3 ? '' : 'Name must be at least 3 characters.',
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Enter a valid email address.',

    phone: (value) => /^\+\d{1,4}\s?\d{6,14}$/.test(value.trim())
        ? ''
        : 'Enter a valid format: +(country code) then number (e.g., +1 5551234567)',

    address: (value) => value.trim().length > 5 ? '' : 'Please enter a valid street address.',
    city: (value) => value.trim().length > 1 ? '' : 'City is required.',
    zip: (value) => /^\d{5}$/.test(value) ? '' : 'Zip code must be exactly 5 digits.',
    cardNumber: (value) => {
        const raw = value.replace(/\s+/g, '');
        return /^\d{16}$/.test(raw) ? '' : 'Card number must be 16 digits.';
    },
    cardExpiry: (value) => /^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(value) ? '' : 'Use MM/YY format.',
    cardCvv: (value) => /^\d{3,4}$/.test(value) ? '' : 'CVV must be 3 or 4 digits.'
};


export function validateData(formData) {
    const errors = {};
    for (const [name, value] of Object.entries(formData)) {
        if (validators[name]) {
            const errorMsg = validators[name](value);
            if (errorMsg) errors[name] = errorMsg;
        }
    }
    return errors;
}