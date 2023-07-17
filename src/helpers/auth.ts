import { User } from "../models/User";
import { sign } from "jsonwebtoken";
import config from "../config";

class Auth {
  private firstName: string | undefined;
  private lastName: string | undefined;
  private email: string;
  private password: string;
  constructor(
    email: string,
    password: string,
    firsName?: string,
    lastName?: string
  ) {
    this.email = email;
    this.password = password;
    this.firstName = firsName;
    this.lastName = lastName;
  }

  async register() {
    const userDB = await new User({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: await User.encryptPassword(this.password),
    });
    const saveUser = await userDB.save();
    const jwt = sign(
      { id: userDB.id, type: userDB.type },
      config.jwtSecret as string,
      {
        expiresIn: "4h",
      }
    );
    return {
      user: {
        id: userDB._id,
        firstName: userDB.firstName,
        lastName: userDB.lastName,
        email: userDB.email,
        createdAt: userDB.createdAt,
        updatedAt: userDB.updatedAt,
        type: userDB.type,
      },
      jwt,
    };
    // return jwt;
  }

  async findOneUser() {
    return await User.findOne({ email: this.email });
  }

  async login() {
    const userDB = await User.findOne({ email: this.email });

    if (!userDB) return "Wrong email!!";
    const validPassword = await User.comparePassword(
      this.password,
      userDB.password
    );
    if (!validPassword) return "Wrong password!!";
    const jwt = sign(
      { id: userDB.id, type: userDB.type },
      config.jwtSecret as string,
      {
        expiresIn: "4h",
      }
    );
    return {
      user: {
        id: userDB._id,
        firstName: userDB.firstName,
        lastName: userDB.lastName,
        email: userDB.email,
        createdAt: userDB.createdAt,
        updatedAt: userDB.updatedAt,
        type: userDB.type,
      },
      jwt
    };
    // return jwt;
  }
}

export default Auth;
