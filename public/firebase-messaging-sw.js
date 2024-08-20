// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyDF2sMUJJcw9N7gYXOlXZUloQTKetW41NI",
  authDomain: "leon-art.firebaseapp.com",
  projectId: "leon-art-d8942",
  storageBucket: "leon-art.appspot.com",
  messagingSenderId: "30560177674",
  appId: "1:30560177674:web:35496df6e8c90714e919f3",
  measurementId: "G-ZHZZFGZ31C",
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
