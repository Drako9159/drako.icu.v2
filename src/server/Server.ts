import config from "../config";
import express, { Application } from "express";
import cors from "cors";

//import routerError404 from "../routes/error404.routes";

import { connectDB } from "../db/config";
import path from "node:path";
import cookieParser from "cookie-parser";

import routerAuth from "../network/routes/public/auth.routes";
import routerPublicPost from "../network/routes/public/posts.routes";
import routerAdminPost from "../network/routes/admin/posts.routes";
import routerPublicUser from "../network/routes/public/user.routes";
import routerAdminUser from "../network/routes/admin/user.routes";

import routerClient from "../network/routes/extra/client.routes";

class Server {
  private app: Application;
  private port: string;
  private path = {
    error404: "*",

    client: "/",

    auth: "/api/auth",
    post: "/api/posts",
    user: "/api/users",
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
    this.app.use(this.path.user, routerPublicUser);
    this.app.use(this.path.user, routerAdminUser);
    this.app.use(this.path.post, routerPublicPost);
    this.app.use(this.path.post, routerAdminPost);

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
