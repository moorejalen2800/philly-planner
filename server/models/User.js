const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    

        User:  {
            type: String,
            lowercase: true,
            required: true, ["can't be blank"]
              : true
    },

    emailInput: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    index: true,

},
    classes: {
    type: Schema.Types.ObjectId,
    ref: 'User'
}

    


    }

)






const User = model('User', userSchema);

module.exports = User;

