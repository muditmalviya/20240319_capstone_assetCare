// userController.js

exports.getProfile = (req, res) => {
    // Assuming that the user object is already set in req.user by a previous middleware function
    const user = req.user;
  
    // Remove sensitive data
    user.password = undefined;
  
    res.send(user);
  };