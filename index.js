require("dotenv").config();
const express          =require("express"), 
	  app              =express(),
	  flash            =require("connect-flash"),
      bodyParser       =require("body-parser"),
	  expressSanitizer =require("express-sanitizer");
const indexRoutes     =require("./routes/index")


app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));

//creating an express session
// app.configure(function() {
//   app.use(express.cookieParser('keyboard cat'));
//   app.use(express.session({ cookie: { maxAge: 60000 }}));
//   app.use(flash());
// });
app.use(flash());

app.use(require("express-session")({
secret: process.env.SESSION_SECRET,
resave: false,
saveUninitialized: false
}));

/* USE express-http-to-https NODE PACKAGE TO REDIRECT HTTP TO HTTPS VERSION*/
if(process.env.PORT!=3000){
 var redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;	
app.use(redirectToHTTPS());
}

/*FLASH MIDDLEWARE*/
app.use(function(req,res,next){
	// res.locals.currentUser=req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});


app.use("/", indexRoutes);

// app.get("/", async function(req,res){
// 	try{
// 	res.render("landing",{page:"landing"});//work on messaging
// 	}catch(err){
// 		console.log((err.message))
// }
// });

// app.post("/send",async function(req,res){
	
// 	try{
// 		// console.log(message('Message sent. We will get back to you soon!'))
// 		var {Name, email, message, make, model, year, carCondition}= req.body;
	
// 	await sendEmail(email, 
// 			   'ussybells@gmail.com',
// 				'Enquiry message from <'+ Name +'>.',
// 				message+'<Car Quote requested for: ['+carCondition+' '+year+' '+make+' '+model+'] >')
		
// 			req.flash("success","Message sent successfully, We will get back to you as soon as possible.."); 
		
// 		res.redirect('/')
// 	}catch(err){
// 		req.flash("error","Unable to send message. Please try again.");
// 		res.redirect('/')
//     }
// })

app.post("*", async function(res, res){
	
	try{
		res.render("error");
	}catch(err){
		console.log(err)
	}
})


app.listen(process.env.PORT, function(){
	console.log(`server is listening on ${process.env.PORT}`);
});