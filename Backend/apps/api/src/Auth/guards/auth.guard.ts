import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { auth } from "../auth";

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const authorization = request.headers.authorization;

        console.log("Authorization Header:", authorization);

        if (!authorization) {
            throw new UnauthorizedException("Missing authorization header");
        }

        const session = await auth.api.getSession({headers: new Headers({authorization}),});
        console.log("Session:", session);

        if (!session) {
            throw new UnauthorizedException("Unauthorized User");
        }

        request.user = session.user;
        request.session = session.session;
        return true;
    }
}