import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = express.Router()

// SANITIZE FORM 
function sanitizeString(str){
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    return str.trim();
}

router.post('/register', async (req, res) => {

    // CHECK USER EXISTS
    const user = await User.findOne({ email: sanitizeString(req.body.email) })
    if (user) return res.status(400).send("User is already exists!")
    
    // HASHING PASSWORD
    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = await bcrypt.hashSync(req.body.password, salt);

    try {
        if (req.body.username.length < 6 && req.body.password.length < 6) {
            return res.status(400).send("Username or password is too short!")
        }
        const newUser = new User({
            username: sanitizeString(req.body.username),
            email: sanitizeString(req.body.email),
            password: hashedPassword
        })
        await newUser.save()
        res.status(200).send("Register is successfully!")

    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).send("Validation error")
        }
    }
})

router.post('/login', async (req, res) => {

    // CHECK USER EXISTS
    const user = await User.findOne({ email: sanitizeString(req.body.email) })
    if (!user) return res.status(400).send("Email or password is incorrect!")

    // COMPARE PASSWORD
    const comparedPassword = await bcrypt.compareSync(req.body.password, user.password);
    if (!comparedPassword) return res.status(400).send("Password is incorrect!")

    const token = await jwt.sign({ id: user.id }, process.env.TOKEN);
    res.status(200).send({Access_Token: token})
})
export default router