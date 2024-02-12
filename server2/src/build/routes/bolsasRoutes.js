"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bolsasController_1 = require("../controllers/bolsasController");
class BolsasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/verBolsa/:id', bolsasController_1.bolsasController.listarBolsa);
        this.router.post('/agregarPrenda/', bolsasController_1.bolsasController.agregar);
        this.router.delete('/eliminarRol/:id', bolsasController_1.bolsasController.eliminar);
    }
}
const bolsasRoutes = new BolsasRoutes();
exports.default = bolsasRoutes.router;
