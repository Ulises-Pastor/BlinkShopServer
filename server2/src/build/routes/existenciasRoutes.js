"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const existenciasController_1 = require("../controllers/existenciasController");
class ExistenciasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/nuevaExistencia/', existenciasController_1.existenciasController.crear);
        this.router.get('/mostrarExistencias/', existenciasController_1.existenciasController.listar);
        this.router.get('/mostrarExistenciasPorPrenda/:clave_prenda', existenciasController_1.existenciasController.listarPorPrenda);
        this.router.get('/verExistencia/:clave_prenda/:id_talla', existenciasController_1.existenciasController.listarUno);
        this.router.put('/actualizarExistencia/:clave_prenda/:id_talla', existenciasController_1.existenciasController.actualizar);
        this.router.delete('/eliminarExistencia/:clave_prenda/:id_talla', existenciasController_1.existenciasController.eliminar);
    }
}
const existenciasRoutes = new ExistenciasRoutes();
exports.default = existenciasRoutes.router;
