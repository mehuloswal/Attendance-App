// Popup.jsx
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const Popup = ({ onClose, onExplanationChange, onSubmit }) => {
	return (
		<Modal show onHide={onClose}>
			<Modal.Header closeButton>
				<Modal.Title>Confirm Removal</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>Are you sure you want to remove this record?</p>
				<Form.Group>
					<Form.Label>Explanation:</Form.Label>
					<Form.Control
						as='textarea'
						rows={3}
						onChange={onExplanationChange}
					/>
				</Form.Group>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={onClose}>
					Cancel
				</Button>
				<Button variant='danger' onClick={onSubmit}>
					Remove
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default Popup;
