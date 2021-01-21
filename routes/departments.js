const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>{
    res.render('departments/departments')
})
router.get('/pg',(req,res)=>{
    res.render('departments/pg')
})
router.get('/ug',(req,res)=>{
    res.render('departments/ug')
})
router.get('/pg/computerscience',(req,res)=>{
    res.render('departments/computer');
})

router.get('/pg/humanity-and-sciencs',(req,res)=>{
    res.render('departments/humanity-and-sciencs');
})


router.get('/pg/chemical',(req,res)=>{
    res.render('departments/chemical');
})

router.get('/pg/civil',(req,res)=>{
    res.render('departments/civil');
})

router.get('/pg/Electrical-and-electronics',(req,res)=>{
    res.render('departments/Electrical-and-electronics');
})

router.get('/pg/electronics-and-communication',(req,res)=>{
    res.render('departments/electronics-and-communication');
})

router.get('/pg/Information-technology',(req,res)=>{
    res.render('departments/Information-technology');
})

router.get('/pg/Mechanical',(req,res)=>{
    res.render('departments/Mechanical');
})


module.exports = router;