const express = require('express');
const mongoose = require('mongoose');
const app = express();
const passport = require('passport');

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Config mongodb
mongoose.connect(
    'mongodb://157.245.105.137/assi',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => {
        console.log("MongoDB is ready");
        // require('./config/temp.data').tempData();
    }).catch(err => {
        console.log(err);
    });


// configure passport
require('./config/passportConfig');
app.use(passport.initialize());

app.use('/admin', require('./routes/admin.routes'));
app.use('/user', require('./routes/user.routes'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});



