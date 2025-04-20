import { useEffect, useRef, useState } from "react";

export interface Profile {
	id: string;
	name: string;
	picture: string;
}

export interface ProfileStatus {
	loading: boolean;
	fetched: boolean;
}

interface RandomUserApiResponse {
	results: Array<{
		login: { uuid: string };
		name: { first: string; last: string };
		picture: { thumbnail: string };
	}>;
}

async function getData(url: string): Promise<RandomUserApiResponse> {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Response status: ${response.status}`);
	}

	return response.json();
}

function useRandomProfile(): [Profile, ProfileStatus] {
	const hasFetched = useRef(false);
	const [profileStatus, setProfileStatus] = useState<ProfileStatus>({
		fetched: false,
		loading: true,
	});
	const [profile, setProfile] = useState<Profile>({
		id: "",
		name: "",
		picture: "",
	});

	useEffect(() => {
		if (hasFetched.current) return;
		hasFetched.current = true;

		getData("https://randomuser.me/api/")
			.then((data) => {
				const fetchedProfile = data.results[0];
				setProfile({
					id: fetchedProfile.login.uuid,
					name: `${fetchedProfile.name.first} ${fetchedProfile.name.last}`,
					picture: fetchedProfile.picture.thumbnail,
				});
				setProfileStatus({ fetched: true, loading: false });
			})
			.catch((err) => {
				console.error(err);
				setProfileStatus({ fetched: false, loading: false });
			});
	}, []);

	return [profile, profileStatus];
}

export default useRandomProfile;
