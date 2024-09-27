import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import { encryptPassword, matchPassword } from '../helper/authHelper.js'

//this is my controller for the registration
export let registerUser = async (req, res) => {
    let { email, name, password, address, phone, answer, role } = req.body
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
        let findUser = await userModel.findOne({ email: email })
        if (findUser) {
            return res.status(500).send({ message: "User is already registered" })
        }
        let hasshedPassword = await encryptPassword(password)
        let user = new userModel({
            name,
            password: hasshedPassword,
            email
        }).save()
        res.status(201).send({ message: "User is registered Successfully", success: true })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Something wrong while registration",
            success: false
        })
    }
}

// This is my controller for the login 
export let loginUser = async (req, res) => {
    try {
        let { email, password } = req.body
        if (!email) {
            res.status(500).send({ message: "Email field is required" })
        }
        if (!password) {
            res.status(500).send({ message: "Password field is required" })
        }
        // console.log("************************************************")
        let existingUser = await userModel.findOne({ email: email })
        // console.log("existingUser", existingUser)
        if (!existingUser) {
            return res.status(200).send({ message: "Either Email or Password is invalid" })
        }
        let result = await matchPassword(password, existingUser.password)
        if (!result) {
            return res.status(200).send({ message: "Either Email or Password is invalid" })
        }
        // create a token.
        let token = await jwt.sign({ _id: existingUser._id },
            process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).send({
            message: "User Login Successfully",
            success: true,
            user: {
                name: existingUser.name,
                email: existingUser.email

            }, token
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Something wrong while longin", success: false, error })

    }

}

// export { registerUser, loginUser }
