import { error } from 'console';
import redis from 'ioredis';
require('dotenv').config();

const redisClient = () =>{
    if(process.env.REDIS_URL){
        console.log('Redis Conncted');
        return process.env.REDIS_URL;
    }
    throw new Error('Redis Conncetion Failed')
}

export const Redis = new redis (redisClient())