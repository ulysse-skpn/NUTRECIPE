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
exports.UserServiceImpl = void 0;
const UserRepository_1 = require("../../DAO/UserRepository");
const database_1 = require("../../lib/config/database");
class UserServiceImpl {
    constructor() {
        this.userRepository = new UserRepository_1.UserRepository();
    }
    userExist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.exists(id);
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findAll();
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findById(id);
        });
    }
    addUser(item) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.create(item);
        });
    }
    updateUser(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.put(id, item);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.delete(id);
        });
    }
    getNumberElements() {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.database.query("SELECT COUNT(id) as nbElem FROM `users`");
        });
    }
}
exports.UserServiceImpl = UserServiceImpl;
//# sourceMappingURL=UserServiceImpl.js.map