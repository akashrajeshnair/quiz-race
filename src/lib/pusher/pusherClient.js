import PusherClient from "pusher-js"

// Allows you to use Pusher inside Next.js "use client" components.
export const pusherClient = new PusherClient('7f9de55716a1ec61f985', {
  cluster: "ap2", // Change with your cluster region.
  authEndpoint: "/api/pusher-auth", // OPTIONAL: For secure web sockets.
  authTransport: "ajax",
  auth: {
    headers: {
      "Content-Type": "application/json",
    },
  },
})