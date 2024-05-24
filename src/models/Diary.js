import mongoose, { Schema } from "mongoose";

const DiarySchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    publicMode: {
        type: Boolean,
        default: false
    },
    favourite: {
        type: Boolean,
        default: false
    },
    email: {
        type: String
    }
}, {
    timestamps: true
})

const diaryModel = mongoose.models?.Diary || mongoose.model('Diary', DiarySchema)

export default diaryModel