import { BadRequestException, Injectable } from "@nestjs/common";
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
    async sendOtp(phone_number: string) {
        await this.chekOtpExisted(`user ${phone_number}`)
        const tempOtp = this.generateOtp()
        const responseRedis = await this.redisService.setOtp(phone_number, tempOtp)
        if (responseRedis === 'OK') {
            return true
        }
    }

    async chekOtpExisted(key: string) {
        const ckeckOtp = await this.redisService.getOtp(key)
        if (ckeckOtp) {
            const ttl = await this.redisService.getTTL(key)
            throw new BadRequestException(`iltimos ${ttl} secundan keyin urinib noring`)
        }
    }

    async verifyOtpSendedUser(key: string, code: string) {
        const otp = await this.redisService.getOtp(key)
        if (!otp || otp !== code) throw new BadRequestException('cod yaroqsiz')
        await this.redisService.delKey(key)
    }
}