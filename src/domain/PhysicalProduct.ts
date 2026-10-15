import { Product } from "./IProduct";

export class PhysicalProduct implements Product {
    id: number 
    name: string 
    price: number

    constructor(id: number, name: string, price: number){
        this.id = id
        this.name = name
        this.price = price
    }
    
    calculateFreight(): number{ 
        return 10;
    }
}