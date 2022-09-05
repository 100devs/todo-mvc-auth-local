const express = require('express')
const router = express.Router()
const blogPostController = require('../controllers/blogPost') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, blogPostController.getPosts)

router.get('/createBlogPost', ensureAuth, blogPostController.getCreatePostPage)
router.post('/createBlogPost', ensureAuth, blogPostController.createBlogPost)

router.get('/edit/:id', ensureAuth, blogPostController.getEditPostPage)
router.post('/edit/:id', ensureAuth, blogPostController.editBlogPost)

router.delete('/deletePost', ensureAuth, blogPostController.deletePost)

module.exports = router
