"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiErrorHandler = void 0;
const ApiError_1 = require("./ApiError");
const apiErrorHandler = (err, req, res, newt) => {
    console.error(err);
    if (err instanceof ApiError_1.ApiError) {
        res.status(err.code).json(err.message);
        return;
    }
    res.status(500).json("Internal Server Error");
};
exports.apiErrorHandler = apiErrorHandler;
//# sourceMappingURL=errorHandler.js.map