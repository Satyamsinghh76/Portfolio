"use client";

import dynamic from "next/dynamic";

// ChatWidget + OpenAI SDK only load when the component mounts
// (after initial page render, not blocking FCP/LCP)
const ChatWidget = dynamic(() => import("./ChatWidget"), {
  ssr: false,
});

export default function LazyChat() {
  return <ChatWidget />;
}
