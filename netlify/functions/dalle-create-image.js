const { Configuration, OpenAIApi } = require('openai')
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

exports.handler = async (event, context) => {
    try {
        const { prompt } = JSON.parse(event.body)

        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '256x256',
            response_format: 'b64_json',
        })

        const image = aiResponse.data.data[0].b64_json

        return {
            statusCode: 200,
            body: JSON.stringify({ photo: image }),
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                message:
                    error?.response.data.error.message ||
                    'Something went wrong',
            }),
        }
    }
}
