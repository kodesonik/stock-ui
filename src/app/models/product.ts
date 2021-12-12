import { Unit } from "../types";

export default interface Product {
    categoryId: string
    name: string
    price: number
    cost: number
    quantity: number
    unitWhole: Unit
    unitDetail: Unit
    unitWholeCapacity: number
}