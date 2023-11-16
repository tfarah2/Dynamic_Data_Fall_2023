exports.newsletterSignup = (req,res) => {
    res.render('newsletter-signup', { csrf : 'supersecret'})
}

exports.newsletterSignupProcess = (req,res) => {
    //then we do something here
    console.log(req.body)
    res.send("you posted something to /process " + req.body.email)
}