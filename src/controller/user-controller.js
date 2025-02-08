const UserService = require('../services/user-service');

const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            email : req.body.email,
            password : req.body.password
        })

        return res.status(201).json({
            success : true,
            message : "Successfully created a user",
            data : response,
            err : {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Something went wrong in the user controller level",
            success : false,
            data : {},
            err : error
        })
        
    }
}

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(201).json({
            success : true,
            message : "Successfully sign in a user",
            data : response,
            err : {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Something went wrong in the user controller level",
            success : false,
            data : {},
            err : error
        })
    }
}


const isAuthenticated = async (req,res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = userService.verifyToken(token);
        return res.status(200).json({
            success : true,
            data : response,
            message : "user is authenticated",
            error : {}
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Something went wrong in the user controller level",
            success : false,
            data : {},
            err : error
        })
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated
}