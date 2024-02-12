import { Router } from 'express';
import { ventasController } from '../controllers/ventasController';

class VentasRoutes
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
        config() : void
    {
        this.router.post('/nuevaVenta/', ventasController.crear);
        this.router.get('/mostrarVentas/', ventasController.listar);
        this.router.get('/verVenta/:id', ventasController.listarUno);
        this.router.put('/actualizarVenta/:id', ventasController.actualizar);
        this.router.delete('/eliminarVenta/:id', ventasController.eliminar);
    }
}

const ventasRoutes= new VentasRoutes();
export default ventasRoutes.router;