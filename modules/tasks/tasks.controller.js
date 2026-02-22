import * as task_services from "./tasks.services.js"
export const createTask=async(req,res)=>{
    try{
      const task=await task_services.createTask({...req.body,created_by:req.user.id})
      res.status(201).json(task)
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }

}
export const getTasksByTeam=async(req,res)=>{
    try{
        const tasks=await task_services.getTasksbyTeam(req.params.team_id)
        res.json(tasks)

    }
    catch(err){
        res.status(400).json({ error: err.message });
    }
}
export const getMyTask=async(req,res)=>{
    try{
        const tasks=await task_services.getTasks(req.user.id)
        res.json(tasks)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}
export const updateTask=async(req,res)=>{
    try{
        const task=await task_services.updateTask(req.params.task_id,req.body)
        res.json(task)

    }
    catch(err){
        res.status(400).json({ error: err.message });
    }
}
export const deleteTask=async(req,res)=>{
    try{
        const result=await task_services.deleteTask(req.params.task_id);
        res.json(result)
    }
    catch(err){
         res.status(400).json({ error: err.message });
    }
}