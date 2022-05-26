const userModel = require("../models/userSchema");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = "asdsahdhasdvh242143hjbhasdf3wq";
const { multi_upload } = require("../helpers/FileUpload");

const signup = (req, res) => {
  console.log(req.body.email);

  multi_upload(req, res, async function (err) {
    console.log(req.files);
    // if (err instanceof multer.MulterError) {
    //   res
    //     .status(500)
    //     .send({ error: { message: `Multer uploading error1: ${err.message}` } })
    //     .end();
    //   return;
    // } else if (err) {
    //   if (err.name == "ExtensionError") {
    //     res.json({ err: err.name });
    //   } else {
    //     res
    //       .status(500)
    //       .send({
    //         error: { message: `unknown uploading error: ${err.message}` },
    //       })
    //       .end();
    //   }
    //   return;
    // }
    console.log(req.files[0].filename);

    let email = req.body.email;
    let oldUser = await userModel.findOne({ email: req.body.email });

    // console.log(oldUser);
    if (oldUser) {
      // return res.status(409).send("User Already Exist. Please Login");
      return res.json({ err: 2, message: "User Already Exist. Please Login" });
    } else {
      let encpassword = req.body.password;
      const hashpassword = bcrypt.hashSync(encpassword, 10);

      //insert data

      let ins = new userModel({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: hashpassword,
        pimg: req.files[0].filename,
      });
      ins.save((err) => {
        console.log(err);
        if (err) {
          res.json({ err: "already added", message: "already added" });
        } else {
          res.json({
            err: 0,
            success: true,
            status_code: 200,
            msg: "Successfully Added",
          });
        }
      });
    }
  });
};

const login = async (req, res) => {
    // console.log(req.body)
  const { email, password } = req.body;
  // let email = req.body.username;
  // let password = req.body.password;
  const user = await userModel.findOne({ email: email });

  if (user) {
    const validPassword = await bcrypt.compare(password, user.password);
    // check user password with hashed password stored in the database

    if (validPassword) {
      // res.status(200).json({ message: "Valid password" });
      let payload = {
        uid: email,
      };
      const token = jwt.sign(payload, jwtSecret, { expiresIn: "12h" });
      res.json({
        err: 0,
        success: true,
        status_code: 200,
        msg: "You Have Logged In",
        token: token,
        user:user
      });
    } else {
      res.status(200).json({ err: 1, msg: "Invalid Password" });
      // res.status(400).json({ error: "Invalid Password" });
    }
  } else {
    res.json({ err: 2, msg: "User does not exist" });
    // res.status(401).json({ error: "User does not exist" });
  }
};
module.exports = { signup, login };
