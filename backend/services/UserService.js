import userModel from '../models/userModel.js'
import pool from '../config/db.js'

const UserService = {
    createUser: async (userData) => {
        const userId = await userModel.create(userData, pool);
        return userId;
    },

    getAllUsers: async () => {
        const users = await userModel.getAll(pool);
        return users;
    },

    findUserByEmail: async (email) => {
        const user = await userModel.findByEmail(email, pool);
        return user;
    },

    getUserById: async (id) => {
        const user = await userModel.getById(id, pool);
        return user;
    },

    deleteUserById: async (id) => {
        const deleted = await userModel.deleteById(id, pool);
        return deleted;
    },

    deleteAllUsers: async () => {
        const deletedAll = await userModel.deleteAll(pool);
        return deletedAll;
    },

    updateUserById: async (userData, id) => {
        const userUpdate = await userModel.updateById(userData, id, pool);
        return userUpdate;
    }
};

export async function verifyUserByToken(token) {
    const query = 'SELECT * FROM users WHERE verification_token = $1';
    const { rows } = await pool.query(query, [token]);
    const user = rows[0];

    if (!user) return false;

    const updateQuery = `
        UPDATE users
        SET is_verified = true, verification_token = NULL
        WHERE id = $1
    `;
    await pool.query(updateQuery, [user.id]);

    return true;
}

export default UserService;
