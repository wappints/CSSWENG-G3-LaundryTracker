
// import module `database` from `../models/db.js`
const { request } = require('express');
const db = require('../models/db.js');

// import module `System` from `../models/SystemModel.js`
const System = require('../models/SystemModel.js');
const bcrypt = require ('bcrypt');

const { validationResult } = require('express-validator');
/*
    defines an object which contains functions executed as callback
    when a client requests for `signup` paths in the server
*/
const systemController = {

    getSystem : function (req, res) {

        res.render("login", {})
},
    postLogin: function (req, res) {
    var errors = validationResult(req);

    if(errors.isEmpty()){
        var ACCType = req.body.ACCType;
        var PASSField = req.body.PASSField;
        console.log(PASSField)
    

       if (ACCType === "EMPLOYEE")
       {
        db.findOne(System, {EMPPass : PASSField}, {}, function(result){
            console.log(result)
            if (result != null){
                    if(result.EMPPass === PASSField){
                        console.log("FOUND")
                        res.render('home', {ACCType : ACCType, layout : 'mainLayout'});
                    }
                    else{
                        console.log("NOT FOUND")
                        var details = {
                            loginError : `Password is incorrect`
                        }
                        res.render("login", details);
                    }

                }
            else{
                console.log("NOT FOUND 2")
                var details = {
                    loginError : `Password is not associated with any account`
                }
                res.render("login", details);
            }
        });
    }
    else 
    {
        db.findOne(System, {ADMINPass : PASSField}, {}, function(result){
            console.log(result)
            if (result != null){
                    if(result.ADMINPass === PASSField){
                        console.log("FOUND")
                        res.render('home', {ACCType : ACCType, layout : 'mainLayout'});
                    }
                    else{
                        console.log("NOT FOUND")
                        var details = {
                            loginError : `Password is incorrect`
                        }
                        res.render("login", details);
                    }

                }
            else{
                console.log("NOT FOUND 2")
                var details = {
                    loginError : `Password is not associated with any account`
                }
                res.render("login", details);
            }
        });
    }
    }
    else{

        var details = {};


        res.render('login', details);
    }
}
}
module.exports = systemController;
