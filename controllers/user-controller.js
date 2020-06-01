const User = require('../models/schema');

exports.findAll = async (req, res) => {
   
    try{ 
        let result = await User.find().exec();
        res.send(result);
    } catch(err){
        res.send(err.message);
    }
    }

exports.create = async (req, res) => {
    if(!req.body.name){
        res.status(400).send({
            message: "Request body should contain name field of type String"
        });
    }

    if(!req.body.city){
        res.status(400).send({
            message: "Request body should contain city field of type String"
        });
    }

   const user = new User(req.body);

    try{
        let result = await user.save();
        res.send(result);
    } catch(err){
        res.send(err.message);
    }

}