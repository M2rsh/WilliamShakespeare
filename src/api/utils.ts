import { createHash } from "crypto";
import type { Context, Next } from "koa";
import { logger } from "../main.js";

export function log(ctx: Context, next: Next) {
    const identification = `${createHash('sha256').update(ctx.ip).digest('hex')}`.substring(0, 16);
    logger.info(`Request: ${ctx.method}, ${ctx.url} by ${identification}`);
    return next();
}

export function Authenticated(ctx: Context, next: Next) {
    if (ctx.query.key === process.env.AUTH_KEY) {
        return next();
    } else {
        ctx.type = "application/json";
        ctx.status = 401;
        ctx.body = { "error": 401, "message": "Unauthorized" };
        return;
    }
}