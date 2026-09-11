import React from 'react';

import api from '../../services/api';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

// Atualizando a interface para incluir o schedule
export interface Coach {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
  schedule: Array<{
    id: number;
    week_day: number;
    from: number;
    to: number;
  }>;
}

interface CoachItemProps {
  coach: Coach;
}

const CoachItem: React.FC<CoachItemProps> = ({ coach }) => {
  function createNewConnection() {
    api.post('connections', {
      coach_id: coach.id,
    });
  }

  // Função auxiliar para formatar minutos para horas
  function formatMinutesToTime(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
  }

  // Mapeamento dos dias da semana
  const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  return (
    <article className="coach-item">
      <header>
        <img src={coach.avatar} alt={coach.name} />
        <div>
          <strong>{coach.name}</strong>
          <span>{coach.subject}</span>
        </div>
      </header>

      <p>{coach.bio}</p>

      <br />

      <b className='padding-left-32'>Horários disponíveis:</b>


      {/* Nova seção de horários adicionada aqui */}
      <ul className="coach-schedule">
        {coach.schedule && coach.schedule.map(item => (
          <li key={item.id} className="schedule-item padding-left-32">
            <span className="day">{weekDays[item.week_day]}</span> <span className="time">{formatMinutesToTime(item.from)} - {formatMinutesToTime(item.to)}</span>
          </li>
        ))}
      </ul>

      <footer>
        <p>Preço/Hora
          <strong>R$ {coach.cost}</strong>
        </p>

        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={createNewConnection}
          href={`https://wa.me/${coach.whatsapp}`}
        >
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
}

export default CoachItem;