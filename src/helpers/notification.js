var registrationToken = "fwOaDndrLfo:APA91bGQYovFj9wghpCpB6HEfjcQv04bfwxQ6c8G8HbCLqsHmI59dZh4LZLbgzZLtv6zbSfGTZzT-aZCzWit-kP0VkYrW5BwlrnS1E8TMQGQ4I89kIcTkoUFTnsZiIM9yXEsfFFiZ-yN"
var admin = require("firebase-admin");

var serviceAccount = require("./history-6f992-14321d180ffb.json");


const notify = (data)=>{
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://history-6f992.firebaseio.com"
  });
var message = {
    data ,
    token: registrationToken
  };
  
  // Send a message to the device corresponding to the provided
  // registration token.
  admin.messaging().send(message)
    .then((response) => {
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    })
}
module.exports={
  notify
}