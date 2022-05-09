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
exports.ForgotPasswordServiceImpl = void 0;
const UserRepository_1 = require("../../DAO/UserRepository");
class ForgotPasswordServiceImpl {
    constructor() {
        this.userRepository = new UserRepository_1.UserRepository();
    }
    saveNewPassword(login, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByText(login);
            if (user)
                return this.userRepository.patchPassword(login, newPassword);
            else
                return [0];
        });
    }
    findUserByLogin(login) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findByText(login);
        });
    }
}
exports.ForgotPasswordServiceImpl = ForgotPasswordServiceImpl;
//# sourceMappingURL=ForgotPasswordServiceImpl.js.map