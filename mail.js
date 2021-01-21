if(process.env.NODE_ENV !=='production')
{
    require('dotenv').config()
}
const nodemailer=require('nodemailer');
const mailGn = require('nodemailer-mailgun-transport');


const auth = {
    auth:{
        api_key:process.env.API_KEY,
        domain:process.env.DOMAIN
    }
}

const transporter = nodemailer.createTransport(mailGn(auth));


const sendMail = (email,subject,text,cb) =>{
    const mailOptions = {
        from:email,
        to:'arunmani9787@gmail.com',
        subject,
        text
    }
    
    transporter.sendMail(mailOptions,(err,data)=>{
        if(err){
            cb(err,null)
        }
        else{
           cb(null,data)
        }
    })
}

module.exports = sendMail;
