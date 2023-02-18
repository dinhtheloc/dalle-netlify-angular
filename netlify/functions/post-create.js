const cloudinary = require('cloudinary').v2

const Post = require('./mongodb/models/post.js').default
const connectDB = require('./mongodb/connect.js').default

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

connectDB(process.env.MONGODB_URL)

exports.handler = async (event, context) => {
    try {
        const { name, prompt, photo } = JSON.parse(event.body)

        const photoUrl = await cloudinary.uploader.upload(photo)

        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        })

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, data: newPost }),
        }
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                message: 'Unable to create a post, please try again',
            }),
        }
    }
}
