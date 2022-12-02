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
enabled integer default 0,
rol varchar(10) default 'USUARIO',
imagen varchar(600) default '/img/user.svg'
 );