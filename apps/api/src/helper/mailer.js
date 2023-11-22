const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"serolom911@ikanid.com",
        pass:"12345678910"
    }
})

module.exports = transporter