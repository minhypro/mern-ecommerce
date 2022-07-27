import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducers } from './reducers/productReducers'

const reducer = combineReducers({
    productList: productListReducers,
})

const initState = {}

const middleware = [thunk]

const store = createStore(
    reducer,
    initState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store