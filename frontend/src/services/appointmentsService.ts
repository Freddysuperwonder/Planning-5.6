const apiUrl = 'http://localhost:5000/api/appointments';

export const getAppointments = async () => {
  const response = await fetch(apiUrl);
  return await response.json();
};

export const addAppointment = async (appointment: any) => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(appointment)
  });
  return await response.json();
};

export const updateAppointment = async (id: number, appointment: any) => {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(appointment)
  });
  return await response.json();
};

export const deleteAppointment = async (id: number) => {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  });
  return await response.json();
};