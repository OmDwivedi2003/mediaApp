const User = require('../models/User');

// Get User Profile
const getuser = async (req , res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.status(200).json({user : user});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
  
};

// Update Profile (email can't be updated)
const updateuser = async (req, res) => {

  try {
    console.log(req.body);
    console.log("req user id from authmiddleware:",req.userId)
    const {name, contact, city, dob } = req.body;
    const profilePic = req.file?.filename;
  
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { name, contact, city, dob, ...(profilePic && { profilePic }) },
      { new: true }
    ).select('-password');

    res.status(200).json({userdataUpdating:req.body, updatedUserDetail :updatedUser});

  } catch (error) {
    console.log(error);
    res.status(500).json({userdataUpdating:req.body, message: 'Error updating user', error:error });
  }
};

// Delete User
const deleteuser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.userId);
    res.clearCookie('token');
    res.status(200).json({ message: `User: ${req.userId}  is deleted` });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

module.exports ={ getuser,updateuser,deleteuser};
