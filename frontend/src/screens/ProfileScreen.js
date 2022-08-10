import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'

function ProfileScreen() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails
    const errorMessage = error && error.response.data.message

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if (userInfo && Object.keys(userInfo).length === 0) {
            navigate('/login')
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [navigate, userInfo, dispatch, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if (disableEdit) {
            return
        }

        if (password !== confirmPassword) {
            setMessage('Confirm password do not match')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, password }))
        }
    }

    const [disableEdit, setDisableEdit] = useState(true)
    const allowEdit = (e) => {
        e.preventDefault()
        setDisableEdit((prev) => !prev)
    }

    return (
        <Row>
            <Col md={4}>
                <h2>Sign In</h2>
                {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
                {message && <Message variant='danger'>{message}</Message>}
                {success && <Message variant='success'>Update sucessfully</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            disabled={disableEdit}
                            type='text'
                            placeholder='Enter name'
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            disabled
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <hr></hr>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            disabled={disableEdit}
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='confirm-password'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            disabled={disableEdit}
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button type='submit' variant='primary' disabled={disableEdit}>
                        Update
                    </Button>

                    <Button type='button' variant='primary' onClick={allowEdit}>
                        Edit
                    </Button>
                </Form>
            </Col>
            <Col md={8}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen