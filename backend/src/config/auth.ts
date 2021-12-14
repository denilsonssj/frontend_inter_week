export default {
    jwt: {
        secret: process.env.SECRET_KEY || 'secret_key',
        expiresIn: '14d',
    }
}