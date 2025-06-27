const dao = require('../Dao/user.dao');

exports.createUser = async (user) => dao.createUser(user);
exports.getUsers = async () => dao.getUsers();
exports.updateUser = async (id, updates) => dao.updateUser(id, updates);
exports.deleteUser = async (id) => dao.deleteUser(id);
