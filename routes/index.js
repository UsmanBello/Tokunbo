const express       =require("express"),
	router        = express.Router();
const sendEmail= require('../mailer/mailer');


router.get("/", async function(req,res){
	try{
	res.render("landing",{page:"landing"});//work on messaging
	}catch(err){
		// console.log((err.message))
}
});

router.post("/send",async function(req,res){
	
	try{
		// console.log(message('Message sent. We will get back to you soon!'))
		// var {name,mobile, email, message, make, model, year, carCondition}= req.sanitize(req.body);
	var name=req.sanitize(req.body.name);
	var mobile=req.sanitize(req.body.mobile);
	var email=req.sanitize(req.body.email);
	var message=req.sanitize(req.body.message);
	var make=req.sanitize(req.body.make);
	var model=req.sanitize(req.body.model);
	var carCondition=req.sanitize(req.body.carCondition);
	var year=req.sanitize(req.body.year);
	
	await sendEmail(email, 
			   'tokunbomotors@hotmail.com',
				'Enquiry message from <'+ name +' requests quotes for: [ '+carCondition+' '+year+' '+make+' '+model+' ] >. N0: '+mobile+'.',
				message)
		
			req.flash("success","Message sent successfully, We will get back to you as soon as possible.."); 
		
		res.redirect('/')
	}catch(err){
		req.flash("error","Unable to send message. Please try again.");
		res.redirect('/')
    }
})

router.get("*", async function(res, res){
	
	try{
		res.render("error",{page:"error", title: 'Error 404'});
	}catch(err){
	}
})



module.exports = router;