module.exports = {
   getGroups: (req,res)=>{
        res.render('index.ejs', {
      title: 'Homepage'
    })
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
}
