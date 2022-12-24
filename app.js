const express = require('express');
const ejs = require('ejs');

const app = express();

app.use(express.static('public'));

app.set('view engine', "ejs");

app.get('/', (req,res)=>{
    res.render("home");
})

app.get('/SignUp', (req,res)=>{
    res.render('SignUp');
})

app.get('/SignIn', (req,res)=>{
    res.render('SignIn');
});



app.listen(3000, ()=>{
    console.log('server listening at port 3000');
})













