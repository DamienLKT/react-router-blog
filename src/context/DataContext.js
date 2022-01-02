import { createContext, useState, useEffect } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {

  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('');
  const [searchResults, setsearchResults] = useState([]);  
    
  
  //custom hook useAxiosFetch
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts')

  useEffect(() => {
    setPosts(data);//update posts state
  }, [data]) //when data changes

  //search func to display posts using useEffect with posts and search dependencies
  useEffect(() => {
    const filteredResults = posts.filter((post) => 
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));  
      setsearchResults(filteredResults.reverse()); //set to latest filtered results
  },[posts,search])

  return <DataContext.Provider value={{
      search, setSearch, searchResults, fetchError, isLoading,    
      posts, setPosts      
  }}>{children}</DataContext.Provider>;
};

export default DataContext;
