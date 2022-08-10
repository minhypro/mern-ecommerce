import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutStep from '../components/CheckoutStep'
import { FREE_SHIP_PRICE, SHIPPING_PRICE } from '../constants/cartConstansts'
import { createOrder } from '../actions/orderActions'

function PlaceOrderScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector((state) => state.cart)

    cart.itemsPrice = Number(
        cart.cartItems.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)
    )
    cart.shippingPrice =
        cart.itemsPrice > FREE_SHIP_PRICE
            ? 0
            : Number((cart.itemsPrice * SHIPPING_PRICE).toFixed(2))
    cart.totalPrice = Number((cart.itemsPrice + cart.shippingPrice).toFixed(2))
        
    const orderCreate = useSelector((state) => state.orderCreate)
    const {order, success, error} = orderCreate

    useEffect(() => {
        if(success) {
            navigate(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    },[navigate, success])

    const placeholderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice,
        }))
    }

    return (
        <>
            <CheckoutStep step={4} />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Orer Items</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message>Your cart is empty</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/products/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4} align='end'>
                                                    {item.qty} x ${item.price} = $
                                                    {item.price * item.qty}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                                <Row>
                                    {cart.shippingPrice === 0 ? (
                                        false
                                    ) : (
                                        <Col className='text-danger'>
                                            Buy $
                                            {Number((FREE_SHIP_PRICE - cart.itemsPrice).toFixed(2))}{' '}
                                            more to get free ship
                                        </Col>
                                    )}
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant="danger">{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cart.cartItems === 0}
                                    onClick={placeholderHandler}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
