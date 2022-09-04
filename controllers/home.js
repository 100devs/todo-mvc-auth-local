module.exports = {
    getIndex: (req,res)=>{
        if (req.user) res.redirect('/blogPost')
        else res.render('login.ejs')
    }
}