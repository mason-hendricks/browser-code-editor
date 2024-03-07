import express from 'express';

export const serve = (port: number, filename: string, dir: string) => {
  // initial setup of express server
  const app = express();

  // custom promise to startup express app
  // manual error catching

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};
