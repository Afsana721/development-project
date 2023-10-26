// WHAT IS A MODEL
//   it's a blueprint for the data

const mongoose = require('mongoose')

const bucketListSchema = new mongoose.Schema(
    {
        myid: Number, 
        description: {
            type: String,
            minLength: 3,
            maxLength: 40,
            required: [true, "bucket item description is required"]
        },
        isComplete: {
            type: Boolean,
            default: false
        }
    }
)

// default export
module.exports = mongoose.model('bucketlist', bucketListSchema)

// named export
// exports.BucketListModel = mongoose.model('bucketlist', bucketListSchema)