import User from '../../models/User'

export default async function verify(request, response) {
  const email = request.query.a
  const salt = request.query.b

  try {
    const user = await User.findOne({ email, salt })
    let url = '/'
    if (user) {
      user.verified = true
      user.salt = undefined
      await user.save()

      url += '?verified=true'
    }

    if (process.env.NODE_ENV !== 'production')
      url = 'http://localhost:3000' + url
    response.redirect(url)
  } catch (error) {
    console.log(error)
  }
}
