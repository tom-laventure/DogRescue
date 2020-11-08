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
    this.functions = app.functions()
  }


  //retrieves a key array, selects the paginated items required and gets those items
  getDogWaitList = (region, callback, paginationStart, paginationEnd) => {
    const dogRef = this.firestore.collection('Dog Profiles')
    const rescueRef = this.firestore.collection('Rescue List').doc(region)
    return this.firestore.runTransaction((transaction) => {
      return transaction.get(rescueRef).then(doc => {
        if (doc.exists) {
          let tempList = [...doc.data().waitList]
          let pagReturn = tempList.slice(paginationStart, paginationEnd)
          let temp = []
          let counter = paginationStart;
          let counterFlag = paginationEnd
          pagReturn.forEach(item => {
            dogRef.doc(item).get().then(doc => {
              counter++;
              temp.push(doc.data())
              if (counterFlag === counter) {
                callback(temp)
              }
            })
          })
        }
      })
    })
  }

  createNewUser = (data, id) => {
    this.database.ref('users/' + id).set(data)
  }

  createDogProfile = (profileInfo, file, callback) => {
    const messagesRef = this.firestore.collection('Dog Profiles')
    const dogRegionCount = this.firestore.collection('Rescue List').doc(profileInfo.region)
    let tempProfileId = profileInfo.createdTime + profileInfo.handlerId
    console.log("here")
    return this.firestore.runTransaction(transaction => {
      return transaction.get(dogRegionCount).then((doc) => {
        if (doc.exists) {
          let newWaitlist = doc.data().waitList.concat([tempProfileId])
          dogRegionCount.update('waitList', newWaitlist)
        }
        else {
          dogRegionCount.set({ waitList: [tempProfileId] })
        }
        let type = '.png';
        if (file.type === "image/jpeg") {
          type = ".jpeg"
        }

        this.storageRef.child('DogPhotos/' + profileInfo.handlerId + profileInfo.createdTime + type).put(file).then((data) => {
          profileInfo.dogImage = data.metadata.fullPath
          messagesRef.doc(tempProfileId).set(profileInfo).then((data) => {
            callback({ flag: true, doc: data, tempID: tempProfileId })
          })
        }).catch((err) => {
          callback({ flag: false, error: err });
        })
      })
    })
  }



  sendEmail = (data) => {
    let sendEmail = this.functions.httpsCallable('sendEmail')
    sendEmail(data)
  }

  getTempProfileInfo = async (id, callback) => {
    const profileRef = this.firestore.collection('Dog Profiles').doc(id)
    profileRef.get().then(doc => {
      callback(doc.data())
    })
  }

  getProfileImage = (ref, callback) => {
    this.storageRef.child(ref).getDownloadURL().then((url) => {
      callback({ URL: url })
    })
  }


  confirmDogProfile = async (userProfileInfo, dogProfileInfo, oldRef) => {
    const dogProfileRef = this.firestore.collection('Dog Profiles')
    const userProfiles = this.firestore.collection('User Profiles')

    try{
      await userProfiles.doc(userProfileInfo.uid).set(userProfileInfo).then((doc) => {
        console.log('success', doc)
      }).catch(err => {
        console.log('err', err)
      })
      await dogProfileRef.doc(oldRef).set(dogProfileInfo).catch(err => {
        console.log('err', err)
      })
      return
    }catch{
      return "error"
    }
  }

  getUserProfileInfo = async (uid, callback) => {
    const userRef = this.firestore.collection('User Profiles').doc(uid)
    return await userRef.get()
  }

  getUsersDogs = (uid, callback) => {
    const dogRef = this.firestore.collection('Dog Profiles').where('uid', '==', uid)
    dogRef.get().then(qs => {
      let temp = []
      let length = qs.size
      let flag = 0
      qs.forEach((doc) => {
        flag++
        temp.push(doc.data())
        if (flag === length) {
          callback(temp)
        }
      })
    })
  }

  checkIfUserExists = (email) => {
    return new Promise((resolve, reject) => {
      this.auth.fetchSignInMethodsForEmail(email).then(data => {
        console.log(data)
        let res = false
        if (data.length > 0) {
          res = true
        }
        resolve(res)
      }
      ).catch(err => reject(err))
    })
  }

  getCurrentUserID = () => {
    if (this.auth.currentUser) {
      return this.auth.currentUser.uid
    }
    else {
      return false
    }
  }

  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = async (email, password) => {
    let user = await this.auth.signInWithEmailAndPassword(email, password).then((data) => {
      return data.user
    });
    let userInfo = await this.firestore.collection('User Profiles').doc(user.uid).get().then((doc) => {
      return doc.data()
    })
    return userInfo
  }

  doSignOut = (fun) => this.auth.signOut().then(fun);

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  authStateChange = (fun) => this.auth.onAuthStateChanged(fun);
}

export default Firebase;