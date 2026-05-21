import "./TweetCard.css";


function formatTime(createdAt) {
  const diff = Date.now() - new Date(createdAt).getTime();
  const minutes = Math.max(1, Math.floor(diff / 60000));

  if (minutes < 60) return `${minutes}m`;
  if (minutes < 60 * 24) return `${Math.floor(minutes / 60)}h`;
  return `${Math.floor(minutes / 60 / 24)}d`;
}

function formatCount(value) {
  if (!value) return "";
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value;
}

export default function TweetCard({ tweet, onDelete, onClick }) {
  function handleDeleteClick(event) {
    event.stopPropagation();
    onDelete(tweet.id);
  }

  return (
    <article className="tweet-card" onClick={() => onClick(tweet.id)}>
      <img
        className="tweet-avatar"
        src={tweet.author.avatar}
        alt={`${tweet.author.name} avatar`}
      />

      <div className="tweet-body">
        <div className="tweet-topline">
          <div className="tweet-author">
            <strong>{tweet.author.name}</strong>
            <span>{tweet.author.handle}</span>
            <span>·</span>
            <span>{formatTime(tweet.createdAt)}</span>
          </div>
          <button
            className="tweet-more"
            onClick={handleDeleteClick}
            type="button"
            aria-label="delete post"
          >
            ...
          </button>
        </div>

        <p className="tweet-content">{tweet.content}</p>

        <div className="tweet-actions" aria-label="post actions">
          <button type="button">○ <span>{formatCount(tweet.replies)}</span></button>
          <button type="button">↻ <span>{formatCount(tweet.reposts)}</span></button>
          <button type="button">♡ <span>{formatCount(tweet.likes)}</span></button>
          <button type="button">▥ <span>{formatCount(tweet.views)}</span></button>
          <button type="button">↗</button>
        </div>
      </div>
    </article>
  );
}