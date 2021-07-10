const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get("/profile",passport.authenticate("jwt",{session:false}),(req,res)=>{
    res.json({
        id:req.user.id,
        email: req.user.email,
        name:req.user.name,
    })
})

module.exports = router