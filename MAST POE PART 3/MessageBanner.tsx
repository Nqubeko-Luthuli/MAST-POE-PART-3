import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FeedbackMessage } from '../types';
import { colors } from '../theme';

// Shows a green success or red error message.
const MessageBanner: React.FC<{ message: FeedbackMessage }> = ({ message }) => {
  const isSuccess = message.type === 'success';
  return (
    <View style={[styles.box, { backgroundColor: isSuccess ? colors.successBg : colors.errorBg }]}>
      <Text style={[styles.text, { color: isSuccess ? colors.success : colors.error }]}>
        {message.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: { borderRadius: 8, padding: 12, marginBottom: 12 },
  text: { fontWeight: '600', textAlign: 'center' },
});

export default MessageBanner;
