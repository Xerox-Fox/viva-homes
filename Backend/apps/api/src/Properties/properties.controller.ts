import { Controller, Post, Body, Req } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { Roles } from '../Auth/decorators/role.decorator';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../Auth/guards/roles.guard';
import { AuthGuard } from '../Auth/guards/auth.guard';
import { AccountTypeGuard } from '../Accounts/guards/acc.guard';
import { AccountTypes } from '../Accounts/decorators/acc-type.decorator';

@Controller('properties')
export class PropertiesController {
    constructor(
        private propertiesService: PropertiesService
    ) {}

    @Post()
    @UseGuards(AuthGuard, RolesGuard, AccountTypeGuard)
    @Roles('user')
    @AccountTypes("home-owner", "agent")
    async create(@Req() req, @Body() body,) {
        const userId = req.user.id;

        return this.propertiesService.create(userId, body);
    }
}
