const {User} = require('../models/index')

class UserRepository {

    async createUser(data){
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
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
}

module.exports = UserRepository