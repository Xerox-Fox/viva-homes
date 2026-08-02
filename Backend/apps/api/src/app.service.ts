import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHealth() {
        return {
            status: "ok",
            message: "Viva Homes API is running successfully",
            timestamp: new Date().toISOString()
        };
    }
}