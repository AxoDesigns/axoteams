package com.proyecto.servicio;

import com.proyecto.modelo.Usuario;

import java.util.Date;

public interface UsuarioServicio {
    Usuario creaUsuario(String email, String password, String nombre, String apellido_p, String apellido_m);
    Usuario creaUsuarioEntrenador(String email, String password, String nombre, String apellido_p, String apellido_m);
    Usuario creaUsuarioCompetidor(String email, String password, String nombre, String apellido_p, String apellido_m,
                                  String sexo, Date fecha, int peso, int altura, String entrenador_email, int eventos);
    Usuario creaUsuarioJuez(String email, String password, String nombre, String apellido_p, String apellido_m, String nombre_Disciplina_Juez);
    public void eliminarUsuario(Integer id);
    public Usuario actualizarUsuario(Usuario usuario);

    String randomString(int n);
}
