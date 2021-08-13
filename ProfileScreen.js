import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function ProfileScreen({ navigation, route }) {
  const [notificationData, setNotificationData] = useState({});
  const [notificationBody, setNotificationBody] = useState([]);
  const [notificationTitle, setNotificationTitle] = useState('');
  const { notification } = route.params;

  useEffect(() => {
    if (notification.notification !== undefined) {
      console.log(notification.notification.request.content, 'Profile screen notifications')
      setNotificationData(notification.notification.request.content);
      setNotificationBody(notification.notification.request.content.body);
      setNotificationTitle(notification.notification.request.content.title);
    }

  }, [notification])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{notificationTitle}</Text>
      <Text>{notificationBody}</Text>
      <Text>Profile screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
