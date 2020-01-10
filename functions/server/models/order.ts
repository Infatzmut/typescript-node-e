export interface Order{
    id? :String,
    orderDate: String,
    products: Array<orderProduct>
    status: String,
    totalPrice: number
}

interface orderProduct {
    id: String,
    quantity: number,
    subtotal: number
}