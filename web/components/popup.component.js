import React from 'react';
import { Text, Modal, Card } from '@ui-kitten/components';
import { styles } from './styles';

const Popup = ({ visible, setVisible, message }) => (
  <Modal
    visible={visible}
    backdropStyle={styles.backdrop}
    onBackdropPress={() => setVisible(false)}
  >
    <Card
      style={{
        flexDirection: 'row',
        padding: 20,
        borderColor: 'gray',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 5,
      }}
    >
      <Text category="h6">{message}</Text>
    </Card>
  </Modal>
);

export default Popup;
