import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

function NewProductScreen() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [brand, setBrand] = useState('')
  const [price, setPrice] = useState(10000)
  const [quantity, setQuantity] = useState(0)
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const errorMessage = error && error.response.data.message

  let location = useLocation()
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length !== 0) {
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <FormContainer>
      <h1>Thêm sản phẩm mới</h1>
      {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
      {message && <Message variant='danger'>{message}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Tên sản phẩm</Form.Label>
          <Form.Control
            type='text'
            placeholder='Nhập tên sản phẩm'
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='image'>
          <Form.Label>Hình ảnh</Form.Label>
          <Form.Control
            type='text'
            placeholder='Nhập đường dẫn'
            value={image}
            required
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='description'>
          <Form.Label>Mô tả sản phẩm</Form.Label>
          <Form.Control
            type='text'
            placeholder='Nhập mô tả'
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='brand'>
          <Form.Label>Thương hiệu</Form.Label>
          <Form.Control
            type='text'
            placeholder='Nhập thương hiệu'
            value={brand}
            required
            onChange={(e) => setBrand(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='price'>
          <Form.Label>{`Giá (vnđ)`}</Form.Label>
          <Form.Control
            type='number'
            placeholder='Nhập giá sản phẩm'
            value={price}
            required
            step='1000'
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='brand'>
          <Form.Label>Số lượng</Form.Label>
          <Form.Control
            type='number'
            placeholder='Nhập số lương'
            value={quantity}
            required
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Form.Group>

        <Button type='submit' variant='primary'>
          Xác nhận
        </Button>
      </Form>
    </FormContainer>
  )
}

export default NewProductScreen
