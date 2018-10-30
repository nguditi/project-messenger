// import * as types from '../Constants/ActionTypes'
// import {database} from "../firebase";
//
// export const addMessage = (msg) => ({
//     type:types.ADD_MESSAGE,
//     message:msg,
// })
//
// export const sendMessage = (text,user) => {
//     return function (dispatch) {
//         let msg = {
//             text: text,
//             time: Date.now(),
//             // author: {
//             //     name: user.name,
//             //     avatar: user.avatar
//             // }
//         };
//         const newmsgPtr = database.ref('/messages').push(msg);
//         msg.id = newmsgPtr.key;
//         newmsgPtr.set(msg);
//         dispatch(addMessage(msg));
//     }
// }