// Calendar.js
import { useCallback, useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button } from 'antd';
import Modal from './components/Modal';

const localizer = momentLocalizer(moment);
const events = [
];

const Calendar = () => {
  const [myEvents, setEvents] = useState(events);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    start: null,
    end: null,
    title: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [fechaHoy, setFechaHoy] = useState(new Date());

  const showModal = () => {
    setIsEditing(false);
    setIsModalOpen(true);
    setSelectedEvent(null);
  };

  const addNewEvent = (newEvent) => {
    const inicio = newEvent.start;
    const final = newEvent.end;
    const title = newEvent.title;
    let difDias = final.diff(inicio, 'days');
    let difHours = final.hour() - inicio.hour();

    for (let index = 0; index < difDias; index++) {
      let fechaInicio = inicio.add(index, 'days');
      let fechaFin = inicio.add(index, 'days').add(difHours, 'hours');
      setEvents((prev) => [
        ...prev,
        {
          title: title,
          start: fechaInicio.toDate(),
          end: fechaFin.toDate(),
        },
      ]);
    }

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setSelectedEvent('');
    setIsModalOpen(false);
  };

  const handleSelectEvent = useCallback((event) => {
    console.log(`Evento seleccionado: ${event.title}`);
    setIsEditing(true);
    setSelectedEvent(event);
    setIsModalOpen(true);
  }, []);

  return (
    <>
      <BigCalendar
        events={myEvents}
        localizer={localizer}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 500 }}
        onSelectEvent={handleSelectEvent}
      // defaultView={Views.DAY} PARA PONER LA VISTA POR DEFECTO EN DIAS, APLICAR RECURSOS
      />

      <Button onClick={showModal}>Crear Reserva</Button>

      <Modal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        setNewEvent={addNewEvent}
        selectedEvent={selectedEvent}
        isEditing={isEditing}
      />
    </>
  );
};

export default Calendar;