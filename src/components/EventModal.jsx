// EventModal.js
import { Modal, DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const EventModal = ({ isVisible, event, onClose }) => {
  return (
    <Modal
      title='Event Details'
      open={isVisible}
      onOk={onClose}
      onCancel={onClose}
    >
      <RangePicker value={[moment(event?.start), moment(event?.end)]} />
      <p>{event?.title}</p>
    </Modal>
  );
};

export default EventModal;
