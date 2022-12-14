import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { LinkContainer } from 'react-router-bootstrap'
import Price from '../components/Price'

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

  const myOrders = useSelector((state) => state.myOrders)
  const { loading: orderLoading, error: orderError, orders } = myOrders

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length === 0) {
      navigate('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
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

  const reloadOrderList = () => {
    dispatch(listMyOrders())
  }

  return (
    <Row>
      <Col md={3}>
        <h2>Th??ng tin t??i kho???n</h2>
        {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
        {message && <Message variant='danger'>{message}</Message>}
        {success && <Message variant='success'>C???p nh???t th??ng tin th??nh c??ng</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>T??n</Form.Label>
            <Form.Control
              disabled={disableEdit}
              type='text'
              placeholder='Nh???p name'
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              disabled
              type='email'
              placeholder='Nh???p email'
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <hr></hr>

          <Form.Group controlId='password'>
            <Form.Label>M???t kh???u</Form.Label>
            <Form.Control
              disabled={disableEdit}
              type='password'
              placeholder='Nh???p m???t kh???u'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='confirm-password'>
            <Form.Label>X??c nh???n m???t kh???u</Form.Label>
            <Form.Control
              disabled={disableEdit}
              type='password'
              placeholder='X??c nh???n m???t kh???u'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button type='submit' variant='primary' disabled={disableEdit}>
            X??c nh???n
          </Button>

          <Button type='button' variant='primary' onClick={allowEdit}>
            Ch???nh s???a
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <Row className='justify-content-between'>
          <Col md={11}>
            <h2>Danh s??ch ????n h??ng</h2>
          </Col>
          <Col md={1} className='d-flex justify-content-end align-items-center'>
            <i className='fa-solid fa-rotate' role='button' onClick={reloadOrderList}></i>
          </Col>
        </Row>
        {orderLoading ? (
          <Loader />
        ) : orderError ? (
          <Message variant='danger'>{orderError}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>M?? ????N</th>
                <th>NG??Y ?????T</th>
                <th>T???NG C???NG</th>
                <th>THANH TO??N</th>
                <th>GIAO H??NG</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{(order.createdAt + '').substring(0, 10)}</td>
                  <td>
                    <Price>{order.totalPrice}</Price>
                    <sup>??</sup>
                  </td>
                  <td>
                    {order.paymentMethod === 'cod'
                      ? 'Thanh to??n khi nh???n h??ng'
                      : order.isPaid
                      ? order.paidAt
                      : order.isSentPayment
                      ? '???? chuy???n kho???n'
                      : 'Ch??a thanh to??n'}
                  </td>
                  <td>{order.isDelivered ? order.deliveredAt : '??ang giao'}</td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant='light' className='btn-sm'>
                        Xem th??m
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
