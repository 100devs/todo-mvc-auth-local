const Maintenance = require('../models/Maintenance')

module.exports = {
    getHistory: async (req,res)=>{
        console.log(req.user)
        try{
            const logHistory = await Maintenance.find({userId: req.user.id}).sort({'date': -1})
            res.render('maintenance.ejs', {logHistory: logHistory, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    addMaintenance: async (req, res)=>{
        try{
            await Maintenance.create({ licensePlate: req.body.licensePlate, title: req.body.title, logDetails: req.body.logDetails, userId: req.user.id })
            console.log('Maintenance log has been added!')
            res.redirect('/maintenance')
        }catch(err){
            console.log(err)
        }
    },
    deleteMaintenance: async (req, res)=>{
        console.log(req.body.maintenanceIdFromJSFile)
        try{
            await Maintenance.findOneAndDelete({_id:req.body.maintenanceIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    