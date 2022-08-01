import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router';
import Rating from '../components/Rating';
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

function ProductScreen() {
    const [qty, setQty] = useState(1)
    const navigate = useNavigate()

    const params = useParams();
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productDetails)
    const { loading, error, product } = productList

    useEffect(() => {
        dispatch(listProductDetails(params.id))
    }, [dispatch, params.id])

    const addToCartHandler = () => {
        navigate(`/cart/${params.id}?qty=${qty}`)
    }

    return (
        <>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error.data.message}</Message>
            ) : (
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={6}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>{product.name}</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h3>${product.price}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating
                                    value={product.rating}
                                    text={`${product.numReviews} reviews`}
                                />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div>
                                    Brand: {product.brand}
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div>
                                    Description: {product.description}
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div>
                                    {product.countInStock > 0 ? `In Stock: ${product.countInStock}` : "Out of Stock"}
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Form>
                                    <Form.Label>Quantity: </Form.Label>
                                    <Form.Control
                                        type="number"
                                        min='1'
                                        max={`${product.countInStock}`}
                                        value={product.countInStock === 0 ? 0 : qty}
                                        onChange={e => setQty(e.target.value)}
                                        style={{width: '150px'}}
                                    />
                                </Form>
                                <Button
                                    className="mt-3"
                                    type="button"
                                    disabled={product.countInStock === 0 || qty === 0}
                                    onClick={addToCartHandler}
                                >Add to Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            )}
        </>
    )
}

export default ProductScreen