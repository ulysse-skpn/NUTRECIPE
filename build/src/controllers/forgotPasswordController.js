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
exports.ForgotPasswordCtrl = void 0;
const winston_1 = require("../lib/config/winston");
const ApiError_1 = require("../handlers/ApiError");
const ForgotPasswordServiceImpl_1 = require("../service/Impl/ForgotPasswordServiceImpl");
const crypto_1 = __importDefault(require("crypto"));
/**
 * @classdesc Controller of forgot password page
 */
class ForgotPasswordCtrl {
    /**
     * @typedef {Object} internal_server_error
     * @typedef {Object} unknown_error
     * @typedef {Object} not_found
     * @param {Request} req express request
     * @param {Response} res express response
     * @throws { internal_server_error } The new password was not inserted in database
     * @throws { unknown_error }
     * @throws { not_found } User is not found
     */
    forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * instantiate forgot password service implementation
             * @typedef {Object} ForgotPasswordServiceImpl
             * @type {ForgotPasswordServiceImpl}
             * @class
             * @instance
             */
            const forgotPasswordServiceImpl = new ForgotPasswordServiceImpl_1.ForgotPasswordServiceImpl();
            try {
                const login = req.body.email;
                /**
                 * find a user by his login (email)
                 * @typedef {Object} User
                 * @type {(User|null)}
                 * @function findUserByLogin
                 * @param {string} login
                 */
                const user = yield forgotPasswordServiceImpl.findUserByLogin(login);
                if (user) {
                    /**
                     * new password for the user
                     */
                    const password = yield generateNewPassword();
                    if (password) {
                        /**
                         * @type {[affectedCount:number]} affected count
                         * @function saveNewPassword
                         * @param {string} login
                         * @param {string} password
                         */
                        const result = yield forgotPasswordServiceImpl.saveNewPassword(login, password);
                        const newPassword = {
                            newPassword: password
                        };
                        if (result)
                            res.status(200).send(newPassword);
                        else
                            res.status(500).send(ApiError_1.ApiError.internal_server_error("Internal server error"));
                    }
                    else
                        res.status(520).send(ApiError_1.ApiError.unknown_error("An unknown error occured"));
                }
                else
                    res.status(404).send(ApiError_1.ApiError.not_found("User with this login doesn't exist"));
            }
            catch (err) {
                winston_1.logger.error(`Method => FORGOT_PASSWORD : ${err.message}`);
                res.status(520).send(ApiError_1.ApiError.unknown_error(err.message));
            }
        });
    }
}
exports.ForgotPasswordCtrl = ForgotPasswordCtrl;
/**
 * @async
 * @function generateNewPassword generate a random new password (length : 10) for the user
 * @returns {string} password
 */
const generateNewPassword = () => __awaiter(void 0, void 0, void 0, function* () {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$*ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passwordLength = 10;
    let password = "";
    for (let i = 0; i <= passwordLength; i++) {
        const randomNumber = crypto_1.default.randomInt(0, (chars.length - 1));
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
});
//# sourceMappingURL=forgotPasswordController.js.map