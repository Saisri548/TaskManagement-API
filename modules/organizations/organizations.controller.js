import { createOrganisations,getOrganisations,getOrganisationsbyId,updateOrganisation,deleteOrganisations } from "./organizations.service.js";
export const createOrg=async(req,res)=>{
    try{
       if(req.user.role!=="owner"){
        return res.status(403).json({error:"Forbidden: Only owner can create orgs"})
       }
       const org =await createOrganisations(req.body);
    res.status(201).json({ success: true, data: org });
    }
    catch(error){
        res.status(500).json({error:error.message})

    }

}
export const getorg=async(req,res)=>{
    try{
        const orgs=await getOrganisations()
        res.json({success:true,data:orgs})

    }
    catch(error)
    {
       res.status(500).json({error:error.message})
    }
}
export const getorgI=async(req,res)=>{
    try{
        const orgsI=await getOrganisationsbyId(req.params.id)
        res.json({success:true,data:orgsI})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}
export const updateOrg=async(req,res)=>{
    if(req.user.role!=="owner"){
        return res.status(403).json({error:"Forbidden: Only owner can create orgs"})
       }
    try{
        const orgsU=await updateOrganisation(req.params.id,req.body)
        res.json({success:true,data:orgsU})

    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}
export const deleteOrg=async(req,res)=>{
    if(req.user.role!=="owner"){
        return res.status(403).json({error:"Forbidden: Only owner can create orgs"})
       }
       try{
         await deleteOrganisations(req.params.id)
         res.json({success:true,message:"Organization deleted sucessfully"})
       }
       catch(err){
         res.status(500).json({ error: err.message });
       }
}