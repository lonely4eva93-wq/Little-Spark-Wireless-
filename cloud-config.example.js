// Little Spark Wireless cloud config example
// Copy this file to cloud-config.js after creating a Firebase project.
// Do NOT commit real production API keys if the repo is public.

window.LITTLE_SPARK_CLOUD_CONFIG = {
  provider: 'firebase',
  enabled: false,
  firebase: {
    apiKey: 'YOUR_FIREBASE_API_KEY',
    authDomain: 'YOUR_PROJECT.firebaseapp.com',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_PROJECT.appspot.com',
    messagingSenderId: 'YOUR_SENDER_ID',
    appId: 'YOUR_APP_ID'
  }
};
