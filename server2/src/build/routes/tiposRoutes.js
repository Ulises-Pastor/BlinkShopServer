"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tiposController_1 = require("../controllers/tiposController");
class TiposRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/nuevoTipo/', tiposController_1.tiposController.crear);
        this.router.get('/mostrarTipos/', tiposController_1.tiposController.listar);
        this.router.get('/verTipo/:id', tiposController_1.tiposController.listarUno);
        this.router.put('/actualizarTipo/:id', tiposController_1.tiposController.actualizar);
        this.router.delete('/eliminarTipo/:id', tiposController_1.tiposController.eliminar);
    }
}
const tiposRoutes = new TiposRoutes();
exports.default = tiposRoutes.router;
