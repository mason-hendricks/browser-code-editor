import express from 'express';
import fs from 'fs/promises';
import path from 'path';

interface Cell {
  id: string;
  content: string;
  type: 'TEXT' | 'CODE';
}

interface LocalApiError {
  code: string;
}

// setup express router for cells

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());
  const fullPath = path.join(dir, filename);

  const isLocalApiError = (err: any): err is LocalApiError => {
    return typeof err.code === 'string';
  };

  router.get('/cells', async (req, res) => {
    // read the file
    // check for error
    try {
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' });

      res.send(JSON.parse(result));
    } catch (err) {
      if (isLocalApiError(err)) {
        if (err.code === 'ENOENT') {
          await fs.writeFile(fullPath, '[]', 'utf-8');
          res.send([]);
        }
      } else {
        throw err;
      }
    }
  });

  router.post('/cells', async (req, res) => {
    // Take list of cells from request object
    // serialize them
    const { cells }: { cells: Cell[] } = req.body;

    // write the cells into file
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');
    res.send({ status: 'ok' });
  });

  return router;
};
