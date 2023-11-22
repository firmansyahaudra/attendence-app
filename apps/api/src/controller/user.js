const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../helper/mailer");
const { user } = require("../models");
const crypto = require("crypto");

module.exports = {
    regisHR: async (req, res, next) => {
        try {
            const salt = await bcrypt.genSalt(10) 
            console.log("salt", salt);
            const hashPassword = await bcrypt.hash(req.body.password, salt) 
            console.log("hashPassword", hashPassword);
            req.body.password = hashPassword 
            
            const newHR = await user.create(req.body);
            
          const token = jwt.sign({
            id: newHR.id,
            email: newHR.email,
            role: newHR.role
        },
            process.env.SCRT_TKN,
            {
                expiresIn: "1h"
            }
        )
        console.log(token);
    
          return res.status(201).send({ success: true, message: "HR created successfully", result: newHR });
        } catch (error) {
          console.log(error);
          return res.status(500).send({ success: false, error: "Internal Server Error" });
        }
      },
      getData:async(req,res,next)=>{
        try {
            const result1 = await user.findAll();
            return res.status(200).send(result1);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    },
  login: async (req, res, next) => {
    try {
      console.log(req.body);
      const result = await user.findOne({
        where: { email: req.body.email },
        raw: true
      });
      console.log(result);

      if (!result || !(await bcrypt.compare(req.body.password, result.password))) {
        return res.status(401).send({ success: false, message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: req.body.id, role: req.body.role }, process.env.SCRT_TKN, { expiresIn: "1h" });

      return res.status(200).send({
        success: true,
        result: { role: req.body.role, token }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ success: false, error: "Internal Server Error" });
    }
  },

  resetPassword: async (req, res, next) => {
    try {
        const { email } = req.body;

        const resetToken = crypto.randomBytes(20).toString("hex"); 


        await user.update({ resetToken }, { where: { email } });

        const resetLink = `http://localhost:2023/user/reset-password/${resetToken}`;


        await transporter.sendMail({
            from: "Your App",
            to: email,
            subject: "Password Reset",
            html: `<p>Please click the following link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`
        });

        return res.status(200).send({ success: true, message: "Reset link sent to your email" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, error: "Internal Server Error" });
    }
},

  regisEmployee: async (req, res, next) => {
    try {

       
    if (req.userRole !== "HR") {
      return res.status(400).send({
        success: false,
        message: "Forbidden: Insufficient permissions to register an employee"
      });
    }

    if (req.body.role !== "Employee") {
      return res.status(401).send({
        success: false,
        message: "Bad Request: Invalid role for employee registration"
      });
    }
        const salt = await bcrypt.genSalt(10) 
        console.log("salt", salt);
        const hashPassword = await bcrypt.hash(req.body.password, salt) 
        console.log("hashPassword", hashPassword);
        req.body.password = hashPassword 

      const newEmployee = await user.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        image: req.file.filename
      });


      const token = jwt.sign({
        id: req.body.id,
        email: req.body.email,
        role: req.body.role
    },
        process.env.SCRT_TKN,
        {
            expiresIn: "1h"
        }
    )

      return res.status(201).send({ 
        success: true, 
        message: "Employee created successfully", 
        result: newEmployee });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ 
        success: false, 
        message: "Internal Server Error" });
    }
  },

  updateEmployee: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { username, email, password, status } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const updatedEmployee = await user.update({
        username,
        email,
        password: hashedPassword,
        status
      }, {
        where: { id }
      });

      return res.status(200).send({ 
        success: true, 
        message: "Employee updated successfully", 
        result: updatedEmployee });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ 
        success: false, 
        message: "Internal Server Error" });
    }
  },

  deleteEmployee: async (req, res) => {
    try {

      if (req.user.role !== "HR") {
        return res.status(400).send({
          success: false,
          message: "Forbidden: Insufficient permissions to delete an employee"
        });
      }

      const deleteEmployee = await user.destroy({
        where: { username: req.params.username}
      });
      console.log(deleteEmployee);

      return res.status(200).send({ 
        success: true, 
        message: "Employee deleted successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ 
        success: false, 
        message: "Internal Server Error" });
    }
  },
};
