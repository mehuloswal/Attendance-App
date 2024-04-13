require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Attendance = require('./models/attendance');

const app = express();

const mongodbURI =
	process.env.NODE_ENV === 'production'
		? process.env.MONGODB_URI_PROD
		: process.env.MONGODB_URI_LOCAL;

mongoose.connect(mongodbURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// API to fetch all attendance records
app.get('/api/attendance', async (req, res) => {
	try {
		const attendanceRecords = await Attendance.find({
			isDeleted: false,
		});
		res.json(attendanceRecords);
	} catch (error) {
		console.error('Error fetching attendance records:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// API to remove attendance record by UIN and ClassID
app.post('/api/attendance/remove/:uin/:classId', async (req, res) => {
	const { uin, classId } = req.params;
	const { explanation } = req.body;

	try {
		await Attendance.updateMany(
			{ uin, classId },
			{
				$set: {
					isDeleted: true,
					deletionExplanation: explanation,
				},
			}
		);
		res.json({
			message: 'Attendance records removed successfully',
		});
	} catch (error) {
		console.error('Error removing attendance records:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// API to fetch attendance history by UIN and ClassID
app.get('/api/attendance/history/:uin/:classId', async (req, res) => {
	const { uin, classId } = req.params;

	try {
		const history = await Attendance.find({ uin, classId });
		res.json(history);
	} catch (error) {
		console.error('Error fetching attendance history:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
