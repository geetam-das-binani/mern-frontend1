import React, { Fragment, useEffect, useState } from "react";
import Metadata from "../layout/Metadata";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../layout/loader/Loader";
import {  useDispatch, useSelector } from "react-redux";
import './Profile.css'
import { loadUser } from "../../actions/userActions";
export default function Profile() {
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const { user, isAuthenticatedUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (isAuthenticatedUser === false) {
      navigate("/login");
    }
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  
  }, [loading]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={`${user.name}'s Profile`} />
          <div className="profile__container">
            <div>
              <h1>My Profile</h1>
              <img src={user.avatar.url} alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).slice(0, 10)}</p>
              </div>
              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
