const Hitlist = require('../models/Hitlist')

module.exports = {
    getHitlist: async (req, res) => {
        console.log(req.user)
        try {
            const hitlistItems = await Hitlist.find({ userId: req.user.id })
            const itemsLeft = await Hitlist.countDocuments({ userId: req.user.id, applied: false })
            res.render('hitlist.ejs', { items: hitlistItems, left: itemsLeft, user: req.user })
        } catch (err) {
            console.log(err)
            res.render("error404")
        }
    },
    details: async (req, res) => {
        console.log(req.user)
        try {
            const list = await Hitlist.find({ user: req.params.id })
            // if(!list){
            //     console.error('ERROR')
            // }
            // if(list.userID != req.user.id){
            //     console.error('ERROR')
            // }else{
            const hitlistItems = await Hitlist.find({ userId: req.user.id })
            const itemsLeft = await Hitlist.countDocuments({ userId: req.user.id, applied: false })
            res.render('details.ejs', { hitlist: list, items: hitlistItems, left: itemsLeft, user: req.user })
            // }

        } catch (err) {
            console.log(err)
            res.render("error500")
        }
    },
    createHitlist: async (req, res) => {
        try {
            await Hitlist.create({ name: req.body.name, url: req.body.url, position: req.body.position, company: req.body.company, email: req.body.company, typeOfPosition: req.body.typeOfPosition, applied: false, userId: req.user.id })
            console.log('HitList Item has been added!')
            res.redirect('/hitlist')
        } catch (err) {
            console.log(err)
            res.render("error500")
        }
    },
    markApplied: async (req, res) => {
        try {
            await Hitlist.findOneAndUpdate({ _id: req.body.hitlistIdFromJSFile }, {
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        } catch (err) {
            console.log(err)
            res.render("error500")
        }
    },
    markNoApplied: async (req, res) => {
        try {
            await Hitlist.findOneAndUpdate({ _id: req.body.hitlistIdFromJSFile }, {
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        } catch (err) {
            console.log(err)
            res.render("error500")

        }
    },
    deleteHitlist: async (req, res) => {
        console.log(req.body.hitlistIdFromJSFile)
        try {
            await Hitlist.findOneAndDelete({ _id: req.body.hitlistIdFromJSFile })
            console.log('Deleted Hitlist')
            res.json('Deleted It')
        } catch (err) {
            console.log(err)
            res.render("error500")
        }
    },
    editHitlist: async (req, res) => {
        try {
            const list = await Hitlist.find({ user: req.params.id })
                res.render('edit.ejs', {items: list})
        } catch (err) {
            console.log(err)
            res.render("error404")
        }
    },
}    