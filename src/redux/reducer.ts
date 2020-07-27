import {combineReducers} from 'redux'
import reducerMenu from './reducerMenu'
import reducerUser from './reducerUser'
import reducerDict from './reducerDict'
export default combineReducers({reducerUser,reducerMenu,reducerDict});
