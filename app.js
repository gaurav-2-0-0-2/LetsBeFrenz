const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');




const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', "ejs");

mongoose.set('strictQuery', false);

mongoose.connect("mongodb://localhost:27017/friendDB", { useNewUrlParser: true });



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
})

app.get('/SignUp', (req, res) => {
    res.render('SignUp');
})

app.get('/SignIn', (req, res) => {
    res.render('SignIn');
});

app.get('/welcome', (req, res) => {
    res.render('welcome');
})

app.get("/signInFail", (req, res) => {
    res.render("signInFail");
});

app.get("/noFriend", (req, res) => {
    res.render("noFriend");
})


app.post('/SignUp', (req, res) => {
    const { username, password, confirmPassword } = req.body
    const newFriend = new Friend({
        email: username,
        password: password,
        confirmPassword: confirmPassword
    });

    if (password !== confirmPassword) {
        console.log("Password did not match!");
    } else {
        newFriend.save((err) => {
            if (err) {
                console.log(err);
            } else {
                res.render("welcome");
            }
        });
    }
});




app.post('/SignIn', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    Friend.findOne({ email: username }, (err, foundFriend) => {
        if (err) {
            console.log(err);
        } else {
            if (foundFriend) {
                if (foundFriend.password === password) {
                    res.render("welcome");
                } else {
                    res.render("signInFailed");
                }
            } else {
                res.render("noFriend");
            }
        }
    });


})


app.listen(3000, () => {
    console.log('server listening at port 3000');
})













