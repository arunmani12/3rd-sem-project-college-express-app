const jform = require("./models/jform");
const { JformSchema,JformSchema2 } = require('./schemas.js');

module.exports.isLoggedin = (req,res,next) =>{
    if(!req.isAuthenticated()){
        req.flash('error','you must loged in');
        return res.redirect('/login');
    }
    next();    
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const jForm = await jform.findById(id);
    if (!jForm._id.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/showAlumni/${id}`);
    }
    next();
}

module.exports.validatejform = (req, res, next) => {
    const { error } = JformSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        console.log(msg);
        // throw new ExpressError(msg, 400);

    } else {
        next();
    }
}

module.exports.validatejform2 = (req, res, next) => {
    const { error } = JformSchema2.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        console.log(msg);
        // throw new ExpressError(msg, 400);

    } else {
        next();
    }
}