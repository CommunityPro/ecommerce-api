import mongoose from "mongoose"
import dotenv from "dotenv"
import http from "http"

import { KEYS } from "./common/config"
import App from "./server"

dotenv.config()

const app = App()
const server = http.createServer(app)

mongoose.connect(KEYS.mongo_uri)
mongoose.set("strictQuery", false)
const db = mongoose.connection
db.once("open", () => console.log("database connection is established"))
db.on("error", console.error.bind(console, "connection error: "))

const port = process.env.PORT || KEYS.port
server.listen(port, () => console.log(`app is running on http://localhost:${port}`))
