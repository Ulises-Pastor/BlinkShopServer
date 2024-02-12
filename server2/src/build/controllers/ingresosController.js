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
exports.ingresosController = void 0;
const database_1 = __importDefault(require("../database"));
class IngresosController {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM ingresos');
            res.json(respuesta);
        });
    }
    listarUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM ingresos WHERE id = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Ingreso no encontrado' });
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { clave_prenda, unidades } = req.body;
            const precio_unitario = yield database_1.default.query("SELECT precio_unitario FROM prendas WHERE clave = ?", [clave_prenda]);
            const result = yield database_1.default.query("SELECT TRUNCATE(? * ?, 2) AS precio_total", [precio_unitario[0].precio_unitario, unidades]);
            const precio_total = result[0].precio_total;
            const resp = yield database_1.default.query("INSERT INTO ingresos SET clave_prenda = ?, unidades = ?, precio_unitario = ?, precio_total = ?", [clave_prenda, unidades, precio_unitario[0].precio_unitario, precio_total]);
            res.json(resp);
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { clave_prenda, unidades } = req.body;
            const precio_unitario = yield database_1.default.query("SELECT precio_unitario FROM prendas WHERE clave = ?", [clave_prenda]);
            const result = yield database_1.default.query("SELECT TRUNCATE(? * ?, 2) AS precio_total", [precio_unitario[0].precio_unitario, unidades]);
            const precio_total = result[0].precio_total;
            const resp = yield database_1.default.query("UPDATE ingresos SET clave_prenda = ?, unidades = ?, precio_unitario = ?, precio_total = ? WHERE id = ?", [clave_prenda, unidades, precio_unitario[0].precio_unitario, precio_total, id]);
            res.json(resp);
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM ingresos WHERE id = ${id}`);
            res.json(resp);
        });
    }
}
exports.ingresosController = new IngresosController();
