const Group = require('../models/Group')


module.exports = {
    getGroups: async (req, res) => {

        try {
                        const groupItems = await Group.aggregate([{
                $lookup:
                {
                    from: "users",
                    localField: "createdBy",
                    foreignField: "_id",
                    as: "groupAdmin"
                }
            }])


            res.render('group/index.ejs', { groupItems, user: JSON.parse(JSON.stringify(req.user)), groupNumber: groupItems.length, adminPage: req.originalUrl.includes('manageGroup') })
        } catch (err) {
            console.log(err)
        }
    },

    createGroup: (req, res) => {
        res.render('group/create.ejs', {
            title: 'Create a group'

        })
    },

    deleteGroup: (req, res) => {
        res.render('index.ejs', {
            title: 'Homepage'
        })
    },


    editGroup: async (req, res) => {
        /* GET : look for a group the database and load it in the page for edition */
        const { id } = req.params;
        const groupItem = await Group.find({ _id: id });
        res.render('group/create.ejs', { group: groupItem[0]})
    },

    addGroup: async (req, res) => {
        try {
            await Group.create({
                name: req.body.name,
                description: req.body.description,
                validate: false,
                adminId: req.user._id,
                createdBy: req.user._id,
                isPublic: req.body.isPublic === 'on' ? true : false,
                members: req.user.email
                // isCityBased: req.body.isCityBased === 'on' ? true : false,
                // city: req.body.city
            })

            res.redirect('/groups')
        } catch (err) {
            console.log(err)
        }
    },
    updateGroup: async (req, res) => {
        let obj = {
                name: req.body.name,
                description: req.body.description.toString(),
                isPublic: req.body.isPublic === 'on' ? true : false
        }
        /* will be used only if the user is an admin */
        if(req.user.role === 0) {
            obj['isValidated'] = req.body.isValidated === 'on' ? true : false
        }

        try {
            await Group.findOneAndUpdate({ _id: req.body.id }, {
                $set: obj,
            })
            res.redirect('/groups');
        } catch (err) {
            console.log(err)
        }
    },
}
