import { useState, useEffect } from "react";
import { auth, loginWithGoogle, logout, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

export default function ChatRoom() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Cek login
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // Ambil pesan real-time
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  // Kirim pesan
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    await addDoc(collection(db, "messages"), {
      text: message,
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: serverTimestamp(),
    });
    setMessage("");
  };

  return (
    <div
      className="
    w-full
    rounded-3xl
    bg-gradient-to-br
    from-[#060b18]
    via-[#0b1d2a]
    to-[#12091f]
    border border-sky-400/20
    shadow-[0_0_40px_rgba(79,195,247,0.15)]
    backdrop-blur-xl
    p-6
  "
    >
      <h2 className="text-xl font-semibold text-white mb-6 tracking-wide text-center">
        Chat Room
      </h2>

      {/* Header user */}
      {user && (
        <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <img
              src={user.photoURL}
              alt="avatar"
              className="w-10 h-10 rounded-full border border-white/20"
            />
            <span className="text-white font-medium">{user.displayName}</span>
          </div>
          <button
            onClick={logout}
            className="
            px-4 py-1
            rounded-full
            text-sm
            bg-white/10
            border border-white/20
            text-white
            hover:bg-white/20
            transition
          "
          >
            Logout
          </button>
        </div>
      )}

      {/* Area pesan */}
      <div
        className="
      h-[350px]
      overflow-y-auto
      rounded-2xl
      bg-black/30
      border border-white/10
      p-4
      space-y-4
      mb-4
    "
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${
              msg.uid === user?.uid ? "justify-end" : "justify-start"
            }`}
          >
            {msg.uid !== user?.uid && (
              <img
                src={msg.photoURL || "https://via.placeholder.com/40"}
                alt="avatar"
                className="w-8 h-8 rounded-full border border-white/10"
              />
            )}

            <div
              className={`
              max-w-[75%]
              px-4 py-2
              rounded-2xl
              text-sm
              ${
                msg.uid === user?.uid
                  ? "bg-gradient-to-r from-sky-500/20 to-purple-500/20 border border-sky-400/30 text-white"
                  : "bg-white/5 border border-white/10 text-white"
              }
            `}
            >
              <div className="text-xs text-white/50 mb-1">
                {msg.displayName}
              </div>
              <div>{msg.text}</div>
            </div>

            {msg.uid === user?.uid && (
              <img
                src={msg.photoURL || "https://via.placeholder.com/40"}
                alt="avatar"
                className="w-8 h-8 rounded-full border border-white/10"
              />
            )}
          </div>
        ))}
      </div>

      {/* Form login / kirim pesan */}
      {user ? (
        <form
          onSubmit={sendMessage}
          className="flex gap-3 flex-wrap sm:flex-nowrap w-full"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="
            flex-1
            min-w-0
            px-4 py-3
            rounded-xl
            bg-black/40
            border border-white/10
            text-white
            focus:outline-none
            focus:border-sky-400/50
          "
          />

          <button
            type="submit"
            className="
            px-6
            rounded-xl
            bg-gradient-to-r
            from-sky-500
            to-purple-500
            text-white
            font-medium
            hover:opacity-90
            transition
            w-full sm:w-auto
          "
          >
            Send
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <button
            onClick={loginWithGoogle}
            className="
            px-6 py-3
            rounded-full
            bg-gradient-to-r
            from-sky-500
            to-purple-500
            text-white
            font-medium
            hover:opacity-90
            transition
          "
          >
            Login with Google
          </button>
          <p className="text-sm text-white/50">
            Login required to send messages
          </p>
        </div>
      )}
    </div>
  );
}
