
const Budget = require('../models/Budget')

module.exports = {
    getBudgets: async (req,res)=>{
        console.log(req.user)
        try{
            // Get individual budget item
            const expenseItems = await Budget.find({expense:true})
            const incomeItems = await Budget.find({expense:false})
            const budgetItems = await Budget.find({userId:req.user.id})
            const totalBudgets = await Budget.countDocuments({userId:req.user.id,})

            res.render('budgets.ejs', {budgets: budgetItems, expenses: expenseItems, income: incomeItems, total: totalBudgets, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createBudget: async (req, res)=>{
        try{
            const budgetItem = req.body;
            // console.log('hey, this is your request')
            // console.log(budgetItem)           
            console.log(await Budget.create({date: budgetItem.date,
                                            expense: budgetItem.expense,
                                            amount: budgetItem.amount,
                                            description: budgetItem.description,
                                            company: budgetItem.company,
                                            category: budgetItem.category,
                                            userId: req.user.id}))
            console.log('Budget has been added!')
  
            res.redirect('/budgets')
        }catch(err){
            console.log(err)
        }
    },
    
    markIncomplete: async (req, res)=>{
        try{
            await Budget.findOneAndUpdate({_id:req.body.budgetIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    
    deleteBudget: async (req, res)=>{
        console.log("checkpoint-m")
        console.log(req.body)
        console.log(req.body.budgetIdFromJSFile)
        try{
            await Budget.findOneAndDelete({_id:req.body.budgetIdFromJSFile})
            console.log('Deleted Budget')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    