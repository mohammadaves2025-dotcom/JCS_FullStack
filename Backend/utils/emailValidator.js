// A list of the most common temporary/disposable email domains
const disposableDomains = [
    "mailinator.com",
    "10minutemail.com",
    "tempmail.com",
    "guerrillamail.com",
    "yopmail.com",
    "throwawaymail.com",
    "temp-mail.org",
    "fakemail.net",
    "trashmail.com",
    "sharklasers.com",
    "maildrop.cc",
    "dispostable.com"
];

export const isEmailValid = (email) => {
    // 1. Basic Regex to ensure it actually looks like an email (contains @ and .)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, message: "Please enter a valid email format." };
    }

    // 2. Extract the domain (e.g., "gmail.com" from "user@gmail.com")
    const domain = email.split('@')[1].toLowerCase();

    // 3. Check if the domain is in our blocklist
    if (disposableDomains.includes(domain)) {
        return {
            isValid: false,
            message: "Temporary or disposable emails are not allowed. Please use your primary email."
        };
    }

    // If it passes both tests, it's good to go!
    return { isValid: true };
};