import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'Flashcards:Notifications';

export function clearNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification() {
    return {
        title: 'Complete your quiz!',
        body: "You didn't attend any quiz today. Complete a quiz!",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            vibrate: true,
            sticky: false
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(data => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync();

                            let notify_time = new Date();
                            notify_time.setDate(notify_time.getDate() + 1)
                            notify_time.setHours(17);
                            notify_time.setMinutes(0);

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: notify_time,
                                    repeat: 'day'
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                        }
                    })
            }
        })
}