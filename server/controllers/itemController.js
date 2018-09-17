const Item = require("../models/item");

const getItem = (req, res) => {
  Item.find({})
    .then(data => {
      res.status(200).json({
        message: `get item list`,
        data
      });
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

const addItem = (req, res) => {
  const { artist, productName, img, category, price, stock } = req.body;
  Item.create({
    artist: artist,
    productName: productName,
    img: img,
    category: category,
    price: price,
    stock: stock
  })
    .then(data => {
      res.status(200).json({
        message: `success add item`,
        data
      });
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

const updateItem = (req, res) => {
  const { artist, productName, img, category, price, stock } = req.body;
  Item.findOne({
    _id: req.params.id
  })
    .then(data => {
      if (data) {
        let dataUpdate = {};
        if (artist) dataUpdate.artist = artist;
        if (productName) dataUpdate.productName = productName;
        if (img) dataUpdate.img = img;
        if (category) dataUpdate.category = category;
        if (price) dataUpdate.price = price;
        if (stock) dataUpdate.stock = stock;
        Task.updateOne(
          {
            _id: req.params.id
          },
          dataUpdate
        )
          .then(() => {
            res.status(201).json({
              message: `success update item`
            });
          })
          .catch(err => {
            res.status(400).json({
              message: err.message
            });
          });
      } else {
        res.status(400).json({
          message: `Data Not Found`
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

const deleteItem = (req, res) => {
  Task.findOne({
    _id: req.params.id
  })
    .then(data => {
      if (data) {
        Task.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({
              message: `success delete task`
            });
          })
          .catch(err => {
            res.status(400).json({
              message: err.message
            });
          });
      } else {
        res.status(400).json({
          message: `Data not found`
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

const cd = (req, res) => {
  Item.find({
    category: "cd"
  })
    .then(items => {
      res.status(200).json(items);
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

const merch = (req, res) => {
  Item.find({
    category: "merch"
  })
    .then(items => {
      res.status(200).json(items);
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

const buyItem = (req, res) => {
  console.log('masuk controllerrrs');
  
  
  Item.findById(req.body.id)
    .then(result => {
      if (result) {
        console.log('result find by id ==>',result);
        
        Item.updateOne(
          { _id: req.body.id },
          { $set: { stock: result.stock - 1 } }
        )
          .then(() => {
           
          })
          .catch((err) => {
          
          });
      }
    })
    .catch(err => {
      
    });
};

module.exports = {
  getItem,
  addItem,
  updateItem,
  deleteItem,
  cd,
  merch,
  buyItem
};
