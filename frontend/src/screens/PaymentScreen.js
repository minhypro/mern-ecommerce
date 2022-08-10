import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutStep from '../components/CheckoutStep'
import { savePaymentMethod } from '../actions/cartActions'

function PaymentScreen() {
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { shippingAddress } = cart

    if (!shippingAddress) {
        navigate('/shipping')
    }

    const [paymentMethod, setSetPaymentMethod] = useState(null)

    useEffect(() => {
        setSetPaymentMethod(cart.paymentMethod)
    }, [cart])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    const stepCount = cart.paymentMethod ? 4 : 3

    return (
        <FormContainer>
            <CheckoutStep step={stepCount} />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>

                    <Col>
                        <Form.Check
                            required
                            checked={paymentMethod === 'paypal'}
                            type='radio'
                            label='PayPal or Credit Card'
                            id='paypal'
                            name='paymentMethod'
                            value='paypal'
                            onChange={(e) => setSetPaymentMethod(e.target.value)}
                        ></Form.Check>
                        <Form.Check
                            checked={paymentMethod === 'stripe'}
                            type='radio'
                            label='Stripe'
                            id='stripe'
                            name='paymentMethod'
                            value='stripe'
                            onChange={(e) => setSetPaymentMethod(e.target.value)}
                        ></Form.Check>
                        <Form.Check
                            checked={paymentMethod === 'bankTransfer'}
                            type='radio'
                            label='Bank Transfer'
                            id='bank_transfer'
                            name='paymentMethod'
                            value='bankTransfer'
                            onChange={(e) => setSetPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
