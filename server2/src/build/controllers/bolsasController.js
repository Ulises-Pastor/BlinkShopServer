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
exports.bolsasController = void 0;
const database_1 = __importDefault(require("../database"));
class BolsasController {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM bolsas_de_compra');
            res.json(respuesta);
        });
    }
    listarBolsa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT prendas.descripcion AS Prenda, tallas.talla_prenda AS Talla, unidades, bolsas_de_compra.precio_unitario, precio_total FROM bolsas_de_compra LEFT JOIN prendas ON prendas.clave = clave_prenda LEFT JOIN tallas ON tallas.id = id_talla WHERE id_usuario = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta);
                return;
            }
            res.status(404).json({ 'mensaje': 'Bolsa de Compra vacía' });
        });
    }
    agregar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_usuario, clave_prenda, id_talla, unidades } = req.body;
            const existe = yield database_1.default.query("SELECT clave_prenda FROM bolsas_de_compra WHERE id_usuario = ? AND clave_prenda = ? AND id_talla = ?", [id_usuario, clave_prenda, id_talla]);
            const precio_unitario = yield database_1.default.query("SELECT precio_unitario FROM prendas WHERE clave = ?", [clave_prenda]);
            if (existe.length == 0) {
                const result = yield database_1.default.query("SELECT TRUNCATE(? * ?, 2) AS precio_total", [precio_unitario[0].precio_unitario, unidades]);
                const precio_total = result[0].precio_total;
                const resp = yield database_1.default.query("INSERT INTO bolsas_de_compra SET id_usuario = ?, clave_prenda = ?, id_talla = ?, unidades = ?, precio_unitario = ?, precio_total = ?", [id_usuario, clave_prenda, id_talla, unidades, precio_unitario[0].precio_unitario, precio_total]);
                res.json(resp);
                return;
            }
            const unidadesActual = yield database_1.default.query("SELECT unidades FROM bolsas_de_compra WHERE id_usuario = ? AND clave_prenda = ? AND id_talla = ?", [id_usuario, clave_prenda, id_talla]);
            const suma = yield database_1.default.query('SELECT (? + ?) AS Suma', [unidadesActual[0].unidades, unidades]);
            const unidadesNuevo = suma[0].Suma;
            const result = yield database_1.default.query("SELECT TRUNCATE(? * ?, 2) AS precio_total", [precio_unitario[0].precio_unitario, unidadesNuevo]);
            const precio_total = result[0].precio_total;
            const resp = yield database_1.default.query("UPDATE bolsas_de_compra SET unidades = ?, precio_total = ? WHERE id_usuario = ? AND clave_prenda = ? AND id_talla = ?", [unidadesNuevo, precio_total, id_usuario, clave_prenda, id_talla]);
            res.json(resp);
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM bolsas_de_compra WHERE id = ${id}`);
            res.json(resp);
        });
    }
}
exports.bolsasController = new BolsasController();
