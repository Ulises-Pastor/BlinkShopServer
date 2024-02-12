"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tallasController_1 = require("../controllers/tallasController");
class TallasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/nuevaTalla/', tallasController_1.tallasController.crear);
        this.router.get('/mostrarTallas/', tallasController_1.tallasController.listar);
        this.router.get('/verTalla/:id', tallasController_1.tallasController.listarUno);
        this.router.put('/actualizarTalla/:id', tallasController_1.tallasController.actualizar);
        this.router.delete('/eliminarTalla/:id', tallasController_1.tallasController.eliminar);
    }
}
const tallasRoutes = new TallasRoutes();
exports.default = tallasRoutes.router;
