create table login(
	usuario varchar(20) not null primary key,
    senha varchar(100) not null
);

create table cliente (
	cpf varchar(20) not null primary key,
    nome varchar(100) not null
);

create table servico(
	id int not null primary key auto_increment,
    descricao varchar(50),
    tempo time
);

create table horarios(
	id int not null primary key auto_increment,
	horario time not null
);

create table status(
  id int not null primary key auto_increment,
  descricao varchar(20)
);

create table agendamento(
	id int not null primary key auto_increment,
    cliente varchar(20),
    servico int,
    dt_agendamento date,
    hr_agendamento int,
    status int,
		observacao varchar(200),
    foreign key (cliente) references cliente(cpf),
    foreign key (servico) references servico(id),
    foreign key (hr_agendamento) references horarios(id),
    foreign key (status) references status(id)
);
