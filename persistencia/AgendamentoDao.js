class AgendamentoDao {
  constructor(connection){
    this._connection = connection;
  }

  list(callback) {
    this._connection.query(
      `select

       a.id,
       a.dt_agendamento,
       s.descricao as servico,
       h.horario,
       c.nome,
       date_format(a.dt_agendamento, '%d-%m-%Y') as str_data,
       st.descricao as status,
       a.observacao

        from
          agendamento a,
          servico s,
          horarios h,
          cliente c,
          status st

          where
            c.cpf = a.cliente and
            s.id = a.servico and
            h.id = a.hr_agendamento and
            a.status = st.id order by a.dt_agendamento desc, h.id asc`, callback);
  }

  salva(agendamento, callback){
    this._connection.query('INSERT INTO agendamento SET ?', agendamento, callback);
  }

  findById(id, callback){
    this._connection.query('SELECT * FROM agendamento WHERE id = ?', [id], callback);
  }

  findByClientIdHoje(id, callback){
    this._connection.query(
        `select

         a.id,
         a.dt_agendamento,
         s.descricao as servico,
         h.horario,
         c.nome,
         date_format(a.dt_agendamento, '%d-%m-%Y') as str_data,
         st.descricao as status,
         a.observacao

          from
            agendamento a,
            servico s,
            horarios h,
            cliente c,
            status st

            where
              a.dt_agendamento = (select DATE_FORMAT(sysdate(),"%Y-%m-%d") from dual) and
              c.cpf = a.cliente and
              s.id = a.servico and
              h.id = a.hr_agendamento and
              a.status = st.id and
              a.cliente = ? order by h.id asc`, [id], callback);
  }

  findByClientIdProximos(id, callback){
    this._connection.query(
        `select

         a.id,
         a.dt_agendamento,
         s.descricao as servico,
         h.horario,
         c.nome,
         date_format(a.dt_agendamento, '%d-%m-%Y') as str_data,
         st.descricao as status,
         a.observacao

          from
            agendamento a,
            servico s,
            horarios h,
            cliente c,
            status st

            where
              a.dt_agendamento > (select DATE_FORMAT(sysdate(),"%Y-%m-%d") from dual) and
              c.cpf = a.cliente and
              s.id = a.servico and
              h.id = a.hr_agendamento and
              a.status = st.id and
              a.cliente = ? order by a.dt_agendamento asc, h.id asc`, [id], callback);
  }

  findByClientIdAntigos(id, callback){
    this._connection.query(
        `select

         a.id,
         a.dt_agendamento,
         s.descricao as servico,
         h.horario,
         c.nome,
         date_format(a.dt_agendamento, '%d-%m-%Y') as str_data,
         st.descricao as status,
         a.observacao

          from
            agendamento a,
            servico s,
            horarios h,
            cliente c,
            status st

            where
              a.dt_agendamento < (select DATE_FORMAT(sysdate(),"%Y-%m-%d") from dual) and
              c.cpf = a.cliente and
              s.id = a.servico and
              h.id = a.hr_agendamento and
              a.status = st.id and
              a.cliente = ? order by a.dt_agendamento desc, h.id asc`, [id], callback);
  }

  delete(id, obs, callback){
    this._connection.query('UPDATE agendamento set status = 2, observacao = ? WHERE id = ?', [obs,id], callback);
  }

  finaliza(id, callback){
    this._connection.query('UPDATE agendamento set status = 3 WHERE id = ?', [id], callback);
  }

  confirma(id, callback){
    this._connection.query('UPDATE agendamento set status = 1 WHERE id = ?', [id], callback);
  }
}

module.exports = () => AgendamentoDao;
