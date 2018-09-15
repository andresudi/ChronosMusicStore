const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const {
  OAuth2Client
} = require('google-auth-library');
require("dotenv").config();

const register = (req, res) => {
  const { name, email, password, role } = req.body;
  User.findOne({
    email: email
  })
    .then(user => {
      if (!user || user == undefined) {
        User.create({
          name: name,
          email: email,
          password: password,
          role: role
        })
          .then(data => {
            res.status(200).json({
              message: `success add new user`,
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
          message: "email is already exist"
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

const getAllUser = (req, res) => {
  User.find({})
    .then(data => {
      if (data.length == 0) {
        res.status(404).json({
          message: `cannot get users data`,
          data
        });
      } else {
        res.status(200).json({
          message: `succes get all users`,
          data
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        message: `Something is wrong`,
        err
      });
    });
};

const login = (req, res) => {
    const { email, password } = req.body;
    User.findOne({
      email: email
    })
      .then(data_user => {
        if (data_user) {
          
          let check_pass = bcrypt.compareSync(password, data_user.password);
          if (check_pass) {
    
            let token = jwt.sign(
              { id: data_user._id, name: data_user.name, email: data_user.email },
              process.env.jwt_secret
            );
            res.status(200).json({
              message: `Login Success!`,
              token,
              name: data_user.name,
              email: data_user.email,
              role: data_user.role
            });
          } else {
            res.status(400).json({
              message: `Password is invalid!`
            });
          }
        } else {
          res.status(400).json({
            message: `Email is invalid!`
          });
        }
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  };

const loginGoogle = (req, res) => {
  console.log(req.body)
    let token = req.body.token
    let CLIENT_ID = '466835311800-hojoupioll4383a85598eoehcs5akr86.apps.googleusercontent.com'
    const client = new OAuth2Client(CLIENT_ID);
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        axios({
                method: 'get',
                url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`,
                json: true
            })
            .then(userInfo => {                
                console.log(userInfo.data);
                var email = userInfo.data.email
                User.findOne({
                        email
                    })
                    .then(user => {
                        if (user == null) {
                            User.create({
                                    name: userInfo.data.name,
                                    email: userInfo.data.email,
                                    password: userInfo.data.email
                                })
                                .then(dataUser => {
                                    jwt.sign({
                                        id: dataUser.id
                                    }, process.env.jwt_secret, function (err, token) {
                                        if (err) {
                                            res.status(200).json({
                                                msg: 'invalid password'
                                            })
                                        } else {
                                            res.status(200).json({
                                                dataUser,
                                                msg: 'success register new Account',
                                                token
                                            })
                                        }
                                    })
                                })
                                .catch(err => {
                                    console.log(err)
                                    res.status(400).json(err)
                                })
                        } else {
                            jwt.sign({
                                id: user.id
                            },  process.env.jwt_secret, function (err, token) {
                                if (err) {
                                    res.status(400).json({
                                        msg: 'invalid password'
                                    })
                                } else {
                                    res.status(200).json({
                                        user,
                                        msg: 'success login',
                                        token
                                    })
                                }
                            })
                        }

                    })
            })
            .catch(err => {
                console.log('masuk err ===>');
                console.log(err);

            })
    }
    verify().catch(console.error);
}

module.exports = {
  register,
  getAllUser,
  login,
  loginGoogle
};
