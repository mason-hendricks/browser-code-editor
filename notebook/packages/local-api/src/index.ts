import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { createCellsRouter } from './routes/cells';

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  // initial setup of express server
  const app = express();

  // check for proxy param
  if (useProxy) {
    app.use(
      createProxyMiddleware({
        target: 'http://127.0.0.1:3000',
        ws: true,
        logLevel: 'silent',
      })
    );
  } else {
    // else use package path of local-client build dir
    // and pass that to express
    const packagePath = require.resolve('local-client/build/index.html');
    app.use(express.static(path.dirname(packagePath)));
  }

  app.use(createCellsRouter(filename, dir));

  // custom promise to startup express app
  // manual error catching
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};
