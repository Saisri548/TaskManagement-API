import pool from "../../src/config/db.js";
export const createTask=async({
    title,
    description,
    organization_id,
    team_id,
    created_by,
    priority,
    due_date,
    assigned_users=[]
})=>{
    const client=await pool.connect()
    try{
        await client.query("BEGIN")
        const teamcheck=await client.query( `SELECT id FROM teams WHERE id=$1 AND organization_id=$2`,[team_id,Organization_id])
        if(teamcheck.rows.length===0){
            throw new Error("Team does not belong to this organization")
        }
        const taskResult=await client.query(
            `INSERT INTO TASKS (title,description,organization_id,team_id,created_by,priority,due_date) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`,[title, description, organization_id, team_id, created_by, priority, due_date]
        )
        const task=taskResult.rows[0]
        for(const user_id of assigned_users){
             await client.query(
        `INSERT INTO task_assignments(task_id, user_id)
         VALUES($1,$2)`,
        [task.id, user_id]
      );
    }
     await client.query("COMMIT");
     return task;
    }
    catch(error)
    {
        await client.query("ROLLBACK");
    throw error;
    }
    finally{
        client.release()
    }

}
export const getTasksbyTeam=async(team_id)=>{
    const result=await pool.query(`SELECT * FROM TASKS WHERE TEAM_ID=$1 ORDER BY CREATED_AT DESC`,[team_id])
    return result.rows
}
export const getTasks=async(user_id)=>{
    const result=await pool.query(`SELECT T.* FROM TASKS T JOIN TASK_ASSIGNMENTS TA ON TA.TASK_ID=T.ID WHERE TA.USER_ID=$1`,[[user_id]])
     return result.rows
}
export const updateTask=async(task_id,updates)=>{
    const {title,description,status,priority,due_date}=updates
    const result=await pool.query(`UPDATE TASKS  SET TITLE=COALESCE($1,TITLE),description = COALESCE($2,description),
         status = COALESCE($3,status),
         priority = COALESCE($4,priority),
         due_date = COALESCE($5,due_date),
         updated_at = CURRENT_TIMESTAMP WHERE ID=$6 RETURNING *`,[title,description,status,priority,due_date,task_id])
        if (result.rows.length === 0)
    throw new Error("Task not found");

  return result.rows[0];
};
export const deleteTask=async(task_id)=>{
    const result=await pool.query(`DELETE FROM TASKS WHERE ID=$1 RETURNING *`,[task_id])
    if (result.rows.length===0){
        throw new Error("Task not found")
    }
}        