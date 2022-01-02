import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import EditPost from "./EditPost";
import About from "./About";
import Missing from "./Missing";
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/DataContext";

function App() {
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

  return (
    <Routes>
      <Route path="/" element={<Layout DataProvider={DataProvider} />}>
        {/* nested route inside layout route  */}
        <Route index element={<Home />} />
        <Route path="post">
          <Route index element={<NewPost />} />
          <Route
            path=":id"
            element={<PostPage />}
          />
        </Route>
        <Route path="edit">
          <Route path=":id" element={<EditPost />} />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
