const userService = require('../service/user-service');

const getUsers = async (req, res) => {
    try {
        const allTodos = await userService.getAllUsers();

        res.json(allTodos.rows);
    } catch (error) {
        console.error(error.message);
    }
};

const getUsersById = async (req, res) => {
    try {
        const { userId } = req.params;

        const todo = await userService.getOneUserById(userId);

        res.json(todo.rows);
    } catch (error) {
        console.error(error.message);
    }
};

const removeUserById = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await userService.removeOneUserById(userId);

        res.json({success: true, message: `User ${userId} was deleted`});
    } catch (error) {
        console.error(error.message);
    }
};

module.exports = { getUsers, getUsersById, removeUserById };