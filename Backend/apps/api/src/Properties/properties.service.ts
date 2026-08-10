import { Injectable } from '@nestjs/common';
import { db } from '../db';
import { properties } from '../db/schema';
import { CreatePropertyDto } from './dto/create-property.dto';

@Injectable()
export class PropertiesService {
    async create(userId: string, dto: CreatePropertyDto) {
        return db.insert(properties).values({
            ...dto, 
            ownerId: userId,
            createdById: userId,
            status: "available",
        }).returning();
    }
}
