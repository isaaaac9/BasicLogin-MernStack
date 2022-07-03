const express = require("express");
const router = express.Router();

const {
  listUsers,
  readUsers,
  updateUsers,
  removeUsers,
  changeRole,
  changeStatus,
} = require("../controllers/users");
//middleware
const { auth, adminCheck } = require("../middlewares/auth.js");

//Enpdoint...http://localhost:4000/api/users
//method GET
//Access Private
router.get("/users", auth, adminCheck, listUsers);

//Enpdoint...http://localhost:4000/api/users/:id
//method GET
//Access Private
router.get("/users/:id", readUsers);

//@Endpoint  http://localhost:4000/api/users/:id
//@Method    PUT
//@Access    Private
router.put("/users/:id", auth, adminCheck, updateUsers);

//@Endpoint  http://localhost:4000/api/users/change-status
//@Method    Post
//@Access    Private
router.post("/change-status", auth, adminCheck, changeStatus);

//@Endpoint  http://localhost:4000/api/users/change-role
//@Method    Post
//@Access    Private
router.post("/change-role", auth, adminCheck, changeRole);

//@Endpoint  http://localhost:4000/api/users/:id
//@Method    DELETE
//@Access    Private
router.delete("/users/:id", removeUsers);

module.exports = router;
