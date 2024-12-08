import redisClient from './redis'



const setSession = async(userId, token, expiry = 3600) => {
    const sessionkey = `sessionId:${userId}`
    await redisClient.set(sessionkey, token , { EX: expiry})
}

const getSession =async (userId) => {
    const sessionkey = `sessionId:${userId}`
    return await redisClient.get(sessionkey)
}


const deletSession =async (userId) => {
    const sessionkey = `sessionId:${userId}`
    return await redisClient.del(sessionkey)
}


module.exports = { setSession, getSession, deletSession };
