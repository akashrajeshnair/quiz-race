// lib/pusher.js
import PusherServer from 'pusher-js';

export const pusherServer = new PusherServer({
    app_id : "1830773",
    key : "7f9de55716a1ec61f985",
    secret : "ba1bc96d5ee5f679591d",
    cluster : "ap2"
})
