const { where} = require('sequelize');
const {User ,Role} = require('../models/index');
const ValidationError = require('../utils/validation-error');

class UserRepository {

    async createUser(data){
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                throw new ValidationError(error);
                
            }
            
            
            console.log("Something went wrong in the creation of user-repo level");
            throw error;
        }
    }

    async destroyUser(userId){
        try {
            const response = await User.destroy({
                where : {
                    id : userId
                }
            });
            return response;
        } catch (error) {
            console.log("Something went wrong in the deletion of user-repo level");
            throw error;
        }
    }

    async getUserById(userId){
        try {
            const user = await User.findByPk(userId,{
                attributes: ['email', 'id'],
            });
            return user;
        } catch (error) {
            console.log("Something went wrong in the getByID of user-repo level");
            throw error;
        }
    }

    async getUserByEmail(userEmail){
        try {
            const user = await User.findOne({
                where : {
                    email : userEmail
                }
            });
            return user;
        } catch (error) {
            console.log("Something went wrong in the get user by email of user-repo level");
            throw error;
        }
    }

    async isAdmin(userId){
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
            where : {
                name : 'ADMIN'
            }
        })
        return user.hasRole(adminRole);
        } catch (error) {
            console.log("Something went wrong in the isAdmin function of user-repo level");
            throw error;
        }
    }
}

module.exports = UserRepository