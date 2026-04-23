import React from 'react';

const Profile = () => {
  return (
    <div className="profile">
      <h2>User Profile</h2>
      <div className="profile-info">
        <img src="profile_picture_url.jpg" alt="Profile" className="profile-pic" />
        <div>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> john@example.com</p>
        </div>
      </div>
      <button>Edit Profile</button>
    </div>
  );
};

export default Profile;
