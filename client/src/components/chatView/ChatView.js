import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../../context/chatContext";
import { sendMessageToBot } from "../../services/message.service";
import { MainSection } from "..";
import { ChatIntro } from "./ChatIntro";
import { ChatMessages } from "./ChatMessages";
import { ChatForm } from "./ChatForm";
// import DocumentUpload from "../DocumentUpload";

const ChatView = () => {
  const inputRef = useRef();
  const [formValue, setFormValue] = useState("");
  const [thinking, setThinking] = useState(false);
  const [messages, addMessage] = useContext(ChatContext);

  const options = [
    { value: "gpt4", label: "GPT-4" },
    { value: "rag", label: "RAG" },
  ];
  const [selected, setSelected] = useState(options[0].value);

  const userPicUrl = "/defualt_icon.jpg";

  const updateMessage = (formValue, ai, aiModel) => {
    const id = Date.now() + Math.floor(Math.random() * 1000000);
    const newMsg = {
      id: id,
      createdAt: Date.now(),
      text: formValue,
      ai: ai,
      selected: `${aiModel}`,
      picUrl: userPicUrl,
    };

    addMessage(newMsg);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!formValue) {
      return;
    }

    updateMessage(formValue, false, selected);
    setFormValue("");
    setThinking(true);

    const aiModel = selected;

    const { data, error } = await sendMessageToBot({
      prompt: formValue,
      aiModel: aiModel,
    });

    if (error && error.status === 429) {
      const message = "You have reached the limit for today.";
      updateMessage(message, true, aiModel);
      setThinking(false);
      return;
    }

    if (error) {
      const message = "Something went wrong. Please try again later.";
      alert(`openAI is returning an error: ${error.message}`);
      updateMessage(message, true, aiModel);
      setThinking(false);
      return;
    }

    const message = data?.bot;
    updateMessage(message, true, aiModel);

    setThinking(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <MainSection>
      {messages.length === 0 ? (
        <ChatIntro title={"GPT Chat"} setTemplateQuestion={setFormValue} />
      ) : (
        <ChatMessages
          messages={messages}
          thinking={thinking}
          picUrl={userPicUrl}
        />
      )}

      {/* <DocumentUpload /> */}

      <ChatForm
        inputRef={inputRef}
        formValue={formValue}
        setFormValue={setFormValue}
        sendMessage={sendMessage}
        options={options}
        selected={selected}
        setSelected={setSelected}
      />
    </MainSection>
  );
};

export default ChatView;
