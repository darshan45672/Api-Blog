import React, { useState } from "react";
import Editor from 'react-simple-wysiwyg';

const CreateBlog = () => {
    const [html, setHtml] = useState();
    function onChange(e) {
        setHtml(e.target.value);
      }
  return (
    <div className="container mb-5">
      <div className="d-flex justify-content-between pt-5 mb-4">
        <h4> Create Blog</h4>
        <a href="/" className="btn btn-dark">
          Back
        </a>
      </div>
      <div className="card border-0 shadow-lg">
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Title
            </label>
            <input type="text" className="form-control" placeholder="Name" />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Description
            </label>
            <Editor value={html}
            containerProps={{ style: { height: '400px' } }}
            onChange={onChange} />
            {/* <textarea className="form-control" name="" id="" cols={30} rows={10}></textarea> */}
          </div>
          <div className="mb-3">
            <label htmlFor="" className="mb-2">
              Image 
            </label><br/>
            <input type="file" />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Author
            </label>
            <input type="text" className="form-control" placeholder="Author" />
          </div>
          <button className="btn btn-dark"> Create</button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
