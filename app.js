const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require("./routes/blogRoutes")

const app = express();

// Use environment variables or replace with valid credentials
const dbURI = process.env.DB_URI || 'mongodb+srv://tundecodes:baba1000@cluster0.r0uoz.mongodb.net/dbname?retryWrites=true&w=majority';

mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(3000, () => console.log('Server running on http://localhost:3000'));
    })
    .catch((err) => console.log('DB Connection Error:', err));

// Middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Debugging middleware
app.use((req, res, next) => {
    console.log('New request made:');
    console.log('Host:', req.hostname);
    console.log('Path:', req.path);
    console.log('Method:', req.method);
    next();
});

// Register view engine
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});


//blog routes
app.use("/blogs/",blogRoutes)

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
