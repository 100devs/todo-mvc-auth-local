const Todo = require('../models/Todo')

module.exports = {
    getTodos: async (req,res)=>{
        console.log(req.user)
        try{

            const todosArchived = await Todo.find({
                userId:req.user.id,
                archive: true
            })
            
            
            res.render('archive.ejs', {
                archivedTodos: todosArchived,
                user: req.user
            })
            
        }catch(err){
            console.log(err)
        }
    }
}  