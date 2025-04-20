import { FormEvent, useRef } from "react";
import ChatBubble, { Message } from "./ChatBubble";

interface Props {
	messages: Message[];
	sendMessage: (content: string) => void;
}

function Chat({ messages, sendMessage }: Props) {
	const inputRef = useRef<HTMLInputElement>(null);

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!inputRef.current?.value) return;

		sendMessage(inputRef.current.value);
		inputRef.current.value = "";
	}

	return (
		<>
			<div className="flex-auto overflow-y-auto">
				{/* MAIN CONTENT */}
				{messages.map((msg) => (
					<ChatBubble message={msg} key={msg.id} />
				))}
			</div>

			{/* FOOTER MESSAGE INPUT */}
			<form className="w-full flex gap-4" onSubmit={handleSubmit}>
				<input type="text" placeholder="Type your message here" maxLength={255} className="input flex-auto" ref={inputRef} />
				<button type="submit" className="btn">
					Send Message
				</button>
			</form>
		</>
	);
}

export default Chat;
