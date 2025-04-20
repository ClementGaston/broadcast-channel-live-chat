import Chat from "./components/Chat";
import { useProfile } from "./context/profileContext";
import useBroadcastChannelChat from "./utils/useBroadcastChannelChat";

function App() {
	const { profileStatus } = useProfile();
	const [bc_messages, bc_sendMessage] = useBroadcastChannelChat();

	// Loading
	if (profileStatus.loading)
		return (
			<div className="w-screen h-screen flex justify-center items-center">
				<span className="loading loading-ring loading-xl text-primary"></span>
			</div>
		);

	// Error
	if (profileStatus.loading && !profileStatus.fetched)
		return (
			<div className="w-screen h-screen flex justify-center items-center">
				<div>Something went wrong, please contact the repo owner.</div>
			</div>
		);

	// Chat interface
	return (
		<div className="w-screen h-screen p-8 flex flex-col gap-8 overflow-hidden">
			<h1 className="text-3xl underline text-center font-semibold">Broadcast Channel Chat</h1>
			<Chat messages={bc_messages} sendMessage={bc_sendMessage} />
		</div>
	);
}

export default App;
