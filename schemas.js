const { string } = require('joi');
const joi = require('joi');

module.exports.JformSchema = joi.object({
    jform:joi.object({
        name: joi.string().required(),
        // username: String,
        // password: String,
        // password2: joi.string().required(),
        // email: joi.string().required(),
        pro_DateofBirth: joi.string().required(),
        pro_Degree: joi.string().required(),
        pro_BranchofStudies:joi.string().required(),
        pro_BranchofStudy: joi.string().required(),
        pro_pro_EmploymentType: joi.string().required(),
        pro_pro_PresentEmployer: joi.string().required(),
        pro_pro_Designation: joi.string().required(),
        pro_pro_WorkPlace: joi.string().required(),
        pro_pro_SpecialAchievements: joi.string().required(),
        pro_pro_Phone1Office: joi.string().required(),
        pro_pro_Phone2Office:joi.number().required(),
        pro_pro_Mobile: joi.number().required(),
        pro_pro_ContactAddress: joi.string().required()
    }).required()
});


module.exports.JformSchema2 = joi.object({
    jform:joi.object({
        name: joi.string().required(),
        username: joi.string().required(),
        password: joi.string().required(),
        // password2: joi.string().required(),
        email: joi.string().required(),
        pro_DateofBirth: joi.string().required(),
        pro_Degree: joi.string().required(),
        pro_BranchofStudies:joi.string().required(),
        pro_BranchofStudy: joi.string().required(),
        pro_pro_EmploymentType: joi.string().required(),
        pro_pro_PresentEmployer: joi.string().required(),
        pro_pro_Designation: joi.string().required(),
        pro_pro_WorkPlace: joi.string().required(),
        pro_pro_SpecialAchievements: joi.string().required(),
        pro_pro_Phone1Office: joi.string().required(),
        pro_pro_Phone2Office:joi.number().required(),
        pro_pro_Mobile: joi.number().required(),
        pro_pro_ContactAddress: joi.string().required()
    }).required()
});
// module.exports.mailSchema = Joi.object({
//         email: Joi.string().required(),
//         subject: Joi.string().required(),
//         text: Joi.string().required(),   
// });