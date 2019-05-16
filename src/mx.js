import firebase from "firebase";

var config = {
  apiKey: "AIzaSyBPYNsWiUMyahGHOQXNKGZYRAD8k1DGiNQ",
  authDomain: "camp-2019.firebaseapp.com",
  databaseURL: "https://camp-2019.firebaseio.com",
  projectId: "camp-2019",
  storageBucket: "camp-2019.appspot.com",
  messagingSenderId: "580757596336"
};

const init = () => firebase.initializeApp(config);

init()

firebase.storage().ref().constructor.prototype.putFiles = function (files) {
  var ref = this;
  return Promise.all(
    Object.values(files).map(function (file) {
      return ref
        .child(`${shortid.generate()}-${file.name}`)
        .put(file)
        .then((r) => r.ref.getDownloadURL());
    }),
  );
};


export class FirebaseModel {
  constructor(collectionName) {
    this.db = firebase.firestore();
    this.collection = this.db.collection(collectionName)
  }

  getAll() {
    const data = []
    this.collection.get().then(query => {
      query.forEach(doc => {
        const snapshot = doc.data()
        snapshot._id = doc.id
        data.push(snapshot)
      });
    });
    return data
  }

  async count(res) {
    const r = await res.get();
    return r.docs.length;
  }
  
  async paginate(query, pageNumber, perPage, populate="") {
    const data = [];
    const queryValue = [];
    let res = this.collection;

    for (let key in query) {
      res = res.orderBy(key);
      queryValue.push(query[key]);
    }

    if(queryValue.length > 0) {
      res = res
        .startAt(...queryValue)
        .endAt(...queryValue)
    }

    const total = await this.count(res)

    res = await res
      .limit(perPage*pageNumber)
      .get();

    let i = 0;
    res.forEach(doc => {
      if (i >= (pageNumber - 1) * perPage) {
        const snapshot = doc.data();
        snapshot._id = doc.id;
        data.push(snapshot);
      }
      i += 1;
    });
    if (populate) {
      for(let i=0; i < data.length; i++) {
        if (data[i].userRef) {
          const user = await data[i].userRef.get()
          data[i].userRef = user.data();
        }
      }
    }
    
    return {data, total}
  }

  async getOne(_id) {
    let data;
    await this.collection.doc(_id).get().then(query => {
      data = { ...query.data(), _id: query.id }
    });
    return data
  }

  getOneAndPopulate(_id, populatePath) {
    return new Promise(async (resolve, reject) => {
      let data = await this.getOne(_id);
      if(data.userRef) {
        const user = await data.userRef.get();
        data.userRef = user.data();
      }
      resolve(data);
      })
  }

  save(data) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.collection.doc().set(data);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  saveWithId (_id, data) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.collection.doc(_id).set(data);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

}

const openModal = (modal, overlay) => {
  overlay.classList.add('is-open');
  modal.classList.add('is-open');
};

const closeModal = (modal, overlay) => {
  overlay.classList.remove('is-open');
  modal.classList.remove('is-open');
};

export const initModal = modal => {
  if (!modal) {
    console.error("You need to provide `modal element`");
  } else {
    let overlay = document.createElement('div');
    overlay.className = 'mx-modal-overlay';
    document.body.appendChild(overlay);
    const open = () => openModal(modal, overlay);
    const close = () => closeModal(modal, overlay);
    overlay.addEventListener('click', close);
    return {
      open,
      close,
    };
  }
};

function waitFor(seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), seconds * 1000);
  });
}


export const fireBase = firebase;