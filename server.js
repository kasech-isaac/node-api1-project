const express = require("express");

const db = require("./database");

const server = express();

const port = process.argv[2] || 8000;

server.use(express.json());

server.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

server.get("/users", (req, res) => {
  const users = db.getUsers();
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(500).res.json({ errorMessage: "The users information " });
  }
});

server.get("/users/:id", (req, res) => {
        const id = req.params.id;
        const user = db.getUserById(id);

  //   makeing  sure user exists before  sending  back
  if (user) {
        res.send(user);
  } else {
         res.status(404).send({ message: "user not found" });
  }
         res.send(user);
});

// ---------API POST---------
server.post('/users', (req, res) => {
    const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio,
      });
   if (!newUser) {
       res.status(400).json
      ({ errorMessage: 'Please provide name and bio for the user .' });
    }
   else {
    res.status(201).json(newUser)

    }
  });

// ---------API PUT---------

server.put("/users/:id", (req, res) => {
        const id = req.params.id;
        const user = db.getUserById(id);

   if (user) {
        const updateUser = (db.updateUser =
         (id,
 {
         name: req.body.name,
         bio: req.body.bio,
 }));
        res.json(updateUser);
  } else {
        res .status(404).json
        ({ errorMessage: "The user with the specified ID does not exist." });
  }
});

// ---------API DELETE---------

server.delete("/users/:id", (req, res) => {
        const id = req.params.id;
        const user = db.getUserById(id);

  if (user) {
        db.deleteUser = id;
        // 204 is a successfull empty responce
        res.status(204).json
        ({ message: "user deleted successfully" });
  } else {
    res .status(404).json
      ({ errorMessage: "The user with the specified ID does not exist." });
  }
});

server.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
