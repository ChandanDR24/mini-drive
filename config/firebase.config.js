const Firebase = require('firebase-admin');

const serviceAccount = require('../gdrive-c58ea-firebase-adminsdk-3p5vr-e734a9a38b.json')

const firebase = Firebase.initializeApp({
    credential:Firebase.credential.cert(serviceAccount),
    storageBucket:'gdrive-c58ea.appspot.com'
})

module.exports=Firebase;