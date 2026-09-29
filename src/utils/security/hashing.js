import bcrypt from "bcrypt"

export const createHashing = async ({password, saltRounds = process.env.SALT_ROUNDS}) => {
    const hash = await bcrypt.hash(password, Number(saltRounds));
    return hash;
}

export const compareHashing = async ({password, hashedPassword}) => {
    const checkPassword = await bcrypt.compare(password, hashedPassword);
    return checkPassword;
}