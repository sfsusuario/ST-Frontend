import * as React from "react";
import { Button, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { OrderItem } from '../domain/entity/orderItem';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { OwnState } from "../domain/state/ownState";
import { addOrderItem, clearOrderItems, listElements, removeOrderItem, setOrderItemQuantity } from "../redux/reducers";
import { OrderItemHelper } from "../helper/helper";
import { Alert } from "../helper/alert";


const Cart: React.FC = () => {
    const state = useSelector<RootState>(elementsState => elementsState.main) as OwnState;
    const orderItems = state.orderItems;

    const dispatch = useDispatch();

    const add = (item: OrderItem) => {
        dispatch(addOrderItem(item))
    }

    const remove = async (item: OrderItem) => {
        const result = await Alert.confirm("Remove item", "¿Do you want to delete this element from the shopping cart?");
        if (result.isConfirmed) {
            dispatch(removeOrderItem(item))
            Alert.success('¡Cart item was deleted!');
        }
    }

    const set = (item: OrderItem, quantity: number) => {
        dispatch(setOrderItemQuantity({
            id: item.id,
            quantity: quantity
        }))
    }

    const clear = async () => {
        const result = await Alert.confirm('Clear cart', '¿Do you want to clear all elements from this shopping cart?');
        if (result.isConfirmed) {
            dispatch(clearOrderItems())
            Alert.success('¡Shopping cart is empty now!');
        }
    }

    const cartResume = OrderItemHelper.getCartResume(orderItems);

    return (
        <Card className="mt-2">
            <CardHeader>
                <h5>Cart {cartResume.totalQuantity > 0 ? `(${cartResume.totalQuantity} items)` : ""}</h5>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col className="text-center">
                        <img src="https://i.imgur.com/RpyZ7LP.png" height={120} />
                    </Col>
                    <Col md={8}>
                        <b>Nota: </b>I made a small change in the rule, the error message will not appear for adding an element that exists.
                        Rather, it will increment the counter of the current item in the cart listing without duplicating it.
                    </Col>
                </Row>
                <hr />
                <Table size="sm" striped responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th></th>
                            <th>Total</th>
                            <th>Actions</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            (cartResume.totalQuantity < 1) ? (
                                <tr>
                                    <td colSpan={7}>No records</td>
                                </tr>
                            ) :
                                (
                                    orderItems.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.element.name}</td>
                                            <td>{OrderItemHelper.formatPrice(item.element.price)}</td>
                                            <td>
                                                x <b className="me-2">{item.quantity}</b> <span className="text-success">{item.discount() > 0 ? `(%${item.discount()} OFF x Unit)` : ''}</span>
                                            </td>
                                            <td>
                                                <Button onClick={() => set(item, 1)} color="success" className="m-1" placeholder="Add" size="sm">
                                                    <FaPlus />
                                                </Button>
                                                <Button onClick={() => set(item, -1)} color="danger" className="m-1" placeholder="Add" size="sm">
                                                    <FaMinus />
                                                </Button>
                                            </td>
                                            <td>{OrderItemHelper.formatPrice(item.total())}</td>
                                            <td>
                                                <Button color="danger" size="sm" onClick={() => remove(item)}>
                                                    <FaTrash /> Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )
                        }
                        <tr>
                            <td colSpan={4}>Subtotal (without discounts):</td>
                            <td colSpan={2}>{OrderItemHelper.formatPrice(cartResume.subtotalPurchaseAmount)}</td>
                        </tr>
                        {cartResume.totalItemsWithDiscount > 0 &&
                            <tr>
                                <td colSpan={4}>Subtotal with discounts for ({cartResume.totalItemsWithDiscount}) items:</td>
                                <td colSpan={2}>{OrderItemHelper.formatPrice(cartResume.totalPurchaseAmountItems)}</td>
                            </tr>
                        }
                        {cartResume.discountPercentagePerTotal > 0 &&
                            <tr>
                                <td colSpan={4}>Discount per total (more than 10 items):</td>
                                <td colSpan={2}>%{cartResume.discountPercentagePerTotal}</td>
                            </tr>
                        }
                        <tr>
                            <td colSpan={4} className="text-success">TOTAL AMOUNT (with all discounts):</td>
                            <td colSpan={2} className="text-success">{OrderItemHelper.formatPrice(cartResume.totalPurchaseAmount)}</td>
                        </tr>
                    </tbody>
                </Table>
                <center>
                    {cartResume.totalQuantity > 20 &&
                        <>
                            <img src="https://i.imgur.com/qQGQodj.gif" className="rounded" height={170} />
                            <hr />
                        </>
                    }
                    <Button disabled={orderItems.length < 1} color="danger" size="sm" onClick={() => clear()}>
                        <FaTrash /> Clear cart
                    </Button>
                </center>
            </CardBody>
        </Card>
    );
};

export default Cart;