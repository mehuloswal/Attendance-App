import axios from 'axios';

const BASE_URL =
	process.env.NODE_ENV === 'production'
		? '/api/attendance'
		: 'http://localhost:4000/api/attendance';

const apiService = {
	fetchAttendanceRecords: async () => {
		try {
			const response = await axios.get(`${BASE_URL}`);
			return response.data;
		} catch (error) {
			console.error(
				'Error fetching attendance records:',
				error
			);
			throw new Error('Failed to fetch attendance records');
		}
	},

	removeAttendanceRecord: async (uin, classId, explanation) => {
		try {
			await axios.post(`${BASE_URL}/remove/${uin}/${classId}`, {
				explanation,
			});
		} catch (error) {
			console.error('Error removing attendance record:', error);
			throw new Error('Failed to remove attendance record');
		}
	},

	fetchAttendanceHistory: async (uin, classId) => {
		try {
			const response = await axios.get(
				`${BASE_URL}/history/${uin}/${classId}`
			);
			return response.data;
		} catch (error) {
			console.error(
				'Error fetching attendance history:',
				error
			);
			throw new Error('Failed to fetch attendance history');
		}
	},
};

export default apiService;
