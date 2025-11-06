import React, { useEffect } from 'react';

function BlogCard({ blog }) {
  useEffect(() => {
    console.log("Blog Data Debug:", blog);
  }, [blog]);

  const imageUrl = blog?.image?.url || 'placeholder.png';
  const imageAlt = blog?.image?.fileName || blog?.title || 'Blog Image';
  const detailUrl = `/blogs/${blog.slug}`;

  return (
    <div className="card">
      <a href={detailUrl} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img
          src={imageUrl}
          alt={imageAlt}
          onError={(e) => {
            console.warn("Image failed to load:", imageUrl);
            e.target.src = 'placeholder.png';
          }}
        />
      </a>

      <div className="card-content">
        <p className="yellow-text">By {blog.authorRole || "Unknown Author"}</p>
        <a href={detailUrl} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h2 className="blue-title">{blog.title || "Untitled Blog"}</h2>
        </a>
        <p>{blog.smallDescription || "No description available."}</p>
      </div>
    </div>
  );
}

export default BlogCard;
