const Role = require('../models/Role')

module.exports = {
    getRole: async (req,res)=>{
        console.log(req.user)
        try{
            const roles = await Role.find({userId: req.user.id})
            .populate('companyId','_id name email')
            res.render('todos.ejs', {roles, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createRole: async (req, res)=>{
        try{
            await Role.create({
                companyId: req.body.companyId,
                userId: req.user.id,
                jobTitle: req.body.jobTitle,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                firstNameBoss: req.body.firstNameBoss,
                lastNameBoss: req.body.lastNameBoss,
                phoneBoss: req.body.phoneBoss,
                emailBoss: req.body.emailBoss,
                titleBoss: req.body.titleBoss
            })
            console.log('Role has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    editRole: async (req, res)=>{
        try{
            await Role.findOneAndUpdate({_id:req.body.roleId},{
                companyId: req.body.companyId,
                userId: req.user.id,
                jobTitle: req.body.jobTitle,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                firstNameBoss: req.body.firstNameBoss,
                lastNameBoss: req.body.lastNameBoss,
                phoneBoss: req.body.phoneBoss,
                emailBoss: req.body.emailBoss,
                titleBoss: req.body.titleBoss
            })
            console.log('Updated Role')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    deleteRole: async (req, res)=>{
        console.log(req.body.roleId)
        try{
            await Role.findOneAndDelete({_id:req.body.roleId})
            console.log('Deleted Role')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    }
}