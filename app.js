const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;



const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', "ejs");

mongoose.set('strictQuery', false);

mongoose.connect("mongodb://127.0.0.1:27017/friendDB", { useNewUrlParser: true });



// Create Schema
const friendSchema = new mongoose.Schema({
    email: String,
    password: String,
    confirmPassword: String
});

// Create Model through Schema
const Friend = new mongoose.model("Friend", friendSchema);

app.get('/', (req, res) => {
    res.render("home");
});

app.get('/SignUp', (req, res) => {
    res.render('SignUp');
});

app.get('/SignIn', (req, res) => {
    res.render('SignIn');
});

app.get('/welcome', (req, res) => {
    res.render('welcome');
});

app.get("/signInFail", (req, res) => {
    res.render("signInFail");
});

app.get("/noFriend", (req, res) => {
    res.render("noFriend");
});


app.post('/SignUp', async (req, res) => {
    try {
      const { username, password, confirmPassword } = req.body;
  
      const hash = await bcrypt.hash(password, saltRounds);
      const newFriend = new Friend({
        email: username,
        password: hash,
        confirmPassword: hash,
      });
  
      if (password !== confirmPassword) {
        res.render("passwordNotMatch");
      } else {
        await newFriend.save();
        res.render("welcome");
      }
    } catch (error) {
      console.error(error);
    }
  });
  

// Solving the error coming while deploying 

// The error message you provided suggests that you are using an async function, 
//but you are not properly handling any potential rejections.

// To fix this error, 
//you will need to add a catch block to the Promise chain to handle any potential rejections.



app.post('/SignIn', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const foundFriend = await Friend.findOne({ email: username });
        if (foundFriend) {
            const result = await bcrypt.compare(password, foundFriend.password);
            if (result) {
                res.render("welcome");
            } else {
                res.render("signInFailed");
            }
        } else {
            res.render("noFriend");
        }
    } catch (error) {
        console.error(error);
    }
});



app.listen(3000, () => {
    console.log('server listening at port 3000');
});













