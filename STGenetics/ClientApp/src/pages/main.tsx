import * as React from "react";
import { useEffect, useState } from "react"
import ElementList from "../components/elementList"
import ElementEditor from "../components/elementEditor";
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import ElementServices from '../services/elementServices';
import { useDispatch, useSelector } from "react-redux";
import { addOrderItemElement, setSelectedElements, listElements, updateCurrentElement } from '../redux/reducers';
import { RootState } from "../redux/store";
import Cart from "./cart";
import { FaCartPlus, FaPlus, FaTrash } from "react-icons/fa";
import { OwnState } from "../domain/state/ownState";
import { ElementEntity } from "../domain/entity/elementEntity";
import { Alert } from "../helper/alert";

const Main: React.FC = () => {
    const dispatch = useDispatch();
    
    const state = useSelector<RootState>(elementsState => elementsState.main) as OwnState;
    const elements = state.elements;
    const orderItems = state.orderItems;

    const handleAddSelectedToCar = () => {
        elements.filter( e => e.active).forEach( element => {
            dispatch(addOrderItemElement(element));
        });
        handleClearSelected();
    }

    const handleClearSelected = async () => {
        dispatch(setSelectedElements({
            active: false
        }));
    }

    const handleCreate = () => {
        dispatch(updateCurrentElement(new ElementEntity()));
    }

    return (       
        <>
            <Card>
                <CardHeader>
                    <h5>
                        Elements list
                    </h5>
                </CardHeader>
                <CardBody>
                    <div className="mb-2 text-center">
                        <Button className="me-2 mb-2" size="sm" color="info" onClick={ () => handleCreate()}>
                            <FaPlus/> Add new
                        </Button>
                        <Button disabled={elements.filter( e => e.active).length < 1} className="me-2 mb-2" size="sm" color="success" onClick={ () => handleAddSelectedToCar()}>
                            <FaCartPlus/> Add selected to car
                        </Button>
                        <Button disabled={elements.filter( e => e.active).length < 1} className="me-2 mb-2" size="sm" color="danger" onClick={ () => handleClearSelected()}>
                            <FaTrash/> Clear selected
                        </Button>
                    </div>
                    <ElementList />
                </CardBody>
            </Card>
            <ElementEditor/>
            <Row className="mb-5">
                <Col></Col>
                <Col md={8}><Cart/></Col>
                <Col></Col>
            </Row>
        </>
    )
}

export default Main;