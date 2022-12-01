package com.proyecto.servicio;

import com.proyecto.modelo.Usuario;

import java.sql.Date;

public interface UsuarioServicio {
    Usuario creaUsuario(String email, String password, String nombre, String apellido_p, String apellido_m,
                        Date fecha_nacimiento);
    public void eliminarUsuario(Integer id);
    public Usuario actualizarUsuario(Usuario usuario);
    String randomString(int n);
}
