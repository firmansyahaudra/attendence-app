const express = require("express");
const router = express.Router();
const {
 userController
} = require("../controller");
const { validateToken, authorizeHR } = require("../middleware/validation");
const {uploader} = require("../helper/uploader");

router.get("/", userController.getData);
router.post("/login", userController.login);
router.post("/reset-password", userController.resetPassword);
router.post("/create-hr", userController.regisHR);
router.post("/create-employee", 
validateToken, 
authorizeHR, 
uploader("/regisEmploye").single("fileUpload"), 
userController.regisEmployee);
router.put("/update-employee/:id", validateToken, authorizeHR, userController.updateEmployee);
router.delete("/delete-employee/:id", validateToken, authorizeHR, userController.deleteEmployee);



module.exports = router;
