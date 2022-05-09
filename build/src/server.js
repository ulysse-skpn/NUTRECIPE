"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./lib/config/database");
const winston_1 = require("./lib/config/winston");
dotenv_1.default.config();
const PORT = process.env.APP_PORT || 3000;
const HOST = process.env.DB_HOST || "127.0.0.1";
database_1.database.sync()
    .then(() => {
    app_1.default.listen(PORT, () => {
        winston_1.logger.info(`App listening on port ${PORT} , host ${HOST}`);
    });
});
//# sourceMappingURL=server.js.map