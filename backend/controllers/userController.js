import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import validator from 'validator'
import bcrypt from 'bcrypt'

// register user
let registerUser = async (req, res) => {
    let { name, email, password } = req.body
    try {
        if (!name) {
            return res.status(500).send({ message: "Name is required *" })
        }
        if (!email) {
            return res.status(500).send({ message: "Email is required *" })
        }
        if (!password) {
            return res.status(500).send({ message: "Password is required *" })
        }
        if (!validator.isEmail(email)) {
            return res.status(500).send({ success: false, message: 'Please enter valid email' })
        }
        let findUser = await userModel.findOne({ email: email })
        if (findUser) {
            return res.status(500).send({ message: "User is already registered" })
        }
        if (password.length < 8) {
            return res.status(500).send({ success: false, message: "Please enter strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        await newUser.save()
        res.status(201).send({ message: "User is registered Successfully", success: true })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Something went wrong while registration" })
    }
}


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}



// login user
const loginUser = async (req, res) => {
    const {email, password } = req.body;
    try {
        if (!email) {
            return res.status(500).send({ success: false, message: "email required" })
        }
        if (!password) {
            return res.status(500).send({ success: false, message: "password required" })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).send({ success: false, message: "user does not exist" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ success: false, message: "Invalid password" })
        }
        const token = createToken(user._id);
        res.status(200).send({ success: true, message: "Successfully Login", token })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error while login" })
    }
}

export { loginUser, registerUser }