const mongoose = require('mongoose');



const IssueSchema = new mongoose.Schema({
    //for the person who raised an issue
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    //for theperson to whome issue is assigned(technician)
    user_id_tech:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //on asset which issue is raised
    asset_name:{
        type: String,
        ref: "Asset.name",
        required: true
    },
    //status of issue
    status: {
        type: String,
        enum: ['Opened', 'Assigned', 'Closed'],
        default: 'Opened'
    },
    //diffrent fields for issue data
    energy_consumption: {
        type: Number,
        required: true
    },
    hours_of_operation: {
        type: Number,
        required: true
    },
    noise_level: {
        type: Number,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    physical_condition: {
        type: String,
        required: true
    },
    vibration: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // Timestamp of when the issue is created
  timestamp: {
    type: Date,
    default: Date.now
  },
  // Timestamp of when the issue is assigned
  timestamp_assigned: {
    type: Date,
    default: null
},
// Timestamp of when the issue was fixed
timestamp_fixed: {
    type: Date,
    default: null
}
});


module.exports = mongoose.model('Issue', IssueSchema);