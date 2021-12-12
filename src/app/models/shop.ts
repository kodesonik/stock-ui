export default interface Shop {
    name: string
    address: string
    geolocation?: { 
        longitude?: number
        latitude?: number
    }

}