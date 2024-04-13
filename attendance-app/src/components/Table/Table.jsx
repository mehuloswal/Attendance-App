import React, { useState } from 'react';
import {
	Table as BootstrapTable,
	Button,
	Collapse,
} from 'react-bootstrap';
import { BsChevronDown } from 'react-icons/bs';
import HistoryModal from '../HistoryModal/HistoryModal';
import Popup from '../Popup/Popup';
import './Table.css';
import apiService from '../../api/apiService';

const Table = ({ records, fetchAttendanceRecords }) => {
	const [openIndex, setOpenIndex] = useState(null);
	const [selectedRecord, setSelectedRecord] = useState(null);
	const [explanation, setExplanation] = useState('');
	const [attendanceHistory, setAttendanceHistory] = useState([]);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [showHistoryModal, setShowHistoryModal] = useState(false);
	const [collapseOpen, setCollapseOpen] = useState(false);

	const toggleMenu = (index) => {
		setOpenIndex(openIndex === index ? null : index);
		setCollapseOpen(true);
	};

	const onClickRemove = (record) => {
		setSelectedRecord(record);
		setIsPopupOpen(true);
		setCollapseOpen(false);
	};

	const onClickViewHistory = async (record) => {
		try {
			const history = await apiService.fetchAttendanceHistory(
				record.uin,
				record.classId
			);
			setAttendanceHistory(history);
			setSelectedRecord(record);
			setShowHistoryModal(true);
			setCollapseOpen(false);
		} catch (error) {
			console.error(
				'Error fetching attendance history:',
				error
			);
		}
	};

	const handleRemoveRecord = async () => {
		try {
			await apiService.removeAttendanceRecord(
				selectedRecord.uin,
				selectedRecord.classId,
				explanation
			);
			setIsPopupOpen(false);
			fetchAttendanceRecords();
		} catch (error) {
			console.error('Error removing attendance record:', error);
		}
	};

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

	return (
		<div className='table-container'>
			<BootstrapTable striped bordered hover>
				<thead>
					<tr>
						<th>UIN</th>
						<th>Class ID</th>
						<th>Taken By</th>
						<th>Date</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{records.map((record, index) => (
						<React.Fragment key={record.uin}>
							<tr>
								<td>{record.uin}</td>
								<td>{record.classId}</td>
								<td>{record.takenBy}</td>
								<td>{formatDate(record.date)}</td>
								<td>
									<div className='menu-container'>
										<Button
											variant='primary'
											onClick={() =>
												toggleMenu(index)
											}
											className='menu-button'
										>
											<BsChevronDown />
										</Button>
										<Collapse
											in={
												openIndex === index &&
												collapseOpen
											}
										>
											<div className='menu'>
												<Button
													variant='danger'
													onClick={() =>
														onClickRemove(
															record
														)
													}
												>
													Remove
												</Button>
												<Button
													variant='secondary'
													onClick={() =>
														onClickViewHistory(
															record
														)
													}
												>
													View History
												</Button>
											</div>
										</Collapse>
									</div>
								</td>
							</tr>
						</React.Fragment>
					))}
				</tbody>
			</BootstrapTable>
			{/* Popup */}
			{isPopupOpen && (
				<Popup
					onClose={() => setIsPopupOpen(false)}
					onExplanationChange={(event) =>
						setExplanation(event.target.value)
					}
					onSubmit={handleRemoveRecord}
				/>
			)}
			{/* History Modal */}
			<HistoryModal
				show={showHistoryModal}
				onHide={() => setShowHistoryModal(false)}
				attendanceHistory={attendanceHistory}
				selectedRecord={selectedRecord}
			/>
		</div>
	);
};

export default Table;
