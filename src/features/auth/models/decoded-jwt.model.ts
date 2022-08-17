import { DisplayUser } from "./display-user.model";

export interface DecodedJwt {
  user: DisplayUser;
  exp: number;
  iat: number;
}
