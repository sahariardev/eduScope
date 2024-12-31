import jwt from 'jsonwebtoken'


export const generateJWTAndSetToCookie = (userId, email , res) => {
    const token = generateJWTToken(userId, email);

    res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
        maxAge: 15 * 24 * 60 * 60 * 1000
    });

    return token;
};
const generateJWTToken = (userId, email) => {
    const token = jwt.sign({userId, email}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });

    return token;
}