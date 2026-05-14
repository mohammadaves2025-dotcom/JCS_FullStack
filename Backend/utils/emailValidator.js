import validator from "validator";
import disposableDomains from "disposable-email-domains" with { type: "json" };

// Build a Set for O(1) lookups across 10,000+ blocked domains
const disposableSet = new Set(disposableDomains);

/**
 * Validates an email address for:
 *  1. Correct format (RFC 5321 via validator.js)
 *  2. Disposable / temporary domain (10,000+ blocked domains via disposable-email-domains)
 *
 * Returns { isValid: boolean, message?: string }
 */
export const isEmailValid = (email) => {
    if (!email || typeof email !== "string") {
        return { isValid: false, message: "Email address is required." };
    }

    const trimmed = email.trim().toLowerCase();

    // 1. RFC-compliant format check
    if (!validator.isEmail(trimmed)) {
        return { isValid: false, message: "Please enter a valid email address." };
    }

    // 2. Disposable / throwaway domain check (covers mailinator, tempmail, 10minutemail, etc.)
    const domain = trimmed.split("@")[1];
    if (disposableSet.has(domain)) {
        return {
            isValid: false,
            message: "Temporary or disposable email addresses are not allowed. Please use your real email.",
        };
    }

    return { isValid: true };
};