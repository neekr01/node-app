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
    
   const user = new User(req.body);

    try{
        let result = await user.save();
        res.send(result);
    } catch(err){
        res.send(err.message);
    }

}