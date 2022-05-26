const queModel = require("../models/questionSchema");

const addQue = (req, res) => {
    console.log(req.body);
    let ins = new queModel({
        subject:req.body.subject,
        allque:req.body.allque,
        email:req.body.email,
      });
      ins.save((err) => {
        console.log(err);
        if (err) {
          res.json({ err: "something went wrong", message: "Something Went Wrong" });
        } else {
          res.json({
            err: 0,
            success: true,
            status_code: 200,
            msg: "Successfully Added",
          });
        }
      });
    
  };
  const getAllque=(req, res)=> {
    const email = req.params.email;
    // console.log(email)
    queModel.find({ email: email }, (err, data) => {
      if (err) throw err;
      else {
        res.json({ err: 0, success: true, status_code: 200, data: data });
      }
    });
  }


  const getAllquewithSub=(req, res)=> {
    const email = req.params.email;
    const subject= req.params.subject
    queModel.find({ email: email,subject:subject }, (err, data) => {
      if (err) throw err;
      else {
        res.json({ err: 0, success: true, status_code: 200, data: data });
        
      }
    });
  }
  
  const delAndUpdate=(req,res)=>{
    const paperid = req.params.paperid;
    const email=req.params.email
    console.log(paperid)
    queModel.updateOne(
      {email:email, _id: paperid },
      { $set: { allque: req.body } },
      (err) => {
        if (err) throw err;
        else {
          res.json({ msg: "Updated", err: 0, status_code: 200 });
          // console.log("done");
        }
      }
    );

  }



  
  module.exports = { addQue,getAllque,getAllquewithSub,delAndUpdate };
