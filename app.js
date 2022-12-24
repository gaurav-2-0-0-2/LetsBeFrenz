const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/', function (req,res) {
    res.send("hello world");
})

app.listen(3000, ()=>{
    console.log('server listening at port 3000');
})