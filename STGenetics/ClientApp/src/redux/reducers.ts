
import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 
import { ElementEntity } from "../domain/entity/elementEntity";
import { RootState } from "./store";
import { OwnState } from "../domain/state/ownState";
import { OrderItem } from "../domain/entity/orderItem";
import { OrderItemHelper } from '../helper/helper';

const initialState: OwnState = {
    formErrors: [],

    total: 0,
    orderItems: [],
    elements: [],
    currentElement: null,
    
    errorListElements: false,
    loadingListElements: false,

    errorCreateElement: false,
    loadingCreateElement: false,

    errorUpdateElement: false,
    loadingUpdateElement: false,

    errorDeleteElement: false,
    loadingDeleteElement: false
};

export const elementsSlice = createSlice({
    name: 'elements',
    initialState,
    reducers: {
        setFormErrors: (state, action: PayloadAction<string[]>) => {
            state.formErrors = action.payload;
        },
        addOrderItemElement: (state, action: PayloadAction<ElementEntity>) => {
            let exists = state.orderItems.find( item => item.element.id == action.payload.id);
            if(exists) {
                state.orderItems = state.orderItems.map( item => {
                    if(item.id == exists.id) {
                        ++item.quantity;
                    }
                    return item;
                });
            } else {
                let orderItem = new OrderItem(action.payload, 1);
                state.orderItems.push(orderItem);
            }
        },
        addOrderItem: (state, action:  PayloadAction<OrderItem>) => {
            state.orderItems.push(action.payload);
        },
        removeOrderItem: (state, action:  PayloadAction<OrderItem>) => {
            state.orderItems = state.orderItems.filter( item => item.id !== action.payload.id);
        },
        setOrderItemQuantity: (state, action:  PayloadAction<{ id: number, quantity: number}>) => {
            state.orderItems = state.orderItems.map( item => {
                if(item.id == action.payload.id) {
                    item.quantity += action.payload.quantity;
                }
                if(item.quantity == 0){
                    return null
                }
                return item;
            }).filter( item => item !== null);
        },
        clearOrderItems: (state) => {
            state.orderItems = [];
        },

        updateElementProps: (state, action: PayloadAction<{id: number, key: string, value: any}>) => {
            state.elements = state.elements.map( (element: any) => {
                if(element.id === action.payload.id) {
                    element[action.payload.key] = action.payload.value;
                    element.updated = true;
                }
                return element;
            })
        },
        updateCurrentElement: (state, action: PayloadAction<ElementEntity>) => {
            state.currentElement = action.payload;
        },
        setElementActive: (state, action: PayloadAction<{element: ElementEntity, active: boolean}>) => {
            state.elements = state.elements.map( element => {
                if(element.id == action.payload.element.id) {
                    element.active = action.payload.active;
                }
                return element;
            })
        },
        setSelectedElements: (state, action: PayloadAction<{active: boolean}>) => {
            state.elements = state.elements.map( element => {
                element.active = action.payload.active;
                return element;
            })
        },

        listElements: (state) => {
            state.loadingListElements = true;
        },
        listElementsSuccess: (state, action: PayloadAction<ElementEntity[]>) => {
            state.loadingListElements = false;
            state.elements = action.payload;
        },
        listElementsError: (state) => {
            state.loadingListElements = false;
            state.errorListElements = true;
        },

        createElement: (state, action: PayloadAction<ElementEntity>) => {
            state.loadingCreateElement = true;
        },
        createElementSuccess: (state, action: PayloadAction<ElementEntity>) => {
            state.loadingCreateElement = false;
            state.currentElement = action.payload;
            state.currentElement = null;
            ++state.total;
        },
        createElementError: (state) => {
            state.loadingCreateElement = false;
            state.errorCreateElement = true;
        },

        updateElement: (state, action: PayloadAction<ElementEntity>) => {
            state.loadingUpdateElement = true;
        },
        updateElementSuccess: (state, action: PayloadAction<ElementEntity>) => {
            state.loadingUpdateElement = false;
            state.currentElement = action.payload;
            state.currentElement = null;
            ++state.total;
        },
        updateElementError: (state) => {
            state.loadingUpdateElement = false;
            state.errorUpdateElement = true;
        },

        deleteElement: (state, action: PayloadAction<ElementEntity>) => {
            state.loadingDeleteElement = true;
        },
        deleteElementSuccess: (state, action: PayloadAction<ElementEntity>) => {
            state.loadingDeleteElement = false;
            state.currentElement = action.payload;
            ++state.total;
        },
        deleteElementError: (state) => {
            state.loadingDeleteElement = false;
            state.errorDeleteElement = true;
        }
    },
});

export const elementsState = (state: RootState) => state.main.elements;

export const { 
    setFormErrors,updateElementProps,
    setElementActive,setSelectedElements,updateCurrentElement,
    listElements,listElementsSuccess,listElementsError,
    createElement,createElementSuccess,createElementError,
    updateElement,updateElementSuccess,updateElementError,
    deleteElement,deleteElementSuccess,deleteElementError,
    setOrderItemQuantity, addOrderItem, removeOrderItem, addOrderItemElement,clearOrderItems
} = elementsSlice.actions;

export default elementsSlice.reducer;