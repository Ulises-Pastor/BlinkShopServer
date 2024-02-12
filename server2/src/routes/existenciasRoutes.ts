import { Router } from 'express';
import { existenciasController } from '../controllers/existenciasController';

class ExistenciasRoutes
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
        config() : void
    {
        this.router.post('/nuevaExistencia/', existenciasController.crear);
        this.router.get('/mostrarExistencias/', existenciasController.listar);
        this.router.get('/mostrarExistenciasPorPrenda/:clave_prenda', existenciasController.listarPorPrenda);
        this.router.get('/verExistencia/:clave_prenda/:id_talla', existenciasController.listarUno);
        this.router.put('/actualizarExistencia/:clave_prenda/:id_talla', existenciasController.actualizar);
        this.router.delete('/eliminarExistencia/:clave_prenda/:id_talla', existenciasController.eliminar);
    }
}

const existenciasRoutes= new ExistenciasRoutes();
export default existenciasRoutes.router;