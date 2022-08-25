import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

function SearchBox() {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()

    if(keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else (
      navigate('/')
    )
  }

  return (
    <Form onSubmit={submitHandler} inline="true" className="d-inline-flex">
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-success'>
      <i className='fa-solid fa-magnifying-glass'></i>
      </Button>
    </Form>
  )
}

export default SearchBox
