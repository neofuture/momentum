import 'zone.js/dist/zone-node';

import {APP_BASE_HREF} from '@angular/common';
import {ngExpressEngine} from '@nguniversal/express-engine';
import {existsSync} from 'fs';
import {join} from 'path';

import express from 'express';
import compression from "compression";

import {cache} from "./src/server/express-cache";
import bootstrap from './src/main.server';

const gzipMiddleware = compression({threshold: 0});

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
    const server = express();
    const distFolder = join(__dirname, '..', 'browser');
    const indexHtml = existsSync(join(distFolder, 'index.original.html'))
        ? 'index.original.html'
        : 'index';

    // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
    server.engine('html', ngExpressEngine({bootstrap}));
    server.use(gzipMiddleware);

    server.set('view engine', 'html');
    server.set('views', distFolder);

    const router = express.Router();
    router.get(`:file.:revision.:extension.map`, cache({ maxAxe: 31536000, staleAge: 604800}), express.static(distFolder));
    router.get(`:file.:revision.:extension`, cache({maxAxe: 31536000, staleAge: 604800}), express.static(distFolder));
    router.get('*.*', cache({maxAxe: 60, staleAge: 604800}), express.static(distFolder));

    // Example Express Rest API endpoints
    // server.get('/api/**', (req, res) => { });
    // Serve static files from /browser
    // server.get('*.*', express.static(distFolder, {maxAge: '1y',}));

    // All regular routes use the Universal engine
    server.use('/', router);
    server.get('*', cache({maxAxe: 15, staleAge: 604800}),
        (req, res) => {
            res.render(indexHtml, {req, providers: [{provide: APP_BASE_HREF, useValue: req.baseUrl}]});
        });

    return server;
}

function run(): void {
    const port = process.env['PORT'] || 4000;

    // Start up the Node server
    const server = app();
    server.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`);
    });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
    run();
}

export default bootstrap;
