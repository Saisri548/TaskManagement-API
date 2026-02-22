import * as teamService  from "./teams.services.js"
export const createTeam=async(req,res)=>{
    try{
        const {name,organization_id}=req.body
        if(!["owner","admin"].includes(req.user.role)){
            return res.status(403).json({error:"Unauthorized"})
        }
        const team=await teamService.createTeam({name,organization_id})
         res.status(200).json({team,message:"Successfully team is created"})
        
    }
    catch(error){
         res.status(400).json({error:error.message})
    }
}
export const getTeamsbyorg=async(req,res)=>{
    try{
        const {organization_id}=req.params
        const Teams=await teamService.getTeamsOrg(organization_id)
         res.status(200).json(Teams)

    }
    catch(error){
         res.status(400).json({error:error.message})
    }
}
export const updateTeam=async(req,res)=>{
    try{
        const {team_id,name}=req.body
        if(!["owner","admin"],includes(req.user.role)){
            return res.status(403).json({ error: "Unauthorized" })
        }
        const teamupdated=await teamService.updateTeam(team_id,name)
        res.status(200).json(teamupdated)

    }
    catch(error){
       res.status(400),json({error:error.message})
    }
}
export const deleteTeam=async(req,res)=>{
    try{
        const {team_id}=req.params
        if(!["owner","admin"].includes(req.user.role)){
            return res.status(403).json({error:"UnAuthorized"})
        }
        const result=await teamService.deleteTeam(team_id)
        res.status(200).json({result})
()
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}
export const addTeamMember=async(req,res)=>{
    try{
        const{team_id,user_id,team_role}=req.body
        if(!["owner","admin","team_admin"].includes(req.user.role)){
             return res.status(403).json({ error: "Unauthorized" });
        }
        const member = await teamService.addTeamMember({ team_id, user_id, team_role });
    res.status(201).json(member);
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}
export const DeleteTeamMember=async(req,res)=>{
    try{
        const {team_id,user_id}=req.body
        if(!["owner","admin","team_admin"].includes(req.user.role)){
            return res.status(403).json({error:"UnAuthorized"})
        }
        const result=await teamService.deleteTeamMember({team_id,user_id})
        res.status(200).json(result)

    }
    catch(error){
         res.status(400).json({error:error.message})
    }
}
export const getTeamMembers=async(req,res)=>{
    try{
        const {team_id}=req.params;
        const result=await teamService.getTeamMembers(team_id)
       res.status(200).json(result)
    }
    catch(error){
         res.status(400).json({error:error.message})
    }
}
//959d1da6-3685-4ae2-8417-bec7863c543c