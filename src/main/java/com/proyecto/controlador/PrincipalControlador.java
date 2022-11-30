package com.proyecto.controlador;

import com.proyecto.modelo.Usuario;
import com.proyecto.repositorio.UsuarioRepositorio;
import com.proyecto.servicio.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.security.Principal;

@Controller
public class PrincipalControlador {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Autowired
    private UsuarioServicio usuarioServicio;


    @RequestMapping("/signin")
    public String login(HttpServletRequest request, Model model) {
        return "signin";
    }
    @RequestMapping("/")
    public String index(Model model, String error, Principal principal){
        if (error != null) {
            model.addAttribute("error", true);
            return "signin";
        }

        if (principal != null) {
            return "redirect:/home";
        }
        return "index";
    }

    @RequestMapping("/home")
    public String home(Model model, Principal principal){
        Usuario usuario = usuarioRepositorio.findByEmail(principal.getName());
        model.addAttribute("usuario", usuario);
        return "home";
    }
    @RequestMapping("/groups")
    public String groups(Model model, Principal principal){
        Usuario usuario = usuarioRepositorio.findByEmail(principal.getName());
        model.addAttribute("usuario", usuario);
        return "groups";
    }

    @RequestMapping("/documento")
    public String documento(Model model, Principal principal){
        model.addAttribute("usuario", usuarioRepositorio.findByEmail(principal.getName()));
        return "documento";
    }

    @RequestMapping("/signup")
    public String registro() {
        return "signup";
    }

    @RequestMapping("/logout")
    public String salir(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        SecurityContextHolder.clearContext();
        session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        for (Cookie cookie : request.getCookies()) {
            cookie.setMaxAge(0);
        }
        return "redirect:/";
    }


}
