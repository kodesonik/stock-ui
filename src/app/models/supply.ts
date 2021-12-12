import { Provider } from ".";
import { Unit } from "../types";

export default interface Supply {
    userId: string
    createdAt: Date
   providerId?: string
   provider: Provider
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