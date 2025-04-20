import { useProfile } from "../context/profileContext";

export interface Message {
	id: string;
	type: "message" | "status";
	from: {
		id: string;
		name: string;
		picture: string;
	};
	content: string;
	timestamp: Date;
}

interface Props {
	message: Message;
}

function ChatBubble({ message }: Props) {
	const {
		profile: { id: currentUserId },
	} = useProfile();
	const isFromCurrentUser = message.from.id === currentUserId;

	return (
		<>
			<div className={`chat ${isFromCurrentUser ? "chat-end" : "chat-start"}`}>
				<div className="chat-image avatar">
					<div className="w-10 rounded-full">
						<img alt="Tailwind CSS chat bubble component" src={message.from.picture} />
					</div>
				</div>
				<div className="chat-header">
					{message.from.name}
					<time className="text-xs opacity-50">{message.timestamp.toLocaleTimeString()}</time>
				</div>
				<div
					className={`chat-bubble ${isFromCurrentUser && message.type !== "status" ? "chat-bubble-accent" : ""} ${
						message.type === "status" ? "bg-transparent pl-0" : ""
					}`}
				>
					{message.content}
				</div>
			</div>
		</>
	);
}

export default ChatBubble;
