import { Routes as ReactRoutes, Route } from 'react-router-dom'
import HomeScreen from '../screens/HomeScreen'
import ProductScreen from '../screens/ProductScreen'
import CartScreen from '../screens/CartScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import ProfileScreen from '../screens/ProfileScreen'

function Routes() {
    return (
        <ReactRoutes>
            <Route path='/' element={<HomeScreen/>}/>
            <Route path='/products/:id' element={<ProductScreen/>}/>
            <Route path='/cart' element={<CartScreen/>}/>
            <Route path='/cart/:id' element={<CartScreen/>}/>
            <Route path='/login' element={<LoginScreen/>}/>
            <Route path='/register' element={<RegisterScreen/>}/>
            <Route path='/profile' element={<ProfileScreen/>}/>
        </ReactRoutes>
    );
}

export default Routes;