const express= require('express')
const router = express.Router();
const User = require('../db/user.models')
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth.middleware');
router.post("/", async (req, res,next) => {

if(!req.body.email)return res.status(400).send("email is required");

let user = await  User.find({email: req.body.email});
console.log(user);
if(user.length) return res.send("User already exists");


//Hashing 
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.password, salt);

req.body.password = hashedPassword;

user = new User(req.body)
await user.save();

res.send("User created");
})


router.post("/login", async (req, res, next) => {

    if(!req.body.email)return res.status(400).send("email is required");
    if(!req.body.password)return res.status(400).send("password is required");

    let user = await  User.find({email: req.body.email});
    if(!user.length) return res.send("User does not exist");

    const isMatch = await bcrypt.compare(req.body.password, user[0].password);
    if(!isMatch) return res.send("Incorrect password");

   
    let token = user[0].generateAuthToken();
    res.header("auth-token",token).send(token);


})

module.exports = router;


router.get("/details",[auth],async function(req, res) {
   let user = await User.findOne({_id: req.user._id}).select("-password -__v");
    res.send(user);
    
})