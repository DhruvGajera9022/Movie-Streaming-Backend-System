const sessionHelper = require("../helpers/session_helper");


const authenticate = (req, res, next) => {
    const { id } = req.session.user || {};

    if (!id) {
        res.redirect("/login");
    } else {
        next();
    }
};


const reverseAuthenticate = (req, res, next) => {
    const { id } = req.session.user || {};

    if (id) {
        res.redirect("/");
    } else {
        next();
    }
};


const isAdmin = async (req, res, next) => {
    const data = await sessionHelper.loggedInUserData(req);

    if (data.role == "2") {
        res.redirect("/");
    } else {
        next();
    }
}


module.exports = {
    authenticate,
    reverseAuthenticate,
    isAdmin,
};
