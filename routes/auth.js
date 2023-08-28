const router = require("express").Router();
const User = require("../models/User");

router.post("/login", async (request, response) => {
    try {
        const user = await User.findOne({email:request.body.email});
        !user && response.status(404).send("user error")

        if(request.body.password !== user.password) {
            response.status(400).json("password error");
        } else {
            response.status(200).json(user);
        }
    } catch (LoginError) {
        console.log(LoginError);
    }
})

router.post("/register", async (request, response) => {
    const createUser = new User ({
        username: request.body.username,
        email: request.body.email,
        password: request.body.password
    });
    try{
        const user = await createUser.save();
        response.status(200).json(user);
    } catch(RegisterErr) {
        console.log(RegisterErr);
    }
});

module.exports = router;