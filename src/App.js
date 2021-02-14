import logo from './logo.svg';
import './App.css';
import React ,{useState,useEffect,useCallback} from "react"
import SearchForm from "./components/SearchForm";
import List from "./components/List";
import LastSearches from "./components/LastSearches";
import axios from 'axios';



const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';
const getUrl = searchTerm => `${API_ENDPOINT}${searchTerm}`;

const extractSearchTerm = url => url.replace(API_ENDPOINT, '');
const getLastSearches = urls =>
   urls
   .reduce((result, url, index) => {
    const searchTerm = extractSearchTerm(url);
    if (index === 0) {
        return result.concat(searchTerm);
    }
    const previousSearchTerm = result[result.length - 1];
    if (searchTerm === previousSearchTerm) {
    return result;
    } else {
    return result.concat(searchTerm);
    }
 }, [])
.slice(-6)
.slice(0, -1);
const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
    return {
    ...state,
    isLoading: true,
    isError: false,
    };
    case 'STORIES_FETCH_SUCCESS':
    return {
    ...state,
    isLoading: false,
    isError: false,
    data: action.payload,
    };
    case 'STORIES_FETCH_FAILURE':
    return {
    ...state,
    isLoading: false,
    isError: true,
    };
    case 'REMOVE_STORY':
    return {
    ...state,
    data: state.data.filter(
    story => action.payload.objectID !== story.objectID
    ),
    };
    default:
    throw new Error();
    }
    };


const UserSemiPersistentState = (key,initialState) =>{
  const [value, setValue] = useState(localStorage.getItem(key)|| initialState);
  useEffect(()=>{localStorage.setItem(key,value)},[value, key]);
  return [value, setValue];
}



const App = () =>{
  const [searchTerm,setSearchTerm] = UserSemiPersistentState('search','React');
  const [urls, setUrls] = React.useState([getUrl(searchTerm)]);

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
    );
  const [url, setUrl] = React.useState(
      `${API_ENDPOINT}${searchTerm}`
      );
  const handleSearchInput = event => {
        setSearchTerm(event.target.value);
        };
  const handleSearchSubmit = (e) => {
      handleSearch(searchTerm);
      e.preventdefault()
          };
          
      
  const handleFetchStories = React.useCallback(async () => {
        dispatchStories({ type: 'STORIES_FETCH_INIT' });
        try {
        const lastUrl = urls[urls.length - 1];
        const result = await axios.get(lastUrl);
        dispatchStories({
            type: 'STORIES_FETCH_SUCCESS',
            payload: result.data.hits,
            });
         } catch {
            dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
            }
            }, [urls]);
    useEffect(() => {
      handleFetchStories(); // C
      }, [handleFetchStories]); // D
      
      
  const handleRemoveStory = item => {
      dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
      });
      };
  const handleSearch = event => {
    const url = getUrl(searchTerm);
    setUrls(urls.concat(url));
        
   }
   const handleLastSearch = searchTerm => {
    setSearchTerm(searchTerm);
    handleSearch(searchTerm);
    };
    
  const lastSearches = getLastSearches(urls);
  
   return (
      <div className="container">
        <h1 className="headline-primary">My Hacker Stories</h1>
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />
      <LastSearches
         lastSearches={lastSearches}
         onLastSearch={handleLastSearch}
      />

      <hr/>
        {stories.isError && <p>Something went wrong ...</p>}

        {stories.isLoading ? (
          <p>Loading ...</p>
        ) : (
      <List list = {stories.data} onRemoveItem ={handleRemoveStory}/>)}
    </div> 
    )
}



export default App;
