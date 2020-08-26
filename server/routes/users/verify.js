import User from '../../models/User'

export default async ({ query }, response) => {
  const salt = query.a

  try {
    const user = await User.findOne({ salt })
    if (user) {
      user.verified = true
      user.salt = undefined
      await user.save()
    }

    response.send('<p>User verified!</p>')
  } catch (error) {
    console.log(error)
  }
}
