import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import uploadApi from '../api/uploadApi'

function ProductEditScreen() {
  const navigate = useNavigate()
  const params = useParams()
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(10000)
  const [countInStock, setCountInStock] = useState(0)
  
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState(false)

  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.userLogin)
  const productDetails = useSelector((state) => state.productDetails)
  const { product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const { loading, error, success } = productUpdate

  useEffect(() => {
    setName(product.name)
    setImage(product.image)
    setDescription(product.description)
    setBrand(product.brand)
    setCategory(product.category)
    setPrice(product.price)
    setCountInStock(product.countInStock)
  }, [product])

  const errorMessage = error && error.response.data.message

  useEffect(() => {
    dispatch(listProductDetails(params.id))
    dispatch({ type: PRODUCT_UPDATE_RESET })
  }, [navigate, dispatch, params.id])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    setUploadError(false)

    try {
      const data = await uploadApi.uploadImage(formData, userInfo.token)
      setImage(data)
      setUploading(false)
    } catch (error) {
      setUploading(false)
      setUploadError('L???i khi t???i ???nh l??n')
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        id: params.id,
        name,
        image,
        description,
        category,
        brand,
        price,
        countInStock,
      })
    )
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/admin/products'>
        Quay l???i
      </Link>
      <FormContainer>
        <h1>Ch???nh s???a s???n ph???m</h1>
        {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
        {success && <Message variant='success'>C???p nh???t th??ng tin th??nh c??ng</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>T??n s???n ph???m</Form.Label>
            <Form.Control
              type='text'
              placeholder='Nh???p t??n s???n ph???m'
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='image'>
            <Form.Label>H??nh ???nh</Form.Label>
            <Form.Control
              type='text'
              placeholder='Nh???p ???????ng d???n'
              value={image}
              required
              onChange={(e) => setImage(e.target.value)}
            />
            <Form.Control type='file' onChange={uploadFileHandler} />
            {uploading && <Loader />}
            {uploadError && <Message className="mt-2" variant='danger'>{uploadError}</Message>}
          </Form.Group>

          <Form.Group controlId='description'>
            <Form.Label>M?? t??? s???n ph???m</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              placeholder='Nh???p m?? t???'
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='category'>
            <Form.Label>Ph??n lo???i</Form.Label>
            <Form.Control
              type='text'
              placeholder='Nh???p ph??n lo???i'
              value={category}
              required
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='brand'>
            <Form.Label>Th????ng hi???u</Form.Label>
            <Form.Control
              type='text'
              placeholder='Nh???p th????ng hi???u'
              value={brand}
              required
              onChange={(e) => setBrand(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='price'>
            <Form.Label>{`Gi?? (vn??)`}</Form.Label>
            <Form.Control
              type='number'
              placeholder='Nh???p gi?? s???n ph???m'
              value={price}
              required
              step='1000'
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='brand'>
            <Form.Label>S??? l?????ng</Form.Label>
            <Form.Control
              type='number'
              placeholder='Nh???p s??? l????ng'
              value={countInStock}
              required
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </Form.Group>

          <Button type='submit' variant='primary'>
            X??c nh???n
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
