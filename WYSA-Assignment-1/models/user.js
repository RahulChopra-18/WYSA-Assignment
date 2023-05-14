var mongoose = require('mongoose');
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema(
    {
        id: { type: mongoose.Schema.Types.ObjectId },//unique identifier for each document in the collection.
        userID: { type: String, index: true },//stores a string that represents the user ID. It is indexed for efficient querying.
        firstName: { type: String, maxlength: 32 },//store the user's first and last names, respectively. 
        lastName: { type: String, maxlength: 32 },//They are limited to a maximum length of 32 characters.
        emailID: { type: String, trim: true, required: true },//stores the user's email address. It is required and trimmed
        passwordHash: { type: String },//stores the hashed password, hashed password is stored for security purposes.
        phoneCode: { type: String },
        phoneNumber: { type: String },
        city: { type: String },
        state: String,
        country: { type: String },
        createdAt: { type: Date, default: Date.now },//stores the creation date of the document. It is assigned the current date and time by default.
        updatedAt: { type: Date, default: Date.now },//stores last update date of the document. It is also assigned the current date and time by default.
        deletedAt: { type: Date, default: null },//stores the deletion date of the document. It is initially set to null and can be updated when the document is deleted.  
    },
    { versionKey: false, timestamps: true },
    { collection: 'user' }
);


//This code block defines a virtual property called password on the UserSchema. 
//Virtual properties are additional properties that are not stored in MongoDB but can be accessed like regular schema properties. 
//In this case, password is a virtual property that can be used to set and retrieve the plain text password. 
//When setting the password virtual property, it automatically generates the password hash using the securePassword method and 
//assigns it to the passwordHash field.
UserSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.passwordHash = this.securePassword(password);
    })
    .get(function () {
        return this._password;
    });

UserSchema.methods = {
    //This method compares a plain text password with the hashed password stored in the passwordHash field of the user document.
    //It uses bcrypt.compareSync to perform the comparison and returns true if the passwords match, or false otherwise.
    comparePassword: function (password) {
        return bcrypt.compareSync(password, this.passwordHash);
    },

    //This method is used to hash a plain text password and return the resulting hash.
    //It takes a plain password as input, and if the input is empty or falsy, it returns an empty string.
    //It uses bcrypt.hashSync to generate a hash of the plain password with a salt factor of 10.
    //If an error occurs during the hashing process, it is caught, logged to the console, and an empty string is returned.
    securePassword: function (plainpassword) {
        if (!plainpassword) return '';
        try {
            const SALT_ROUNDS = 10;
            return bcrypt.hashSync(plainpassword, SALT_ROUNDS);
        } catch (err) {
            console.log(err);
            return '';
        }
    }
};

module.exports = mongoose.model('user', UserSchema);
