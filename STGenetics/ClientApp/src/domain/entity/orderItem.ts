import { ElementEntity } from "./elementEntity";

export class OrderItem {
    private static counter = 0;
    public id: number = 0;
    
    constructor(
        public element: ElementEntity, 
        public quantity: number
    ) { 
        ++OrderItem.counter;
        this.id = OrderItem.counter;
    }

    public static create(): OrderItem {
        let element = new ElementEntity();
        element.name = "asd";
        element.price = 100;
        let orderItem = new OrderItem(element, 1);
        return orderItem;
    }

    public discount(): number {
        let totalDiscount = 0;
        if(this.quantity > 5) {
            totalDiscount = 0.05;
        }
        return totalDiscount;
    }

    public total(): number {
        let discountPerAnimal = this.element.price * this.discount();
        return this.quantity * (this.element.price) - discountPerAnimal;
    }
}
