"use client";
import { IMessageDocument } from "@/models/messageModel";
import { PopulatedDoc } from "mongoose";
import { Session } from "next-auth";
import Image from "next/image";
import { useRef } from "react";

type ChatMessagesProps = {
  messages: IMessageDocument[] | PopulatedDoc<IMessageDocument>[];
  session: Session | null;
};

const ChatMessages = ({ messages, session }: ChatMessagesProps) => {
  const lastMsgRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {messages.map((message, idx) => {
        const amISender = message.sender._id === session?.user?._id;
        const senderFullName = message.sender.fullName.toUpperCase();
        const isMessageImage = message.messageType === "image";
        const isPrevMessageFromSameSender =
          idx > 0 && messages[idx - 1].sender._id === message.sender._id;

        return (
          <div key={message._id} className="w-full" ref={lastMsgRef}>
            {!isPrevMessageFromSameSender && (
              <p
                className={`font-bold mt-2 text-xs ${
                  amISender ? "text-sigSnapImg" : "text-sigSnapChat"
                }`}
              >
                {amISender ? "ME" : senderFullName}
              </p>
            )}
            <div
              className={`border-l-2 ${
                amISender ? "border-l-sigSnapImg" : "border-l-sigSnapChat"
              }`}
            >
              <div className={`flex items-center w-1/2 p-2 rounded-sm `}>
                {isMessageImage ? (
                  <div className="relative">
                    <Image
                      src={message.content}
                      width={200}
                      height={200}
                      className="h-auto w-auto object-cover cursor-pointer"
                      alt="Image"
                    />
                  </div>
                ) : (
                  <p className="text-sm">{message.content}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default ChatMessages;
