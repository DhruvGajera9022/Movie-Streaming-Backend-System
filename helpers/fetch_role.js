const Role = require("../models/role");

const fetchRole = async (id) => {
    const role = await Role.findOne({ where: { id: id } });
    return role ? role.title : 'No role';
};

module.exports = {
    fetchRole,
};
