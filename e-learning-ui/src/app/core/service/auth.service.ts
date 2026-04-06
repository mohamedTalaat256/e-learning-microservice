import { Injectable, signal } from "@angular/core";
import { AuthUser } from "../model/authUser.model";
import { KeycloakUserInfo } from "keycloak-js";


@Injectable({ providedIn: 'root' })
export class AuthService{

  authenticated = signal(false);
  authUser = signal<KeycloakUserInfo | null>(null);

}


