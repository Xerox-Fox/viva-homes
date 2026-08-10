import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ACCOUNT_TYPES_KEY } from "../decorators/acc-type.decorator"

@Injectable()
export class AccountTypeGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const accountTypes = this.reflector.getAllAndOverride<string[]>(ACCOUNT_TYPES_KEY, [context.getHandler(), context.getClass()],);

        if (!accountTypes) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user) {
            throw new ForbiddenException();
        }

        return accountTypes.includes(user.accountType);
    }
}