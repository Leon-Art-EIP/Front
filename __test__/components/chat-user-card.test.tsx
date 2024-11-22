import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import { ChatUserCard } from "../../src/components/chat/chats/ChatUserCard";
import { IChat } from "../../src/interfaces/chat/chats";
import { IConnectedUser } from "../../src/interfaces/user/user";

const chat: IChat = {
  _id: "1",
  lastMessage: "Hello",
  unreadMessages: true,
  UserOneId: "1",
  UserOneName: "User1",
  UserOnePicture: "user1.jpg",
  UserTwoId: "2",
  UserTwoName: "User2",
  UserTwoPicture: "user2.jpg",
  LastSenderId: "1",
};

const currentUser: IConnectedUser = {
  token: "token",
  user: {
    id: "1",
    username: "User1",
    email: "email",
    is_artist: false,
    availability: "available",
    subscription: "subscription",
    collections: [],
  },
};

test("ChatUserCard selected undefined user undefined snapshot", () => {
  testSnapshot(
    <ChatUserCard
      chat={chat}
      currentSelected={undefined}
      currentUser={undefined}
      handleDeleteChat={() => {}}
      handleSelectChat={() => {}}
    />
  );
});

test("ChatUserCard user undefined snapshot", () => {
  testSnapshot(
    <ChatUserCard
      chat={chat}
      currentSelected={chat}
      currentUser={undefined}
      handleDeleteChat={() => {}}
      handleSelectChat={() => {}}
    />
  );
});

test("ChatUserCard selected undefined snapshot", () => {
  testSnapshot(
    <ChatUserCard
      chat={chat}
      currentSelected={undefined}
      currentUser={currentUser}
      handleDeleteChat={() => {}}
      handleSelectChat={() => {}}
    />
  );
});

test("ChatUserCard everything defined snapshot", () => {
  testSnapshot(
    <ChatUserCard
      chat={chat}
      currentSelected={chat}
      currentUser={currentUser}
      handleDeleteChat={() => {}}
      handleSelectChat={() => {}}
    />
  );
});
