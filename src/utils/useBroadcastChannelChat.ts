import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { useProfile } from "../context/profileContext";
import { Message } from "../components/ChatBubble";

function useBroadcastChannelChat(): [Message[], (content: string) => void] {
	const { profile } = useProfile();
	const [messages, setMessage] = useState<Message[]>([]);
	const bc = useRef<BroadcastChannel>(new BroadcastChannel("test_channel"));
	const hasSetupEvents = useRef(false);
	const hasSetupProfile = useRef(false);

	// Use effect to setup both event listener
	useEffect(() => {
		if (hasSetupEvents.current) return;
		hasSetupEvents.current = true;

		bc.current.onmessage = (event) => {
			console.log("Broadcast Channel Event:", event.data);
			setMessage((msgs) => [...msgs, event.data]);
		};
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

		bc.current.postMessage(newMessage);
		setMessage((msgs) => [...msgs, newMessage]);
	}

	return [messages, sendMessage];
}

export default useBroadcastChannelChat;
