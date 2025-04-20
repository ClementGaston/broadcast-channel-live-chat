import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { useProfile } from "../context/profileContext";
import { Message } from "../components/ChatBubble";

function useLocalStorageChat(): [Message[], (content: string) => void] {
	const { profile } = useProfile();
	const [messages, setMessage] = useState<Message[]>([]);
	const hasSetupEvents = useRef(false);
	const hasSetupProfile = useRef(false);

	// Use effect to setup both event listener
	useEffect(() => {
		if (hasSetupEvents.current) return;
		hasSetupEvents.current = true;

		window.addEventListener("storage", (e) => {
			console.log(e);
			const newValue = JSON.parse(e.newValue || "{}") as Message;
			newValue.timestamp = new Date(newValue.timestamp);
			setMessage((msgs) => [...msgs, newValue]);
		});
	}, []);

	function sendDisconnectMessage() {
		sendMessage("Left the channel.", "status");
	}

	useEffect(() => {
		if (!profile.id) return;
		if (hasSetupProfile.current) return;
		hasSetupProfile.current = true;

		sendMessage("Joined the channel.", "status");
		window.addEventListener("beforeunload", sendDisconnectMessage);

		return () => {
			window.removeEventListener("beforeunload", sendDisconnectMessage);
		};
	}, [profile]);

	function sendMessage(content: string, type: "message" | "status" = "message") {
		const newMessage: Message = {
			id: uuid(),
			type,
			from: {
				id: profile.id,
				name: profile.name,
				picture: profile.picture,
			},
			content,
			timestamp: new Date(),
		};

		localStorage.setItem("message", JSON.stringify(newMessage));
		setMessage((msgs) => [...msgs, newMessage]);
	}

	return [messages, sendMessage];
}

export default useLocalStorageChat;
