import { HiPlusCircle } from "react-icons/hi";

function ProfileButton({ profile, handleSelectProfile }) {
    return (
        <div
            onClick={() => handleSelectProfile(profile)}
            className="group p-2 w-[10vw] text-center text-light-100 hover:text-light-900 cursor-pointer"
        >
            <div className="relative pt-[100%] w-full rounded overflow-hidden">
                {profile.avatarUrl && (
                    <img
                        src={profile.avatarUrl}
                        alt={profile.name}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}
                {profile.id > 4 && (
                    <div className="absolute inset-0 flex items-center justify-center text-[8vw] group-hover:bg-dark-100">
                        <HiPlusCircle />
                    </div>
                )}

                <div className="absolute inset-0 bg-transparent border-[0.25vw] border-transparent group-hover:border-light-900"></div>
            </div>
            <p className="py-2 capitalize w-full text-[1.25vw] font-normal group-hover:underline">{profile.name}</p>
        </div>
    );
}

export default ProfileButton;
