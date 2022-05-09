"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = require("./lib/config/morgan");
const errorHandler_1 = require("./handlers/errorHandler");
const routes_1 = require("./routes/routes");
class App {
    constructor() {
        this.app = express_1.default.application;
        this.routes = new routes_1.Routes();
        this._allowOrigin = [
            'https://127.0.0.1:3000',
            'https://localhost:4000',
            'https://fonts.gstatic.com/s/materialicons/v126/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2'
        ];
        this.app = (0, express_1.default)();
        this.config();
        this.routes.routes(this.app);
    }
    config() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use((0, helmet_1.default)());
        this.app.use((0, cors_1.default)({
            origin: this._allowOrigin,
            methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT']
        }));
        this.app.use(morgan_1.morganMiddleware);
        this.app.use(errorHandler_1.apiErrorHandler);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map