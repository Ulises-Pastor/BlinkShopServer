import { Router } from 'express';
import { prendasController } from '../controllers/prendasController';

class PrendasRoutes
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
        config() : void
    {
        this.router.post('/nuevaPrenda/', prendasController.crear);
        this.router.get('/mostrarPrendas/', prendasController.listar);
        this.router.get('/verPrenda/:clave', prendasController.listarUno);
        this.router.put('/actualizarPrenda/:clave', prendasController.actualizar);
        this.router.delete('/eliminarPrenda/:clave', prendasController.eliminar);
    }
}

const prendasRoutes= new PrendasRoutes();
export default prendasRoutes.router;