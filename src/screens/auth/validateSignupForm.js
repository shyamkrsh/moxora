const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phone) => /^\d{10,15}$/.test(phone);
const isValidUsername = (username) => /^[a-zA-Z0-9_]{3,20}$/.test(username);

const validateSignupForm = (formState) => {
    let valid = true;
    let errors = { emailOrMobile: "", username: "", password: "" };

    if (!formState.emailOrMobile) {
        errors.emailOrMobile = "Email or mobile is required";
        valid = false;
    } else if (
        !(isValidEmail(formState.emailOrMobile) || isValidPhone(formState.emailOrMobile))
    ) {
        errors.emailOrMobile = "Enter a valid email or mobile number";
        valid = false;
    }

    if (!formState.username) {
        errors.username = "Username is required";
        valid = false;
    } else if (!isValidUsername(formState.username)) {
        errors.username = "Only letters, numbers, _ allowed (3-20 chars)";
        valid = false;
    }

    if (!formState.password) {
        errors.password = "Password is required";
        valid = false;
    } else if (formState.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
        valid = false;
    }

    return { valid, errors };
};

export default validateSignupForm