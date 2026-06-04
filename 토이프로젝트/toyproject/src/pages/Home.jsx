import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTweet, deleteTweet, getTweets } from "../api/tweetApi";
import DeleteModal from "../components/DeleteModal";
import TweetCard from "../components/TweetCard";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [tweets, setTweets] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  useEffect(() => {
    fetchTweets();
  }, []);

  async function fetchTweets() {
    try {
      setLoading(true);
      setError(null);
      const data = await getTweets();
      setTweets(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handlePost() {
    if (!content.trim()) return;

    try {
      const newTweet = await createTweet(content.trim());
      setTweets((prevTweets) => [newTweet, ...prevTweets]);
      setContent("");
    } catch (err) {
      alert("글 작성에 실패했어요. " + err.message);
    }
  }

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

  return (
    <div className="home-page">
      <header className="home-header">
        <button className="feed-tab active" type="button">
          For you
        </button>
        <button className="feed-tab" type="button">
          Following
        </button>
      </header>

      <section className="composer" aria-label="write post">
        <img
          className="composer-avatar"
          src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=120&q=80"
          alt="마승혜 avatar"
        />
        <div className="composer-body">
          <textarea
            className="composer-input"
            placeholder="What is happening?!"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={2}
          />
          <div className="composer-footer">
            <div className="composer-tools" aria-hidden="true">
              <span>▧</span>
              <span>GIF</span>
              <span>☻</span>
              <span>⌖</span>
            </div>
            <button
              className="post-tweet-btn"
              onClick={handlePost}
              disabled={!content.trim()}
              type="button"
            >
              Post
            </button>
          </div>
        </div>
      </section>

      {loading && <p className="status-msg">불러오는 중...</p>}
      {error && <p className="status-msg error">에러: {error}</p>}
      {!loading && !error && tweets.length === 0 && (
        <p className="status-msg">아직 작성된 글이 없어요.</p>
      )}

      {!loading &&
        !error &&
        tweets.map((tweet) => (
          <TweetCard
            key={tweet.id}
            tweet={tweet}
            onDelete={setDeleteTargetId}
            onClick={(id) => navigate(`/tweets/${id}`)}
          />
        ))}

      {deleteTargetId !== null && (
        <DeleteModal
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTargetId(null)}
        />
      )}
    </div>
  );
}
