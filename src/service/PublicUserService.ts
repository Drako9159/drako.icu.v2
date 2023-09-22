import UserModel from "../domain/model/UserModel";
import config from "../config";
import jwt, { JwtPayload, sign } from "jsonwebtoken";
import mongoose from "mongoose";
import IUser from "../domain/interface/IUser";
import { UserRepository } from "../domain/repository/UserRepository";
import { IUserGet } from "../domain/interface/IUserGet";
import { IUserUpdated } from "../domain/interface/IUserUpdated";
import { IUserConfirmed } from "../domain/interface/IUserConfirmed";

class PublicUserService implements UserRepository {
  private id: string | undefined;
  private firstName: string | undefined;
  private lastName: string | undefined;

  constructor(id?: string, firstName?: string, lastName?: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  async getUser() {
    const isId = mongoose.Types.ObjectId.isValid(this.id as string);
    if (!isId) return "USER_NOT_FOUND";
    const user = await UserModel.findById({ _id: this.id });
    if (!user) return "USER_NOT_FOUND";
    const getUser: IUserGet = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return getUser;
  }

  async updateUser() {
    const isId = mongoose.Types.ObjectId.isValid(this.id as string);
    if (!isId) return "USER_NOT_FOUND";

    const user: IUser = (await UserModel.findByIdAndUpdate(
      { _id: this.id },
      { firstName: this.firstName, lastName: this.lastName },
      { new: true }
    )) as IUser;
    if (!user) return "USER_NOT_FOUND";
    const userUpdated: IUserUpdated = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return userUpdated;
  }

  async createTokenPasswordReset(email: string) {
    const user = await UserModel.findOne({ email: email });
    if (!user) return "USER_NOT_FOUND";
    const jwt = sign(
      { id: user.id, email: user.email },
      config.jwtSecret as string,
      {
        expiresIn: "4h",
      }
    );
    const generate: IUser = (await UserModel.findByIdAndUpdate(
      { _id: user.id },
      { resetPasswordToken: jwt },
      { new: true }
    )) as IUser;
    return "TOKEN_GENERATED";
  }

  isValidJWT(token: string) {
    try {
      jwt.decode(token);
      const auth: string | JwtPayload = jwt.verify(
        token,
        config.jwtSecret as string
      );
      return auth;
    } catch (error) {
      return false;
    }
  }

  async updateConfirmed(token: string) {
    if (!this.isValidJWT(token)) return "FAIL_VALIDATION";
    const auth = this.isValidJWT(token);
    const email = (auth as { email: string }).email;
    const user = await UserModel.findOne({ email: email });
    if (!user) return "USER_NOT_FOUND";
    if (user?.resetPasswordToken !== token) {
      return "FAIL_VALIDATION";
    }
    const update: IUser = (await UserModel.findByIdAndUpdate(
      { _id: user.id },
      { confirmed: true },
      { new: true }
    )) as IUser;

    const userConfirmed: IUserConfirmed = {
      firstName: update.firstName,
      lastName: update.lastName,
      email: update.email,
      role: update.role,
      blocked: update.blocked,
      confirmed: update.confirmed,
      createdAt: update.createdAt,
      updatedAt: update.updatedAt,
    };
    return userConfirmed;
  }
}

export default PublicUserService;
