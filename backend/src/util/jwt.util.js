import jwt from 'jsonwebtoken'


export const generateJWTAndSetToCookie = (userId, res) => {
    const token = generateJWTToken(userId);

    res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
        maxAge: 15 * 24 * 60 * 60 * 1000
    });

};
const generateJWTToken = (userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });

    return token;
}