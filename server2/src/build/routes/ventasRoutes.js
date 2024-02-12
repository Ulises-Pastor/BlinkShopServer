"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ventasController_1 = require("../controllers/ventasController");
class VentasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/nuevaVenta/', ventasController_1.ventasController.crear);
        this.router.get('/mostrarVentas/', ventasController_1.ventasController.listar);
        this.router.get('/verVenta/:id', ventasController_1.ventasController.listarUno);
        this.router.put('/actualizarVenta/:id', ventasController_1.ventasController.actualizar);
        this.router.delete('/eliminarVenta/:id', ventasController_1.ventasController.eliminar);
    }
}
const ventasRoutes = new VentasRoutes();
exports.default = ventasRoutes.router;
