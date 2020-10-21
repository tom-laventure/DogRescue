import app from 'firebase/app';
import 'firebase/auth'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};


const fileTypes = [
  "image/jpeg",
  "image/png",
];

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(config);
    }
    this.auth = app.auth();
    this.database = app.database()
    this.storageRef = app.storage().ref()
    this.firestore = app.firestore()
  }

  getDogWaitList = (region, callback) => {
    const messagesRef = this.firestore.collection('Dog Profiles').where("region", "==", region).orderBy('position')
    const dogRegionCount = this.firestore.collectionGroup('Dog Profiles').where("region", "==", 'South Korea')

    let temp = [];

    messagesRef.get().then((qs) => {
      qs.forEach(doc => {
        temp.push(doc.data())
      })
      callback(temp)
    })
  }

  createNewUser = (data, id) => {
    this.database.ref('users/' + id).set(data)
  }

  createDogProfile = (profileInfo, file, callback) => {
    const messagesRef = this.firestore.collection('Dog Profiles')
    const dogRegionCount = this.firestore.collection('Region Count').doc(profileInfo.region)
    let tempProfileId = profileInfo.createdTime + profileInfo.handlerId
    dogRegionCount.get().then((doc) => {
      if (doc.exists) {
        let newWaitlist = doc.data().waitList.concat([tempProfileId])
        dogRegionCount.update('waitList', newWaitlist)
      }
      else {
        dogRegionCount.set({ waitList: [tempProfileId] })
      }
    })

    let type;
    if (file.type === "image/jpeg") {
      type = ".jpeg"
    }
    else {
      type = '.png'
    }

    this.storageRef.child('DogPhotos/' + profileInfo.handlerId + profileInfo.createdTime + type).put(file).then((data) => {
      console.log(data, "success")
      profileInfo.dogImage = data.metadata.fullPath
      messagesRef.doc(tempProfileId).set(profileInfo).then((data) => {
        callback({ flag: true, doc: data })
      })
    }).catch((err) => {
      console.log(err, "error")
      callback({ flag: false, error: err });
    })

  }

  getProfileInfo = (id, callback) => {
    const profileRef = this.firestore.collection('Dog Profiles').doc(id)
    profileRef.get().then(doc => {
      console.log(doc.data())
      callback(doc.data())
    })
  }

  getProfileImage = (ref, callback) => {
    this.storageRef.child(ref).getDownloadURL().then((url) => {
      callback({ URL: url })
    })
  }

  confirmDogProfile = (profileInfo, oldRef, uid, callback) => {
    const regionRef = this.firestore.collection('Region Count').doc(profileInfo.region)
    const dogProfileRef = this.firestore.collection('Dog Profiles')
    regionRef.get().then((doc) => {
      let tempList = [...doc.data().waitList]
      let index = tempList.indexOf(oldRef)
      tempList[index] = uid
      regionRef.set({waitList: tempList}).then(() => {
        dogProfileRef.doc(oldRef).delete().then(() => {
          dogProfileRef.doc(uid).set(profileInfo).then(() => {
            console.log("you fucking did it!!!!!!")
          })
        })
      })
    })


  }

  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = (fun) => this.auth.signOut().then(fun);

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  authStateChange = (fun) => this.auth.onAuthStateChanged(fun);
}

export default Firebase;