import express from 'express';

// setup express router for cells

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();

  router.get('/cells', async (req, res) => {
    // Ensure cell storage file exists
    // If it doesn't, add in default cell list
    // Read the file
    // Parse a list of cells from it
    // Send list of cells back to browser
  });

  router.post('/cells', async (req, res) => {
    // Make sure file exists
    // If not, create it
    // Take list of cells from request object
    // serialize them
    // write the cells into file
  });

  return router;
};
