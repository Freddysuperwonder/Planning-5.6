import React, { useEffect, useState } from 'react';
import { getAppointments } from '../services/appointmentsService';

const Planning: React.FC = () => {
  const [appointments, setAppointments] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    getAppointments().then(data => setAppointments(data));
  }, []);

  const getWeekDays = (date: Date) => {
    const days = [];
    const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay() + 1)); // Get the Monday of the current week
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push({ day: day.toLocaleDateString('it-IT', { weekday: 'long' }), date: day.getDate() });
    }
    return days;
  };

  const weekDays = getWeekDays(currentDate);

  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  return (
    <div>
      <h1>Planning Settimanale</h1>
      <div className="navigation">
        <button onClick={handlePreviousWeek}>Settimana Precedente</button>
        <button onClick={handleNextWeek}>Settimana Successiva</button>
      </div>
      <div className="planning-grid">
        {weekDays.map(({ day, date }) => (
          <div key={`${day}-${date}`} className="planning-column">
            <h2>{`${day} ${date}`}</h2>
            {appointments.filter((appt: any) => new Date(appt.date).toLocaleDateString('it-IT') === `${day} ${date}`).map((appt: any) => (
              <div key={appt.id} className="appointment">
                <p>{appt.name}</p>
                <p>{appt.arrivalTime} - {appt.appointmentTime}</p>
                <p>{appt.transport}</p>
                <p>{appt.collaborator}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planning;