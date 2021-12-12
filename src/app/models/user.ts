import { Role } from "../types";

export default interface User {
    name: string
    phoneNumber: string
    email?: string
    role: Role
}