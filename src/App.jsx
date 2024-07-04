// Calendar.js
import { useCallback, useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal, Input } from 'antd';
import EventModal from './components/EventModal';

import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

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

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      Modal.confirm({
        title: 'New Event',
        content: (
          <>
            <RangePicker />
            <Input
              placeholder='Event name'
              onPressEnter={(e) => {
                const title = e.target.value;
                if (title) {
                  setEvents((prev) => [...prev, { start, end, title }]);
                  Modal.destroyAll();
                }
              }}
            />
          </>
        ),
        onOk: () => {},
        onCancel: () => {},
      });
    },
    [setEvents]
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
        onSelectSlot={handleSelectSlot}
        selectable
      />
      <EventModal
        isVisible={isModalVisible}
        event={selectedEvent}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Calendar;
