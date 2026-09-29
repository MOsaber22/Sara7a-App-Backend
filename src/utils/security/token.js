import jwt from "jsonwebtoken"

export const generateToken = ({payload, signature, optoins}) => {
    const token = jwt.sign(payload, signature, optoins);
    return token;
}

export const verifyToken = ({token, signature}) => {
    const decoded = jwt.verify(token, signature);
    return decoded;
}