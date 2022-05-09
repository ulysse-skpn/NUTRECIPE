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
exports.RegisterCtrl = void 0;
const ApiError_1 = require("../handlers/ApiError");
const winston_1 = require("../lib/config/winston");
const RegisterServiceImpl_1 = require("../service/Impl/RegisterServiceImpl");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usersController_1 = require("./usersController");
/**
 * @classdesc Controller of register page
 */
class RegisterCtrl {
    /**
     * @typedef {Object} internal_server_error
     * @param {Request} req express request
     * @param {Response} res express response
     * @throws { internal_server_error } The user was not inserted in the database
     */
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const SECRET_KEY = "secretkey23456";
            /**
             * instantiate register service implementation
             * @typedef {Object} registerServiceImpl
             * @type {RegisterServiceImpl}
             * @class
             * @instance
             */
            const registerServiceImpl = new RegisterServiceImpl_1.RegisterServiceImpl();
            try {
                /**
                 * @throws {Error} User object is malformed
                 */
                if (!(0, usersController_1.isUser)(req.body))
                    throw Error("User object is malformed");
                /**
                 * hash of the password
                 */
                bcrypt_1.default.hash(req.body.password, 10, (err, hash) => __awaiter(this, void 0, void 0, function* () {
                    req.body.last_name = req.body.last_name.toUpperCase();
                    req.body.password = hash;
                    const user = req.body;
                    /**
                     * Create a user
                     * @typedef {Object} User
                     * @type {User}
                     * @function createUser
                     * @param {User} user
                     */
                    const createdUser = yield registerServiceImpl.createUser(user);
                    if (createdUser) {
                        createdUser.password = hash;
                        const expiresIn = 24 * 60 * 60;
                        const accessToken = jsonwebtoken_1.default.sign({ id: createdUser.id }, SECRET_KEY, {
                            expiresIn: expiresIn
                        });
                        res.status(201).send({ "user": createdUser, "access_token": accessToken, "expires_in": expiresIn });
                    }
                    else
                        res.status(500).send(ApiError_1.ApiError.internal_server_error(err.message));
                }));
            }
            catch (err) {
                winston_1.logger.error(`Method => REGISTER : ${err.message}`);
                res.status(500).send(ApiError_1.ApiError.internal_server_error(err.message));
            }
        });
    }
}
exports.RegisterCtrl = RegisterCtrl;
//# sourceMappingURL=registerController.js.map