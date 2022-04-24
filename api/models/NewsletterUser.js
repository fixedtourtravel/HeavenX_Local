const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsletterSchema = new Schema({
    email: {
        type: String,
        required: true
    }
})

const NewsletterUser  = mongoose.model('NewsletterUser', newsletterSchema);

module.exports = NewsletterUser;