const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

exports.contactUs = (req, res) => {
    const { name, email, subject, message } = req.body;
    const oauth2Client = new OAuth2(
        "934935516667-s25a7ccgofsi6ctftilpr7g3shuvf7t7.apps.googleusercontent.com", // ClientID
        "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", // Client Secret
        "https://developers.google.com/oauthplayground" // Redirect URL
    );

    oauth2Client.setCredentials({
        refresh_token: "1//04ZSqykfvNGOMCgYIARAAGAQSNwF-L9Irng97fM5CQ2WxauXQ4oY6z4Lbmaorr6h7bIxBt8cksHnIZOn-dJxi6eavtsVWKnZ_NAE"
    });
    const accessToken = oauth2Client.getAccessToken()

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: "OAuth2",
            user: "kranthidevsai@hashing.company",
            clientId: "934935516667-s25a7ccgofsi6ctftilpr7g3shuvf7t7.apps.googleusercontent.com",
            clientSecret: "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",
            refreshToken: "1//04ZSqykfvNGOMCgYIARAAGAQSNwF-L9Irng97fM5CQ2WxauXQ4oY6z4Lbmaorr6h7bIxBt8cksHnIZOn-dJxi6eavtsVWKnZ_NAE",
            accessToken: accessToken
        },
    });

    var htmlOutput = ` <html lang="en">
    <head>
        <style>
            .container {
             display: flex;
            }
            img {
                vertical-align:middle;
            }
            span {
                vertical-align:middle;
            }
        </style>
    </head>
    <body>
    <h4> Name : ${name}</h4>
    <h4> Email : ${email}</h4>
    <h4> Subject : ${subject}</h4>
    <h4> Message : ${message}</h4>
    </body>
    </html>`;

    const loadingMessage = `<div class="loading d-block">Loading</div>`;
    const errorMessage = `<div class="error-message d-block">Form submission failed! Please try again.</div>`;
    const sucessMessage = `<div class="sent-message d-block">Your message has been sent. Thank you!</div>`;

    const mailOptions = {
        from: req.body.name + '" "<kranthidevsai@hashing.company>', // sender address
        to: 'hashingCompany@gmail.com,ceo@hashing.company', // list of receivers
        // to: 'kranthisai85@gmail.com', // list of receivers
        subject: "New Message from " + req.body.name + " via Contact Form", // Subject line
        html: htmlOutput, // html body
    };

    // "Email : " + req.body.email + "\n\nsubject : " + req.body.subject + " \n\nMessage : " + req.body.message
	if (req.body.name != undefined && req.body.email != undefined && req.body.subject != undefined) {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error)
            return res.json({ error: "Failure" });
        // return res.render('index.html', { message: errorMessage });
        else {
            // alert("Thank you for contacting us :)")
            console.log('Email sent: ' + info.response);
        }
        // return res.render('https://stackoverflow.com/', { message: sucessMessage });
        return res.redirect('/');
        // return res.sendFile(__dirname + "/index.html");
    });}

}
