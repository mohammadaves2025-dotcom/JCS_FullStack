import validator from "validator";

/**
 * Validates a phone number.
 * - Strips spaces, dashes, parentheses, and leading + before checking
 * - Must be 7–15 digits (ITU-T E.164 range)
 * - Rejects obviously fake numbers (all same digit, sequential runs)
 *
 * Returns { isValid: boolean, message?: string }
 */
export const isPhoneValid = (phone) => {
    if (!phone || typeof phone !== "string") {
        return { isValid: false, message: "Phone number is required." };
    }

    // Normalise: keep only digits and leading +
    const cleaned = phone.trim().replace(/[\s\-().]/g, "");

    // Use validator.js isMobilePhone — accepts international formats
    // 'any' locale + strictMode=false allows all valid world numbers
    if (!validator.isMobilePhone(cleaned, "any", { strictMode: false })) {
        return {
            isValid: false,
            message: "Please enter a valid phone number (e.g. +91 98765 43210).",
        };
    }

    // Extract just digits for pattern checks
    const digitsOnly = cleaned.replace(/\D/g, "");

    // Reject numbers that are all the same digit (1111111111, 0000000000, etc.)
    if (/^(\d)\1+$/.test(digitsOnly)) {
        return {
            isValid: false,
            message: "Please enter a real phone number.",
        };
    }

    // Reject sequential runs like 1234567890 or 9876543210
    const ascending  = "0123456789";
    const descending = "9876543210";
    if (ascending.includes(digitsOnly) || descending.includes(digitsOnly)) {
        return {
            isValid: false,
            message: "Please enter a real phone number.",
        };
    }

    return { isValid: true };
};
