"use client";

import { useEffect, useState } from "react";
import type { Message as MessageType } from "@/types";
import Swal from "sweetalert2";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<MessageType[]>([]);

  const toggleRead = async (id: string, currentRead: boolean) => {
    const res = await fetch("/api/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read: !currentRead }),
    });

    if (res.ok) {
      const updated = await res.json();
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === id ? { ...msg, read: updated.message.read } : msg
        )
      );
    }
  };

  const deleteMessage = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "transparent", // disables default solid background
      color: "#fff",
      iconColor: "#facc15",
      buttonsStyling: false,
      customClass: {
        popup: "swal-glass",
        title: "text-white text-lg font-semibold",
        htmlContainer: "text-white/80",
        confirmButton:
          "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded",
        cancelButton:
          "bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded ml-2",
      },
      willOpen: () => {
        const popup = document.querySelector<HTMLElement>(".swal-glass");
        if (popup) {
          popup.style.background = "rgba(255, 255, 255, 0.05)";
          popup.style.backdropFilter = "blur(12px)";
          popup.style.border = "1px solid rgba(255, 255, 255, 0.1)";
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteMessageConfirmed(id);
      }
    });
  };

  const deleteMessageConfirmed = async (id: string) => {
    if (!id) return;

    const res = await fetch("/api/messages", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    }
  };

  useEffect(() => {
    async function fetchMessages() {
      const res = await fetch("/api/messages");
      if (res.ok) {
        const data: MessageType[] = await res.json();
        setMessages(data);
      } else {
        console.error("Failed to fetch messages");
      }
    }

    fetchMessages();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-white">Messages</h2>
      {messages.map((msg) => (
        <div
          key={msg._id}
          className="p-4 border border-white/10 rounded-lg bg-white/5"
        >
          <div className="text-white/80 flex items-center justify-between">
            <span>
              <strong>{msg.name}</strong> ({msg.email})
              {msg.read ? (
                <span className="ml-2 text-xs text-green-400">(Read)</span>
              ) : (
                <span className="ml-2 text-xs text-yellow-400">(Unread)</span>
              )}
            </span>
            <div className="flex gap-4">
              <button
                onClick={() => toggleRead(msg._id, msg.read)}
                className="text-xs text-blue-400 underline"
              >
                Mark as {msg.read ? "unread" : "read"}
              </button>
              <button
                onClick={() => deleteMessage(msg._id)}
                className="text-xs text-red-400 underline"
              >
                Delete
              </button>
            </div>
          </div>

          <p className="text-white mt-2">{msg.message}</p>
          <p className="text-xs text-white/50 mt-1">
            {new Date(msg.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
