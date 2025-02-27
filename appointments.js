// ...existing code...

function sortAppointments(appointments, criteria, order) {
    if (criteria === 'date') {
        appointments.sort((a, b) => order === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date));
    } else if (criteria === 'collaborator') {
        appointments.sort((a, b) => {
            if (a.collaborator === b.collaborator) {
                return order === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
            }
            return a.collaborator.localeCompare(b.collaborator);
        });
    }
    return appointments;
}

// ...existing code...

function applyViewFilter(filter) {
    let appointments = getAppointments(); // Assumi che questa funzione recuperi gli appuntamenti
    switch (filter) {
        case 'chronologicalAsc':
            appointments = sortAppointments(appointments, 'date', 'asc');
            break;
        case 'chronologicalDesc':
            appointments = sortAppointments(appointments, 'date', 'desc');
            break;
        case 'collaborator':
            appointments = sortAppointments(appointments, 'collaborator', 'asc');
            break;
        case 'month':
            appointments = filterAppointmentsByMonth(appointments);
            break;
        default:
            break;
    }
    displayAppointments(appointments); // Assumi che questa funzione mostri gli appuntamenti
}

function filterAppointmentsByMonth(appointments) {
    const currentMonth = new Date().getMonth();
    return appointments.filter(appointment => new Date(appointment.date).getMonth() === currentMonth);
}

// ...existing code...

function handleArrivalOptionChange(option) {
    if (option === 'macchina') {
        appointment.time = null;
    }
    // ...existing code...
}

// ...existing code...
