import React from 'react'
import { Modal } from 'react-bootstrap'
import './Settings.css'
export default function ({types, handleCloseSettings, showSettings}) {
  return (
    <div className={ showSettings && 'settings_container-main'}>
        <Modal  show={showSettings}
        onHide={handleCloseSettings}  className='settings_container'>
            <Modal.Header>
                <Modal.Title> Ajustes </Modal.Title>
                <button onClick={handleCloseSettings}>X</button>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>

        </Modal>
    </div>
  )
}
