// Calendar.js
import { useCallback, useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button } from 'antd';
import Modal from './components/Modal';

const localizer = momentLocalizer(moment);

const events = [
  {
    title: 'Meeting',
    start: new Date(),
    end: new Date(),
    allDay: false,
  },
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

  const showModal = () => {
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleOk = () => {
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
    console.log(event);
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
      />

      <Button onClick={showModal}>boton </Button>

      <Modal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        setNewEvent={setNewEvent}
        selectedEvent={selectedEvent}
        isEditing={isEditing}
      />
    </>
  );
};

export default Calendar;
