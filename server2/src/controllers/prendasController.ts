import {Request,Response} from 'express';
import pool from '../database';

class PrendasController
{
    public async listar(req: Request, res: Response ): Promise<void>
    {
        const respuesta = await pool.query('SELECT * FROM prendas');
        res.json( respuesta );
    }

    public async listarUno(req: Request, res: Response): Promise <void>{
        const {clave} = req.params;
        const respuesta = await pool.query('SELECT * FROM prendas WHERE clave = ?', [clave]);
        if(respuesta.length>0){
            res.json(respuesta[0]);
            return ;
            }
        res.status(404).json({'mensaje': 'Prenda no encontrada'});
    }

    public async crear(req: Request, res: Response): Promise<void> {
        const resp = await pool.query("INSERT INTO prendas set ?", [req.body]);
        res.json(resp);
    }

    public async actualizar(req: Request, res: Response): Promise<void> {
        const { clave } = req.params;
        console.log(req.params);
        const resp = await pool.query("UPDATE prendas set ? WHERE clave = ?", [req.body, clave]);
        res.json(resp);
    }

    public async eliminar(req: Request, res: Response): Promise<void> {
        const { clave } = req.params;
        const resp = await pool.query("DELETE FROM prendas WHERE clave = ?", [clave]);
        res.json(resp);
    }
}
export const prendasController = new PrendasController();