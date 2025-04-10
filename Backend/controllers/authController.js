const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup Controller
const signup = async (req, res) => {
  try {
    const { name, email, password, contact, city, dob } = req.body;
  
    const profilePic = req.file ? req.file.filename : null;
   
    if(!profilePic) return res.json({message:"Bhai image daalna bhool gya tu"});

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

  //  const hashedPassword = await bcrypt.hash(password, 10); (kyuki maine phle hi user schema me pre save middleware se kr chuka hoon)

    const newUser = new User({
      name,
      email,
     // password: hashedPassword,
     password,
      contact,
      city,
      dob,
      profilePic:profilePic,
    });

    await newUser.save();
    res.status(201).json({userdata:req.body, message: 'User registered successfully' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error during registration', error });
  }
};

// Login Controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(404).json({ message: 'Invalid credentials' });
   

    const isMatch = await bcrypt.compare(password, existingUser.password);
 //   console.log("phle ka:",existingUser.password);
 //   console.log("abhi ka :",password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials Bro, lagta hai tune password galat enter kiya hai' });

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn:process.env.JWT_EXPIRE, 
    });

    // for cookie based login ,mai ne token res me hi bhej diya hai yha
    // res.cookie('token', token, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: 'lax',
    //   maxAge: 24 * 60 * 60 * 1000, // 1 day
    // });
     
    res.status(200).json({token, userdata: req.body,message: 'Login successful', userId: existingUser._id });

  } catch (error) {
    res.status(500).json({ message: 'Error during login', error });
  }
};

// Logout Controller
const logout = (req, res) => {
  res.clearCookie('token');
  console.log("logged out .")
  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports ={login,logout, signup};

