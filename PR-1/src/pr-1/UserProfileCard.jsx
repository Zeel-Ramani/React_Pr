import { Component } from "react";

class UserProfileCard extends Component {
    render() {

        let { name, email, profilePicture, phone, address, skills, bio } = this.props;

        return (
            <div>
                <div>
                    <div className="card">
                        <img src={profilePicture} alt="Profile" className="profile-img" />
                        <h2 className="name">{name}</h2>

                        <div className="roles">
                            <span className="role1">{email}</span>
                            <img src="https://img.icons8.com/color/48/mac-os.png" alt="dot" className="center-icon" />
                            <span className="role2">{phone}</span>
                        </div>

                        <p className="skills">{skills}</p>

                        <p className="info">{address}</p>

                        <p className="bio">{bio}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserProfileCard;