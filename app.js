let express = require('express'),
    app = express(),
    ejs = require('ejs'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

let port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/friends2');

let friendSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  info: {
    phone: String,
    gender: String,
    occupation: String,
    hobbies: String
  }
});

let Friend = mongoose.model('Friend', friendSchema);

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  Friend.find({}, function(err, allFriends) {
    if (err) {
      console.log('SOMETHING WENT WRONG');
      console.log(err);
    } else {
      console.log(allFriends);
      res.render('friends', {friends: allFriends});
    };
  });
});

app.get('/friend/:id', function(req, res) {
  let id = req.params.id;
  Friend.find({
    _id: id
  }, function(err, friend) {
    if (err) {
      console.log(err);
    } else {
      console.log(friend.firstName);
      res.render('friend-profile', {friend});
    };
  });
});

app.post('/addfriend', function(req, res) {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  Friend.create({
    firstName,
    lastName
  }, function(err, friend) {
    if(err) {
      console.log('SOMETHING WENT WRONG!');
      console.log(err);
      res.redirect('/');
    } else {
      res.redirect('/');
    };
  });
});

app.post('/removefriend', function(req, res) {
  let id = req.body.id;
  console.log(id);
  Friend.remove({
    _id: id
  }, function(err, friend) {
    if(err) {
      console.log('COULD NOT REMOVE FRIEND FROM DB');
      console.log(err);
    } else {
      console.log(`You removed ${friend} from the DB.`);
      res.redirect('/');
    };
  });
});

app.get('/updateinfo/:id', function(req, res) {
  let id = req.params.id;
  Friend.find({
    _id: id
  }, function(err, friend) {
    if(err) {
      console.log(err);
    } else {
      res.render('updateinfo', {friend});
    }
  });
});

app.post('/update', function(req, res) {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let phone = req.body.phone;
  let gender = req.body.gender;
  let occupation = req.body.occupation;
  let hobbies = req.body.hobbies;
  let id = req.body.id;
  Friend.update({ _id: id }, {
    firstName,
    lastName,
    info: {
      phone,
      gender,
      occupation,
      hobbies
    }
  }, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log(req.body);
      res.redirect(`/friend/${id}`);
    };
  });
});

app.listen(port, function() {
  console.log(`Your server has started on PORT ${port}.`);
});
