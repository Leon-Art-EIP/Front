// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyDF2sMUJJcw9N7gYXOlXZUloQTKetW41NI",
  authDomain: "leon-art-d8942.firebaseapp.com",
  projectId: "leon-art-d8942",
  storageBucket: "leon-art-d8942.appspot.com",
  messagingSenderId: "954861130276",
  appId: "1:954861130276:web:b0fd36e2f55877c3303eb1",
  measurementId: "G-3EP76GJ247",
};
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./logo.png",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
