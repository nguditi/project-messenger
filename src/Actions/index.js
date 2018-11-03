import * as action from '../Constants/ActionTypes'

export const chatWith = (user) => ({
    type: action.CHANGE_USER,
    id: user.key,
    name: user.name,
    avatar: user.avatar,
})

export const addImage = (img) => ({
    type: action.ADD_IMAGE,
    img:img
})

export const addPreImage = (img) => ({
    type: action.ADD_PREIMAGE,
    img:img
})

export const searchUser = (text) =>({
    type: action.SEARCH_USER,
    text:text
})

export const clearImg = () => ({
    type: action.CLEAR_IMAGE,
})


export const clearMessases = () => ({
    type: action.CLEAR_MESSAGES,
})

export const addMessage = (msg) => ({
    type: action.ADD_MESSAGE,
    message: msg,
});

export const addChunkMessages = (messages) => ({
    type: action.ADD_CHUNK_MESSAGE,
    messages: messages,
});


export const sendMessage = (text,listImg,idReceiver) =>
    async (dispatch, getState, getFirebase) => {
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
               // (listImg.forEach((img)=>{
            let metadata = {
                contentType: 'image/jpeg'
            };
            let arrPromise = [];
            for (let i=0;i<listImg.length; i++){
                let uploadTask = storageRef.child(`images/`+listImg[i].name+msg.author.uid).put(listImg[i], metadata);
                arrPromise.push(uploadTask.snapshot.ref.getDownloadURL());
            }
            Promise.all(arrPromise).then((res)=>{
                res.forEach((downloadURL)=>
                {
                    msg.media = [...msg.media, downloadURL]
                })
                Promise.all( msg.media).then((res) => {
                    let storeid = (idReceiver > author.uid) ? idReceiver + author.uid : author.uid + idReceiver
                    let ref = firebase.database().ref(`messages/${storeid}`).push()
                    msg.id = ref.key;
                    ref.set(msg);
                })
            })

                // let uploadTask = storageRef.child(`images/`+listImg[0].name+msg.author.uid).put(listImg[0], metadata);
                // uploadTask.on('state_changed', function(snapshot){
                //     // Observe state change events such as progress, pause, and resume
                //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                //     switch (snapshot.state) {
                //         case firebase.storage.TaskState.PAUSED: // or 'paused'
                //             break;
                //         case firebase.storage.TaskState.RUNNING: // or 'running'
                //             break;
                //     }
                // }, function(error) {
                // }, function() {
                //     uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                //
                //     });
                // });

             // }))
        }
        else {
            let storeid = (idReceiver > author.uid) ? idReceiver + author.uid : author.uid + idReceiver
            let ref = firebase.database().ref(`messages/${storeid}`).push()
            msg.id = ref.key;
            ref.set(msg);
        }
    }

export const chooseUser = (idUser) =>
    async (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()
        let refUser = firebase.database().ref(`users/${idUser}`)
        const user = {}
        await refUser.once('value', function(snapshot) {
            user.key = idUser
            user.name = snapshot.val().displayName
            user.avatar = snapshot.val().avatarUrl
        })

        dispatch(chatWith(user))
        dispatch(clearMessases())

        let id = user.key;
        let thisid = firebase.auth().currentUser.uid;
        let storeid = (thisid > id) ? thisid + id : id + thisid
        let ref = firebase.database().ref(`messages/${storeid}`).orderByKey();
        ref.limitToLast(20).once('value').then((dataSnapshot) => {
            const messages = dataSnapshot.val() || [];
            dispatch(addChunkMessages(messages))
        }).then(()=>
            ref.limitToLast(1).on('value',(snapshot) => {
                // setTimeout(() => {
                const message = snapshot.val();
                dispatch(addMessage(message))
                // },50))
            })
        )
    }

export const logout = () =>
    (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()
        let id = firebase.auth().currentUser.uid;
        firebase.update(`users/${id}/online`, {
            lastonline: firebase.database.ServerValue.TIMESTAMP,
            status: false
        })
        firebase.logout().then(()=>{localStorage.removeItem('hasAuth')})
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
