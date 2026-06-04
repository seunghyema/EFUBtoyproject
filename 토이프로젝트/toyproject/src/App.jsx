import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Profile from "./pages/profile";
import TweetDetail from "./pages/TweetDetail";
import "./App.css";

function App() {
  const trends = [
    ["Music · Trending", "싱크로유", "12.7K posts"],
    ["Trending in South Korea", "티켓 양도", "3,871 posts"],
    ["Music · Trending", "#스트레이키즈", "223K posts"],
    ["Trending in Seoul", "한요셉", "10.1K posts"],
    ["Korean music · Trending", "도경수 노래", "14.8K posts"],
  ];

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tweets/:id" element={<TweetDetail />} />
          </Routes>
        </main>

        <aside className="right-rail" aria-label="timeline sidebar">
          <div className="search-box">Search</div>
          <section className="rail-card">
            <h2>Subscribe to Premium</h2>
            <p>Subscribe to unlock new features and receive a share of ads revenue.</p>
            <button type="button">Subscribe</button>
          </section>
          <section className="rail-card trends">
            <h2>Trends for you</h2>
            {trends.map(([category, title, count]) => (
              <div className="trend-item" key={title}>
                <span>{category}</span>
                <strong>{title}</strong>
                <span>{count}</span>
              </div>
            ))}
          </section>
        </aside>
      </div>
    </BrowserRouter>
  );
}

export default App;
