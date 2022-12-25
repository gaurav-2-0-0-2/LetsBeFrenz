const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');




const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

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

app.get('/welcome', (req,res)=>{
   res.render('welcome');
})




app.post('/SignUp', (req,res)=>{
    console.log(req.body.username);
    console.log(req.body.password);

    res.render("welcome");
})
app.post('/SignIn', (req,res)=>{
    console.log(req.body.username);
    console.log(req.body.password);
    
    res.render("welcome");
   
})


app.listen(3000, ()=>{
    console.log('server listening at port 3000');
})













