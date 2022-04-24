const express = require('express');
const router = express.Router();

const NewsletterUser = require('../models/NewsletterUser');

router.post('/', (req, res) => {
   const email = req.body.email;
    const newNewsletterUser = new NewsletterUser({
        email: email
    })
    newNewsletterUser.save()
        .then(() => res.json({
            message: "Subscribed Successfully"
        }))
        .catch(err => res.status(400).json({
            "error": err,
            "message": "Error subscribing to newsletter"
        }))
})

module.exports = router 
