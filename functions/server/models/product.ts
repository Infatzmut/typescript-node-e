export interface Product {
    id?: String,
    comments? : {
        description :String,
        raiting: number,
        user_id: String
    },
    info: {
        description: String,
        name: String,
        pathToImg : Array<String>,
        price: number,
        color?: {
            name: String,
            stock: number
        },
        stock?: number
    }
}