/**
 * Sample users
 */

import bcrypt from 'bcrypt'

const users = [
    { 
        name: 'Admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    { 
        name: 'user 1',
        email: 'user@example.com',
        password: bcrypt.hashSync('123456', 10),
    }
]


export default users