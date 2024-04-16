import React, { useState } from "react";
import Editor from "react-simple-wysiwyg";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [html, setHtml] = useState('');
  const [imageId, setImageId] = useState('');
  const navigate = useNavigate();

  function onChange(e) {
    setHtml(e.target.value);
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData();
    formData.append("image",file);

    const res = await fetch("http://127.0.0.1:8000/api/save-temp-image",{
      method: 'POST',
      body: formData
    });

    const result = await res.json();

    console.log(result);

    if (result.status == false) {
      alert(result.errors.image);
      e.target.value = null;
    }

    setImageId(result.image.id);

  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) =>{
    const newData = { ...data, "description": html, image_id: imageId }
    console.log(newData);

    const res = await fetch("http://127.0.0.1:8000/api/blogs", {
      method: "POST",
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(newData)
    })

    toast("Blog added sucessfully!");

    navigate('/');
  } 

  // console.log(watch("title"));
  // console.log(watch("author"))
  // console.log(watch("shortDescription"))

  return (
    <div className="container mb-5">
      <div className="d-flex justify-content-between pt-5 mb-4">
        <h4> Create Blog</h4>
        <a href="/" className="btn btn-dark">
          Back
        </a>
      </div>
      <div className="card border-0 shadow-lg">
        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="card-body">
            {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
            {/* register your input into the hook by invoking the "register" function */}
            <div className="mb-3">
              <label className="form-label">Title</label>
              {/* <input
                {...register("title", { required: true })}
                type="text"
                className={'form-control ${errors.title && 'is-invalid'}'}
                placeholder="Name"
              />
              {errors.title && <p className='invalid-feedback'>Title is required</p>} */}
              <input
                {...register("title", { required: true })}
                type="text"
                className={"form-control"}
                placeholder="Name"
              />
              {errors.title && <span className='mt-2'>Title is required</span>}
            </div>
            <div className="mb-3">
              <label className="form-label">Short Description</label>
              {/* <input type="text" className="form-control" placeholder="Name" /> */}
              <textarea
                {...register("shortDescription", { required: true })}
                cols={30}
                rows={4}
                className="form-control"
                placeholder="Give a short description of the blog"
              ></textarea>
              {errors.shortDescription && <span>This field is required</span>}
            </div>
            <div className="mb-3">
               <label className="form-label">Description</label>
               <Editor
                 value={html}
                 containerProps={{ style: { height: "400px" } }}
                 onChange={onChange}
               />
               {/* {errors.description && <span>This field is required</span>} */}
               {/* <textarea className="form-control" name="" id="" cols={30} rows={10}></textarea> */}
             </div>
             <div className="mb-3">
               <label className="mb-2">Image</label>
               <br />
               <input onChange={handleFileChange} type="file" />
             </div>
             <div className="mb-3">
               <label className="form-label">Author</label>
               <input { ...register('author',{ required:true })}
                 type="text"
                 className={"form-control"}
                 placeholder="Author"
               />
               {errors.author && <span>Author field is required</span>}
             </div>
             <button type="submit" className="btn btn-dark">
            Create
          </button>
          </div>

          {/* include validation with required or other standard HTML validation rules */}
          {/* <input {...register("exampleRequired", { required: true })} /> */}
          {/* errors will return when field validation fails  */}
          {/* {errors.exampleRequired && <span>This field is required</span>} */}
          {/* <input type="submit" /> */}
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
