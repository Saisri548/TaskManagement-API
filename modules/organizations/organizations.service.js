import pool from "../../src/config/db.js";
export const createOrganisations=async({name})=>{
    const result=await pool.query(`INSERT INTO organisations(name) values($1) returning *`,[name])
    return result.rows[0]
}
export const getOrganisations=async()=>{
    const result=await pool.query(`select * from  Organisations order by created_at desc`)
    return result.rows
}
export const getOrganisationsbyId=async(id)=>{
  const result=await pool.query(`select * from Organisations where id=$1`,[id])
  return result.rows[0]
}
export const updateOrganisation=async(id,{name})=>{
    const result=await pool.query(`update organisations set name=$1 where id=$2 returning`,[name,id])
    return result.rows[0]

}
export const deleteOrganisations=async(id)=>{
    const result=await pool.query(`DELETE FROM ORGANISATIONS WHERE ID=$1`,[id])
    return true;
}