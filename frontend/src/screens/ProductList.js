import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Col, Table, Button, Modal, Image } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Price from '../components/Price'
import { listProducts, deleteProductById } from '../actions/productActions'

function ProductList() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList
  const { userInfo } = useSelector((state) => state.userLogin)
  const { success: deleteSuccess } = useSelector((state) => state.productDelete)

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts())
    } else {
      navigate('/login')
    }
  }, [dispatch, userInfo, navigate, deleteSuccess])

  const [selectedProduct, setSelectedProduct] = useState('')

  const [show, setShow] = useState(false)

  const closeModalHandler = () => setShow(false)
  const confirmDeleteUser = (product) => {
    setShow(true)
    setSelectedProduct(product)
  }

  const deleteHandler = (product) => {
    setShow(false)
    dispatch(deleteProductById(product._id))
  }

  const reloadUserList = () => {
    dispatch(listProducts())
  }

  return (
    <>
      <Row className='justify-content-between'>
        <Col md={11}>
          <h1>Danh sách sản phẩm</h1>
          <LinkContainer to={'/admin/products/add'}>
            <Button className='mb-4'>Thêm sản phẩm</Button>
          </LinkContainer>
        </Col>
        <Col md={1} className='d-flex justify-content-end align-items-center'>
          <i className='fa-solid fa-rotate' role='button' onClick={reloadUserList}></i>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Ảnh</th>
              <th>Tên Sản phẩm</th>
              <th>Loại</th>
              <th>Thương hiệu</th>
              <th>Giá</th>
              <th>Chỉnh sửa</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <Image src={product.image} alt={product.name} fluid rounded width='150px' />
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <Price>{product.price}</Price>
                  <sup>đ</sup>
                </td>
                <td>
                  <LinkContainer to={`/admin/products/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => confirmDeleteUser(product)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Modal show={show} onHide={closeModalHandler} centered backdrop='static' keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Bạn có muốn xóa sản phẩm <b>{selectedProduct.name}</b> không?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeModalHandler}>
            Đóng
          </Button>
          <Button variant='primary' onClick={() => deleteHandler(selectedProduct)}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProductList
