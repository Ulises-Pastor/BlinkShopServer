import {Request, Response} from 'express';
import pool from '../database';

class UsuariosController
{
    public async listar(req: Request, res: Response ): Promise<void>
    {
        const respuesta = await pool.query('SELECT * FROM usuarios');
        res.json( respuesta );
    }

    public async listarUno(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        const respuesta = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        if(respuesta.length>0){
            res.json(respuesta[0]);
            return ;
            }
        res.status(404).json({'mensaje': 'Usuario no encontrado'});
    }

    public async crear(req: Request, res: Response): Promise<void> {
        const resp = await pool.query("INSERT INTO usuarios set ?", [req.body]);
        res.json(resp);
    }

    public async actualizar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        console.log(req.params);
        const resp = await pool.query("UPDATE usuarios set ? WHERE id = ?", [req.body, id]);
        res.json(resp);
    }

    public async eliminar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM usuarios WHERE id = ${id}`);
        res.json(resp);
    }

    public async iniciarSesion(req: Request, res: Response): Promise<void> {
        const parametros = req.body;
        var consulta = `SELECT nombre, correo, rol FROM usuarios WHERE correo = '${parametros.correo}' and contrasena = '${parametros.contrasena}'`;
        const resp = await pool.query(consulta);
        if(resp.length > 0){
            res.json(resp);
        }else{
            res.json({"rol" : "-1"});
        }
    }
}
export const usuariosController = new UsuariosController();