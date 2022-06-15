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

    private readonly _allowOrigin  =
    [
      'capacitor://localhost',
      'http://localhost',
      'https://10.0.2.2:3000',
      'https://127.0.0.1:3000',
      'https://localhost:4000',
      'https://localhost:9876', // karma/jasmine
      'https://fonts.gstatic.com/s/materialicons/v126/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2' 
    ]

    private config(): void
    {
      this.app.use(express.json())
      this.app.use(express.urlencoded({extended:false}))
      this.app.use(helmet())
      this.app.use(cors({
        origin: this._allowOrigin,
        methods: ['GET','POST','DELETE','UPDATE','PUT']
      }))
      this.app.use(morganMiddleware)
      this.app.use(apiErrorHandler)
    }
}

export default new App().app

