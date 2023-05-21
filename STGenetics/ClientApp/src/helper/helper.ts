import { OrderItem } from "../domain/entity/orderItem";
import { CartResume } from "../domain/entity/cartResume";

export class OrderItemHelper {
    public static getCartResume(items: OrderItem[]): CartResume {
        let cartResume = new CartResume();
        if(items.length < 1) {
            return cartResume;
        }
        
        // Obtener el valor total sin descuentos de todos elmentos
        cartResume.subtotalPurchaseAmount = items.reduce((sum, item) => sum + item.quantity * item.element.price, 0);

        // Obtener la suma de descuentos por tipo de elemento individual (descuento 1)
        cartResume.totalPurchaseAmountItems = items.reduce((sum, item) => sum + item.total(), 0);

        // Total de items con descuento
        cartResume.totalItemsWithDiscount = items.filter( i => i.discount() > 0).reduce((sum, item) => sum + item.quantity, 0);

        // Sumar la cantidad de descuento por items
        cartResume.discountPercentagePerItems = items.reduce((sum, item) => sum + item.discount(), 0);
        
        // Aplicar descuento si la cantidad total de elementes supera 10
        cartResume.totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
        
        // Se aplica el descuento al total al total de la compra
        if (cartResume.totalQuantity > 10) {
            cartResume.discountPercentagePerTotal = 0.05;
        }
        
        // Aplicar gastos de envío si la cantidad total de elementes no supera 20
        if (cartResume.totalQuantity <= 20) {
            cartResume.totalShipping = 1000;
        }

        // Aplicar descuento sobre la suma total de la compra (descuento 2)
        cartResume.totalPurchaseAmount = (cartResume.totalPurchaseAmountItems - (cartResume.totalPurchaseAmountItems * cartResume.discountPercentagePerTotal));
        return cartResume;
    }

    public static getTotal(items: OrderItem[]): number {
        return this.getCartResume(items).totalPurchaseAmountItems;
    }

    public static countAll(items: OrderItem[]) {
        return items.reduce((sum, item) => sum + item.quantity, 0);
    }
    
    public static formatPrice(num: number): string {
        return num.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
}
