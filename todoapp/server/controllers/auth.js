
const User = require("../models/users");
const bcrypt = require('bcrypt');
// SignUp
exports.signUp = async(request, response) =>{

    try{
        const {email, password} = request.body;

        if(!email || !password ){
            return response.status(403).json({
                success: false,
                message: "All fields are compulsory",
            })
        }

        const ifUserexists = await User.findOne({email});
        if(ifUserexists){
            return response.status(400).json({
                success: false,
                message: "User is already registered",
            })
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create entry in DB

        const user = await User.create({
            email,
            password: hashedPassword,

        })

        return response.status(200).json({
            success: true,
            message: "User is Registered successfully",
            user,
        })
    }
    catch(error){
        console.log(error);
        return response.status(500).json({
            success: false,
            message: "User could not be registered",
        })
    }
}


// Login
exports.login = async(request, response) => {
    console.log("LOGIN");
    try{
        const {email1, password1 } = req.body;

        if(!email1 || !password1){
            return response.status(403).json({
                success: false,
                message: "All fields are compulsory",
            })
        }

        const existingUser = await User.findOne({email: email1});
        if(!existingUser){
            return response.status(401).json({
                success: false,
                message: "User is not registered",
            })
        }
        if(await bcrypt.compare(password1, existingUser.password)){
            const payload = {
                email: existingUser.email,
                id: existingUser._id,
                accountType: existingUser.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });
            existingUser.token = token;
            existingUser.password = undefined;

            const options  = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            }
            response.cookie("token", token, options).status(200).json({
                success: true,
                token,
                existingUser,
                message: "Logged in Successfully",
            })
        }
        else {
            return response.status(401).json({
                success: false,
                message: "Password is incorrect",
            })
        }
    }
    catch(error){
        console.log(error);
        return response.status(500).json({
            success: false,
            message: "Login Failed",
        })
    }
}