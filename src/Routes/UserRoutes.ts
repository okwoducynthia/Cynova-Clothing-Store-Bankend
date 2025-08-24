const express = require("express")
const router = express.Router()
const { adminLogin, LoginUser, SignUpUser, GetAllUser, GetSingleUser, UpdateSingleUser, DeleteUser } = require("../Controllers/UserController")




router.post("/", adminLogin)
router.post("/login", LoginUser)
router.post("/signup", SignUpUser)
router.get("/", GetAllUser)
router.get("/:id", GetSingleUser);
router.put("/:id", UpdateSingleUser);
router.delete("/:id", DeleteUser);


module.exports = router