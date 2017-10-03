delimiter //
create trigger adicionaLogin before insert on cliente
for each row
begin
insert into login(usuario,senha) values (new.cpf, new.cpf);
end //
