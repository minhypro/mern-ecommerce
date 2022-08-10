import React from 'react'
import {useLocation} from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function CheckoutStep({ step }) {
    const location = useLocation()

    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item className={location.pathname === '/cart'? 'active': ''}>
                {step >= 1 ? (
                    <LinkContainer to='/cart'>
                        <Nav.Link>Shopping</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Shopping</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item className={location.pathname === '/shipping'? 'active': ''} >
                {step >= 2 ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link>Shipping</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Shipping</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item className={location.pathname === '/payment'? 'active': ''}>
                {step >= 3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link>Payment</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Payment</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item className={location.pathname === '/placeorder'? 'active': ''}>
                {step >= 4 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link>Place Order</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Place Order</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutStep
