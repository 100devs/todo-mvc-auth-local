const Todo = require('../models/Todo')
const Carlog = require('../models/Carlog')

module.exports = {
    getCarlog: async (req,res)=>{
        console.log(req.user)
        try{
            const carlogVehicles = await Carlog.find({userId: req.user.id})
            res.render('carlog.ejs', {carlogVehicles: carlogVehicles, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    addCarlogVehicle: async (req, res)=>{
        try{
            await Carlog.create({licensePlate: req.body.licensePlate,make:req.body.make,model:req.body.model,year:req.body.year,userId: req.user.id,registrationExpiration: req.body.registrationExpiration})
            console.log('Vehicle has been added!')
            res.redirect('/carlog')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteCarlog: async (req, res)=>{
        console.log(req.body.carlogIdFromJSFile)
        try{
            await Carlog.findOneAndDelete({_id:req.body.carlogIdFromJSFile})
            console.log('Deleted Carlog')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    