import { Link } from "react-router-dom"

const Nav = ({search,setSearch}) => {
    return (
        <nav className="Nav">
            <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search">Search Posts</label>
                <input
                    id='search'//must match htmlFor
                    type='text'
                    placeholder='Search Posts'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} //controlled input
                />
            </form>
            <ul>
                <li><Link to = "/">Home</Link></li>
                <li><Link to = "post">Post</Link></li>
                <li><Link to = "about">About</Link></li>
            </ul>
        </nav>          
    )
}

export default Nav
