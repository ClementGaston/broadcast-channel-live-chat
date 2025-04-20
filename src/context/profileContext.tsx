import { createContext, useContext, ReactNode } from "react";
import useRandomProfile, { ProfileStatus } from "../utils/useRandomProfile";

export interface Profile {
	id: string;
	name: string;
	picture: string;
}

interface ProfileContextType {
	profile: Profile;
	profileStatus: ProfileStatus;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
	const [profile, profileStatus] = useRandomProfile();

	return <ProfileContext.Provider value={{ profile, profileStatus }}>{children}</ProfileContext.Provider>;
};

export const useProfile = (): ProfileContextType => {
	const context = useContext(ProfileContext);
	if (!context) {
		throw new Error("useProfile must be used within a ProfileProvider");
	}
	return context;
};
