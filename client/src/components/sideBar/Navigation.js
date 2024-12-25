import React, { useContext } from "react";
import { NavLink } from "./NavLink";
import { ChatContext } from "../../context/chatContext";
import { ThemeToggleButton } from "../buttons";
import { ReactComponent as PlusIcon } from "../../assets/plus-icon.svg";
import { ReactComponent as ExternalLinkIcon } from "../../assets/external-link-icon.svg";
import DocumentUpload from "../buttons/DocumentUpload";

const Navigation = () => {
  const [, , clearMessages] = useContext(ChatContext);

  const clearChat = () => clearMessages();

  return (
    <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
      <div
        className="flex-col flex-1 overflow-y-auto border-b border-white/20"
        onClick={clearChat}
      >
        <NavLink to="#" icon={<PlusIcon />} text="New chat" type={"nav"} />
      </div>
      <ThemeToggleButton />
      <DocumentUpload />
      <div className="flex-col flex-1 overflow-y-auto border-b border-white/20">
        <NavLink
          to="#"
          icon={<ExternalLinkIcon />}
          text="Update & FAQ"
          type={"nav"}
        />
      </div>
    </nav>
  );
};

export default Navigation;
