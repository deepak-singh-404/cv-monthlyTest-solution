const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//File Handler
const bufferConversion = require('../utils/bufferConversion')
const cloudinary = require('../utils/cloudinary')

//Models
const User = require('../models/user')

//Config
const keys = require('../config/keys')

//Validation
const validateUserLoginInput = require('../validation/userLogin')
const validateUserRegisterInput = require('../validation/userRegister')


module.exports = {
    userRegister: async (req, res, next) => {
        try {
            const { errors, isValid } = validateUserRegisterInput(req.body)
            if (!isValid) {
                return res.status(400).json({success:false, response: errors})
            }
            const { name, email, password, about } = req.body;
            let profileImage = ""
            if (req.file) {
                let icon = bufferConversion(req.file.originalname, req.file.buffer);
                let imgResponse = await cloudinary.uploader.upload(icon);
                profileImage = imgResponse.secure_url;
            }
            const user = await User.findOne({ email })
            if (user) {
                errors.email = "Email already exist"
                return res.status(400).json({success:false, response:errors})
            }
            let hashedPassword;
            hashedPassword = await bcrypt.hash(password, 10)
            const newUser = await new User({
                name,
                email,
                password: hashedPassword,
                about,
                profileImage
            })
            await newUser.save()
            res.status(200).json({success:true, response: {_id: newUser._id, name, email, about, profileImage}, message:"User registered successfully"})
        }
        catch (err) {
            console.log("Error in userRegister", err.message)
            return res.status(400).json({success:false, response:err, message: `Error in userRegister ${err.message}` })
        }
    },
    userLogin: async (req, res, next) => {
        try {
            const { errors, isValid } = validateUserLoginInput(req.body);
            if (!isValid) {
                return res.status(400).json(errors)
            }
            const { email, password } = req.body;
            const user = await (await User.findOne({ email }))
            if (!user) {
                errors.email = "Email doesnt not exist"
                return res.status(400).json(errors)
            }
            const isCorrect = await bcrypt.compare(password, user.password)
            if (!isCorrect) {
                errors.password = 'Invalid Credentials';
                return res.status(404).json(errors);
            }
            const payload = { _id: user._id, user:{name:user.name, email, about: user.about}}
            jwt.sign(
                payload,
                keys.secretKey,
                { expiresIn: 7200 },
                (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token,
                    });
                }
            );
        }
        catch (err) {
            console.log("Error in userLogin", err.message)
            return res.status(400).json({ message: `Error in userLogin ${err.message}` })
        }
    },
    userProfile: async (req, res, next) => {
        try {
            const { _id } = req.user;
            const user = await User.findById(_id).select('-password')
            res.status(200).json({success:true, message:"User found successfully", response:user})
        }
        catch (err) {
            console.log("Error in userLogin", err.message)
            return res.status(400).json({success:false,response:err, message: `Error in userProfile ${err.message}` })
        }
    }
}


