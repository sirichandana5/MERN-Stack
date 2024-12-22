const express = require('express');
const News = require('../models/news');

const router = express.Router();

// Get all news
router.get('/', async (req, res) => {
  try {
    const news = await News.find();
    res.render('index', { news });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add new news form
router.get('/add', (req, res) => {
  res.render('addNews');
});

// Post new news
router.post('/add', async (req, res) => {
  const { title, content } = req.body;
  try {
    const newNews = new News({ title, content });
    await newNews.save();
    res.redirect('/news');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
