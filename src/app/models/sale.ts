import { Client } from ".";
import { Unit } from "../types";

export default interface Sale {
    userId: string
    createdAt: Date
    clientId?: string
    client: Client
    discounts: number
    fees: number
    totalAmount: number
    items: {
        productId: string,
        productName: string
        quantity: number
        unit: Unit
        amount: number
    }[]
}