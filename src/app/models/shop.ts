export default interface Shop {
    name: string
    address: string
    accountExpiredAt: Date
    geolocation?: { 
        longitude?: number
        latitude?: number
    }

}