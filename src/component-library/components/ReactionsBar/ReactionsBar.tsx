import { useSendMessage } from "@xmtp/react-sdk";
import type { CachedMessageWithId, CachedConversation } from "@xmtp/react-sdk";
import { useCallback } from "react";
import {
  ContentTypeReaction,
  type Reaction,
} from "@xmtp/content-type-reaction";
import { useTranslation } from "react-i18next";
import styles from "./ReactionsBar.module.css";
import { useXmtpStore } from "../../../store/xmtp";
import { classNames } from "../../../helpers";

export type ReactionsBarProps = {
  conversation: CachedConversation;
  message: CachedMessageWithId;
  setOnHover: (hover: boolean) => void;
};

const availableReactionEmojis = ["👍", "👎", "❤️"];

export const ReactionsBar: React.FC<ReactionsBarProps> = ({
  conversation,
  message,
  setOnHover,
}) => {
  const { sendMessage } = useSendMessage();

  // For replies
  const activeMessage = useXmtpStore((state) => state.activeMessage);
  const setActiveMessage = useXmtpStore((state) => state.setActiveMessage);
  const { t } = useTranslation();

  const handleClick = useCallback(
    (emoji: string) => {
      void sendMessage<Reaction>(
        conversation,
        {
          content: emoji,
          schema: "unicode",
          reference: message.xmtpID,
          action: "added",
        },
        ContentTypeReaction,
      );
      setOnHover(false);
    },
    [conversation, sendMessage, setOnHover, message],
  );

  return (
    <div className="flex items-center gap-1">
      <div
        className={classNames(`${styles.wrapper} bg-zinc-700`)}
        data-testid="reactions-bar">
        {availableReactionEmojis.map((emoji) => (
          <button
            type="button"
            data-testid="reaction"
            key={emoji}
            className={styles.option}
            onClick={() => handleClick(emoji)}>
            <span className={styles.emoji}>{emoji}</span>
          </button>
        ))}
      </div>
      {!activeMessage ? (
        <button
          className="bg-zinc-700 p-1 px-2 rounded-lg"
          data-testid="reply-icon"
          onClick={() => {
            setActiveMessage(message);
          }}
          type="button">
          {t("messages.reply")}
        </button>
      ) : null}
    </div>
  );
};
