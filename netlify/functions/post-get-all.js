// import { v2 as cloudinary } from 'cloudinary'

const Post = require('./mongodb/models/post.js').default
const connectDB = require('./mongodb/connect.js').default

connectDB(process.env.MONGODB_URL)

exports.handler = async (event, context) => {
    try {
        const posts = await Post.find({})
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, data: posts }),
        }
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                message: 'Fetching posts failed, please try again',
            }),
        }
    }
}
