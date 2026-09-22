'use client';

import { useEffect } from 'react';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

export default function BildirimBaslatici() {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    // Bildirim listener'ları
    LocalNotifications.addListener(
      'localNotificationReceived',
      (notification) => {
        console.log('Bildirim alındı:', notification);
      }
    );

    LocalNotifications.addListener(
      'localNotificationActionPerformed',
      (notification) => {
        console.log('Bildirime tıklandı:', notification);
        // Ana sayfaya yönlendir
        window.location.href = '/';
      }
    );

    return () => {
      LocalNotifications.removeAllListeners();
    };
  }, []);

  return null;
}