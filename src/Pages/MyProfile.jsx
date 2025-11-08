import React, { use, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import { auth } from "../Firebase/Firebase.init";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { user, setUser } = use(AuthContext);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(" ");
  const [photo, setPhoto] = useState(" ");

  const handleUpdate = (e) => {
    e.preventDefault();

    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
      .then(() => {
        toast.success("Profile updated successfully!");
        setUser({ ...user, displayName: name, photoURL: photo });
        setEditing(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-5">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <img
          src={
            user?.photoURL ||
            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          }
          alt="User Avatar"
          className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-[#6366f1]"
        />

        {!editing ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {user?.displayName || "No Name Found"}
            </h2>
            <p className="text-gray-600 mb-4">
              {user?.email || "No Email Found"}
            </p>

            <button
              onClick={() => setEditing(true)}
              className="btn btn-primary w-full mt-4"
            >
              Update Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleUpdate} className="text-left">
            <label className="block mb-2 font-semibold">Full Name</label>
            <input
              type="text"
              className="input input-bordered w-full mb-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="block mb-2 font-semibold">Photo URL</label>
            <input
              type="text"
              className="input input-bordered w-full mb-4"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            />

            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary flex-1">
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-outline flex-1"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
