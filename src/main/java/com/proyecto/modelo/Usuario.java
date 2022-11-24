package com.proyecto.modelo;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Table(name = "Usuario")
@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idusuario")
    private Integer idusuario;

    @Column
    private String nombre;

    @Column
    private String apellidop;

    @Column
    private String apellidom;

    @Column
    private String email;

    @Column
    private String password;


    @Column
    private Date fechanacimiento;

    @Column
    private String sexo;

    @Column
    private String rol;

    @Column
    private Integer enabled;



}
