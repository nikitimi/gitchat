// USER_CONTROLLER
const { User } = require("../models");

// create user
const createUser = async (req, res) => {
	const { email, username, password } = req.body;
	try {
		const result = await User.createNewUser(email, username, password);
		return res.status(200).json(result);
	} catch (error) {
		return res.status(400).json(error);
	}
};

//login user
const loginUser = async (req, res) => {
	try {
		const result = await User.loginUser(req.body);
		return res.status(200).json(result);
	} catch (error) {
		res.status(400).json(error);
	}
};

module.exports = { createUser, loginUser };
