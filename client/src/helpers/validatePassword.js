export function validatePassword(user) {
    if (user.password !== user.confirm_password) {
        throw new Error("password does not match");
    }
    return { email: user.email, password: user.password };
};