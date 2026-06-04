import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTweetById } from "../api/tweetApi";
import "./TweetDetail.css";

function formatDetailDate(isoString) {
  return new Date(isoString).toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function TweetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tweet, setTweet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTweet() {
      try {
        setLoading(true);
        setError(null);
        const data = await getTweetById(id);
        setTweet(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTweet();
  }, [id]);

  if (loading) return <p className="detail-status">불러오는 중...</p>;
  if (error) return <p className="detail-status error">에러: {error}</p>;
  if (!tweet) return null;

  return (
    <div className="detail-page">
      <header className="detail-header">
        <button className="back-btn" onClick={() => navigate(-1)} type="button">
          ←
        </button>
        <h2>Post</h2>
      </header>

      <article className="detail-body">
        <div className="detail-author-row">
          <img
            className="detail-avatar"
            src={tweet.author.avatar}
            alt={`${tweet.author.name} avatar`}
          />
          <div className="detail-author-info">
            <strong>{tweet.author.name}</strong>
            <span>{tweet.author.handle}</span>
          </div>
          <button className="detail-more" type="button" aria-label="more">
            ...
          </button>
        </div>

        <p className="detail-content">{tweet.content}</p>
        <button className="translate-btn" type="button">
          Translate post
        </button>
        <p className="detail-date">{formatDetailDate(tweet.createdAt)}</p>

        <div className="detail-divider" />
        <p className="engagements">View post engagements</p>
        <div className="detail-divider" />

        <div className="detail-actions">
          <button type="button">○</button>
          <button type="button">↻</button>
          <button type="button">♡</button>
          <button type="button">▱</button>
          <button type="button">↗</button>
        </div>

        <div className="detail-divider" />

        <div className="detail-reply">
          <img
            className="detail-avatar small"
            src={tweet.author.avatar}
            alt=""
          />
          <input className="reply-input" placeholder="Post your reply" disabled />
          <button className="reply-btn" disabled type="button">
            Reply
          </button>
        </div>
      </article>
    </div>
  );
}
