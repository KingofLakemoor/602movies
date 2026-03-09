const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let reviews = [];

app.post('/submit-review', (req, res) => {
    const { username, rating, review } = req.body;

    if (!username || rating === undefined || rating === null || !review) {
        return res.status(400).send('Please provide username, rating, and review.');
    }

    if (review.length > 300) {
        return res.status(400).send('Review must be less than 300 characters.');
    }

    if (isNaN(rating) || rating < 0 || rating > 5) {
         return res.status(400).send('Rating must be a number between 0 and 5.');
    }

    reviews.push({ username, rating: parseFloat(rating), review });
    res.status(200).send('Review submitted successfully!');
});

app.get('/reviews', (req, res) => {
    res.json(reviews);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
