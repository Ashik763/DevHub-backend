const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
require('dotenv').config();
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const db = require('./config/keys').mongoURI;


mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.use(passport.initialize());


require('./config/passport').default(passport);
app.get('/',(req, res) => {
    res.json("HELLO 2");
})


app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
// "proxy": "https://dev-hub-backend.vercel.app//"


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
