import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerDocument from './swagger.json';
import swagger_ui_express from 'swagger-ui-express';

import indexRoutes from './routes/indexRoutes';
import usuariosRoutes from './routes/usuariosRoutes';
import prendasRoutes from './routes/prendasRoutes';
import tiposRoutes from './routes/tiposRoutes';
import tallasRoutes from './routes/tallasRoutes';
import rolesRoutes from './routes/rolesRoutes';
import existenciasRoutes from './routes/existenciasRoutes';
import generosRoutes from './routes/generosRoutes';
import descuentosRoutes from './routes/descuentosRoutes';
import ingresosRoutes from './routes/ingresosRoutes';
import ventasRoutes from './routes/ventasRoutes';
import bolsasRoutes from './routes/bolsasRoutes';

class Server
{
    public app: Application;
    constructor()
    {
        this.app= express();
        this.config();
        this.routes();
        this.app.use('/documentacion', swagger_ui_express.serve, swagger_ui_express.setup(swaggerDocument));
    }
    config (): void
    {
        this.app.set('port', process.env.PORT|| 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }
    routes (): void
    {
        this.app.use(indexRoutes);
        this.app.use('/api/usuarios', usuariosRoutes);
        this.app.use('/api/prendas', prendasRoutes);
        this.app.use('/api/tipos', tiposRoutes);
        this.app.use('/api/tallas', tallasRoutes);
        this.app.use('/api/roles', rolesRoutes);
        this.app.use('/api/existencias', existenciasRoutes);
        this.app.use('/api/generos', generosRoutes);
        this.app.use('/api/descuentos', descuentosRoutes);
        this.app.use('/api/ingresos', ingresosRoutes);
        this.app.use('/api/ventas', ventasRoutes);
        this.app.use('/api/bolsasDeCompra', bolsasRoutes);
    }
    start (): void
    {
        this.app.listen(this.app.get('port'), () =>
            {
                console.log('Server on port', this.app.get('port'));
            }
        );
    }
}

const server = new Server();
server.start();