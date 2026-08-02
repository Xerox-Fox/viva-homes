import { Controller, All, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { auth } from "./auth";

@Controller('auth')
export class AuthController {
    @All('*')
    async handleAuth(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const url = new URL(req.originalUrl, `${req.protocol}://${req.get("host")}`);

        const request = new Request(url, {
            method: req.method,
            headers: req.headers as Record<string, string>,
            body: req.body && req.method !== "GET" && req.method !== "HEAD" ? JSON.stringify(req.body) : undefined,
        });

        const response = await auth.handler(request);

        res.status(response.status);

        response.headers.forEach((value, key) => {
            res.setHeader(key, value);
        });

        res.send(await response.text());

    }
}