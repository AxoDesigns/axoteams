drop table if exists usuario;
create table usuario(
idUsuario serial primary key not null,
nombre varchar(50) not null,
apellidoP varchar(30) not null,
apellidoM varchar(30) not null,
email varchar(50) not null unique,
password varchar(64) not null,
fechaNacimiento date default null,
sexo varchar(20) default null,
enabled integer default null,
rol varchar(10) default null
 );