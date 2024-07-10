import { Modal as AntdModal, DatePicker, Input } from 'antd';
import moment from 'moment';

const Modal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  setNewEvent,
  selectedEvent,
  isEditing,
}) => {
  return (
    <>
      <AntdModal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input
          required
          disabled={isEditing}
          aria-label='Evento:'
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
          placeholder='Start date'
          //   value={isEditing ? moment(selectedEvent?.start) : null}
          value={moment(selectedEvent?.start)}
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
          placeholder='End date'
          value={moment(selectedEvent?.end)}
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
