package com.proyecto.servicio;

import com.proyecto.modelo.Usuario;
import com.proyecto.repositorio.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Random;

@Service
public class UsuarioServicioImpl implements UsuarioServicio {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;



    @Override
    public Usuario creaUsuario(String email, String password, String nombre, String apellido_p, String apellido_m) {
        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setEmail(email);
        nuevoUsuario.setNombre(nombre);
        nuevoUsuario.setApellidop(apellido_p);
        nuevoUsuario.setApellidom(apellido_m);
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        nuevoUsuario.setPassword(passwordEncoder.encode(password));
        nuevoUsuario.setEnabled(1);
        return nuevoUsuario;
    }

    @Override
    public Usuario creaUsuarioEntrenador(String email, String password, String nombre, String apellido_p, String apellido_m) {
        if (usuarioRepositorio.existsUsuarioByEmail(email)) {
            return null;
        }
        Usuario nuevoEntrenador = creaUsuario(email, password, nombre, apellido_p, apellido_m);;
        nuevoEntrenador.setSexo("n/a");
        nuevoEntrenador.setFechanacimiento(null);
        nuevoEntrenador.setRol("ROLE_ENTRENADOR");
        return usuarioRepositorio.save(nuevoEntrenador);
    }

    @Override
    public Usuario creaUsuarioCompetidor(String email, String password, String nombre, String apellido_p, String apellido_m,
                                         String sexo, Date fecha_nac, int peso, int altura, String entrenador_email,int idEvento){
        if (usuarioRepositorio.existsUsuarioByEmail(email)) {
            return null;
        }
        Usuario entrenador = usuarioRepositorio.findByEmail(entrenador_email);
        Usuario nuevoCompetidor = creaUsuario(email, password, nombre, apellido_p, apellido_m);
        nuevoCompetidor.setSexo(sexo);
        nuevoCompetidor.setFechanacimiento(fecha_nac);
        nuevoCompetidor.setRol("ROLE_COMPETIDOR");
        return usuarioRepositorio.save(nuevoCompetidor);
    }

    @Override
    public Usuario creaUsuarioJuez(String email, String password, String nombre, String apellido_p, String apellido_m, String nombreDisciplnaJuez) {
        if (usuarioRepositorio.existsUsuarioByEmail(email)) {
            return null;
        }
        Usuario nuevoJuez = creaUsuario(email, password, nombre, apellido_p, apellido_m);
        nuevoJuez.setRol("ROLE_JUEZ");
        return usuarioRepositorio.save(nuevoJuez);
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
