# Broadcast Channel API Playground

This project is a small experimental playground built to test and demonstrate the **Broadcast Channel API**, a native browser feature designed for communication between browsing contexts (tabs, windows, iframes) of the same origin.

> ⚠️ **This is not a real-world app**. The goal here is not to build a fully functional chat app or something production-ready, but to explore how the Broadcast Channel API behaves in practice, test its quirks, and show what's possible with it.

---

## 🚀 What is the Broadcast Channel API?

The Broadcast Channel API is a simple interface that allows basic communication between browsing contexts on the same origin. It acts like a tiny native pub-sub system in the browser:

-   Each tab (or iframe, or worker) can create a channel with the same name
-   Messages sent to the channel are received by all listeners on that name
-   Asynchronous and event-driven

✅ Native  
✅ Simple API  
✅ No backend required

---

## 🔧 How to Use the Broadcast Channel API

Here’s a quick overview of how it works:

```js
// 1. Create a channel
const channel = new BroadcastChannel("my-channel");

// 2. Listen for messages
channel.onmessage = (event) => {
	console.log("Received:", event.data);
};

// 3. Send messages
channel.postMessage("Hello from another tab!");
```

You can close the channel with `.close()` when you're done using it.

You’re not limited to strings—you can send full JavaScript objects thanks to structured cloning.

---

## 🎯 About This Project

This project is purely experimental.

The goal is to:

-   Test out the Broadcast Channel API
-   Understand how browser tabs communicate
-   See behavior in edge cases (e.g., tab close, reload, async timing)
-   Show how **no backend** is needed for certain real-time features
-   Keep the code minimal and readable

The demo looks like a chat, but **this is not a chat app**, nor is it meant to be. The focus is the communication channel itself.

---

## ⚙️ Extending the Demo: What Logic Can Do

Even though this project stays simple, I could have built a **more complex and powerful app**.

With a bit more logic and structure, I could have implemented:

-   A room-based system, where users can **host or join** rooms
-   Password-protected rooms, defined dynamically by the creator

All using **just browser tabs** and a shared channel name.

---

## 🧪 Live Demo

> 🎥 [Click here to watch the demo video](./preview/demo.mp4)

Open multiple tabs with the app running to see real-time communication across them. No servers. No WebSockets. No storage abuse. Just native browser magic ✨

---

## 📦 Try It Yourself

```bash
git clone
cd broadcast-channel-live-chat
npm install
npm run dev
```

Then open a few tabs at `http://localhost:3000`.

---

## 📚 Resources

-   [MDN Web Docs – BroadcastChannel](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API)
-   [caniuse.com – Broadcast Channel API](https://caniuse.com/?search=broadcastchannel)

---

## 🗨️ Final Thoughts

The Broadcast Channel API is a clean, underrated way to let tabs talk to each other—without hacks or servers.

This project aims to show how you can build on that foundation, test out ideas, and even grow it into real use cases.
