// Dependencies
const db = require('../models');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = require('./expenseController');
const nodemailer = require("nodemailer");

// Register User
// Route : /api/users
router.post('/register', async (req, res) => {
    const { email, firstname, lastname, password } = req.body;
    try {
        let user = await db.User.findOne({ email });

        if (user) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'User already exists' }] });
        }

        user = new db.User({
            email,
            firstname,
            lastname,
            password
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const emailConUrl = req.protocol + '://' + req.get('host') + '/api/users/confirm/' + user._id;
        // console.log(emailConUrl)

        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: config.get("emailHost"), // generated ethereal user
                pass: config.get("emailPassword"), // generated ethereal password
            }
        });

        await transporter.sendMail({
            from: config.get("emailHost"), // sender address
            to: user.email, // list of receivers
            subject: "Account Confirmation for Spent Smart", // Subject line
            text: `Click this link to confirm your accout `, // plain text body
            html: `<b>Click this link to confirm you account : <u>${emailConUrl}</u></b>`, // html body
        });

        res.status(200).send("Please check your email for the Account Confirmation");

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.get('/confirm/:id', async (req, res) => {
    // const confirmId = req.params.id;

    try {
        let user = await db.User.findById(req.params.id);
        // console.log(user)
         if (!user) {
            return res
                .status(400)
                .json({ errors: [{ msg: "User does not exist" }] });
        }

        if(user.email_confirm){
            return res
                .status(201)
                .json({ errors: [{ msg: "User is already confirmed" }] });
        }

    
        user.email_confirm = true;

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router