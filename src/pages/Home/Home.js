import { useNavigate } from "react-router-dom";
import kidsAvatar from "~/assets/images/netflix_kids.png";
import profileImage3 from "~/assets/images/profile_image_3.png";
import ProfileButton from "~/components/partial/ProfileButton/ProfileButton";
import HorizontalButton from "~/components/shared/buttons/HorizontalButton";
// redux
import { connect } from "react-redux";
import { selectProfileAction } from "~/redux/actions/userActions";

function Home({ selectProfileAction }) {
    const listProfiles = [
        {
            id: 0,
            key: "default",
            name: "Netflix Member",
            avatarUrl: profileImage3,
        },
        {
            id: 4,
            key: "kids",
            name: "kids",
            avatarUrl: kidsAvatar,
        },
        {
            id: 5,
            name: "add profile",
        },
    ];
    const navigate = useNavigate();

    const handleSelectProfile = (profile) => {
        if (profile.id < 5) {
            selectProfileAction(profile);
            navigate("/browse");
        }
    };

    return (
        <div className="bg-dark-900 h-screen flex flex-col items-center justify-center overflow-hidden">
            <h2 className="text-[3vw] text-light-900">Who's watching?</h2>
            <ul className="flex my-[1vw] list-none gap-x-[1vw]">
                {listProfiles.map((item, index) => (
                    <li key={index}>
                        <ProfileButton profile={item} handleSelectProfile={handleSelectProfile} />
                    </li>
                ))}
            </ul>
            <HorizontalButton theme={"transparent"} border>
                Manage profile
            </HorizontalButton>
        </div>
    );
}

const mapStateToProps = (state) => ({
    //
});

const mapDispatchToProps = (dispatch) => ({
    selectProfileAction: (profile) => dispatch(selectProfileAction(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
