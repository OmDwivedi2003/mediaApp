const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup Controller
const signup = async (req, res,next) => {
  try {
    // Step 1: Extract user data from request body
    const { name, email, password, contact, city, dob } = req.body;
  // Step 2: Handle profile picture upload
   const profilePic = req.file ? req.file.filename : null;
    // Step 3: Check if profilePic is provided (image validation)
    if(!profilePic) return res.status(400).json({message:"Bhai image daalna bhool gya tu"});

    // Step 4: Check if user with the same email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

  //  const hashedPassword = await bcrypt.hash(password, 10); (kyuki maine phle hi user schema me pre save middleware se kr chuka hoon)

   // Step 5: Create a new user object with provided data
    const newUser = new User({
      name,
      email,
     // password: hashedPassword,
     password, // Password will be hashed automatically using pre-save middleware
      contact,
      city,
      dob,
      profilePic:profilePic,
    });

     // Step 6: Save the new user to the database
    await newUser.save();

    // Step 7: Send successful response with user data (excluding password)
    const userToSend = { 
      id: newUser._id, 
      name: newUser.name, 
      email: newUser.email, 
      city: newUser.city, 
      profilePic: newUser.profilePic 
    };
    res.status(201).json({user:userToSend, message: 'User registered successfully' });

  } catch (error) {
    // Step 8: Handle errors if any
    console.log(error);
    next(error); // Forward the error to the error handler middleware
   // res.status(500).json({ message: 'Error during registration', error });
  }
};

// Login Controller
const login = async (req, res, next) => {
  try {
     // Step 1: Extract login data (email, password) from the request body
    const { email, password } = req.body;
     // Step 2: Check if user with given email exists in the database
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(404).json({ message: 'User not found' });
   
// Step 3: Compare entered password with hashed password in the database
    const isMatch = await bcrypt.compare(password, existingUser.password);
 //   console.log("phle ka:",existingUser.password);
 //   console.log("abhi ka :",password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials Bro, lagta hai tune password galat enter kiya hai' });
// Step 4: Generate JWT token using user ID (ID is saved in token payload)

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn:process.env.JWT_EXPIRE, 
    });

    // Step 5: Send token in cookie and response
    
     // for cookie based login ,mai ne token res.body me hi bhej diya hai yha
    // res.cookie('token', token, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: 'lax',
    //   maxAge: 24 * 60 * 60 * 1000, // 1 day
    // });
     
   // Return response with success message and token

  //  res.status(200).json({token, userdata: req.body,message: 'Login successful', userId: existingUser._id });
  res.status(200).json({ message: 'Login successful', token }); //token based login


  } catch (error) {
     // Step 6: Handle errors if any
    next(error);  // Forward the error to the error handler middleware
  //  res.status(500).json({ message: 'Error during login', error });
  }
};

// Logout Controller( jb cookie based login hoga tb use hoga.)
const logout = (req, res) => {
// res.clearCookie('token');
//  console.log("logged out .")
// Frontend token ko localStorage ya cookies se delete karega.
  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports ={login,logout, signup};

