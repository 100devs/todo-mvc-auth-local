const express = require('express')
const router = express.Router()
const blogPostController = require('../controllers/blogPost') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, blogPostController.getPosts)

router.get('/createBlogPost', blogPostController.getCreatePostPage)
router.post('/createBlogPost', blogPostController.createBlogPost)

router.get('/edit/:id', blogPostController.getEditPostPage)
router.post('/edit/:id', blogPostController.editBlogPost)

router.delete('/deletePost', blogPostController.deletePost)

module.exports = router
