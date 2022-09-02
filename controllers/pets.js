const Pet = require('../models/Pet')

module.exports = {
    createPet: async (req, res)=>{
        try{
            await Pet.create({petName: req.body.petName, userId: req.user.id})
            console.log('Pet has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    deletePet: async (req, res)=>{
        console.log(req.body.petIdFromJSFile)
        try{
            await Pet.findOneAndDelete({_id:req.body.petIdFromJSFile})
            console.log('Deleted pet')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    