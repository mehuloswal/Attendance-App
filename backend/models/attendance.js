const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
	uin: String,
	classId: String,
	takenBy: String,
	shortcode: String,
	date: Date,
	isDeleted: { type: Boolean, default: false },
	deletionExplanation: { type: String, required: false },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
