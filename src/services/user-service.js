const UserRepository = require('../repo/user-repo');
const jwt = require('jsonwebtoken')
const {JWT_KEY} = require('../config/serverConfig')
const bcrypt = require('bcrypt')

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

    async signIn(email, plainPassword){
        try {
            const user = await this.userRepository.getUserByEmail(email);

            //compare incoming plain password with encrypted password
            
            const comparePassword = this.checkPassword(plainPassword, user.password);

            if(!comparePassword){
                console.log("Password doesn't match");
                throw {error : 'Incorrect Password'};
                
            }

            const newJWT = this.createToken({
                email : user.email,
                id : user.id
            })
            return newJWT;

        } catch (error) {
            console.log("Something went wrong in the sign in process of user-service level");
            throw error;
        }
    }

    async isAuthenticated(token){
        try {
            const isVerified = await this.verifyToken(token);
            if(!isVerified){
                throw {error : 'Invalid token'}
            }

            const user =  this.userRepository.getUserById(isVerified.id);
            if(!user){
                throw {error : 'No user with the corresponding token'};
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in the authentication of token in user-service level");
            throw error;
        }
    }

    createToken(user){
        try {
            const res = jwt.sign(user, JWT_KEY, { expiresIn: '100h' });
            return res;
        } catch (error) {
            console.log("Something went wrong in the creation of token in user-service level");
            throw error;
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in the validation of token in user-service level");
            throw error;
        }
    }

    checkPassword(inputPassword, encryptedPassword){
        try {
            const response = bcrypt.compareSync(inputPassword, encryptedPassword);
            return response;
        } catch (error) {
            console.log("Something went wrong in the comparison of password in user-service level");
            throw error;
        }
    }
}

module.exports = UserService;