const Users = require("../models/user");


// To get logged in user data
const loggedInUserData = async (req, res) => {
    const id = req.session.user.id;
    if (!id) return null;
    return await Users.findOne({ where: id });
}


module.exports = {
    loggedInUserData,
}