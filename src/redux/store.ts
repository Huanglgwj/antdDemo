import { createStore } from 'redux';
import reducer from './reducer';
const _window:objectKey = window
const store = createStore(reducer,_window.__REDUX_DEVTOOLS_EXTENSION__ && _window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;
