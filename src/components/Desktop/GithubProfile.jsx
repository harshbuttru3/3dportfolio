import React, { useEffect, useState } from "react";

const GITHUB_USERNAME = "harshbuttru3";
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;

const GitHubProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(GITHUB_API_URL)
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#64FFDA" }}>
        Loading GitHub profile...
      </div>
    );
  }

  if (!profile || profile.message === "Not Found") {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#ff5555" }}>
        GitHub profile not found.
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "Inter, 'JetBrains Mono', monospace",
        background: "#0d111708",
        color: "#c9d1d9",
        padding: "2rem",
        borderRadius: "12px",
        minHeight: "100%",
        minWidth: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <a
        href={profile.html_url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", color: "#64FFDA" }}
      >
        <img
          src={profile.avatar_url}
          alt={profile.login}
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            border: "3px solid #30363d",
            marginBottom: "1rem"
          }}
        />
      </a>
      <h2 style={{ margin: 0, fontWeight: 700, fontSize: "2rem" }}>
        {profile.name || profile.login}
      </h2>
      <a
        href={profile.html_url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "#64FFDA",
          fontSize: "1.1rem",
          marginBottom: "0.5rem",
          textDecoration: "none"
        }}
      >
        @{profile.login}
      </a>
      {profile.bio && (
        <p style={{ margin: "0.5rem 0 1rem 0", color: "#8b949e", textAlign: "center" }}>
          {profile.bio}
        </p>
      )}
      <div style={{ display: "flex", gap: "2rem", marginBottom: "1rem" }}>
        <div>
          <strong>{profile.public_repos}</strong>
          <span style={{ color: "#8b949e" }}> Repos</span>
        </div>
        <div>
          <strong>{profile.followers}</strong>
          <span style={{ color: "#8b949e" }}> Followers</span>
        </div>
        <div>
          <strong>{profile.following}</strong>
          <span style={{ color: "#8b949e" }}> Following</span>
        </div>
      </div>
      {profile.location && (
        <div style={{ color: "#8b949e", marginBottom: "0.5rem" }}>
          <span role="img" aria-label="Location">📍</span> {profile.location}
        </div>
      )}
      {profile.blog && (
        <div style={{ marginBottom: "0.5rem" }}>
          <a
            href={profile.blog.startsWith("http") ? profile.blog : `https://${profile.blog}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#64FFDA" }}
          >
            {profile.blog}
          </a>
        </div>
      )}
      {profile.company && (
        <div style={{ color: "#8b949e", marginBottom: "0.5rem" }}>
          <span role="img" aria-label="Company">🏢</span> {profile.company}
        </div>
      )}
      <div style={{ marginTop: "1.5rem" }}>
        <a
          href={profile.html_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "#238636",
            color: "#fff",
            padding: "0.5rem 1.5rem",
            borderRadius: "6px",
            fontWeight: 600,
            textDecoration: "none",
            fontSize: "1rem"
          }}
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
};

export default GitHubProfile;