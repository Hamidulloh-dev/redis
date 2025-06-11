import { Injectable } from "@nestjs/common";
import { RedisService } from "src/core/database/redis.service";
import { generate } from "otp-generator";

@Injectable()
export class OtpService {
    constructor(private redisService: RedisService) { }
    generateOtp() {
        const otp = generate(6, {
            digits: true,
            specialChars: false,
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false
        })
        return otp
    }
}