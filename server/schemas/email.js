function email () {

    var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  

};
   var email = new Schema ({
       email: {
           type: String,
           trim: true,
           lowercase:true,
           unique:true,
           required:"Email adress is required ",
           validate: [ValidateEmail, "Please fill a valid email address"],
           match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        }


       }
   );
  
   module.exports = email;
