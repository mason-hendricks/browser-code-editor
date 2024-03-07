"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCellsRouter = void 0;
const express_1 = __importDefault(require("express"));
// setup express router for cells
const createCellsRouter = (filename, dir) => {
    const router = express_1.default.Router();
    router.get('/cells', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // Ensure cell storage file exists
        // If it doesn't, add in default cell list
        // Read the file
        // Parse a list of cells from it
        // Send list of cells back to browser
    }));
    router.post('/cells', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // Make sure file exists
        // If not, create it
        // Take list of cells from request object
        // serialize them
        // write the cells into file
    }));
    return router;
};
exports.createCellsRouter = createCellsRouter;