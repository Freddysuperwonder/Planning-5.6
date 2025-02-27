import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let appointments: any[] = [];
let idCounter = 1;

app.get('/api/appointments', (req, res) => {
  res.json(appointments);
});

app.post('/api/appointments', (req, res) => {
  const appointment = { id: idCounter++, ...req.body };
  appointments.push(appointment);
  res.json(appointment);
});

app.put('/api/appointments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = appointments.findIndex(appt => appt.id === id);
  if (index !== -1) {
    appointments[index] = { id, ...req.body };
    res.json(appointments[index]);
  } else {
    res.status(404).json({ message: 'Appointment not found' });
  }
});

app.delete('/api/appointments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  appointments = appointments.filter(appt => appt.id !== id);
  res.json({ message: 'Appointment deleted' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});