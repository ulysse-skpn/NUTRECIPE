"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginCtrl = void 0;
const ApiError_1 = require("../handlers/ApiError");
const winston_1 = require("../lib/config/winston");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const LoginServiceImpl_1 = require("../service/Impl/LoginServiceImpl");
/**
 * @classdesc Controller of login page
 */
class LoginCtrl {
    /**
     * @typedef {Object} forbidden
     * @typedef {Object} badRequest
     * @typedef {Object} not_found
     * @param {Request} req express request
     * @param {Response} res express response
     * @throws { forbidden } The password does not correspond to the user
     * @throws { badRequest }
     * @throws { not_found } User is not found
     */
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * instantiate login service implementation
             * @typedef {Object} LoginServiceImpl
             * @type {LoginServiceImpl}
             * @class
             * @instance
             */
            const loginServiceImpl = new LoginServiceImpl_1.LoginServiceImpl();
            try {
                const login = req.body.email;
                const password = req.body.password;
                /**
                 * find if a user exists
                 * @typedef {Object} User
                 * @type {(User|null)}
                 * @function userExist
                 * @param {string} login
                 */
                const user = yield loginServiceImpl.userExist(login);
                if (user) {
                    /**
                    * Compare the password of the user from the database with the password from the client side
                    * @type {boolean}
                    */
                    const result = bcrypt_1.default.compareSync(password, user.password);
                    if (result === true) {
                        const SECRET_KEY = "secretkey23456";
                        const expiresIn = 60 * 60 * 24;
                        const accessToken = jsonwebtoken_1.default.sign({ id: user.id }, SECRET_KEY, {
                            expiresIn: expiresIn
                        });
                        res.status(201).send({ "user": user, "access_token": accessToken, "expires_in": expiresIn });
                    }
                    else
                        res.status(403).send(ApiError_1.ApiError.forbidden("Bad password"));
                }
                else
                    res.status(404).send(ApiError_1.ApiError.not_found("User with this login and/or password not found"));
            }
            catch (err) {
                winston_1.logger.error(`Method => LOGIN : ${err.message}`);
                res.status(400).send(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
}
exports.LoginCtrl = LoginCtrl;
//# sourceMappingURL=loginController.js.map