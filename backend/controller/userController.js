const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const usermodel = require("../model/users");
const configData = require('../config/config');

const config = configData.config();

exports.loginUser = (req, res, next) => {
                let fetchedUser;
                usermodel.findOne({
                    email: req.body.email
                }).then(result => {
                    if (!result) {
                        res.status(200);
                        res.json({
                            message: "User not found",
                            statua: false
                        });
                    }
                    fetchedUser = result;
                    return bcrypt.compare(req.body.password, result.password);
                }).then(result => {
                    if (!result) {
                        res.status(200);
                        res.json({
                            message: "Wrong Password",
                            statua: false
                        });
                    }
                    //sign jwt token
                    const token = jwt.sign({
                        email: fetchedUser.email,
                        userId: fetchedUser._id
                    },
                        config.jwt,
                        { expiresIn: "1h" });
                    console.log(result);
                    res.status(200);
                    res.json({
                        statua: true,
                        message: "Successfull login",
                        token: token
                    });
                }).catch(error => {
                    res.status(500);
                    res.json({
                        statua: false,
                        error: error
                    });
                });
}


exports.getUserList = (req, res, next) => {
    usermodel.find({}, { password: 0 }).then(records => {
        res.status(200);
        res.json({
            statua: true,
            data: records
        });
    }).catch(err => {
        res.status(500);
        res.json({
            statua: false
        });
    });

}

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, config.saltRounds).then(function (hash) {
        req.body.password = hash
        return usermodel(req.body).save();
    }).then(result => {
        res.status(200);
            res.json({
                statua: true,
                message: "User Created Successfully",
                result : result
            });
    }).catch(error => {
            console.log(error)
            res.status(500);
            res.json({
                statua: false,
                message : "Unable to save user"
            });
        });
}

exports.updateUser = (req, res, next) => {
    usermodel.updateOne({ _id: req.params.id }, req.body).then(result => {
        console.log(result);
        res.status(200);
        res.json({
            statua: true,
            result: result
        });
    }).catch(error => {
        console.log(error)
        res.status(500);
        res.json({
            statua: false
        });
    });
}

exports.deleteUser = (req, res, next) => {
    usermodel.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200);
        res.json({
            statua: true
        });
    }).catch(error => {
        console.log(error)
        res.status(500);
        res.json({
            statua: false
        });
    });
}

exports.getUserById = (req, res, next) => {
    usermodel.findOne({ _id: req.params.id }, { password: 0 }).then(records => {
        res.status(200);
        res.json({
            statua: true,
            data: records
        });
    }).catch(err => {
        res.status(500);
        res.json({
            statua: false
        });
    });
}