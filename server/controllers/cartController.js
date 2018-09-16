const Cart = require("../models/cart");
const User = require("../models/user");
const nodemailer = require("nodemailer");

const createCart = (req, res) => {
  User.findOne({
    email: req.loggedInUser.email
  })
    .then(result => {
      if (result) {
        let items = [];
        req.body.listItem.forEach(element => {
          items.push(element._id);
        });
        Cart.create({
          userId: result._id,
          listItem: items,
          totalPrice: req.body.totalPrice
        })
          .then(data => {
            Cart.findOne({ _id: data._id })
              .populate("userId")
              .populate("listItem")
              .then(resultOne => {
                resultOne.listItem.forEach(element => {
                  console.log(element.productName);
                  console.log("masuk kirim email");

                  var transporter = nodemailer.createTransport({
                    service: "gmail",
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: true,
                    auth: {
                      user: "hacktiv8andresudi@gmail.com",
                      pass: process.env.passEmail
                    }
                  });
                  const mailOptions = {
                    from: '"Chronos Music Store" <hacktiv8andresudi@gmail.com>',
                    to: `${req.loggedInUser.email}`,
                    subject: "My History - Transaction (Chronos Music Store)",
                    html: `            
                    <p>Thank You ${req.loggedInUser.name} for spend your money </p>
                    <p>Total transaction : Rp. ${req.body.totalPrice.toLocaleString()}</p>`
                  };

                  transporter.sendMail(mailOptions, function(err, info) {
                    if (err) {
                      res.status(400).json({
                        message: err.message
                      });
                    } else {
                      res.status(200).json({
                        message: `email has been sent!`
                      });
                    }
                  });
                  res.status(201).json({
                    message: `Task Done!`
                  });
                });
              })
              .catch(err => {
                console.log(err);
              });
            res.status(200).json({
              message: "success create a transaction",
              data
            });
          })
          .catch(err => {
            res.status(400).json({
              message: err.message
            });
          });
      } else {
        res.status(400).json({
          message: "you dont have access to do this action"
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

const getAllCart = (req, res) => {
  Cart.find({})
    .populate("userId")
    .populate("listItem")
    .then(data => {
      res.status(200).json({
        data
      });
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

const getOneCart = (req, res) => {
  Cart.findOne({ _id: req.params.id })
    .populate("userId")
    .populate("listItem")
    .then(data => {
      res.status(200).json({
        data
      });
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

module.exports = {
  createCart,
  getAllCart,
  getOneCart
};
