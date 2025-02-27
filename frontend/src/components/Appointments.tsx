import React, { useState, useEffect } from 'react';
import { getAppointments, addAppointment, updateAppointment, deleteAppointment } from '../services/appointmentsService';

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    name: '',
    date: '',
    arrivalTime: '',
    appointmentTime: '',
    transport: 'auto',
    collaborator: ''
  });

  useEffect(() => {
    getAppointments().then(data => setAppointments(data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewAppointment({ ...newAppointment, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    addAppointment(newAppointment).then(() => {
      getAppointments().then(data => setAppointments(data));
    });
  };

  const handleUpdate = (id: number) => {
    updateAppointment(id, newAppointment).then(() => {
      getAppointments().then(data => setAppointments(data));
    });
  };

  const handleDelete = (id: number) => {
    deleteAppointment(id).then(() => {
      getAppointments().then(data => setAppointments(data));
    });
  };

  return (
    <div>
      <h1>Gestione Appuntamenti</h1>
      <div>
        <input type="text" name="name" value={newAppointment.name} onChange={handleChange} placeholder="Nome casa" />
        <input type="date" name="date" value={newAppointment.date} onChange={handleChange} />
        <input type="time" name="arrivalTime" value={newAppointment.arrivalTime} onChange={handleChange} />
        <input type="time" name="appointmentTime" value={newAppointment.appointmentTime} onChange={handleChange} />
        <select name="transport" value={newAppointment.transport} onChange={handleChange}>
          <option value="auto">Auto</option>
          <option value="moto">Moto</option>
          <option value="bici">Bici</option>
          <option value="a piedi">A piedi</option>
          <option value="altro">Altro</option>
        </select>
        <input type="text" name="collaborator" value={newAppointment.collaborator} onChange={handleChange} placeholder="Nome collaboratore" />
        <button onClick={handleAdd}>Aggiungi Appuntamento</button>
      </div>
      <div>
        {appointments.map((appt: any) => (
          <div key={appt.id}>
            <p>{appt.name}</p>
            <p>{new Date(appt.date).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric' })}</p>
            <p>{appt.arrivalTime} - {appt.appointmentTime}</p>
            <p>{appt.transport}</p>
            <p>{appt.collaborator}</p>
            <button onClick={() => handleUpdate(appt.id)}>Modifica</button>
            <button onClick={() => handleDelete(appt.id)}>Elimina</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;