"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
const path_1 = __importDefault(require("path"));
const commander_1 = require("commander");
const local_api_1 = require("local-api");
// setup commander cli
// serve command: establishes file structure and port number
exports.serveCommand = new commander_1.Command()
    .command('serve [filename]')
    .description('Open a file for editing')
    .option('-p --port <number>', 'port to run server on', '4005')
    .action((filename = 'notebook.js', options) => {
    // add local error predicate to fix TS problem
    const isLocalApiError = (err) => {
        return typeof err.code === 'string';
    };
    try {
        const dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename));
        (0, local_api_1.serve)(parseInt(options.port), path_1.default.basename(filename), dir);
        console.log(`Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file.`);
    }
    catch (err) {
        if (isLocalApiError(err)) {
            if (err.code === 'EADDRINUSE') {
                console.log('Pot is in use. Try running on a different port.');
            }
        }
        else if (err instanceof Error) {
            console.log('Error caught in serve command action: ', err);
        }
        process.exit(1);
    }
});
