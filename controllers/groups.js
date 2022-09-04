const Group = require('../models/Group')


module.exports = {
   getGroups: async (req,res)=>{
        try{
            const groupItems = await Group.find({ userId: req.user._id })
            res.render('group/index.ejs', { groupItems , user: JSON.parse(JSON.stringify(req.user)), groupNumber: groupItems.length })
        }catch(err){
            console.log(err)
        }
    },

    createGroup: (req,res)=>{
        res.render('group/create.ejs', {
      title: 'Create a group'
    })
    },

    deleteGroup: (req,res)=>{
        res.render('index.ejs', {
      title: 'Homepage'
    })
    },

    updateGroup: (req,res)=>{
        res.render('index.ejs', {
      title: 'Homepage'
    })
    },
    addGroup: async (req, res)=>{
        try{
            await Group.create({
                name: req.body.name,
                description: req.body.description,
                validate: false,
                adminId:  req.user._id,
                createdBy: req.user._id,
                isPublic: req.body.isPublic === 'on' ? true : false,
                // isCityBased: req.body.isCityBased === 'on' ? true : false,
                // city: req.body.city
                })

                res.redirect('/groups')
        }catch(err){
            console.log(err)
        }
    },
}
