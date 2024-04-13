import { Modal, Button, Badge } from 'react-bootstrap';

const formatDate = (dateString) => {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	});
};

const HistoryModal = ({ show, onHide, attendanceHistory }) => {
	return (
		<Modal show={show} onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Attendance History</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<table className='table'>
					<thead>
						<tr>
							<th>Date</th>
							<th>Status</th>
							<th>Explanation</th>
						</tr>
					</thead>
					<tbody>
						{attendanceHistory.map(
							(historyRecord, index) => (
								<tr key={index}>
									<td>
										{formatDate(
											historyRecord.date
										)}
									</td>
									<td>
										{historyRecord.isDeleted ? (
											<Badge bg='danger'>
												Deleted
											</Badge>
										) : (
											<Badge bg='success'>
												Active
											</Badge>
										)}
									</td>
									<td>
										{historyRecord.deletionExplanation ||
											'-'}
									</td>
								</tr>
							)
						)}
					</tbody>
				</table>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={onHide}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default HistoryModal;
