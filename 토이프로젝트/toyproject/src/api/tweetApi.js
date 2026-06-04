const BASE_URL = "https://api.efub6-toyproject3.p-e.kr";
const DEFAULT_USER_ID = 1;
const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=160&q=80";

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function normalizeUser(user) {
  return {
    id: user.userId ?? user.id ?? DEFAULT_USER_ID,
    name: user.name ?? "마승혜",
    handle: user.handle?.startsWith("@") ? user.handle : `@${user.handle ?? "efub4th_toy"}`,
    bio: user.bio ?? "",
    avatar: user.profileImageUrl || user.avatar || DEFAULT_AVATAR,
    joinedAt: user.createdAt
      ? new Date(user.createdAt).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })
      : "January 2024",
    following: user.following ?? 0,
    followers: user.followers ?? 0,
  };
}

function normalizeTweet(tweet) {
  const authorSource = tweet.author ?? tweet.user ?? {};
  const author = normalizeUser({
    userId: tweet.userId ?? authorSource.userId ?? authorSource.id,
    name: tweet.name ?? authorSource.name,
    handle: tweet.handle ?? authorSource.handle,
    bio: authorSource.bio,
    profileImageUrl: tweet.profileImageUrl ?? authorSource.profileImageUrl,
    createdAt: authorSource.createdAt,
  });

  return {
    id: tweet.tweetId ?? tweet.id,
    content: tweet.content ?? tweet.text ?? "",
    author,
    createdAt: tweet.createdAt ?? tweet.created_at ?? new Date().toISOString(),
    likes: tweet.likes ?? tweet.likeCount ?? 0,
    replies: tweet.replies ?? tweet.replyCount ?? 0,
    reposts: tweet.reposts ?? tweet.repostCount ?? 0,
    views: tweet.views ?? tweet.viewCount ?? 0,
  };
}

export async function getTweets() {
  const tweets = await request("/tweets");
  return Array.isArray(tweets) ? tweets.map(normalizeTweet) : [];
}

export async function getTweetById(id) {
  const tweet = await request(`/tweets/${id}`);
  return normalizeTweet(tweet);
}

export async function getMyProfile() {
  const user = await request(`/users/${DEFAULT_USER_ID}`);
  return normalizeUser(user);
}

export async function createTweet(content) {
  const tweet = await request("/tweets", {
    method: "POST",
    body: JSON.stringify({
      content,
      userId: DEFAULT_USER_ID,
    }),
  });

  return normalizeTweet(tweet);
}

export async function deleteTweet(id) {
  await request(`/tweets/${id}`, {
    method: "DELETE",
  });
}
