const UserRepository = require('../repo/user-repo');

class UserService {
    constructor(){
        this.userRepository = new UserRepository();

    }

    async create(data){
        try {
            const user = await this.userRepository.createUser(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in the creation of user-service level");
            throw error;
        }
    }
}

module.exports = UserService;