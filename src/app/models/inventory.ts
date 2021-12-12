import { Unit } from "../types";

export default interface Inventory {
    userId: string
    startedAt: Date
    endedAt: Date
    desctription: string
    items: { 
        productId: string
        productName: string
        quantityExpected: number
        quantityCounted: number
        unit: Unit
    }[]

}