import * as action from '../Constants/ActionTypes'

export const chatWith = (user) => ({
    type: action.CHANGE_USER,
    id: user.key,
    name: user.name,
    avatar: user.avatar,
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


export const sendMessage = (text, idReceiver) =>
    (dispatch, getState, getFirebase) => {
        const firebase = getFirebase()
        let author = firebase.auth().currentUser;
        let msg = {
            text: text,
            time: Date.now(),
            author: {
                id: author.uid,
                name: author.displayName,
                avatar: author.photoURL
            }
        };

        let ref = firebase.database().ref(`messages/${idReceiver}`)
        ref.once('value', function(snapshot) {
            if (snapshot.hasChild(author.uid)) {
                ref = firebase.database().ref(`messages/${idReceiver}/${author.uid}`).push();
            }
            else {
                ref = firebase.database().ref(`messages/${author.uid}/${idReceiver}`).push();
            }
        }).then(() =>{
            msg.id = ref.key;
            ref.set(msg);
            dispatch(addMessage(msg));
        });


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

        let ref = firebase.database().ref(`messages/${thisid}`)
        ref.once('value', function(snapshot) {
            if (snapshot.hasChild(id)) {
                ref = firebase.database().ref(`messages/${thisid}/${id}`).orderByKey().limitToLast(20);
            }
            else {
                ref = firebase.database().ref(`messages/${id}/${thisid}`).orderByKey().limitToLast(20);
            }
        }).then(() =>{
            // ref.once('value').then((dataSnapshot) => {
            //     const messages = dataSnapshot.val() || [];
            //     dispatch(addChunkMessages(messages))
            // });
            ref.on('value',(snapshot) =>
                setTimeout(() => {
                    const messages = snapshot.val() || [];
                    dispatch(addChunkMessages(messages))
                },50))
        });

        //
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
        let id = firebase.auth().currentUser.uid;
        firebase.update(`users/${id}/online`, {status: true})

        let ref = firebase.database().ref(`users/${id}/online`);
        ref.onDisconnect().update({
            lastonline: firebase.database.ServerValue.TIMESTAMP,
            status: false
        })
    }
