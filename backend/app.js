const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your MongoDB Atlas connection string
const mongoDBAtlasURI = 'mongodb+srv://aks19802003:UEc3VSR1ebiPHbAJ@carbuy.6hj9qvf.mongodb.net/?retryWrites=true&w=majority';

const cors = require('cors');
app.use(cors());

// Connect to MongoDB Atlas
mongoose.connect(mongoDBAtlasURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Atlas connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB Atlas');
});

// Define the user schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
});
 
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
 
app.post('/sign_up', function(req,res){
    var name = req.body.name;
    var email =req.body.email;
    var pass = req.body.password;
    var phone =req.body.phone;
 
    var data = {
        "name": name,
        "email":email,
        "password":pass,
        "phone":phone
    }
db.collection('details').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
             
    });
         
    return res.redirect('signup_success.html');
})
 
 
app.get('/',function(req,res){
res.set({
    'Access-control-Allow-Origin': '*'
    });
return res.redirect('sign.html');
}).listen(3000)
 
 
console.log("server listening at port 3000");
