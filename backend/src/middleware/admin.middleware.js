export const adminChecker = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(401).json({
            message: 'Unauthorized access'
        });
    }

    next();
}