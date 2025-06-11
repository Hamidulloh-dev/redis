import { Injectable } from "@nestjs/common";
import { Redis } from "ioredis";

@Injectable()
export class RedisService {
    private redis: Redis
    constructor() { 
        this.redis = new Redis({
            port: +(process.env.REDIS_PORT as string),
            host: process.env.REDIS_HOST as string
        })
        this.redis.on('connect', () => {
            console.log('redis connected');
        })
        this.redis.on('error', (error) => {
            console.log('redis connecting error');
            this.redis.quit()
        })
    }
    

}