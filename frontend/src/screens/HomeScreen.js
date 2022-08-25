import React, { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

function HomeScreen() {
    const dispatch = useDispatch()

    const params = useParams()
    const keyword = params.keyword

    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])

    return (
        <>
            <h1>Danh sách sản phẩm</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error.data.message}</Message>
            ) : (
                <Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}

export default HomeScreen
