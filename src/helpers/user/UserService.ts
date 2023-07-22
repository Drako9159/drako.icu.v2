import { User } from "../../models/User";
import { IUser } from "../../interfaces/IUser";
import config from "../../config";
import jwt, { JwtPayload, sign } from "jsonwebtoken";

class UserService {
  private id: string | undefined;
  private firstName: string | undefined;
  private lastName: string | undefined;

  constructor(id?: string, firstName?: string, lastName?: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  static async getUsers() {
    const users = await User.find({});
    const response = users.map((e) => {
      const obj = {
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

  async getUser() {
    const user = await User.findById({ _id: this.id });
    if (!user) return "USER_NOT_FOUND";
    return {
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
  }

  async deleteUser() {
    const user = await User.findByIdAndDelete({ _id: this.id });
    if (!user) return "USER_NOT_FOUND";
    return user;
  }

  async updateUser() {
    const user: IUser = (await User.findByIdAndUpdate(
      { _id: this.id },
      { firstName: this.firstName, lastName: this.lastName },
      { new: true }
    )) as IUser;
    if (!user) return "USER_NOT_FOUND";
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async updateRole(role: string) {
    const user: IUser = (await User.findByIdAndUpdate(
      { _id: this.id },
      { role: role },
      { new: true }
    )) as IUser;
    if (!user) return "USER_NOT_FOUND";
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      blocked: user.blocked,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async updateBlocked(blocked: boolean) {
    const user: IUser = (await User.findByIdAndUpdate(
      { _id: this.id },
      { blocked: blocked },
      { new: true }
    )) as IUser;
    if (!user) return "USER_NOT_FOUND";
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      blocked: user.blocked,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static async updateConfirmed(token: string) {
    const auth: string | JwtPayload = jwt.verify(
      token,
      config.jwtSecret as string
    );
    const email = (auth as { email: string }).email;
    const user = await User.findOne({ email: email });
    if (!user) return "USER_NOT_FOUND";
    if (user?.resetPasswordToken !== token) {
      return "FAIL_VALIDATION";
    }
    const update: IUser = (await User.findOneAndUpdate(
      { email: email },
      { confirm: true },
      { new: true }
    )) as IUser;
    return {
      firstName: update.firstName,
      lastName: update.lastName,
      email: update.email,
      role: update.role,
      blocked: update.blocked,
      confirmed: update.confirmed,
      createdAt: update.createdAt,
      updatedAt: update.updatedAt,
    };
  }

  static async createTokenPasswordReset(email: string) {
    const user = await User.findOne({ email: email });
    if (!user) return "USER_NOT_FOUND";
    const jwt = sign(
      { id: user.id, email: user.email },
      config.jwtSecret as string,
      {
        expiresIn: "4h",
      }
    );
    const generate: IUser = (await User.findByIdAndUpdate(
      { _id: user.id },
      { resetPasswordToken: jwt },
      { new: true }
    )) as IUser;
    return {
      token: generate.resetPasswordToken,
    };
  }
}

export default UserService;
