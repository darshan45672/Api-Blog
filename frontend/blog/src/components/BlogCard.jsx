import React from "react";

const BlogCard = () => {
  return (
    <div className="col-sm-12 col-md-2 col-lg-3 mb-4">
      <div className="card border-0 shadow-lg">
        <img src="https://placehold.co/600x400" className="card-img-top" />
        <div className="card-body">
          <h2> Dummy</h2>
          <p>
            ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
          </p>
          <div className="d-flex justify-content-between">
            <a href="#" className="btn btn-dark">
              View Blog
            </a>
            <a href="#" className="btn btn-dark">
              edit
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
