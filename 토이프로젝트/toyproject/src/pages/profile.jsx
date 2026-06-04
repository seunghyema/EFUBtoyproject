import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteTweet, getMyProfile, getTweets } from "../api/tweetApi";
import DeleteModal from "../components/DeleteModal";
import TweetCard from "../components/TweetCard";
import "./profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  useEffect(() => {
    async function fetchAll() {
      try {
        setLoading(true);
        setError(null);
        const [userData, tweetsData] = await Promise.all([
          getMyProfile(),
          getTweets(),
        ]);

        setUser(userData);
        setTweets(
          tweetsData.filter((tweet) => tweet.author.id === userData.id)
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  async function handleDeleteConfirm() {
    try {
      await deleteTweet(deleteTargetId);
      setTweets((prevTweets) =>
        prevTweets.filter((tweet) => tweet.id !== deleteTargetId)
      );
    } catch (err) {
      alert("삭제에 실패했어요. " + err.message);
    } finally {
      setDeleteTargetId(null);
    }
  }

  if (loading) return <p className="profile-status">불러오는 중...</p>;
  if (error) return <p className="profile-status error">에러: {error}</p>;
  if (!user) return null;

  return (
    <div className="profile-page">
      <header className="profile-header">
        <button className="profile-back" onClick={() => navigate(-1)} type="button">
          ←
        </button>
        <div>
          <h2>{user.name}</h2>
          <span>{tweets.length} posts</span>
        </div>
      </header>

      <div className="profile-banner" />

      <section className="profile-top-row">
        <img
          className="profile-avatar"
          src={user.avatar}
          alt={`${user.name} avatar`}
        />
        <button className="edit-profile-btn" type="button">
          Edit profile
        </button>
      </section>

      <section className="profile-info">
        <h1>{user.name}</h1>
        <p className="profile-handle">{user.handle}</p>
        <p className="profile-bio">{user.bio}</p>
        <p className="profile-joined">▣ Joined {user.joinedAt}</p>
        <div className="profile-follow-counts">
          <span>
            <strong>{user.following}</strong> Following
          </span>
          <span>
            <strong>{user.followers}</strong> Followers
          </span>
        </div>
      </section>

      <nav className="profile-tabs" aria-label="profile tabs">
        {["Posts", "Replies", "Highlights", "Articles", "Media", "Likes"].map(
          (tab) => (
            <button
              key={tab}
              className={`profile-tab ${tab === "Posts" ? "active" : ""}`}
              disabled={tab !== "Posts"}
              type="button"
            >
              {tab}
            </button>
          )
        )}
      </nav>

      {tweets.length === 0 ? (
        <p className="profile-status">아직 작성한 글이 없어요.</p>
      ) : (
        tweets.map((tweet) => (
          <TweetCard
            key={tweet.id}
            tweet={tweet}
            onDelete={setDeleteTargetId}
            onClick={(id) => navigate(`/tweets/${id}`)}
          />
        ))
      )}

      {deleteTargetId !== null && (
        <DeleteModal
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTargetId(null)}
        />
      )}
    </div>
  );
}
