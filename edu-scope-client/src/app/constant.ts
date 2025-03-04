export const BASE_URL = 'http://localhost:8080';
export const CREATE_NEW_COURSE_URL = `${BASE_URL}/course/save`;
export const GET_ALL_COURSE_URL = `${BASE_URL}/course/all`;
export const GET_ONE_COURSE_URL = `${BASE_URL}/course/`;

export const CREATE_NEW_LESSON_URL = `${BASE_URL}/lesson/save`;
export const GET_ALL_LESSON_URL = `${BASE_URL}/lesson/all`;
export const GET_ONE_LESSON_URL = `${BASE_URL}/lesson/`;

export const MARK_AS_COMELETED_URL = `${BASE_URL}/progress/save/`;

export const GET_ALL_VIDEO_URL = `${BASE_URL}/video/all`;

export const VIDEO_UPLOAD_INITIALIZE_URL = `${BASE_URL}/video/initialize`;
export const VIDEO_UPLOAD_CHUNK_URL = `${BASE_URL}/video/uploadChunk`;
export const VIDEO_UPLOAD_COMPLETE_URL = `${BASE_URL}/video/completeUpload`;


export const VIDEO_GET_ALL_URL = `${BASE_URL}/video/all`;

export const SIGNIN_URL = `${BASE_URL}/auth/signin`;
export const SIGNUP_URL = `${BASE_URL}/auth/signup`;

export const GET_ME = `${BASE_URL}/user/me`;


//utils

export const extractMessageFromError = (error) => {
    const message = error.response.data.message;

    if(Array.isArray(message)) {
        return message.join(', ')
    } else {
        return message;
    }
}