if(process.env.NODE_ENV !=='production')
{
    require('dotenv').config()
}
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const flash = require('connect-flash');
const sendMail = require('./mail');
const ejsMate = require('ejs-mate');
const departments=require('./routes/departments')
const ExpressError = require('./utils/ExpressError');
const MongoDBStore=require('connect-mongo')
// const catchAsync = require('./utils/catchAsync');
// const mailSchema = require('./schemas');
let jform=require('./models/jform');
const { isLoggedin,isAuthor,validatejform,validatejform2 }=require('./middleware');
const DbConnect=process.env.DBCONNECT;
// const localdb = 'mongodb://localhost:27017/AmmecClg'
mongoose.connect(DbConnect, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));


// app.use(express.static("public"));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

const store = {
    mongoUrl:DbConnect,
    secret:'thisshouldbeabettersecret!',
    touchAfter:24*60*60
}

// store.on("error",function(e) {
//     console.log('session store err',e)
// })
const sessionConfig = {
    store:MongoDBStore.create(store),
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(jform.authenticate()));

passport.serializeUser(jform.serializeUser());
passport.deserializeUser(jform.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

validatemail = (req, res, next) => {
    console.log(req.body)
    const { error } = mailSchema.validate(req.body);
    // console.log(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/about',(req,res)=>{
    res.render('about')
})

app.post('/about',(req,res,next)=>{
    console.log(req.body)
    const { email, subject, text} = req.body
    sendMail(email,subject,text,(err,data)=>{
    // if(err) res.status(500).json({message:'internal error'});
    if(err) next(new ExpressError('internal error', 500))
    else res.json({message:'email sent!!!'})
    });
})

app.use('/departments',departments);

app.get('/fees-structure',(req,res)=>{
    res.render('fees');
})
app.get('/placement',(req,res)=>{
    res.render('placement');
})
app.get('/campus',(req,res)=>{
    res.render('campus');
})

// app.get('/alumi',(req,res)=>{
//     res.render('alumi');
// })

app.get('/more',(req,res)=>{
    res.render('more');
})

app.get('/Anti-Ragging',(req,res)=>{
    res.render('Anti-Ragging');
})












app.get('/alumi', (req, res) => {
    res.render('alumni/home')
})
app.get('/register', (req, res) => {
    res.render('alumni/register');
})


app.post('/register',validatejform2,async(req,res,next)=>{
    try{
    // console.log(req.body);
    const { name,
    username,
    password,
    password2,
    email,
    pro_DateofBirth,
    pro_Degree,
    pro_BranchofStudies,
    pro_BranchofStudy,
    pro_pro_EmploymentType,
    pro_pro_PresentEmployer,
    pro_pro_Designation,
    pro_pro_WorkPlace,
    pro_pro_SpecialAchievements,
    pro_pro_Phone1Office,
    pro_pro_Phone2Office,
    pro_pro_Mobile,
    pro_pro_ContactAddress } = req.body.jform; 
   
    const jForm = new jform({name,
        username,
        password2,
        email,
        pro_DateofBirth,
        pro_Degree,
        pro_BranchofStudies,
        pro_BranchofStudy,
        pro_pro_EmploymentType,
        pro_pro_PresentEmployer,
        pro_pro_Designation,
        pro_pro_WorkPlace,
        pro_pro_SpecialAchievements,
        pro_pro_Phone1Office,
        pro_pro_Phone2Office,
        pro_pro_Mobile,
        pro_pro_ContactAddress});
        // console.log(jForm);
    const registeredjfrom = await jform.register(jForm,password);
    req.login(registeredjfrom, err => {
                     if (err) return next(err);
                     req.flash('success', 'Welcome to Yelp Camp!');
                     res.redirect('/showAlumni');
                 })
    }catch(e){
    //  await jForm.save();
    res.redirect('/register')
    }
})


app.get('/login',(req,res)=>{
    res.render('alumni/login');
});

app.post('/login',passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),async(req,res)=>{
    req.flash('success','welcomeback');
    res.redirect('/showAlumni');
})


app.get('/showAlumni',async(req,res)=>{
    const jForm = await jform.find({});
    // console.log(jForm)
    res.render('alumni/showAlumni',{jForm})
})
// app.get("/createalumni",(req,res)=>{
//     app.render('createaluni');
// })

app.get('/showAlumni/:id',async(req,res)=>{
    const jForm = await jform.findById(req.params.id);
    // console.log(jForm);
    res.render('alumni/show', { jForm });
})

app.get('/showAlumni/:id/edit',isLoggedin,isAuthor,async(req,res)=>{
    const jForm = await jform.findById(req.params.id);
    // console.log(req.params.id)
    res.render('alumni/edit', {jForm});
})

app.put('/showAlumni/:id',isLoggedin,isAuthor,validatejform,async(req,res)=>{
    const { id } = req.params;
    const jForm = await jform.findByIdAndUpdate(id, { ...req.body.jform });
    // console.log(jForm)
    res.redirect(`/showAlumni/${jForm._id}`)
})

app.delete('/showAlumni/:id',isLoggedin,isAuthor,async(req,res)=>{
    const { id } = req.params;
    const jForm = await jform.findByIdAndDelete(id);
    res.redirect(`/showAlumni`)
})

app.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success',"goodbye");
    res.redirect('/showAlumni');
})


app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log('app is listen')
})