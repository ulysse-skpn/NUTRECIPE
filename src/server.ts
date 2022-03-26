import app from "./app";
import dotenv from "dotenv"
import { database } from "./lib/config/database";
import { logger } from "./lib/config/winston";
import { fetchIngredients } from "./fetchData";

dotenv.config()
const PORT = process.env.APP_PORT || 3000;
const HOST = process.env.DB_HOST || "127.0.0.1";

database.sync()
        .then( () => {
            app.listen( PORT , () => 
            {
                logger.info(`App listening on port ${PORT} , host ${HOST}`)
                // console.log( fetchIngredients() )
            });
        })