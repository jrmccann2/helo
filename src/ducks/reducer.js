const initialState = {
    id: 0,
    username: '',
    profile_pic: ''
}

const UPDATE_USER_INFORMATION = 'UPDATE_USER_INFORMATION';
const CLEAR_USER_INFORMATION = 'CLEAR_USER_INFORMATION';


export default function reducer (state = initialState, action){
    switch (action.type) {
        case UPDATE_USER_INFORMATION:
            return Object.assign({}, state, {
                id: action.payload.id,
                username: action.payload.username,
                profile_pic: action.payload.profile_pic
            });

        // case CLEAR_USER_INFORMATION:
        //     return Object.assign();

        default:
            return state;
    }
}

export function updateUserInformation( id, username, profile_pic ){
    return {
        type: UPDATE_USER_INFORMATION,
        payload: {
            id,
            username,
            profile_pic
        }
    }
}