package com.proyecto.servicio.seguridad;

import com.proyecto.modelo.Usuario;
import com.proyecto.repositorio.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class DetalleUsuarioServicioImpl implements DetalleUsuarioServicio, UserDetailsService {

    @Autowired
    UsuarioRepositorio usuarioRepositorio;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("email: " + email);
        Usuario usuarioActivo = usuarioRepositorio.findByEmail(email);
        if (usuarioActivo == null) {
            throw new UsernameNotFoundException("credentials not found");
        }

        return new DetalleUsuario(usuarioActivo);
    }
}
