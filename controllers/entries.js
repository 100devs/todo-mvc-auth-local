// Copied from todo.js... for now
// Should now be entry/entries - hopefully I caught them all!

const Entry = require('../models/Entry')

module.exports = {
    getEntries: async (req,res)=>{
        console.log(req.user)
        try{
            // Get individual entry item
            const expenseItems = await Entry.find({expense:true})
            const incomeItems = await Entry.find({expense:false})
            const entryItems = await Entry.find({userId:req.user.id})
            const totalEntries = await Entry.countDocuments({userId:req.user.id,})

            res.render('entries.ejs', {entries: entryItems, expenses: expenseItems, income: incomeItems, total: totalEntries, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createEntry: async (req, res)=>{
        try{
            const entryItem = req.body;
            // console.log('hey, this is your request')
            // console.log(entryItem)           
            console.log(await Entry.create({date: entryItem.date,
                                            expense: entryItem.expense,
                                            amount: entryItem.amount,
                                            description: entryItem.description,
                                            company: entryItem.company,
                                            category: entryItem.category,
                                            userId: req.user.id}))
            console.log('Entry has been added!')
  
            res.redirect('/entries')
        }catch(err){
            console.log(err)
        }
    },
    
    markIncomplete: async (req, res)=>{
        try{
            await Entry.findOneAndUpdate({_id:req.body.entryIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    
    deleteEntry: async (req, res)=>{
        console.log("checkpoint-m")
        console.log(req.body)
        console.log(req.body.entryIdFromJSFile)
        try{
            await Entry.findOneAndDelete({_id:req.body.entryIdFromJSFile})
            console.log('Deleted Entry')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    