import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import './Settings.css'
import {useUsers} from '../../hooks/useUsers'
export default function ({types,createTypes, handleCloseSettings, showSettings}) {

  const [typeData, setTypeData] = useState({
    typeName: '',
    typeColor: ''
  })

  const handleSubmit = (e)=>{
    e.preventDefault()
    createTypes(typeData)
  }
  const handleInputChange =(e)=>{
    console.log(e.target.value)
    setTypeData({...typeData, [e.target.name]: e.target.value})
  }
  
  return (
    <div className={ showSettings && 'settings_container-main'}>
        <Modal 
          show={showSettings}
          onHide={handleCloseSettings} 
          className='settings_container'>
            <Modal.Header className='settings_header_container'>
                <h3>Settings</h3>
                <button onClick={handleCloseSettings} className='settings_header_container-btn'>X</button>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit} className='settings_form_container'>
                <Form.Group className='settings_form_container-input'>
                  <label htmlFor="">Type Name</label>
                  <Form.Control
                   autoComplete="off"
                   name="typeName"
                   type="text" 
                   className='settings_form_input'

                  onChange={(e) => handleInputChange(e)}
                  />
                   
                </Form.Group>
                <Form.Group className='settings_form_container-input'>
                  <label htmlFor="">Type Color</label>
                  <Form.Control
                   autoComplete="off"
                   className='settings_form_input'
                   name="typeColor"
                   type="color" 
                  onChange={(e) => handleInputChange(e)}
                  />
                </Form.Group>

                <Button type='submit' className='settings_form_btn'>
                  Submit
                </Button>
              </Form>

            </Modal.Body>

        </Modal>
    </div>
  )
}
