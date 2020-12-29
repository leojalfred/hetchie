import jwt from 'jsonwebtoken'

export default (data, response) =>
  jwt.sign(data, 'secret', { expiresIn: '1h' }, (error, token) =>
    response.json({ data, token: `Bearer ${token}` })
  )
