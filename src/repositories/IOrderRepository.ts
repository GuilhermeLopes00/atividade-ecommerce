
export interface ProductData {
    id: number
    name: string
    type: string
    price: number
}

export interface IOrderRepository {
    findProduct(id: number): Promise<any>
    create(customer: string, items: string, total: number, status: string): Promise<any>
}