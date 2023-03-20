<script src="https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js"></script>

// Firebase 앱의 구성을 정의합니다.
const firebaseConfig = {
  apiKey: "AIzaSyBpDezQXw5UDas7kz3QOt287JrmsEVjNd4",
  authDomain: "distance3-3c62d.firebaseapp.com",
  databaseURL: "https://distance3-3c62d-default-rtdb.firebaseio.com",
  storageBucket: "distance3-3c62d.appspot.com",
};

// Firebase 앱을 초기화합니다.
firebase.initializeApp(firebaseConfig);

// Firebase 데이터베이스 참조를 가져옵니다.
const database = firebase.database();

// "sensor" 경로의 데이터를 가져옵니다.
const ref = database.ref("sensor");