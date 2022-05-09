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
exports.UserRepository = void 0;
const database_1 = require("../lib/config/database");
const UserEntity_1 = require("../entity/UserEntity");
class UserRepository {
    constructor() {
        this.userRepository = database_1.database.getRepository(UserEntity_1.User);
    }
    exists(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return !!this.userRepository.findByPk(id);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findByPk(id);
        });
    }
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.create(item);
        });
    }
    put(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                where: { userId: id },
                limit: 1
            };
            return this.userRepository.update(item, options);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                where: { userId: id },
                limit: 1
            };
            return this.userRepository.destroy(options);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findAll();
        });
    }
    findByText(login) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findOne({ where: { email: login } });
        });
    }
    findByLogin(login) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findOne({ where: { email: login } });
        });
    }
    findByLoginPassword(login, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findOne({ where: { email: login, password: password } });
        });
    }
    patchPassword(login, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                where: { email: login },
                limit: 1
            };
            return this.userRepository.update({ password: password }, options);
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map