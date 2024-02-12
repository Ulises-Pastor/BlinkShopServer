import { Router } from 'express';
import { tiposController } from '../controllers/tiposController';

class TiposRoutes
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
        config() : void
    {
        this.router.post('/nuevoTipo/', tiposController.crear);
        this.router.get('/mostrarTipos/', tiposController.listar);
        this.router.get('/verTipo/:id', tiposController.listarUno);
        this.router.put('/actualizarTipo/:id', tiposController.actualizar);
        this.router.delete('/eliminarTipo/:id', tiposController.eliminar);
    }
}

const tiposRoutes= new TiposRoutes();
export default tiposRoutes.router;