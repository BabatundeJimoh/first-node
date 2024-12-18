const Blog = require('../models/blog');

// Display all blogs
const blog_index = (req, res) => {
    Blog.find()
        .sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result });
        })
        .catch((err) => {
            console.error('Error fetching blogs:', err);
            res.status(500).send('Internal Server Error');
        });
};

// Display details for a single blog
const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            if (!result) {
                return res.status(404).render('404', { title: 'Blog Not Found' });
            }
            res.render('details', { blog: result, title: 'Blog Details' });
        })
        .catch((err) => {
            console.error('Error fetching blog:', err);
            res.status(500).send('Internal Server Error');
        });
};

// Render create blog page
const blog_create_get = (req, res) => {
    res.render('create', { title: 'Create a New Blog' });
};

// Save a new blog
const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(() => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.error('Error saving blog:', err);
        });
};

// Delete a blog
const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(() => {
            res.json({ redirect: '/blogs' });
        })
        .catch((err) => {
            console.error('Error deleting blog:', err);
        });
};

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
};
