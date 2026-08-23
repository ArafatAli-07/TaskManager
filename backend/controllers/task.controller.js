import { Task } from "../models/task.model.js";
 
// uploding task
export const uploadtask = async(req,res)=>{
    try {
        const { title, description, dueDate} = req.body;
        const userId = req.id; 
 
        // checking valaditions
        if(!title || !description ||!dueDate){
             return res.status(400).json({
                message:"Something is missing.Please check!",
                success: false
            })
        }

        //creating task
        await Task.create({
            title,
            description,
            dueDate,
            user:userId
        })

        return res.status(200).json({
            message:"Task uploaded successfully...",
            success:true
        })
    } catch (error) {
       console.error("Error in uploading task:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        }); 
    }
}

// getting task
export const getTask = async(req,res)=>{
    try {
        const userId = req.id;

        // findig task
        const tasks = await Task.find({user: userId});
        if(tasks.length === 0){
            return res.status(404).json({
                message: "No task found",
                success:false
            })
        }

        return res.status(200).json({
            success:true,
            tasks
        })
    } catch (error) {
        console.error("Error in getting task:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        }); 
    }
}


// editting task
export const editTask = async(req,res)=>{
    try {
        const { title, description, dueDate} = req.body;
        const {taskId} = req.params;

        // checking valaditions
        if(!title || !description || !dueDate){
            return res.status(400).json({
                message: "Somthing is missing. p0lease check!",
                success: true
            })
        }

        // finding the task
        const task = await Task.findById(taskId);

        // updateing the task
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;

        // saving the task
        await task.save();
        return res.status(200).json({
            message:"Task updated successfully",
            success:true,
            task
        })

    } catch (error) {
        console.error("Error in Editing task:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        }); 
    }
}

// deleteing the task
export const deleteTask = async(req,res)=>{
    try {
        const {taskId} = req.params;

        // finding the task for delete
        const task = await Task.findById(taskId);

        // delete task
        await task.deleteOne();
        return res.status(200).json({
            message:"Task deleted successfully",
            success:true
        })
    } catch (error) {
        console.error("Error in deleting task:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        }); 
    }
}