//custom middleware
function validateUser(user) {
    let errors = [];
  
    if (!user.lastname || user.lastname.length < 2 || !user.firstname || user.firstname.length < 2 || !user.username || user.username.length < 2) {
      errors.push("Please enter a user last name, firstname, and username. All must contain at least 2 characters");
    }
  
    if (!user.password || user.password.length < 4) {
      errors.push("Password must contain at least 4 characters");
    }

    if (!user.email || user.email.length < 4) {
      errors.push("Email must contain at least 4 characters");
    }
  
    return {
      isSuccessful: errors.length > 0 ? false : true,
      errors
    };
  }

  module.exports = {
    validateUser
  };