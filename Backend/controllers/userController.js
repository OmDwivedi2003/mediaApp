const User = require('../models/User');

// Get User Profile
const getuser = async (req , res, next) => {
  console.log('controller called')
  try {
   
    const user = await User.findById(req.userId).populate('posts').select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({user : user});
  } catch (error) {
    next(error);
    //res.status(500).json({ message: 'Error fetching user', error });
  }
  
};

// Update Profile (email can't be updated)
const updateuser = async (req, res,next) => {

  try {
   // console.log(req.body);
   // console.log("req user id from authmiddleware:",req.userId)
   const user = await User.findById(req.userId);
   if (!user) return res.status(404).json({ message: 'User not found' });
    const {name, contact, city, dob } = req.body;
    //const profilePic = req.file?.filename;
    const profilePic = req.file ? req.file.filename : undefined;
    const updateFields = { name, contact, city ,dob};
    if (profilePic) updateFields.profilePic = profilePic;

    // const updatedUser = await User.findByIdAndUpdate(
    //   req.userId,
    //   { name, contact, city, dob, ...(profilePic && { profilePic }) },
    //   { new: true }
    // ).select('-password');

   
    const updatedUser = await User.findByIdAndUpdate(
      req.userId, updateFields, { new: true, runValidators: true }
  ).select('-password');

    res.status(200).json({message: 'Profile updated',userdataUpdating:req.body, updatedUserDetail :updatedUser});

  } catch (error) {
    console.log(error);
    next(error)
    //res.status(500).json({userdataUpdating:req.body, message: 'Error updating user', error:error });
  }
};

// Delete User
const deleteuser = async (req, res,next) => {
  try {
    const user = await User.findById(req.userId);
   if (!user) return res.status(404).json({ message: 'User already deleted' });
    await User.findByIdAndDelete(req.userId);
 //   res.clearCookie('token'); (//for cookie based login)
    res.status(200).json({ message: `User: ${req.userId}  is deleted` });
  } catch (error) {
    next(error);
    //res.status(500).json({ message: 'Error deleting user', error });
  }
};

module.exports ={ getuser,updateuser,deleteuser};





// ### 1. **Get User Profile (`getuser`)**

// - **Purpose**: This method retrieves the user's profile based on the user ID that is attached to the `req.userId` (from the `auth` middleware).
  
// - **Flow**:
//   - First, it tries to find the user by `req.userId` (which was passed from the token in the middleware).
//   - It uses `populate('posts')` to fetch the user's posts as well, so it includes the posts that the user has created.
//   - The `select('-password')` ensures that the password is not included in the response for security.
//   - If the user is found, it sends a response with a 200 status code, containing the user data. If not, it sends a 404 with a message that the user was not found.

// - **Response**:
//   - If successful: `status 200` with user details.
//   - If user not found: `status 404` with an error message.

// ---

// ### 2. **Update User Profile (`updateuser`)**

// - **Purpose**: Allows the user to update their profile, but **email cannot be changed** (as per the previous implementation rules).
  
// - **Flow**:
//   - The updated fields (`name`, `contact`, `city`, `dob`) are fetched from the request body.
//   - If a new profile picture is uploaded (via `req.file`), it gets added to the update fields.
//   - It then updates the user profile using `findByIdAndUpdate()` on the user model. Only the fields in the `updateFields` object are updated (i.e., name, contact, city, dob, and profilePic if provided).
//   - It uses the `{ new: true }` option to return the updated user object, and `runValidators: true` to ensure that the validation is applied before updating.
//   - The password is excluded from the response (using `select('-password')`).

// - **Response**:
//   - If successful: `status 200` with a success message and the updated user data.
//   - If an error occurs: It forwards the error to the `next` middleware for proper error handling.

// ---

// ### 3. **Delete User (`deleteuser`)**

// - **Purpose**: This deletes the user's profile.
  
// - **Flow**:
//   - The user is deleted by their `userId` using `findByIdAndDelete()`.
//   - If the delete operation is successful, it responds with a success message.
//   - If an error occurs during deletion, it forwards the error to the next middleware (error handling).

// - **Response**:
//   - If successful: `status 200` with a success message that includes the user ID.
//   - If an error occurs: It forwards the error to the next middleware for error handling.

// ---

// ### **Code Summary for Better Understanding**:

// - **getuser**: Fetches the logged-in user's profile and their posts, ensuring that the password is excluded.
// - **updateuser**: Updates the logged-in user's profile (but doesn't allow updating the email), and returns the updated user profile.
// - **deleteuser**: Deletes the logged-in user's profile and sends a success message upon deletion.

// ---

// ### **Error Handling**:
// - In all functions, `next(error)` is used to pass errors to the next error-handling middleware (which will handle the responses appropriately with status codes and error messages).
