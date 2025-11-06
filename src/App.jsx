import React from 'react';
import useFetch from './hooks/useFetch';
import BlogCard from './components/BlogCard';
// Assuming you've moved the CSS to src/styles/style.css and imported it in main.jsx

// The full URL for fetching the blogs
const BLOGS_URL = `${import.meta.env.VITE_BACKEND_URL}/blogs`;
console.log("Fetching from:", BLOGS_URL);

function App() {
  // Use the custom hook to fetch data
  const { data: blogs, loading, error } = useFetch(BLOGS_URL);

  // Simple menu toggle logic
  const toggleMenu = () => {
    const nav = document.querySelector('.nav');
    if (nav) {
      nav.classList.toggle('active');
    }
  };

  // --- Rendering Logic based on fetch state ---
  let content;

  if (loading) {
    content = <h2 style={{ textAlign: 'center', color: '#00aeef' }}>Loading blogs...</h2>;
  } else if (error) {
    console.error("Fetch error:", error);
    content = <h2 style={{ textAlign: 'center', color: 'red' }}>Error: Could not fetch blogs.</h2>;
  } else if (blogs && blogs.length > 0) {
    // Assuming the API returns an array of blog objects
    content = (
      <div className="cards">
        {blogs.map(blog => (
          <BlogCard key={blog.slug || blog.id} blog={blog} /> // Use slug or a unique ID as key
        ))}
      </div>
    );
  } else {
    content = <h2 style={{ textAlign: 'center', color: '#ccc' }}>No blogs found.</h2>;
  }

  // --- Main Component Structure ---
  return (
    <>
      {/* <header>
        <nav>
          <div className="logo">OUR BLOGS</div>
          <ul className="nav">
            {/* Simplified navigation for this example */}
            {/* <li className="nav-item"><a href="#">Home</a></li>
            <li className="nav-item"><a href="#">About</a></li>
            <li className="nav-item"><a href="#">Services</a></li>
          </ul>
          {/* Use the toggleMenu function on click */}
          {/* <div className="menu-toggle" onClick={toggleMenu}>☰</div> 
        </nav>
      </header> */} 

      <section className="hero">
        <h1>Welcome to Our Blog</h1>
        <p>Explore curated content, insights, and innovations.</p>
      </section>

      <section className="blog-list">
        {content} {/* Dynamic content based on fetch state */}
      </section>

      {/* Note: The original script.js is no longer needed since we handle toggleMenu in React */}
    </>
  );
}

export default App;