import dotenv from "dotenv"
import http from "http"

import { KEYS } from "./common/config"
import App from "./server"

dotenv.config()

const app = App()
const server = http.createServer(app)

// !TODO: create mongoose connection here

const port = process.env.PORT || KEYS.port
server.listen(port, () => console.log(`App is running on port ${port}`))
