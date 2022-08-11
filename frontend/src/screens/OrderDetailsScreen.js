import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails } from '../actions/orderActions'
import { PAYMENT_METHOD } from '../constants/cartConstansts'

function OrderDetailsScreen() {
    const dispatch = useDispatch()
    const params = useParams()
    const orderId = params.id

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    useEffect(() => {
        dispatch(getOrderDetails(orderId))
    }, [orderId, dispatch])

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <>
            <h1>Đơn hàng {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Thông tin nhận hàng</h2>
                            <p>
                                <strong>Tên: </strong> {order.user.name}
                            </p>
                            <p>
                                <strong>Địa chỉ: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                                {order.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Thanh toán</h2>
                            <p>
                                <strong>Phương thức: </strong>
                                {PAYMENT_METHOD[order.paymentMethod]}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>Thanh toán vào lúc {order.paidAt}</Message>
                            ) : (
                                <Message variant='primary'>Chưa thanh toán</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Sản phẩm</h2>
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item, index) => (
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
                                                {item.qty} x {item.price}
                                                <sup>₫</sup> ={item.price * item.qty}
                                                <sup>₫</sup>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            {order.isDelivery ? (
                                <Message variant='success'>
                                    Đã giao vào lúc {order.deliveredAt}
                                </Message>
                            ) : (
                                <Message variant='warning'>Đang giao</Message>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Tổng kết</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tiền hàng</Col>
                                    <Col>
                                        {order.totalPrice}
                                        <sup>₫</sup>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Phí vận chuyển</Col>
                                    <Col>
                                        {order.shippingPrice}
                                        <sup>₫</sup>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tổng cộng</Col>
                                    <Col>
                                        {order.totalPrice}
                                        <sup>₫</sup>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default OrderDetailsScreen
