"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
    static badRequest(msg) {
        return new ApiError(400, msg);
    }
    static unauthorized(msg) {
        return new ApiError(401, msg);
    }
    static forbidden(msg) {
        return new ApiError(403, msg);
    }
    static not_found(msg) {
        return new ApiError(404, msg);
    }
    static internal_server_error(msg) {
        return new ApiError(500, msg);
    }
    static unknown_error(msg) {
        return new ApiError(520, msg);
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=ApiError.js.map