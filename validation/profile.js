const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateProfileInput(data){

    // console.log(data.email);
     
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '' ;
    data.email = !isEmpty(data.email) ? data.email : '' ;
    data.password = !isEmpty(data.password) ? data.password : '' ;
    data.password2 = !isEmpty(data.password2) ? data.password2  : '' ;

    
    if(!Validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }
    if( Validator.isEmpty(data.email)){
        errors.email = "Email field is required";
    }
    

    if( Validator.isEmpty(data.password) ){
        errors.password = "Password field is required";
    }
    
    console.log( isEmpty(errors));
    return {
        errors,
        isValid: isEmpty(errors)
    }
}