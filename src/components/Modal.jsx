import { Modal as AntdModal, DatePicker, Input, Typography } from 'antd';
import moment from 'moment';

const Modal = ({
  isModalOpen,  
  handleCancel,
  setNewEvent,
  selectedEvent,
  isEditing,
}) => {

  const handleOks = () => {
    console.log('Agregar logica para crear evento');
    console.log(setNewEvent());
  }

  return (
    <>
      <AntdModal open={isModalOpen} onOk={handleOks} onCancel={handleCancel}>
        <Typography level={2}>RESERVA</Typography>
        <Input
          required
          disabled={isEditing}
          placeholder='Nombre del Evento'
          value={selectedEvent?.title}
          onChange={(e) => {
            const title = e.target.value;
            setNewEvent((prev) => ({
              ...prev,
              title: title,
            }));
          }}
        />
        <DatePicker          
          required
          disabled={isEditing}
          placeholder='Fecha Inicio'
          value={selectedEvent !== null && selectedEvent !== undefined ? moment(selectedEvent.start) : null}
          showTime
          onChange={(date) => {
            setNewEvent((prev) => ({
              ...prev,
              start: date ? date : null,
            }));
          }}
        />
        <DatePicker
          required
          disabled={isEditing}
          placeholder='Fecha Fin'
          value={selectedEvent !== null && selectedEvent !== undefined ? moment(selectedEvent.end) : null}
          showTime
          onChange={(date) => {
            setNewEvent((prev) => ({
              ...prev,
              end: date ? date.add(1, 'days') : null,
            }));
          }}
        />
      </AntdModal>
    </>
  );
};

export default Modal;
