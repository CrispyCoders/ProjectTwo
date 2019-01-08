var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {

  // Ping Favors API
  app.get("/api/favors", function(req, res) {
    db.Favor.findAll()
      .then(function(result) {
        res.json(result);
      })
  });

  //Ping Users API
  app.get("/api/users", function(req, res) {
    db.User.findAll()
      .then(function(result) {
        res.json(result);
      })
  });

  // Create a new example
  app.post("/api/newFavor", function(req, res) {
    console.log(req.user);

    let newFavor = req.body;

    // newFavor.UserId = 1;
    newFavor.userEmail = req.user.email;
    //This should be updated to the User's actual ID
    if (!newFavor.userEmail) {
      newFavor.userEmail = "me@mine.com";
    }

    if (!newFavor.imageURL) {
      console.log("add an image");
      newFavor.imageURL = "./images/cupofSugar.png";
    } 

    console.log(newFavor.imageURL);


    db.Favor.create(newFavor).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  //Claim an Item
  app.put("/api/posts", function(req, res) {
    // db.Post.update(req.body,
    //   {
    //     where: {
    //       id: req.body.id
    //     }
    //   })
    //   .then(function(dbPost) {
    //     res.json(dbPost);
    //   });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });


  // some stuff
  // about loggin in
  // just copied from a working example

  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};
