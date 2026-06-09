export const validateStep1 = (data) => {
    let errors = {};
    if (data.fullName.trim().length < 3) errors.fullName = 'Name must be at least 3 characters.';
    if (!/^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/.test(data.email.trim())) errors.email = 'Enter a valid email address.';
    if (!/^\+\d{7,15}$/.test(data.phone.trim())) errors.phone = 'Phone must start with + followed strictly by numbers.';
    return errors;
};

export const validateStep2 = (data) => {
    let errors = {};
    if (data.address.trim().length < 5) errors.address = 'Please enter a valid street address.';
    if (data.city.trim().length < 2) errors.city = 'City name is required (at least 2 characters).';
    if (data.zip.trim().length !== 5) errors.zip = 'Zip code must be exactly 5 digits.';
    return errors;
};

export const validateStep3 = (data) => {
    let errors = {};
    const rawCard = data.cardNumber.replace(/\s+/g, '');
    if (!/^\d{16}$/.test(rawCard)) errors.cardNumber = 'Card number must be 16 digits.';
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.cardExpiry)) {
        errors.cardExpiry = 'Expiry must be a valid MM/YY format.';
    } else {
        const [month, year] = data.cardExpiry.split('/');
        const expiryDate = new Date(parseInt('20' + year, 10), parseInt(month, 10) - 1);
        const currentDate = new Date();
        currentDate.setDate(1);

        if (expiryDate < currentDate) errors.cardExpiry = 'This credit card has expired.';
    }
    if (!/^\d{3,4}$/.test(data.cardCvv)) errors.cardCvv = 'CVV must be 3 or 4 digits.';
    return errors;
};