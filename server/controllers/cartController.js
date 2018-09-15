const Cart = require("../models/cart");
const User = require("../models/user");

const createCart = (req, res) => {
  User.findOne({
    email: req.loggedInUser.email
  })
    .then(result => {
      console.log('result find one di cart',result);

      if (result) {
        let items = [];
        req.body.listItem.forEach(element => {
          items.push(element);
        });
        Cart.create({
          userId: result._id,
          listItem: items,
          totalPrice: req.body.totalPrice
        })
          .then(data => {
              console.log('hasil trx', data);
              
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
  Cart.find({}).populate('userId').populate('listItem')
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
  getAllCart
};
