import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    // CHECK TOKEN EXISTS
    const token = req.header('Access_Token')
    if(!token) return res.status(400).send("Access denied")
    
    // VERIFY TOKEN
    try {
        const verifiedToken = jwt.verify(token, process.env.TOKEN)
        req.user = verifiedToken
        next()
    } catch (error) {
        res.status(400).send("Invalid token")
    }
}