import React from "react";
import { useState } from "react"
import { FaArrowDown, FaArrowUp, FaCartPlus, FaDotCircle, FaFilter, FaPen, FaSave, FaTable, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Pagination, PaginationItem, PaginationLink, InputGroup, InputGroupText, Input, Row, Col } from "reactstrap"
import { ElementEntity } from "../domain/entity/elementEntity";
import { OwnState } from "../domain/state/ownState";
import { OrderItemHelper } from "../helper/helper";
import { addOrderItemElement, deleteElement, removeOrderItem, setElementActive, setFormErrors, setSelectedElements, updateCurrentElement, updateElement, updateElementProps } from "../redux/reducers";
import { RootState } from "../redux/store";
import { Alert } from "../helper/alert";
import EditableInput from "../components/editableInput";
import { EditableInputType } from "../domain/props/EditableInputsProps";
import { FormHelper } from "../helper/formHelper";

const ElementList: React.FC = () => {
    const dispatch = useDispatch();
    const state = useSelector<RootState>(elementsState => elementsState.main) as OwnState;
    const orderItems = state.orderItems;
    let elements = state.elements;

    const pageSize = 10;
    const [currentState, setCurrentState] = useState(0);
    const [filter, setFilter] = useState("");
    const [editableGrid, setEditableGrid] = useState(false);
    const [orderFilter, setOrderFilter] = useState("breed");
    const [asc, setAsc] = useState(true);

    elements = [...elements].sort((a: any, b: any) => {
        let value1 = a[orderFilter];
        let value2 = b[orderFilter];
        if(asc) {
            [value1, value2] = [value2, value1];
        }
        if(typeof(value1) === "string") {
            return value1.localeCompare(value2)
        }
        if(typeof(value1) === "number") {
            return value1 - value2;
        }
        return value1 - value2;
    });
    const pageState = Math.ceil(elements.length / pageSize);

    const handlePagination = (e: any, currentPage: any) => {
        e.preventDefault();
        setCurrentState(currentPage);
    };

    const total = elements.reduce((accumulator: any, item: ElementEntity) => accumulator + item.price, 0);

    const sendData = (element: ElementEntity) => {
        dispatch(updateCurrentElement(element))
    }

    const filteredData = elements.filter((item) => {        
        return item.name.toLowerCase().includes(filter.toLowerCase());
    });
  
    const handleAddCart = (element: ElementEntity) => {
        dispatch(addOrderItemElement(element));
    }

    const handleDelete = async (element: ElementEntity) => {
        const result = await Alert.confirm('Delete element', '¿Do you want to delete this element definitely?');
        if (result.isConfirmed) {
            dispatch(deleteElement(element))
            Alert.success('¡Element was deleted!');
        }
    }

    const handleSetActive = (element: ElementEntity) => {
        dispatch(setElementActive({
            element: element,
            active: !element.active
        }))
    }

    const handleSetActiveAll = () => {
        dispatch(setSelectedElements({
            active: !elements.some( i => i.active)
        }))
    }

    const changeFilter = (filter: string) => {
        if(filter === orderFilter){
            setAsc(!asc);
        }
        setOrderFilter(filter);
    }

    const OrderButton = (element: string) => {
        if(orderFilter == element) {
            return asc ? 
            <FaArrowDown onClick={() => changeFilter(element)}/> : 
            <FaArrowUp onClick={() => changeFilter(element)}/> 
        }
        return <FaDotCircle onClick={() => changeFilter(element)}/>
    }

    const handleChange = (event: any) => {
        let value = event.value;
        if(event.fieldName == "status") {
            value = parseInt(value) ? true : false;
        }
        if(event.fieldName == "price") {
            value = parseInt(value);
        }
        dispatch(updateElementProps({
            id: event.item.id,
            value: value,
            key: event.fieldName
        }));
    }

    const handleSave = (element: ElementEntity) => {
        const errors = FormHelper.validateElement(element);
        dispatch(setFormErrors(errors));
        if(errors.length > 0){
            Alert.info("Please validate the data entered, they are not valid");
        } else {
            dispatch(updateElement(element));
            Alert.info("The item was saved successfully");
        }
    }

    return (
        <>
            <Row>
                <Col md={2}></Col>
                <Col md={6}>
                    <InputGroup className="mb-3">
                        <InputGroupText><FaFilter className="me-2"/> Filter:</InputGroupText>
                        <Input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
                    </InputGroup>
                </Col>
                <Col md={3}>
                    <Button color="info" onClick={ e => setEditableGrid(!editableGrid)}>
                        <FaTable/> {editableGrid ? "Disable": "Active"} editable grid
                    </Button>
                </Col>
                <Col md={1}></Col>
            </Row>
            <p>
                <b>Note: </b>Click on the circles (<FaDotCircle/>) located at the head of each column to apply ordering by row. You can do click on (Activate/Desactivate) editable grid in order to modify the data directly.
            </p>
            <Table size="sm" striped responsive>
                <thead>               
                    <tr>
                        <th>
                            <input checked={elements.some( e => e.active)} onChange={() => handleSetActiveAll()} type="checkbox"/>
                        </th>
                        <th>Name {OrderButton("name")}</th>
                        <th>Breed {OrderButton("breed")}</th>
                        <th>Birth Date {OrderButton("birthDate")}</th>
                        <th>Sex {OrderButton("sex")}</th>
                        <th>Price {OrderButton("price")}</th>
                        <th>Status {OrderButton("status")}</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        (filteredData.length < 1) ? (
                            <tr>
                                <td colSpan={7}>No records</td>
                            </tr>
                        ) :
                            (
                                filteredData
                                .slice(currentState * pageSize, (currentState + 1) * pageSize)
                                .map((item) => (
                                    <tr className={item.updated ? "thead-light": ""} key={item.id}>
                                        <td>
                                            <input checked={item.active} onChange={() => handleSetActive(item)} type="checkbox"/>
                                        </td>
                                        <td>
                                            <EditableInput
                                                active={editableGrid}
                                                input={EditableInputType.input}
                                                fieldName="name"
                                                item={item}
                                                onChange={ (e: any) => handleChange(e)}
                                                />
                                        </td>
                                        <td>
                                            <EditableInput
                                                active={editableGrid}
                                                input={EditableInputType.input}
                                                fieldName="breed"
                                                item={item}
                                                onChange={ (e: any) => handleChange(e)}
                                                />
                                        </td>
                                        <td>
                                            <EditableInput
                                                active={editableGrid}
                                                input={EditableInputType.input}
                                                type="date"
                                                fieldName="birthDate"
                                                item={item}
                                                value={FormHelper.formatDate(item.birthDate)}
                                                onChange={ (e: any) => handleChange(e)}
                                                />
                                        </td>
                                        <td>
                                            <EditableInput
                                                active={editableGrid}
                                                input={EditableInputType.select}
                                                options={{
                                                    Male: "Male",
                                                    Female: "Female"
                                                }}
                                                fieldName="sex"
                                                item={item}
                                                onChange={ (e: any) => handleChange(e)}
                                                />
                                        </td>
                                        <td>
                                            <EditableInput
                                                active={editableGrid}
                                                input={EditableInputType.input}
                                                type="number"
                                                fieldName="price"
                                                item={item}
                                                onChange={ (e: any) => handleChange(e)}
                                                label={OrderItemHelper.formatPrice(item.price)}
                                                />
                                        </td>
                                        <td>
                                            <EditableInput
                                                active={editableGrid}
                                                input={EditableInputType.select}
                                                options={{
                                                    0: "Inactive",
                                                    1: "Active"
                                                }}
                                                fieldName="status"
                                                item={item}
                                                onChange={ (e: any) => handleChange(e)}
                                                label={item.status ? 'Activo' : 'Inactivo'}
                                                value={item.status ? 1 : 0}
                                            />
                                        </td>
                                        <td style={{minWidth: 100}}>
                                            {editableGrid &&
                                                <Button 
                                                    disabled={!item.updated} 
                                                    placeholder="Save current element" 
                                                    color="info"
                                                    size="sm" 
                                                    className="m-1" 
                                                    onClick={() => handleSave(item)}
                                                    >
                                                    <FaSave/>
                                                </Button>
                                            }
                                            {!editableGrid &&
                                                <>
                                                    <Button placeholder="Add" color="success" size="sm" className="m-1" onClick={() => handleAddCart(item)}>
                                                        <FaCartPlus/>
                                                    </Button>
                                                    <Button placeholder="Edit" color="primary" size="sm" className="m-1" onClick={() => sendData(item)}>
                                                        <FaPen/>
                                                    </Button>
                                                </>
                                            }
                                            <Button placeholder="Delete" color="danger" size="sm" className="m-1" onClick={() => handleDelete(item)}>
                                                <FaTrash/>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )
                        }
                        <tr>
                            <td colSpan={4}></td>
                            <td>Total amount:</td>
                            <td>{OrderItemHelper.formatPrice(total)}</td>
                            <td colSpan={2}></td>
                        </tr>
                </tbody>
            </Table >
            
            <Pagination aria-label="pagination" className="mt-2">
                <PaginationItem disabled={currentState <= 0}>
                    <PaginationLink
                        onClick={e => handlePagination(e, currentState - 1)}
                        previous
                        href="#"
                    />
                </PaginationItem>

                {[...Array(pageState)].map((page, i) => (
                    <PaginationItem active={i === currentState} key={i}>
                        <PaginationLink onClick={e => handlePagination(e, i)} href="#">
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                <PaginationItem disabled={currentState >= pageState - 1}>
                    <PaginationLink
                        onClick={e => handlePagination(e, currentState + 1)}
                        next
                        href="#"
                    />
                </PaginationItem>
            </Pagination>
        </>
    )
}

export default ElementList;