const Diary = require('../models/Diary')
const User = require('../models/User')

module.exports = {
    getDiary: async (req,res)=>{
        console.log(req.user)
        try{
            const diaryEntries = await Diary.find({userId:req.user.id}) //find the Diary in database with matching from models
            const totalEntries = await Diary.countDocuments({userId:req.user.id})
            const allUsers = await User.find();
            res.render('diary.ejs', {diary: diaryEntries, total: totalEntries, user: req.user, allUsers: allUsers})
        }catch(err){
            console.log(err)
        }
    },
    createDiary: async (req, res)=>{
        try{
            await Diary.create({diary: req.body.diaryEntry, userId: req.user.id, private: req.body.private})
            console.log(req.body)
            res.redirect('/diary')
        }catch(err){
            console.log(err)
        }
    },
    changePrivacy: async (req, res)=>{
        try{
            await Diary.findOneAndUpdate({_id:req.body.diaryIdFromJSFile},{private: req.body.private})
            console.log('Updated Diary')
            res.json('Updated Diary')
        }catch(err){
            console.log(err)
        }
    },
    deleteDiary: async (req, res)=>{
        console.log(req.body.diaryIdFromJSFile)
        try{
            await Diary.findOneAndDelete({_id:req.body.diaryIdFromJSFile})
            console.log('Deleted Diary')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    