import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import elementsReducer from './reducers';
import elementsSaga from "./sagas";

const sagaMiddleWare = createSagaMiddleware();

const store = configureStore({
    reducer: combineReducers({ 
        main: elementsReducer 
    }),
    middleware: [sagaMiddleWare],
});

sagaMiddleWare.run(elementsSaga);

export type RootState = ReturnType<typeof store.getState>;

export default store;