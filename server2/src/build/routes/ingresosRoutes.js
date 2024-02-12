"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ingresosController_1 = require("../controllers/ingresosController");
class IngresosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/nuevoIngreso/', ingresosController_1.ingresosController.crear);
        this.router.get('/mostrarIngresos/', ingresosController_1.ingresosController.listar);
        this.router.get('/verIngreso/:id', ingresosController_1.ingresosController.listarUno);
        this.router.put('/actualizarIngreso/:id', ingresosController_1.ingresosController.actualizar);
        this.router.delete('/eliminarIngreso/:id', ingresosController_1.ingresosController.eliminar);
    }
}
const ingresosRoutes = new IngresosRoutes();
exports.default = ingresosRoutes.router;
