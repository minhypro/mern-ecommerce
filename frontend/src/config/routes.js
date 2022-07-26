import { Routes as ReactRoutes, Route } from 'react-router-dom'
import HomeScreen from '../screens/HomeScreen'
import ProductScreen from '../screens/ProductScreen'

function Routes() {
    return (
        <ReactRoutes>
            <Route path='/' element={<HomeScreen/>}/>
            <Route path='/products/:productId' element={<ProductScreen/>}/>
        </ReactRoutes>
    );
}

export default Routes;