import jwt from 'jsonwebtoken'

export default function signResponse(data, response) {
  jwt.sign(data, 'secret', { expiresIn: '1h' }, (error, token) =>
    response.json({ data, token: `Bearer ${token}` })
  )
}
