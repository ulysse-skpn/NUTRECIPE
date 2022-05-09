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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = exports.UsersCtrl = void 0;
const winston_1 = require("../lib/config/winston");
const ApiError_1 = require("../handlers/ApiError");
const UserServiceImpl_1 = require("../service/Impl/UserServiceImpl");
/**
 * @classdesc Controller of users
 */
class UsersCtrl {
    /**
     * Get All users
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @returns {User[]} Array of users
     * @typedef {Object} badRequest
     * @throws {badRequest}
     */
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * instantiate user service implementation
             * @typedef {Object} UserServiceImpl
             * @type {UserServiceImpl}
             * @class
             * @instance
             */
            const userServiceImpl = new UserServiceImpl_1.UserServiceImpl();
            try {
                /**
                 * Get all users
                 * @typedef {Object} User
                 * @type {User}
                 * @function getAllUsers
                 */
                const usersList = yield userServiceImpl.getAllUsers();
                res.status(200).send(usersList);
            }
            catch (err) {
                winston_1.logger.error(`Method => GET ALL Users : ${err.message}`);
                res.status(400).send(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    /**
     * Get the size of all users array
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @typedef {Object} badRequest
     * @throws {badRequest}
     */
    getAllSize(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * instantiate user service implementation
             * @typedef {Object} UserServiceImpl
             * @type {UserServiceImpl}
             * @class
             * @instance
             */
            const userServiceImpl = new UserServiceImpl_1.UserServiceImpl();
            try {
                /**
                 * Get number of users
                 * @function getNumberElements
                 */
                const size = yield userServiceImpl.getNumberElements();
                res.status(200).send(size[0][0]);
            }
            catch (err) {
                winston_1.logger.error(`Method => GET ALL Users size : ${err.message}`);
                res.status(400).send(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    /**
     * Get an user by id
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @typedef {Object} badRequest
     * @typedef {Object} not_found
     * @throws {badRequest}
     * @throws {not_found} user was not found in the database
     */
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id;
            /**
             * instantiate user service implementation
             * @typedef {Object} UserServiceImpl
             * @type {UserServiceImpl}
             * @class
             * @instance
             */
            const userServiceImpl = new UserServiceImpl_1.UserServiceImpl();
            try {
                /**
                 * @param {string} req.params.id
                 */
                id = parseInt(req.params.id);
                /**
                 * @throws {Error} Id is not a number
                 */
                if (isNaN(id))
                    throw Error("User Id is not a number");
                /**
                 * Get a user by his id
                 * @typedef {Object} User
                 * @type {User}
                 * @function getUserById
                 * @param {number} id
                 */
                const user = yield userServiceImpl.getUserById(id);
                if (user)
                    res.status(200).send(user);
                else
                    res.status(404).send(ApiError_1.ApiError.not_found("There is no user with this id"));
            }
            catch (err) {
                winston_1.logger.error(`Method => GET User BY ID : ${err.message}`);
                res.status(400).send(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    /**
     * Create a user
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @typedef {Object} badRequest
     * @throws {badRequest}
     */
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * instantiate user service implementation
             * @typedef {Object} UserServiceImpl
             * @type {UserServiceImpl}
             * @class
             * @instance
             */
            const userServiceImpl = new UserServiceImpl_1.UserServiceImpl();
            try {
                /**
                 * @throws {Error} Object is malformed
                 */
                if (!(0, exports.isUser)(req.body))
                    throw Error("User object is malformed");
                /**
                 * Request from client side
                 */
                const user = req.body;
                /**
                 * Add a user
                 * @typedef {Object} User
                 * @type {User}
                 * @function addUser
                 * @param {User} user
                 */
                const result = yield userServiceImpl.addUser(user);
                res.status(201).send(result);
            }
            catch (err) {
                winston_1.logger.error(`Method => POST User : ${err.message}`);
                res.status(400).send(ApiError_1.ApiError.badRequest(err.message));
            }
        });
    }
    /**
     * Update a user
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @typedef {Object} not_found
     * @throws {not_found} user is not found
     */
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id;
            /**
             * instantiate user service implementation
             * @typedef {Object} UserServiceImpl
             * @type {UserServiceImpl}
             * @class
             * @instance
             */
            const userServiceImpl = new UserServiceImpl_1.UserServiceImpl();
            try {
                /**
                 * @param {string} req.params.id
                 */
                id = parseInt(req.params.id);
                /**
                 * @throws {Error} Id is not a number
                 */
                if (isNaN(id))
                    throw Error("User Id is not a number");
                /**
                 * @throws {Error} Object is malformed
                 */
                if (!(0, exports.isUser)(req.body))
                    throw Error("User object is malformed");
                /**
                 * Request from client side
                 */
                const user = req.body;
                /**
                 * Update a user
                 * @typedef {Object} User
                 * @type {[affectedCount:number]}
                 * @function updateUser
                 * @param id
                 * @param {User} user
                 */
                const result = yield userServiceImpl.updateUser(id, user);
                if (result)
                    res.status(202).send(result);
                else
                    res.status(404).send(ApiError_1.ApiError.not_found("There is no user with this id"));
            }
            catch (err) {
                winston_1.logger.error(`Method => PUT User : ${err.message}`);
                res.status(400).send(ApiError_1.ApiError.not_found(err.message));
            }
        });
    }
    /**
     * Delete a user
     * @async
     * @method
     * @param {Request} req express request
     * @param {Response} res express response
     * @typedef {Object} not_found
     * @throws {not_found} user is not found
     */
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id;
            /**
             * instantiate user service implementation
             * @typedef {Object} UserServiceImpl
             * @type {UserServiceImpl}
             * @class
             * @instance
             */
            const userServiceImpl = new UserServiceImpl_1.UserServiceImpl();
            try {
                /**
                 * @param {string} req.params.id
                 */
                id = parseInt(req.params.id);
                /**
                 * @throws {Error} Id is not a number
                 */
                if (isNaN(id))
                    throw Error("User Id is not a number");
                /**
                 * Delete a user
                 * @function deleteUser
                 * @param {number} id
                 */
                yield userServiceImpl.deleteUser(id);
                res.status(204).send(true);
            }
            catch (err) {
                winston_1.logger.error(`Method => DELETE User : ${err.message}`);
                res.status(400).send(ApiError_1.ApiError.not_found(err.message));
            }
        });
    }
}
exports.UsersCtrl = UsersCtrl;
/**
 *
 * @param obj
 * @returns {boolean}
 */
const isUser = (obj) => {
    if (obj.hasOwnProperty("last_name")
        && obj.hasOwnProperty("first_name")
        && obj.hasOwnProperty("phone_number")
        && obj.hasOwnProperty("email")
        && obj.hasOwnProperty("password")
        && obj.hasOwnProperty("role")
        && obj.hasOwnProperty("receiveEmail")
        && obj.hasOwnProperty("receiveNotification"))
        return true;
    else
        return false;
};
exports.isUser = isUser;
//# sourceMappingURL=usersController.js.map