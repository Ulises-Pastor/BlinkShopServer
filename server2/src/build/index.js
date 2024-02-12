"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const usuariosRoutes_1 = __importDefault(require("./routes/usuariosRoutes"));
const prendasRoutes_1 = __importDefault(require("./routes/prendasRoutes"));
const tiposRoutes_1 = __importDefault(require("./routes/tiposRoutes"));
const tallasRoutes_1 = __importDefault(require("./routes/tallasRoutes"));
const rolesRoutes_1 = __importDefault(require("./routes/rolesRoutes"));
const existenciasRoutes_1 = __importDefault(require("./routes/existenciasRoutes"));
const generosRoutes_1 = __importDefault(require("./routes/generosRoutes"));
const descuentosRoutes_1 = __importDefault(require("./routes/descuentosRoutes"));
const ingresosRoutes_1 = __importDefault(require("./routes/ingresosRoutes"));
const ventasRoutes_1 = __importDefault(require("./routes/ventasRoutes"));
const bolsasRoutes_1 = __importDefault(require("./routes/bolsasRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
        this.app.use('/documentacion', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/api/usuarios', usuariosRoutes_1.default);
        this.app.use('/api/prendas', prendasRoutes_1.default);
        this.app.use('/api/tipos', tiposRoutes_1.default);
        this.app.use('/api/tallas', tallasRoutes_1.default);
        this.app.use('/api/roles', rolesRoutes_1.default);
        this.app.use('/api/existencias', existenciasRoutes_1.default);
        this.app.use('/api/generos', generosRoutes_1.default);
        this.app.use('/api/descuentos', descuentosRoutes_1.default);
        this.app.use('/api/ingresos', ingresosRoutes_1.default);
        this.app.use('/api/ventas', ventasRoutes_1.default);
        this.app.use('/api/bolsasDeCompra', bolsasRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
