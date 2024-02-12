import {Request,Response} from 'express';
import pool from '../database';

class TiposController
{
    public async listar(req: Request, res: Response ): Promise<void>
    {
        const respuesta = await pool.query('SELECT * FROM tipos');
        res.json( respuesta );
    }

    public async listarUno(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        const respuesta = await pool.query('SELECT * FROM tipos WHERE id = ?', [id]);
        if(respuesta.length>0){
            res.json(respuesta[0]);
            return ;
        }
        res.status(404).json({'mensaje': 'Tipo no encontrado'});
    }

    public async crear(req: Request, res: Response): Promise<void> {
        const resp = await pool.query("INSERT INTO tipos set ?", [req.body]);
        res.json(resp);
    }

    public async actualizar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        console.log(req.params);
        const resp = await pool.query("UPDATE tipos set ? WHERE id = ?", [req.body, id]);
        res.json(resp);
    }

    public async eliminar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query("DELETE FROM tipos WHERE id = ?", [id]);
        res.json(resp);
    }
}
export const tiposController = new TiposController();