const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let users = [] 

exports.signup = async (req, res) => {
    const {username, password} = req.body
    const encodedPassword = await bcrypt.hash(password, 10)
    users.push({username, password: encodedPassword})
    res.json({message: 'User created.'})
}

exports.login = async (req, res) => {
    const {username, password} = req.body
    const user = users.find(u => u.username === username)
    if(!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({message: 'Username or password is incorrect'})
    }
    const token = jwt.sign({username}, process.env.JWT_SECRET, {expiresIn: '1h'})
    res.json({token})
}

exports.profile = (req, res) => {
    res.json({user: req.user})
}
