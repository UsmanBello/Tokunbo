const mailgunLoader= require('mailgun-js');

var mailgun= mailgunLoader({apiKey: process.env.MAILGUN_API_KEY,
							domain: process.env.MAILGUN_DOMAIN})


const sendEmail=(from, to, subject, content, contentHtml)=>{
	
	let data={
		from,
		to,
		subject,
		text: content,
		html: contentHtml
	}
	
	return mailgun.messages().send(data)
}

module.exports= sendEmail 