const express = require("express");
const router = express.Router();

const {
  register,
  login,
  listUser,
  EditUser,
  RemoveUser,
  currentUser,
} = require("../controllers/auth");

//middleware
const { auth, adminCheck } = require("../middlewares/auth.js");

//Endpoint...http://localhost:3000/api/auth
//method Get
//Access Publish
router.get("/auth", listUser);

//Enpdoint...http://localhost:3000/api/register
//method Post
//Access Publish
router.post("/register", register);

//Enpdoint...http://localhost:3000/api/login
//method Post
//Access Publish
router.post("/login", login);

//Enpdoint...http://localhost:3000/api/current-user
//method Post
//Access Private
router.post("/current-user", auth, currentUser);
//Enpdoint...http://localhost:3000/api/current-admin
//method Post
//Access Private
router.post("/current-admin", auth, adminCheck, currentUser);

//Endpoint...http://localhost:3000/api/auth
//method Put
//Access Publish
router.put("/auth", EditUser);

//Endpoint...http://localhost:3000/api/auth
//method Del
//Access Publish
router.delete("/auth", RemoveUser);

module.exports = router;
