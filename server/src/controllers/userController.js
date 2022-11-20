import userModel from "./../models/user.js";
import  bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const signup = async (req, res) => {





    const { username, email, password } = req.body;
    try {

        //Existing user check
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        //Hashed pasword
        const hashedPassword = await bcrypt.hash(password, 10);

        //User creation 
        const result = await userModel.create({
            email: email,
            password: hashedPassword,
            username: username
        });

        //Token generate
        const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
        res.status(201).json({ user: result, token: token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
}
export const signin = async (req, res) => {
    const {email, password} = req.body;
    try {

        //Existing user check
        const existingUser = await userModel.findOne({ email : email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found." });
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if(!matchPassword){
            return res.status(400).json({message : "Invalid Credentials"});
        }

        //Token generate
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);
        res.status(200).json({ user: existingUser, token: token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
}
// export default { signup, signin };