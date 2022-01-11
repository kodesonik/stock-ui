import { Url } from "url";
import { Role } from "../types";

export default interface User {
    id?: string,
    name: string
    phoneNumber: string
    email?: string
    role: Role
    avatar?: Url
    shopId?: string
}