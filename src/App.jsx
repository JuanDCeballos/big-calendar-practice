// Calendar.js
import { useCallback, useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal, Input, DatePicker, Button } from 'antd';
import EventModal from './components/EventModal';

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    start: null,
    end: null,
    title: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    const inicio = newEvent.start
    const final = newEvent.end
    const title = newEvent.title
    let difDias = final.diff(inicio, 'days');
    let difHours = final.hour() - inicio.hour()

    for (let index = 0; index < difDias; index++) {
      let fechaInicio = inicio.add(index, 'days');
      let fechaFin = inicio.add(index, 'days').add(difHours, 'hours');
      setEvents((prev) => [...prev, {
        title: title,
        start: fechaInicio.toDate(),
        end: fechaFin.toDate(),
      }]);
    }

    setIsModalOpen(false);
  };
  const handleCancel = () => {
    alert('cancel')
    setIsModalOpen(false);
  };

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      showModal()
    },
    [newEvent, setNewEvent, setEvents]
  );

  const handleSelectEvent = useCallback((event) => {
    setSelectedEvent(event);
    setIsModalVisible(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

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
      <EventModal
        isVisible={isModalVisible}
        event={selectedEvent}
        onClose={handleCloseModal}
      />

      <Button onClick={handleSelectSlot}>boton </Button>

      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input aria-label='Evento:' value={newEvent.title} onChange={(e) => {
          const title = e.target.value;
          setNewEvent((prev) => ({
            ...prev,
            title: title,
          }));
        }} />
        <DatePicker
          placeholder='Start date'
          showTime
          onChange={(date) => {
            setNewEvent((prev) => ({
              ...prev,
              start: date ? date : null,
            }));
          }}
        />
        <DatePicker
          placeholder='Start date'
          showTime
          onChange={(date) => {
            setNewEvent((prev) => ({
              ...prev,
              end: date ? date.add(1, 'days') : null,
            }));
          }}
        />

      </Modal>
    </>

  );
};

export default Calendar;
