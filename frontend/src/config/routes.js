import { Routes as ReactRoutes, Route } from 'react-router-dom'
import HomeScreen from '../screens/HomeScreen'
import ProductScreen from '../screens/ProductScreen'
import CartScreen from '../screens/CartScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import ProfileScreen from '../screens/ProfileScreen'
import ShippingScreen from '../screens/ShippingScreen'
import PaymentScreen from '../screens/PaymentScreen'
import PlaceOrderScreen from '../screens/PlaceOrderScreen'
import OrderDetailsScreen from '../screens/OrderDetailsScreen'
import UserListScreen from '../screens/UserListScreen'

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
            <Route path='/shipping' element={<ShippingScreen/>}/>
            <Route path='/payment' element={<PaymentScreen/>}/>
            <Route path='/placeorder' element={<PlaceOrderScreen/>}/>
            <Route path='/order/:id' element={<OrderDetailsScreen/>}/>
            <Route path='/admin/userlist' element={<UserListScreen/>}/>
        </ReactRoutes>
    );
}

export default Routes;