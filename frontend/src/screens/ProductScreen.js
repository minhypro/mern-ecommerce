import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import Rating from '../components/Rating';
import productsApi from '../api/productsApi'

function ProductScreen() {
    const params = useParams();
    const [product, setProduct] = useState({});
    useEffect(() => {
        const fetchProduct = async () => {
            const res = await productsApi.getProduct(params.id)
            setProduct(res)
        }
        fetchProduct()
    }, [params.id])


    return (
        <>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>
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
                            <Button className="mt-3" type="button" disabled={product.countInStock === 0} >Add to Cart</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen