import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import EditPost from "./EditPost";
import About from "./About";
import Missing from "./Missing";
import Layout from "./Layout";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from 'date-fns';
import api from './api/posts'
import useWindowSize from "./hooks/useWindowSize";
import useAxiosFetch from "./hooks/useAxiosFetch";

function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('');
  const [searchResults, setsearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();
  const { width } = useWindowSize();
  
  //custom hook useAxiosFetch
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts')

  useEffect(() => {
    setPosts(data);
  }, [data])


  // //READ: only on loadtime so empty array dependency
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get('/posts');//axios no need to take JSON and parse to an object unlike fetchAPI
  //       setPosts(response.data);//axios will catch err below 200
  //     } catch (err) {
  //       //not in the 200 response range
  //       if (err.response) {
  //         // Not in the 200 response range 
  //         console.log(err.response.data);
  //         console.log(err.response.status);
  //         console.log(err.response.headers);
  //       } else {
  //         console.log(`Error: ${err.message}`);
  //       }
  //     }
  //   }

  //   fetchPosts();
  // },[])

  //search func to display posts using useEffect with posts and search dependencies
  useEffect(() => {
    const filteredResults = posts.filter((post) => 
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));  
      setsearchResults(filteredResults.reverse()); //set to latest filtered results
  },[posts,search])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length -1].id + 1: 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try{
      const response = await api.post('/posts', newPost);      
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/'); //go back to home
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`,updatedPost);//reponse.data is basically your updatedPost
      setPosts(posts.map( (post) => post.id === id ? {...response.data } : post));
      setEditTitle('');
      setEditBody('');
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);      
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList);
      navigate('/');//go back to home page
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout width={width} search={search} setSearch={setSearch} />}
      >
        {/* nested route inside layout route  */}
        <Route index element={<Home 
                              posts={searchResults}
                              fetchError={fetchError}
                              isLoading={isLoading} 
                              />} />
        <Route path="post">
            <Route
              index
              element={
                <NewPost
                  handleSubmit={handleSubmit}
                  postTitle={postTitle}
                  setPostTitle={setPostTitle}
                  postBody={postBody}
                  setPostBody={setPostBody}
                />
              }
            />
            <Route
              path=":id"
              element={<PostPage 
                          posts={posts} 
                          handleDelete={handleDelete} 
                          />}
          />
        </Route>
        <Route path="edit">            
            <Route
              path=":id"
              element={<EditPost 
                          posts={posts} 
                          handleEdit={handleEdit}
                          editTitle={editTitle}
                          setEditTitle={setEditTitle} 
                          editBody={editBody}
                          setEditBody={setEditBody}
                          />}
          />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
