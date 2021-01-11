const  jwt  = require("jsonwebtoken");

const dotenv =  require('dotenv');

  const validate_email = (email) => {
    if (
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email) ===
        false
    ) {
      return false;
    }
    return true;
  };

  const validate_password = (password) => {
    if (password.length <= 5 || password === '') {
      return false;
    } return true;
  };


  const validate_user = (email, password) => {
       const valid = {error : []}
       const error = [];
      
       if(!validate_email(email)){
           error[0] = "Invalid email should have less than 40 characters";
       }
       else if(!validate_password(password)){
        error[0] = "Invalid password should have greater than 5 characters";
    }
    return {error};

  }

  const create_user_token = (id) => {
      const token = jwt.sign({
         id
      }, process.env.SECRET);

      return token;
  }
  module.exports = {  validate_user, create_user_token};