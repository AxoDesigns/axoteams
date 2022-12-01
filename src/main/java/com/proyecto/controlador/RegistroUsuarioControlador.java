package com.proyecto.controlador;

import com.proyecto.modelo.Usuario;
import com.proyecto.repositorio.UsuarioRepositorio;
import com.proyecto.servicio.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;
import java.io.IOException;
import java.sql.Date;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/signup")
public class RegistroUsuarioControlador {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Autowired
    private UsuarioServicio usuarioServicio;


    @GetMapping("/recuperar")
    public String recuperar(){
        return "signup";
    }

    @PostMapping("/confirmaRecupera")
    public String confirmaRecupera(Model model,HttpServletRequest request){
        return "index";
    }

    @PostMapping("/recupera")
    public String recupera(HttpServletRequest request, Model model) throws MessagingException {
        return "recupera";
    }
    @PostMapping("/create")
    public String crea(@RequestParam("imagen") MultipartFile imagen, HttpServletRequest request, Model model) throws MessagingException {
        String contra = request.getParameter("password");
        Date date = Date.valueOf(request.getParameter("fecha"));
        String email = request.getParameter("email");
        Usuario usuario = usuarioRepositorio.findByEmail(email);
        if(usuario != null){
            model.addAttribute("exito", false);
            return "signup";
        }
        usuario = usuarioServicio.creaUsuario(email,
                contra,
                request.getParameter("nombre"),
                request.getParameter("apaterno"),
                request.getParameter("amaterno"),
                date
                );
        if (!imagen.isEmpty()){
            String ruta = "src/main/resources/static/img/"+email;
            File file = new File(ruta);
            if (!file.exists()){
                file.mkdirs();
            }
            Path directorioImagenes = Paths.get(ruta);
            String rutaAbsoluta = directorioImagenes.toFile().getAbsolutePath();
            try {
                byte[] bytesImg = imagen.getBytes();
                Path rutaCompleta = Paths.get(rutaAbsoluta+"//"+imagen.getOriginalFilename());
                Files.write(rutaCompleta,bytesImg);
                if (usuario!=null) {
                    usuario.setImagen("/img/"+email+"/"+imagen.getOriginalFilename());
                    usuarioServicio.actualizarUsuario(usuario);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        model.addAttribute("exito", usuario != null);
        return "signup";
    }

}
