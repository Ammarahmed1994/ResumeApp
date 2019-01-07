// const dotenv = require(`dotenv`);
// dotenv.config();

const express = require(`express`);
const app = express();
const path = require(`path`);
const multer = require(`multer`);
const bodyParser = require(`body-parser`);
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require(`morgan`);
const cors = require(`cors`);
// const IncomingForm = require('formidable').IncomingForm;
// const passport = require(`passport`);
// const passportJWT = require(`passport-jwt`);
// const JWTStrategy = passportJWT.Strategy;
// const ExtractJWT = passportJWT.ExtractJwt;
// const jwt = require('jsonwebtoken');
const bookshelf = require(`bookshelf`);
// const securePassword = require('bookshelf-secure-password');
// bookshelf.plugin(securePassword);
var knex = require('./bookshelf').bookshelf;

var bcrypt = require('bcrypt');


// const User = bookshelf.Model.extend({
//     tableName: 'users',
//     hasSecurePassword: true
// })


//database routes connection
const dbconn = require(`./routes/dbconnection`);
const student = require(`./models/students`);
const user = require(`./models/users`);
const position = require(`./models/position`);

app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header(
        "Access-Control-Allow-Header",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use('/dbconnection', dbconn);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }    
};


// passport.use(Strategy);
// app.use(passport.initialize());

//Multer Uploading for resume-pdf
var storage = multer.diskStorage({
    destination: './fileUploads/',
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

var upload = multer({
    storage: storage,
    limits: { fileSize: 99999 } //filesize of 99kb
}).single('resumeFile');


//upload resume
app.post('/submit', (req, res) => {

    //upload file first
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            if (req.file == undefined) {
                console.log('Error: No file selected!');
            } else {
                student.forge(
                    {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        resumeFile: req.file.filename,
                        positions: req.body.positions
                    }).save()
                    .then(
                        res.json('success'));
            }

        }
    })
});


//Manager Login


app.post('/login', async (req,res) =>{
    var username = req.body.username,
    password = req.body.password;

    var User = await user.where('username', username).fetch().then(user => {
        return user;});
        console.log(User)
    if (bcrypt.compareSync(password, User.attributes.password)) {
            req.session.user = user.dataValues;
            res.json({
                success: true,
                message: 'Enjoy your stay!'
            });
        } else {
            res.json({
                success: false, 
                message: 'Authentication failed. Wrong password.'
            });
            console.log('Incorrect Password'); 
        }
    });


// app.get('/dashboard', function (req, res, next) {
//     res.render()
//     });


app.listen(8000, () => {
    console.log('server started');
})
