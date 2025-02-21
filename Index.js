
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  import{
        getDatabase,
        ref,
        child,
        get,
        push,
        set,
        onValue,
        serverTimestamp,
  }from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDu0Kz5zYDOE3h4M0CXVbKfKXFtE-CCZ7o",
    authDomain: "goblinhumber-2025.firebaseapp.com",
    projectId: "goblinhumber-2025",
    storageBucket: "goblinhumber-2025.firebasestorage.app",
    messagingSenderId: "997431828790",
    appId: "1:997431828790:web:3cb17cd8de40fd8bd85397",
    measurementId: "G-WKPL2T5M1W"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const database = getDatabase();
  const messages =ref(database, "/messages")

  onValue (
    messages,
    (snapshot) => {
        //console.log(snapshot);

        const ul = document.getElementById("messages");

        snapshot.forEach((childSnapshot) => {
             const childKey = childSnapshot.key;
             const childData = childSnapshot.val();

             console.log(childKey);
             console.log(childData);

            const text = document.createTextNode(
                childData.message + " ~ " + childData.name
            );
            const li = document.createElement("li");
            li.appendChild(text);
            ul.appendChild(li);
        }
    )
    },{
        onlyOnce: false,
    }
);

const add = document.getElementById("add");

add.addEventListener("click", function(e){
      const name = document.getElementById("name");
      const message = document.getElementById("message");

      const newMessageRef = push(messages);

    set(newMessageRef, {
        name: name.value,
        message: message.value,
        createdAt: serverTimestamp(),
});

  e.preventDefault();
});