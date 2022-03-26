// import express = require("express");
import express, { Application } from "express"
import helmet from "helmet"
import cors from "cors"
import { morganMiddleware } from "./lib/config/morgan"
import { apiErrorHandler } from "./handlers/errorHandler"

import { Routes } from "./routes/routes"

class App
{
    public app: Application = express.application
    public routes: Routes = new Routes()

    constructor()
    {
      this.app = express()
      this.config()
      this.routes.routes(this.app)
    }

    private config(): void
    {
      this.app.use(express.json())
      this.app.use(express.urlencoded({extended:false}))
      this.app.use(helmet())
      this.app.use(cors())
      this.app.use(morganMiddleware)
      this.app.use(apiErrorHandler)
    }
}

export default new App().app

