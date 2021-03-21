// const { number } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');


const jformSchema = new Schema({
    name: String,
    // username: String,
    // password: String,
    // password2: String,
    email: String,
    pro_DateofBirth: String,
    pro_Degree: String,
    pro_BranchofStudies:String,
    pro_BranchofStudy: String,
    pro_pro_EmploymentType: String,
    pro_pro_PresentEmployer: String,
    pro_pro_Designation: String,
    pro_pro_WorkPlace: String,
    pro_pro_SpecialAchievements: String,
    pro_pro_Phone1Office: Number,
    pro_pro_Phone2Office:Number,
    pro_pro_Mobile: Number,
    pro_pro_ContactAddress: String
});
jformSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('jform', jformSchema);