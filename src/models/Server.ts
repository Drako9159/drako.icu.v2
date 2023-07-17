import config from "../config";
import express, { Application } from "express";
import cors from "cors"
import routerAuth from "../routes/auth.routes"
import routerError404 from "../routes/error404.routes"
import routerUser from "../routes/user.routes"
import routerPost from "../routes/posts.routes"
import { connectDB } from "../db/config";

class Server {
  private app: Application;
  private port: string;
  private path = {
    error404: "*",
    auth: "/api/auth",
    user: "/api/users",
    post: "/api/posts"
  };

  constructor() {
    this.app = express();
    this.port = config.port as string;

    this.middlewares();
    this.routes();
    this.dbConnect();
  }

  async dbConnect(){
    await connectDB()
  }

  middlewares(){
    this.app.use(express.json())
    this.app.use(cors())
  }

  routes(){
    this.app.use(this.path.auth, routerAuth)

    this.app.use(this.path.user, routerUser)

    this.app.use(this.path.post, routerPost)

    this.app.use(this.path.error404, routerError404)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`[server] run on port ${this.port}`);
    });
  }
}

export default Server;