import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from './components/Table/Table';
import './App.css';
import apiService from './api/apiService';

// import attendanceData from './data/attendanceData';

function App() {
	const [attendanceRecords, setAttendanceRecords] = useState([]);
	useEffect(() => {
		fetchAttendanceRecords();
	}, []);
	const fetchAttendanceRecords = async () => {
		try {
			const records = await apiService.fetchAttendanceRecords();
			setAttendanceRecords(records);
		} catch (error) {
			console.error(
				'Error fetching attendance records:',
				error
			);
		}
	};

	return (
		<Container>
			<h1 className='mt-5 mb-4'>Attendance Records</h1>
			<Table
				records={attendanceRecords}
				fetchAttendanceRecords={() =>
					fetchAttendanceRecords()
				}
			/>
		</Container>
	);
}

export default App;
