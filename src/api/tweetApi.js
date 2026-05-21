const STORAGE_KEY = "toy-x-tweets";

const currentUser = {
  id: "me",
  name: "마승혜",
  handle: "@efub4th_toy",
  bio: "토이프로젝트입니다 가짜 mock 을 썼습니다",
  joinedAt: "January 2024",
  following: 0,
  followers: 0,
  avatar:
    "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=160&q=80",
};

const seedTweets = [
  {
    id: 2,
    content: "내가 작성한 글 2",
    author: currentUser.name,
    createdAt: "2024-05-11T00:55:00.000Z",
    likes: 1,
    replies: 0,
    reposts: 0,
    views: 1,
  },
  {
    id: 1,
    content: "내가 작성한 글 1",
    author: currentUser.name,
    createdAt: "2024-05-11T00:52:00.000Z",
    likes: 1,
    replies: 0,
    reposts: 0,
    views: 1,
  },
  {
    id: 3,
    content: "작성한 글 3",
    author: {
      id: "efub",
      name: "EFUB",
      handle: "@efub_toy",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
    },
    createdAt: "2024-05-10T15:20:00.000Z",
    likes: 18,
    replies: 2,
    reposts: 3,
    views: 6400,
  },
];

function wait(value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), 200);
  });
}

function readTweets() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedTweets));
    return seedTweets;
  }

  return JSON.parse(saved);
}

function writeTweets(tweets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tweets));
}

export async function getTweets() {
  return wait(readTweets());
}

export async function getTweetById(id) {
  const tweet = readTweets().find((item) => String(item.id) === String(id));
  if (!tweet) {
    throw new Error("해당 글을 찾을 수 없습니다.");
  }

  return wait(tweet);
}

export async function getMyProfile() {
  return wait(currentUser);
}

export async function createTweet(content) {
  const tweets = readTweets();
  const newTweet = {
    id: Date.now(),
    content,
    author: currentUser,
    createdAt: new Date().toISOString(),
    likes: 0,
    replies: 0,
    reposts: 0,
    views: 1,
  };

  writeTweets([newTweet, ...tweets]);
  return wait(newTweet);
}

export async function deleteTweet(id) {
  const tweets = readTweets();
  const nextTweets = tweets.filter((tweet) => String(tweet.id) !== String(id));

  if (nextTweets.length === tweets.length) {
    throw new Error("삭제할 글을 찾을 수 없습니다.");
  }

  writeTweets(nextTweets);
  return wait({ ok: true });
}
