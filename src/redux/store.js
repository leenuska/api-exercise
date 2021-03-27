import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
    // applyMiddleware(...middleware)
    applyMiddleware(sagaMiddleware)
);

const store = createStore(reducer, {}, enhancer);

// run the saga
sagaMiddleware.run(saga);

export default store;
