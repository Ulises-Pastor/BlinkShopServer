"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const keys_1 = __importDefault(require("./keys"));
const { createPool } = require("promise-mysql");
const pool = createPool(keys_1.default.database);
console.log("conectado");
exports.default = pool;