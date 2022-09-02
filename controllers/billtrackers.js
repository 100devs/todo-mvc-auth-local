const BillTracker = require('../models/BillTracker')

module.exports = {
    getBillTracker: async (req,res)=>{
        console.log('this is your username',req.user)
        try{
            const billtrackerItems = await BillTracker.find({userId:req.user.id})
            const itemsLeft = await BillTracker.countDocuments({userId:req.user.id,completed: false})
            res.render('billtracker.ejs', {billtrackers: billtrackerItems, left: itemsLeft, user: req.user})
            console.log('this work',billtrackerItems)
        }catch(err){
            console.log(err)
        }
    },
    createBillTracker: async (req, res)=>{
        try{
            await BillTracker.create({companyName: req.body.companyName, description: req.body.description, amountDue: req.body.amountDue, dueDate: req.body.dueDate, completed: false, userId: req.user._id})
            console.log('Bill has been added!')
            res.redirect('/billtracker')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await BillTracker.findOneAndUpdate({_id:req.body.billtrackerIdFromJSFile},{
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
            await BillTracker.findOneAndUpdate({_id:req.body.billtrackerIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
   },
    deleteBillTracker: async (req, res)=>{
        console.log(req.body.billtrackerIdFromJSFile)
        try{
            await BillTracker.findOneAndDelete({_id:req.body.billtrackerIdFromJSFile})
            console.log('Deleted a bill')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    