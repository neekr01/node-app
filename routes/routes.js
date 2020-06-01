const users = require('../controllers/user-controller');

module.exports = (app) => {

   app.get('/', (req,res) => {
        res.send("Welcome to my first node app")
    });

   app.get('/user', users.findAll);

   app.post('/user', users.create);

}
