const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    }
});

userSchema.plugin(passportLocalMongoose);
//username and password will automatically 
// generate by pasprtLocalMongoose and salt and hashing also

module.exports = mongoose.model("User", userSchema);
