import { Modal as AntdModal, DatePicker, Input, Typography } from 'antd';
import moment from 'moment';
import { useState } from 'react';

const Modal = ({
  isModalOpen,
  handleCancel,
  setNewEvent,
  selectedEvent,
  isEditing,
}) => {

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [nameEvent, setNameEvent] = useState('')

  const handleOks = () => {
    if (selectedEvent == null && startDate !== null && endDate !== null && nameEvent !== '') {
      setNewEvent({ start: startDate, end: endDate.add(1, 'days'), title: nameEvent });
      setStartDate(null);
      setEndDate(null);
      setNameEvent('');
    } else {
      console.log('campos vacíos o evento ya creado');
    }
  }

  return (
    <>
      <AntdModal open={isModalOpen} onOk={handleOks} onCancel={handleCancel}>
        <Typography level={2}>RESERVA</Typography>
        <Input
          required
          disabled={isEditing}
          placeholder='Nombre del Evento'
          value={selectedEvent !== null && selectedEvent !== undefined ? moment(selectedEvent.start) : nameEvent}
          onChange={(e) => {
            setNameEvent(e.target.value);
          }}
        />
        <Typography level={2}>Seleccione fecha y hora de inicio</Typography>
        <DatePicker
          required
          disabled={isEditing}
          placeholder='Fecha Inicio'
          value={selectedEvent !== null && selectedEvent !== undefined ? moment(selectedEvent.start) : startDate}
          showTime
          onChange={(date) => {
            setStartDate(date ? date : null);
          }}
        />
        <Typography level={2}>Seleccione fecha y hora de finalización</Typography>
        <DatePicker
          required
          disabled={isEditing}
          placeholder='Fecha Fin'
          value={selectedEvent !== null && selectedEvent !== undefined ? moment(selectedEvent.end) : endDate}
          showTime
          onChange={(date) => {
            setEndDate(date ? date : null);
          }}
        />
        <Typography level={2}>¿Existe el cliente?</Typography>
        <Typography level={2}>Documento del Cliente existente:</Typography>
      </AntdModal>
    </>
  );
};

export default Modal;