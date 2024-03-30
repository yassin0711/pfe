const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/userSchema");

const SECRET_KEY = "secret_key";


const PORT = 3001;
// connect to express app
const app = express();

// connect to MongoDB
const dbURI = 'mongodb+srv://louhichiyassin:pLhNeyXw7FzXiPqm@cluster0.mvpd0ye.mongodb.net/Reclamation_TT?retryWrites=true&w=majority&appName=Cluster0';
mongoose
    .connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server and MongoDB are work successfully ??????????? on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log('Unable to connect to server and/or MongoDB $$$$$$$$$$');
    })


// middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
// USER REGISTRATION
// POST REGISTER
app.post('/register', async (req, res) => {
    try {
        const { email, userName, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, userName, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error singing up $$$$$$$$$$$$$" })
    }
})

// GET REGISTER USERS
app.get('/register', async (req, res) => {
    try {
        const users = await User.find();
        res.status(201).json({ users });
    }
    catch (error) {
        res.status(500).json({ error: "Unable to get users $$$$$$$$$$$$$" })
    }
});

//GET LOGIN
app.post('/login', async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(401).json({ error: "Invalid userName $$$$$$$$$$$$$" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password $$$$$$$$$$$$$" });
        }
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1hr' });
        res.json({ token: token, userName: userName, email: user.email });
    }
    catch (error) {
        res.status(500).json({ error: "Error login in $$$$$$$$$$$$$" });
    }
});



// app.listen(PORT, () => {
//     console.log(`Server is work successfully !!!!!!!!!!! on port ${PORT}`);
// });