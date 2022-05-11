import React from "react";
import { useState, useEffect } from "react";
import { PostList } from "./components/PostList";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AddPost } from "./components/AddPost";
import api from "./utils/api";
import { Routes, Route, Link } from "react-router-dom";
import { PostPage } from "./components/PostPage";
import { EditPost } from "./components/EditPost";
import PostContext from "./components/Contexts/postContext";
import UserContext from "./components/Contexts/userContext";

function App() {
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [like, setLike] = useState(JSON.parse(localStorage.getItem("likes")));

  useEffect(() => {
    api.getPosts().then((result) => {
      setPosts(result.reverse());
    });
  }, []);

  useEffect(() => {
    api.getUserInfo().then((result) => {
      setUserInfo(result);
    });
  }, []);

  return (
    <div>
      <PostContext.Provider value={{ posts, setPosts }}>
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
          <Header userInfo={userInfo} />
      
        <Routes>
          <Route
            path="/"
            element={<div>
              
              <PostList
                mapPosts={posts}
                like={like}
                setLike={setLike}
                userInfo={userInfo}
              />
              </div>
            }
          />
          <Route path="create" element={<AddPost />} />
          <Route path="posts/:postID" element={<PostPage />} />
          <Route path="posts/:postID/edit" element={<EditPost />} />
        </Routes>

      <Footer />
        </UserContext.Provider>
      </PostContext.Provider>
    </div>
  );
}

export default App;
