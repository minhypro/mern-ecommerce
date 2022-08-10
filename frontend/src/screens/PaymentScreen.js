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

    console.log(paymentMethod, 'state');

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutStep step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>

                    <Col>
                        <Form.Check
                        required
                            type='radio'
                            label='PayPal or Credit Card'
                            id='paypal'
                            name='paymentMethod'
                            value='paypal'
                            onChange={(e) => {
                                console.log(e.target.value)
                                return setSetPaymentMethod(e.target.value)}}
                        ></Form.Check>
                        <Form.Check
                            type='radio'
                            label='Stripe'
                            id='stripe'
                            name='paymentMethod'
                            value='stripe'
                            onChange={(e) => {
                                console.log(e.target.value)
                                return setSetPaymentMethod(e.target.value)}}
                        ></Form.Check>
                        <Form.Check
                            type='radio'
                            label='Bank Transfer'
                            id='bank_transfer'
                            name='paymentMethod'
                            value='bankTransfer'
                            onChange={(e) => {
                                console.log(e.target.value)
                                return setSetPaymentMethod(e.target.value)}}
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
