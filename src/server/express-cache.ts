import { NextFunction, Request, Response } from 'express';

interface CacheOptions {
    staleAge?: number;
    maxAxe?: number;
    private?: boolean;
    mustRevalidate?: boolean;
}

interface CacheHeader {
    'max-age'?: number;
    'no-cache'?: true;
    private?: true;
    public?: true;
    mustRevalidate?: true;
    'stale-while-revalidate'?: number;
}

export const cache = (options: CacheOptions) => {
    const cacheControl: CacheHeader = {};

    if (options.maxAxe) {
        cacheControl['max-age'] = options.maxAxe;
    } else {
        cacheControl['max-age'] = 0;
        cacheControl['no-cache'] = true;
    }

    if (options.staleAge) {
        cacheControl['stale-while-revalidate'] = options.staleAge;
    }

    if (options.private) {
        cacheControl['private'] = true;
    } else {
        cacheControl['public'] = true;
    }

    if (options.mustRevalidate) {
        cacheControl['mustRevalidate'] = true;
    }

    const cacheStr = Object.entries(cacheControl)
        .map(([key, value]) => (value === true ? key : `${key}=${value}`))
        .join(', ');

    return (req: Request, res: Response, next: NextFunction) => {
        res.header('Cache-Control', cacheStr);
        next();
    };
};
