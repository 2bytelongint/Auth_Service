const express = require('express');
const bodyParser = require('body-parser')
const {PORT} = require('./config/serverConfig')
const apiRoutes = require('./routes/index')
// const db = require('./models/index.js')

const {User, Role} = require('./models/index')

const app = express();

const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended : true
    }))

    app.use('/api', apiRoutes);

    

    app.listen(PORT , async() => {
        if(process.env.DB_SYNC){
            db.sequelize.sync({
                alter : true
            })
        }
        const u1 = await User.findByPk(3);
        const r1 = await Role.findByPk(2);
        const response = await r1.getUsers();
        console.log(response);
        
        console.log(`Server started at ${PORT}`);
        
    })
}

prepareAndStartServer();