const express = require('express');
const mongoose = require('mongoose');
const Url = require('./Model/Url');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');


dotenv.config();

const app = express();
app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});

app.use(limiter);


app.get('/', (req, res) => {
  res.json({
      message: 'Shorten URL app is working fine',
      status: 'Server is up',
      now: new Date().toLocaleDateString()
  });
});


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
      console.log('MongoDB connected');
  })
  .catch((error) => {
      console.error('MongoDB connection error:', error);
  });

// Start the server
const Port = process.env.PORT || 5000;
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});


// Shorten URL Endpoint
app.post('/shorten', async (req, res) => {
  const { url } = req.body;
  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  const shortId = crypto.randomBytes(6).toString('hex');
  const newUrl = new Url({ originalUrl: url, shortId });

  try {
    await newUrl.save();
    res.json({ shortUrl: `https://yourapp.com/${shortId}` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to shorten URL' });
  }
});

// Redirect to Original URL
app.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;
  const url = await Url.findOne({ shortId });

  if (!url) {
    return res.status(404).json({ error: 'Short URL not found' });
  }

  // Update Clicks and Last Accessed
  url.clicks += 1;
  url.lastAccessed = new Date();
  await url.save();

  res.redirect(url.originalUrl);
});

// Get Stats for a Short URL
app.get('/stats/:shortId', async (req, res) => {
  const { shortId } = req.params;
  const url = await Url.findOne({ shortId });

  if (!url) {
    return res.status(404).json({ error: 'Short URL not found' });
  }

  res.json({
    clicks: url.clicks,
    lastAccessed: url.lastAccessed,
  });
});

// Utility function to validate URL
const isValidUrl = (url) => {
  const pattern = /^(https?:\/\/)?([a-z0-9]+[.])+[a-z0-9]{2,6}(\/[^\s]*)?$/;
  return pattern.test(url);
};
