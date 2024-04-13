require('dotenv').config();
const mongoose = require('mongoose');
const Attendance = require('../models/attendance.js');

const mongodbURI = 'mongodb://localhost:27017/attendance';
// Connect to MongoDB
console.log('mongodbURI:', mongodbURI);
mongoose.connect(mongodbURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const dummyData = [
	{
		uin: '123456789',
		classId: '04202024',
		takenBy: 'John Doe',
		shortcode: '101',
		date: new Date('2024-04-20T09:00:00Z'),
	},
	{
		uin: '987654321',
		classId: '04212024',
		takenBy: 'Jane Smith',
		shortcode: '202',
		date: new Date('2024-04-21T10:00:00Z'),
	},
];

const insertDummyData = async () => {
	try {
		await Attendance.insertMany(dummyData);
		console.log('Dummy data inserted successfully');
	} catch (error) {
		console.error('Error inserting dummy data:', error);
	} finally {
		mongoose.disconnect();
	}
};

insertDummyData();
