import { Router } from 'express';
import { bolsasController } from '../controllers/bolsasController';
class BolsasRoutes
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
    config() : void
    {
        this.router.get('/verBolsa/:id', bolsasController.listarBolsa);
        this.router.post('/agregarPrenda/', bolsasController.agregar);
        this.router.delete('/eliminarRol/:id', bolsasController.eliminar);
    }
}
const bolsasRoutes= new BolsasRoutes();
export default bolsasRoutes.router;