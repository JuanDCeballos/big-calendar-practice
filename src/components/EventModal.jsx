// EventModal.js
import { Modal } from 'antd';

const EventModal = ({ isVisible, event, onClose }) => {
  return (
    <Modal
      title='Event Details'
      visible={isVisible}
      onOk={onClose}
      onCancel={onClose}
    >
      <p>{event?.title}</p>
    </Modal>
  );
};

export default EventModal;
