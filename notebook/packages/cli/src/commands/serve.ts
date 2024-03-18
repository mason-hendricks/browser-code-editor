import path from 'path';
import { Command } from 'commander';
import { serve } from '@mh-react-notebook/local-api';

interface LocalError {
  code: string;
}

// setup commander cli
// serve command: establishes file structure and port number

const isProduction = process.env.NODE_ENV === 'production';
export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p --port <number>', 'port to run server on', '4005')
  .action((filename = 'notebook.js', options: { port: string }) => {
    // add local error predicate to fix TS problem
    const isLocalApiError = (err: any): err is LocalError => {
      return typeof err.code === 'string';
    };

    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        !isProduction
      );
      console.log(
        `Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file.`
      );
    } catch (err) {
      if (isLocalApiError(err)) {
        if (err.code === 'EADDRINUSE') {
          console.log('Pot is in use. Try running on a different port.');
        }
      } else if (err instanceof Error) {
        console.log('Error caught in serve command action: ', err);
      }
      process.exit(1);
    }
  });
