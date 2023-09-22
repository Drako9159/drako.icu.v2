import { IAuthResponse } from "../../domain/interface/IAuthResponse";

export interface AuthRepository {
  register(): Promise<IAuthResponse>;
  login(): Promise<IAuthResponse | string>;
}
