package com.proyecto.servicio;

import com.proyecto.modelo.Usuario;
import com.proyecto.repositorio.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.Random;

@Service
public class UsuarioServicioImpl implements UsuarioServicio {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;



    @Override
    public Usuario creaUsuario(String email, String password, String nombre, String apellido_p, String apellido_m
            , Date fecha_nacimiento) {
        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setEmail(email);
        nuevoUsuario.setNombre(nombre);
        nuevoUsuario.setApellidop(apellido_p);
        nuevoUsuario.setApellidom(apellido_m);
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        nuevoUsuario.setPassword(passwordEncoder.encode(password));
        nuevoUsuario.setEnabled(1);
        nuevoUsuario.setFechanacimiento(fecha_nacimiento);
        nuevoUsuario.setRol("USUARIO");
        usuarioRepositorio.save(nuevoUsuario);
        return nuevoUsuario;
    }


    @Override
    public void eliminarUsuario(Integer id){
        usuarioRepositorio.deleteById(id);
    }

    @Override
    public Usuario actualizarUsuario(Usuario competidor) {
        return usuarioRepositorio.save(competidor);
    }

    @Override
    public String randomString(int n){
        String chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk"
                +"lmnopqrstuvwxyz!@#$%&_*-/.,;:?¡!¿#$%()+{}";
        Random rnd = new Random();
        StringBuilder sb = new StringBuilder(n);
        for (int i = 0; i < n; i++)
            sb.append(chars.charAt(rnd.nextInt(chars.length())));
        return sb.toString();
    }
}
