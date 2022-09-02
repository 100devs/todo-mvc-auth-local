const express = require('express')
const router = express.Router()
const blogPostController = require('../controllers/blogPost') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, blogPostController.getTodos)

router.get('/createBlogPost', blogPostController.getCreatePostPage)

router.get('/edit/:id', blogPostController.getEditPostPage)
router.post('/edit/:id', blogPostController.editBlogPost)

router.post('/createBlogPost', blogPostController.createBlogPost)


// router.put('/markComplete', blogPostController.markComplete)

// router.put('/markIncomplete', blogPostController.markIncomplete)

router.delete('/deleteTodo', blogPostController.deleteTodo)

module.exports = router