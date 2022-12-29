const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');




const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', "ejs");

mongoose.set('strictQuery', false);

mongoose.connect("mongodb://localhost:27017/friendDB",{useNewUrlParser: true});



// Create Schema
const friendSchema = new mongoose.Schema({
    email: String,
    password: Array,
});

// Create Model through Schema
const Friend = new mongoose.model("Friend", friendSchema);

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
    // console.log(req.body.username);
    // console.log(req.body.password); 
   const  newFriend = new Friend({
    email: req.body.username,
    password: req.body.password,
    confirmPassword: req.body.password
   });

   newFriend.save((err)=>{
    if (err) {
        console.log(err);
    } else {
        res.render("welcome");
    }
   })


    
})
app.post('/SignIn', (req,res)=>{
    // console.log(req.body.username);
    // console.log(req.body.password);
    Friend.findOne({
        email: req.body.username,
    });
    if (req.body.password==Friend.password) {
        res.render("welcome");
    } else {
        console.log("Oops! Wrong password");
    }
    
})


app.listen(3000, ()=>{
    console.log('server listening at port 3000');
})













