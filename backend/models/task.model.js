import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title:{type:String, require:true},
    description:{type:String, require:true},
    dueDate:{type:String, require:true},
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
},{timestamps:true})

export const Task = mongoose.model('Task', taskSchema);