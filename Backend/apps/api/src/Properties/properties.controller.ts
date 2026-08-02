import { Controller, Post, Body, Req } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { Roles } from '../Auth/decorators/role.decorator';

@Controller('properties')
export class PropertiesController {
    constructor(
        private propertiesService: PropertiesService
    ) {}

    @Post()
    @Roles('user')
    async create(@Req() req, @Body() body,) {
        const userId = req.user.id;

        return this.propertiesService.create(userId, body);
    }
}
