import * as action from '../Constants/ActionTypes'

export const chatWith = (user) => ({
    type: action.CHANGE_USER,
    id: user.key,
    name: user.name,
    avatar: user.avatar,
})

// export const addImage = (img) => ({
//     type: action.ADD_IMAGE,
//     img:img
// })
//
// export const addPreImage = (img) => ({
//     type: action.ADD_PREIMAGE,
//     img:img
// })

export const searchUser = (text) =>({
    type: action.SEARCH_USER,
    text:text
})

export const clearImg = () => ({
    type: action.CLEAR_IMAGE,
})


export const addMessage = (msg) => ({
    type: action.ADD_MESSAGE,
    message: msg,
});

export const addChunkMessages = (messages) => ({
    type: action.ADD_CHUNK_MESSAGE,
    messages: messages,
});

export const addMoreMessages = (messages) => ({
    type: action.ADD_MORE_MESSAGE,
    messages: messages,
});

export const changeStar = (stat)=> ({
    type: action.CHANGE_STAR,
    stat: stat,
})

export const togleStateStar= (id,star) =>
    (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()
        let thisid = firebase.auth().currentUser.uid;
        if (star === true) {
            firebase.update(`users/${thisid}/stat/${id}`, {
                star: false
            })
        }
        else{
            firebase.update(`users/${thisid}/stat/${id}`, {
                star: true
            })
        }
    }


export const checkStar = (id) =>
    (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()
        if (id !== 0) {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    let thisid = user.uid;
                    let ref = firebase.database().ref(`users/${thisid}/stat/${id}`)
                    ref.once('value', function(snapshot) {
                        if (!(snapshot.hasChild('star'))) {
                            ref.update({star:false})
                        }
                    }).then(()=>{
                        ref.on('value', (snapshot) => {
                            setTimeout(() => {
                                const stat = snapshot.val()
                                dispatch(changeStar(stat))
                            },50)
                        })
                    })
                }
            })
        }
    }

export const loadMore = (length) =>
    (dispatch, getState, getFirebase) => {
        if (length < 20)
            return
        const firebase = getFirebase()
        let thisid = firebase.auth().currentUser.uid;
        let chatWith = getState().chatWith.id;
        let storeid = (thisid > chatWith) ? thisid + chatWith : chatWith + thisid
        let ref = firebase.database().ref(`messages/${storeid}`).orderByKey();
        ref.endAt(getState().messages[0].id).limitToLast(40).once('value').then((dataSnapshot) => {
            const messages = dataSnapshot.val() || [];
            dispatch(addMoreMessages(messages))
        })
    }



export const sendMessage = (text,listImg,idReceiver) =>
     (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()
        const storageRef = firebase.storage().ref();
        let author = firebase.auth().currentUser;

        let msg = {
            text: text,
            media:[],
            time: Date.now(),
            author: {
                id: author.uid,
                name: author.displayName,
                avatar: author.photoURL
            }
        };
        //save img


        if (listImg.length > 0)
        {
            let metadata = {
                contentType: 'image/jpeg'
            };
            let arrPromiseLink = listImg.map((img)=>{
                let now = new Date()
                return(new Promise(function(resolve, reject) {
                            storageRef.child(`images/${now.getTime()}${img.name}`).put(img, metadata)
                                .then((snapshot) => {
                                    snapshot.ref.getDownloadURL().then((downloadURL) => {
                                        resolve(downloadURL)
                                    });
                                })
                        })
                    )
            })
            Promise.all(arrPromiseLink).then((res)=>{
                res.forEach((downloadURL)=>
                {
                    console.log(downloadURL)
                    msg.media = [...msg.media, downloadURL]
                })
                Promise.all(msg.media).then((res) => {
                    let storeid = (idReceiver > author.uid) ? idReceiver + author.uid : author.uid + idReceiver
                    let ref = firebase.database().ref(`messages/${storeid}`).push()
                    msg.id = ref.key;
                    ref.set(msg);
                })
            })
        }
        else {
            let storeid = (idReceiver > author.uid) ? idReceiver + author.uid : author.uid + idReceiver
            let ref = firebase.database().ref(`messages/${storeid}`).push()
            msg.id = ref.key;
            ref.set(msg);
        }
         firebase.update(`users/${author.uid}/stat/${idReceiver}`,
            {
                lastChat: Date.now()
            })
         firebase.update(`users/${idReceiver}/stat/${author.uid}`,
             {
                 lastChat: Date.now()
             })
         firebase.set(`users/${author.uid}/wait/${idReceiver}`,true)
    }

export const chooseUser = (idUser) =>
    (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()

        //ko theo nguoi truoc nua
        let refUser = firebase.database().ref(`users/${idUser}`)
        let preUser = getState().chatWith;
        const user = {}
        refUser.once('value').then((snapshot)=> {
            user.key = idUser
            user.name = snapshot.val().displayName
            user.avatar = snapshot.val().avatarUrl
        }).then(()=>{
            dispatch(chatWith(user))
            dispatch(checkStar(user.key))
        })

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                let thisid = user.uid;
                let storeid = (thisid > idUser) ? thisid + idUser : idUser + thisid
                let prestoreid = (thisid > preUser.id) ? thisid + preUser.id : preUser.id + thisid

                firebase.database().ref(`messages/${prestoreid}`).off();
                firebase.set(`users/${idUser}/wait/${thisid}`,false);
                let ref = firebase.database().ref(`messages/${storeid}`).orderByKey();
                ref.limitToLast(20).once('value').then((dataSnapshot) => {
                    const messages = dataSnapshot.val() || [];
                    dispatch(addChunkMessages(messages))
                }).then(() => {
                    ref.limitToLast(1).on('value', (snapshot) => {
                        const message = snapshot.val();
                        if (message) {
                                dispatch(addMessage(message))
                        }
                    })
                })
            }
        })
    }

export const readInbox = (idSend) =>
    (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()
        let id = firebase.auth().currentUser.uid;
        firebase.set(`users/${idSend}/wait/${id}`,false);
    }

export const logout = () =>
    (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()
        let id = firebase.auth().currentUser.uid;
        firebase.update(`users/${id}/online`, {
            lastonline: firebase.database.ServerValue.TIMESTAMP,
            status: false
        })
        firebase.logout()
    }


export const setOnline = () =>
    (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                let id = user.uid;
                firebase.update(`users/${id}/online`, {status: true})

                let ref = firebase.database().ref(`users/${id}/online`);
                ref.onDisconnect().update({
                    lastonline: firebase.database.ServerValue.TIMESTAMP,
                    status: false
                })
            }
        })
    }
