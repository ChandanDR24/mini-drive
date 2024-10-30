const multer = require('multer')
const firebaseStorage = require('multer-firebase-storage');
const firebase = require('./firebase.config')
const serviceAccount = require('../gdrive-c58ea-firebase-adminsdk-3p5vr-e734a9a38b.json');
const storage = firebaseStorage({
    credentials:firebase.credential.cert(serviceAccount),
    bucketName: 'gdrive-c58ea.appspot.com',
    unique:true
})

const upload = multer({
    storage: storage,
})

module.exports=upload;