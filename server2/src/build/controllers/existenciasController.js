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
exports.existenciasController = void 0;
const database_1 = __importDefault(require("../database"));
class ExistenciasController {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT prendas.clave AS Clave, prendas.descripcion AS Prenda, tallas.talla_prenda AS Talla, unidades AS Unidades FROM existencias LEFT JOIN prendas ON prendas.clave = existencias.clave_prenda LEFT JOIN tallas ON tallas.id = existencias.id_talla');
            res.json(respuesta);
        });
    }
    listarPorPrenda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { clave_prenda } = req.params;
            const respuesta = yield database_1.default.query('SELECT prendas.clave AS Clave, prendas.descripcion AS Prenda, tallas.talla_prenda AS Talla, unidades AS Unidades FROM existencias LEFT JOIN prendas ON prendas.clave = existencias.clave_prenda LEFT JOIN tallas ON tallas.id = existencias.id_talla WHERE clave_prenda = ?', [clave_prenda]);
            if (respuesta.length > 0) {
                res.json(respuesta);
                return;
            }
            res.status(404).json({ 'mensaje': 'Esta prenda no tiene existencias' });
        });
    }
    listarUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { clave_prenda, id_talla } = req.params;
            const respuesta = yield database_1.default.query('SELECT prendas.clave AS Clave, prendas.descripcion AS Prenda, tallas.talla_prenda AS Talla, unidades AS Unidades FROM existencias LEFT JOIN prendas ON prendas.clave = existencias.clave_prenda LEFT JOIN tallas ON tallas.id = existencias.id_talla WHERE clave_prenda = ? and id_talla = ?', [clave_prenda, id_talla]);
            if (respuesta.length > 0) {
                res.json(respuesta);
                return;
            }
            res.status(404).json({ 'mensaje': 'Sin existencias para esta talla' });
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("INSERT INTO existencias set ?", [req.body]);
            res.json(resp);
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { clave_prenda, id_talla } = req.params;
            console.log(req.params);
            const resp = yield database_1.default.query("UPDATE existencias set ? WHERE clave_prenda = ? and id_talla = ?", [req.body, clave_prenda, id_talla]);
            res.json(resp);
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { clave_prenda, id_talla } = req.params;
            const resp = yield database_1.default.query("DELETE FROM existencias WHERE clave_prenda = ? and id_talla = ?", [clave_prenda, id_talla]);
            res.json(resp);
        });
    }
}
exports.existenciasController = new ExistenciasController();
