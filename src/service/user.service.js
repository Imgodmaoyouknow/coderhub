const connection = require('../app/database')

class UserService {
  async create(user) { 
    const { name, password } = user
    const statement = 'INSERT INTO users (name, password) VALUES (?, ?);'

    const [result] = await connection.execute(statement, [ name, password ])

    return result
  }

  async getByName(name) {
    const statement = 'SELECT * FROM users WHERE name = ?'
    const [result] = await connection.execute(statement, [name])
    return result
  }
}

module.exports = new UserService() 