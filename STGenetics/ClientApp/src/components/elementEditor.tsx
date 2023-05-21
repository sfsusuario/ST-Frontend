import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ModalFooter, Button, Alert, Col, Row } from "reactstrap";
import { ElementEntity} from '../domain/entity/elementEntity';
import { OwnState } from "../domain/state/ownState";
import { createElement, listElements, setFormErrors, updateCurrentElement, updateElement } from "../redux/reducers";
import { RootState } from "../redux/store";
import { FormHelper } from "../helper/formHelper";
import { Alert as AlertMsg} from "../helper/alert";
import { FaSave, FaTimes } from "react-icons/fa";

const ElementEditor: React.FC = () => {
    const dispatch = useDispatch();
    const state = useSelector<RootState>(elementsState => elementsState.main) as OwnState;
    const element = state.currentElement;
    const ref = useRef<number>();

    useEffect(() => {
        if(state.total !== ref.current) {
            dispatch(listElements());
            ref.current = state.total;
            console.log("pagination", ref.current)
        }
    }, [state.total])

    if(!element) {
        return;
    }

    const updateData = (e: any) => {        
        dispatch(updateCurrentElement(
            {
                ...element,
                [e.target.name]: e.target.value
            }
        ))
    }

    const sendData = () => {
        if (element.id === 0) {
            const errors = FormHelper.validateElement(element);
            dispatch(setFormErrors(errors));
            if (errors.length > 0) return;
            let elementToSave = new ElementEntity();
            Object.assign(elementToSave, element);
            elementToSave.status = true;
            elementToSave.birthDate = FormHelper.formatDate(element.birthDate);            
            handleCreate(elementToSave)
        } else {
            const errors = FormHelper.validateElement(element);
            dispatch(setFormErrors(errors));
            if (errors.length > 0) return;
            handleUpdate(element)
        }
    }

    const closeModal = () => {
        dispatch(updateCurrentElement(null));
    }

    const handleCreate = async (element: ElementEntity) => {
        dispatch(createElement(element));
        AlertMsg.info("Element was created correctly");
    }

    const handleUpdate = async (element: ElementEntity) => {
        dispatch(updateElement(element));
        AlertMsg.info("Element was updated correctly");
    }

    return (
        <Modal isOpen={state.currentElement !== null }>
            <ModalHeader>
               {element.id === 0 ? "New element" : "Edit element"}                                                                
            </ModalHeader>
            <ModalBody>               
                <Form>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label>Name</Label>
                                <Input name="name" onChange={(e) => updateData(e)} value={element.name} required />
                            </FormGroup>
                            <FormGroup>
                                <Label>Breed</Label>
                                <Input name="breed" onChange={(e) => updateData(e)} value={element.breed} required />
                            </FormGroup>
                            <FormGroup>
                                <Label>Birth Date</Label>
                                <Input type="date" name="birthDate" onChange={(e) => updateData(e)} value={FormHelper.formatDate(element.birthDate)} required />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="selectSex">Sex</Label>
                                <Input type="select" name="sex" onChange={(e) => updateData(e)} value={element.sex} id="selectSex">
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </Input >                        
                            </FormGroup>
                            <FormGroup>
                                <Label>Price</Label>
                                <Input type="number" name="price" onChange={(e) => updateData(e)} value={element.price} required />
                            </FormGroup>
                            <FormGroup>
                                <Label style={{ marginRight: '10px' }}>Status</Label>
                                <Input type="checkbox" name="status" onChange={(e) => updateData(e)} checked={element.status} />
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
                <Alert color="danger" isOpen={state.formErrors.length > 0}><b>Please, validate form fields:</b> {state.formErrors.join(", ")}</Alert>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" size="sm" onClick={sendData}>
                    <FaSave/> Save
                </Button>
                <Button color="danger" size="sm" onClick={closeModal} >
                    <FaTimes/> Close
                </Button>                
            </ModalFooter>
        </Modal>
    )
}

export default ElementEditor;