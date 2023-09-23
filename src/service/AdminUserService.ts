import UserModel from "../domain/model/UserModel";
import IUser from "../domain/interface/IUser";
import config from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import { IUserGetAdmin, IUserGetFull } from "../domain/interface/IUserGet";
import { UserRepositoryAdmin } from "../domain/repository/UserRepository";

class AdminUserService implements UserRepositoryAdmin {
  private id: string | undefined;
 
  constructor(id?: string) {
    this.id = id;
  }

  async getUsers() {
    const users = await UserModel.find({});
    const response: IUserGetAdmin[] = users.map((e) => {
      const obj: IUserGetAdmin = {
        id: e._id,
        firstName: e.firstName,
        lastName: e.lastName,
        email: e.email,
        confirmed: e.confirmed,
        role: e.role,
        blocked: e.blocked,
        createdAt: e.createdAt,
        updatedAt: e.updatedAt,
      };
      return obj;
    });
    return response;
  }

  async getUserFull() {
    const isId = mongoose.Types.ObjectId.isValid(this.id as string);
    if (!isId) return "USER_NOT_FOUND";
    const user = await UserModel.findById({ _id: this.id });
    if (!user) return "USER_NOT_FOUND";
    const userFull: IUserGetFull = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      resetPasswordToken: user.resetPasswordToken,
      confirmationToken: user.confirmationToken,
      confirmed: user.confirmed,
      role: user.role,
      blocked: user.blocked,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return userFull;
  }

  async deleteUser() {
    const isId = mongoose.Types.ObjectId.isValid(this.id as string);
    if (!isId) return "USER_NOT_FOUND";
    const user = await UserModel.findByIdAndDelete({ _id: this.id });
    if (!user) return "USER_NOT_FOUND";

    return "USER_DELETED";
  }

  async updateRole(role: string) {
    const isId = mongoose.Types.ObjectId.isValid(this.id as string);
    if (!isId) return "USER_NOT_FOUND";
    const user: IUser = (await UserModel.findByIdAndUpdate(
      { _id: this.id },
      { role: role },
      { new: true }
    )) as IUser;
    if (!user) return "USER_NOT_FOUND";
    const userUpdated: IUserGetAdmin = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      confirmed: user.confirmed,
      role: user.role,
      blocked: user.blocked,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return userUpdated;
  }

  async updateBlocked(blocked: boolean) {
    const isId = mongoose.Types.ObjectId.isValid(this.id as string);
    if (!isId) return "USER_NOT_FOUND";
    const user: IUser = (await UserModel.findByIdAndUpdate(
      { _id: this.id },
      { blocked: blocked },
      { new: true }
    )) as IUser;
    if (!user) return "USER_NOT_FOUND";
    const userUpdated: IUserGetAdmin = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      confirmed: user.confirmed,
      role: user.role,
      blocked: user.blocked,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return userUpdated;
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
}

export default AdminUserService;
