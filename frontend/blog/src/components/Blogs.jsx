import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const [search, setSearch] = useState("");

  const fetchBlogs = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/blogs");
    const result = await res.json();
    setBlogs(result.data);
    console.log(result);
  };

  const searchBlogs = async (e) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:8000/api/blogs?search=" + search);
    const result = await res.json();
    setBlogs(result.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="container">
      <div className="d-flex justify-content-end pt-5 mb-4">
        <form onSubmit = {(e) => searchBlogs(e)}>
        <div className="d-flex">
          <input type="text" value={search} onChange={(e) => setSearch( e.target.value)} className="form-control" placeholder="search" />
          <button className="btn btn-dark ms-3">search</button>
        </div>
        </form>
      </div>
      <div className="d-flex justify-content-between pt-5 mb-4">
        <h4> Blogs</h4>
        <a href="/create" className="btn btn-dark">
          Create
        </a>
      </div>
      <div className="row">
        {blogs &&
          blogs.map((blog) => {
            return <BlogCard blog={blog} key={blog.id} />;
          })}
      </div>
    </div>
  );
};

export default Blogs;
