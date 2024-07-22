const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema ({
  eventType: {
    type: String,
    enum: ['Practice', 'Meet'],
    required: true,
  },  
  day: {
    type: String,
    enum: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    required: true,
  },
  month: {
    type: String,
    enum: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    required: true,
  },
  hour: {
    type: String,
    enum: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    required: true,
  },
  minute: {
    type:String,
    enum: ['00', '15', '30', '45'],
    required: true,
  },
  amPm: {
    type: String,
    enum: ['AM', 'PM'],
    required: true,
  },
  season: {
    type: String,
    enum: ['Indoor', 'Outdoor', 'Cross-Country'],
    required: true,
  },
  cancelled: Boolean,
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    events: [eventSchema],
})

const User = mongoose.model('User', userSchema);

module.exports = User;