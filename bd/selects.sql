select * from agendamento a, servico s, horarios h, cliente c
where dt_agendamento >= (select DATE_FORMAT(sysdate(),"%Y-%m-%d") from dual) and
c.cpf = a.cliente and
s.id = a.servico and
h.id = a.hr_agendamento order by a.id
