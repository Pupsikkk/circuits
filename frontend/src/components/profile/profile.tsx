import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../context";
import { UserService } from "../../API/user.service";
import cl from "./profile.module.css";
import { FileService } from "../../API/file.service";

const ProfilePage = () => {
  const { authData, setAuthData } = useContext<any>(AuthContext);
  const [profile, setProfile] = useState(authData?.profile || null);

  const handleChangeAvatar = async (e: any) => {
    e.preventDefault();
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();

    fileInput.onchange = async (event: any) => {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        const newUrl = await FileService.uploadImage(formData);
        const updatedProfile = await UserService.updateProfile(authData.token, {
          avatar: newUrl,
        });

        setProfile(updatedProfile);
        setAuthData({ ...authData, profile: updatedProfile });
      } catch (error) {
        console.error("Error while uploading avatar:", error);
      }
    };
  };

  const handleProfileUpdate = async (e: any) => {
    e.preventDefault();

    try {
      const updatedProfile = await UserService.updateProfile(
        authData.token,
        profile
      );

      setAuthData({ ...authData, profile: updatedProfile });
    } catch (err) {}
  };

  return (
    <div className={cl.containerWrapper}>
      <div className={cl.profileInfo}>
        <img className={cl.avatar} src={profile?.avatar} alt="User Avatar" />
        <button
          className={cl.changeAvatarButton}
          onClick={(e) => handleChangeAvatar(e)}
        >
          Change Avatar
        </button>
      </div>
      <form className={cl.profileForm}>
        <input
          className={cl.input}
          type="text"
          placeholder="First Name"
          value={profile?.firstName || ""}
          onChange={(e) => {
            setProfile({ ...profile, firstName: e.target.value });
          }}
        />
        <input
          className={cl.input}
          type="text"
          placeholder="Last Name"
          value={profile?.lastName || ""}
          onChange={(e) => {
            setProfile({ ...profile, lastName: e.target.value });
          }}
        />
        <input
          className={cl.input}
          type="email"
          placeholder="Email"
          value={profile?.email || ""}
          onChange={(e) => {
            setProfile({ ...profile, email: e.target.value });
          }}
        />
        <textarea
          className={cl.textarea}
          placeholder="Description"
          value={profile?.description || ""}
          onChange={(e) => {
            setProfile({ ...profile, description: e.target.value });
          }}
        ></textarea>
        <input
          className={cl.input}
          type="text"
          placeholder="City"
          value={profile?.city || ""}
          onChange={(e) => {
            setProfile({ ...profile, city: e.target.value });
          }}
        />
        <input
          className={cl.input}
          type="text"
          placeholder="Country"
          value={profile?.country || ""}
          onChange={(e) => {
            setProfile({ ...profile, country: e.target.value });
          }}
        />
        <input
          className={cl.input}
          type="tel"
          placeholder="Phone"
          value={profile?.phone || ""}
          onChange={(e) => {
            setProfile({ ...profile, phone: e.target.value });
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            className={cl.changeAvatarButton}
            onClick={(e) => handleProfileUpdate(e)}
          >
            Зберегти
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
