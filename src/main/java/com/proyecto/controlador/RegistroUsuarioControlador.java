package com.proyecto.controlador;

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

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/registro")
public class RegistroUsuarioControlador {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Autowired
    private UsuarioServicio usuarioServicio;


    
    @GetMapping("/registro")
    public String registra(){
        return "registro";
    }

    @GetMapping("/recuperar")
    public String recuperar(){
        return "recuperar";
    }

    @PostMapping("/confirmaRecupera")
    public String confirmaRecupera(Model model,HttpServletRequest request){
        return "index";
    }

    @PostMapping("/recupera")
    public String recupera(HttpServletRequest request, Model model) throws MessagingException {
        return "recupera";
    }
    @PostMapping("/crea")
    public String crea(@RequestParam("imagen") MultipartFile imagen, HttpServletRequest request, Model model) throws MessagingException {
        return "registro";
    }

}
