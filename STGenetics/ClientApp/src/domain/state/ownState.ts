import { ElementEntity } from "../entity/elementEntity";
import { OrderItem } from "../entity/orderItem";

export interface OwnState {
    formErrors: string[];

    total: number;
    orderItems: OrderItem[];
    elements: ElementEntity[];
    currentElement: ElementEntity;

    errorListElements: boolean;
    loadingListElements: boolean;

    errorCreateElement: boolean;
    loadingCreateElement: boolean;
    
    errorUpdateElement: boolean;
    loadingUpdateElement: boolean;

    errorDeleteElement: boolean;
    loadingDeleteElement: boolean;
}