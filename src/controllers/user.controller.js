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

const getCurrentUser = async (req, res) => {
    try {
        const currentUser = await req.user;

        console.log(req);

        if (!currentUser) return res.status(401).json({message: `User is not authorizated`})

        res.status(200).json({
            success: true,
            user: currentUser,
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = { getUsers, getUsersById, removeUserById, getCurrentUser };