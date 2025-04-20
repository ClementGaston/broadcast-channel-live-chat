import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ProfileProvider } from "./context/profileContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ProfileProvider>
			<App />
		</ProfileProvider>
	</StrictMode>,
);
