import { Injectable } from '@nestjs/common';
import { db } from '../db';
import { properties } from '../db/schema';

@Injectable()
export class PropertiesService {
    async create(userId: string, data: any) {
        return db.insert(properties).values({
            ...data, ownerId: userId,
        }).returning();
    }
}
