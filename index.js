if(process.env.NODE_ENV !=='production')
{
    require('dotenv').config()
}


const express = require('express');
const app = express();
const path = require('path');
const sendMail = require('./mail');
const ejsMate = require('ejs-mate');
const departments=require('./routes/departments')
const ExpressError = require('./utils/ExpressError');
// const catchAsync = require('./utils/catchAsync');
// const mailSchema = require('./schemas');

// console.log(process.env.ACCESS_TOKEN)

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));


// app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

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

app.get('/alumi',(req,res)=>{
    res.render('alumi');
})

app.get('/more',(req,res)=>{
    res.render('more');
})

app.get('/Anti-Ragging',(req,res)=>{
    res.render('Anti-Ragging');
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log('app is listen')
})