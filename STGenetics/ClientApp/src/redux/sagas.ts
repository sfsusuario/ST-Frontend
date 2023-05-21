
import { call, put, takeEvery } from 'redux-saga/effects';
import { ElementEntity } from '../domain/entity/elementEntity';
import ElementServices from "../services/elementServices";
import { AxiosResponse } from 'axios';
import { 
    listElements,listElementsSuccess,listElementsError, 
    createElement,createElementSuccess,createElementError,
    updateElement,updateElementSuccess,updateElementError,
    deleteElement,deleteElementSuccess,deleteElementError
} from './reducers';
import { PayloadAction } from '@reduxjs/toolkit';

export function* listElementsAsync() {
    try {
        const response: AxiosResponse<ElementEntity[]> = yield call(async () => {
            return await ElementServices.getElements();
        });
        yield put(listElementsSuccess(response.data));
    } catch (err) {
        yield put(listElementsError());
    }
}

export function* createElementAsync(data: PayloadAction<ElementEntity>) {
    try {
        const response: AxiosResponse<ElementEntity> = yield call(async () => {
            return await ElementServices.createElement(data.payload);
        });
        yield put(createElementSuccess(response.data));
    } catch (err) {
        yield put(createElementError());
    }
}

export function* updateElementAsync(data: PayloadAction<ElementEntity>) {
    try {
        const response: AxiosResponse<ElementEntity> = yield call(async () => {
            return await ElementServices.updateElement(data.payload);
        });
        yield put(updateElementSuccess(response.data));
    } catch (err) {
        yield put(updateElementError());
    }
}

export function* deleteElementAsync(data: PayloadAction<ElementEntity>) {
    try {
        const response: AxiosResponse<ElementEntity> = yield call(async () => {
            return await ElementServices.deleteElement(data.payload);
        });
        yield put(deleteElementSuccess(response.data));
    } catch (err) {
        yield put(deleteElementError());
    }
}

export default function* elementsSaga() {
    yield takeEvery(listElements.type, listElementsAsync);
    yield takeEvery(createElement.type, createElementAsync);
    yield takeEvery(updateElement.type, updateElementAsync);
    yield takeEvery(deleteElement.type, deleteElementAsync);
}
