const Company = require('../models/Company')

module.exports = {
    getCompanys: async (req,res)=>{
        console.log(req.user)
        try{
            const companys = await Company.find()
            res.render('todos.ejs', {companys, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createCompany: async (req, res)=>{
        try{
            await Company.create({name: req.body.name, phone: req.body.phone})
            console.log('Company has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    editCompany: async (req, res)=>{
        try{
            await Company.findOneAndUpdate({_id:req.body.companyId},{
                name: req.body.name,
                phone: req.body.phone
            })
            console.log('Updated')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    deleteCompany: async (req, res)=>{
        console.log(req.body.companyId)
        try{
            await Company.findOneAndDelete({_id:req.body.companyId})
            console.log('Deleted Company')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    }
}