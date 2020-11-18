import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");
  const { currentUser, logout, getProfilePicture } = useAuth();
  const history = useHistory();

  async function getImage() {
    try {
      const image = await getProfilePicture();
      console.log(image.data().profilePicture);
      setUrl(image.data().profilePicture);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getImage();
  }, []);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="text-center mb-4">
          <img height="100px" width="100px" src={url}/>
          </div>
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
