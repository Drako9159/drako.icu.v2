import config from "../config";
import express, { Application } from "express";
import cors from "cors";
import routerAuth from "../routes/auth.routes";
//import routerError404 from "../routes/error404.routes";
import routerUser from "../routes/user.routes";
import routerPost from "../routes/posts.routes";

import routerAdmin from "../routes/admin/admin.routes";
import routerClient from "../routes/client.routes";
import { connectDB } from "../db/config";
import path from "node:path";
import cookieParser from "cookie-parser";

import routerPostPublic from "../network/routes/public/posts.routes";
import routerPostAdmin from "../network/routes/admin/posts.routes";

class Server {
  private app: Application;
  private port: string;
  private path = {
    error404: "*",
    auth: "/api/auth",
    user: "/api/users",
    post: "/api/posts",
    client: "/",

    postV2: "/api/v2/posts",

    admin: "/api/admin",
  };
  private corsOptions = {
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      config.clientFly,
      config.clientSecure,
      config.clientVercel,
    ],
    exposedHeaders: ["authorization", "token"],
    credentials: true,
  };

  constructor() {
    this.app = express();
    this.port = config.port as string;

    this.middlewares();
    this.routes();
    this.dbConnect();
  }

  async dbConnect() {
    await connectDB();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(cors(this.corsOptions));
    this.app.use(express.static(path.join(process.cwd(), "./client/dist")));
  }

  routes() {
    this.app.use(this.path.auth, routerAuth);

    this.app.use(this.path.user, routerUser);

    //this.app.use(this.path.post, routerPost);

    this.app.use(this.path.postV2, routerPostPublic);

    this.app.use(this.path.postV2, routerPostAdmin);

    this.app.use(this.path.admin, routerAdmin);

    this.app.use(this.path.client, routerClient);

    //this.app.use(this.path.error404, routerError404);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`[server] run on port ${this.port}`);
    });
  }
}

export default Server;
