import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {Form,Button} from 'react-bootstrap';
import { insertPost } from '../state/postSlice';
import { useNavigate } from 'react-router-dom';
import Loading from './../components/Loading';
import withGuard from '../util/withGuard';
import { useFormik } from 'formik';
import {postSchema} from "../util/validationSchema";
const AddPost=() =>{
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const {loading,error}=useSelector((state)=>state.posts);
    const formik = useFormik({
      initialValues: {
        title: '',
        description: '',
      },
     validationSchema:postSchema,
      onSubmit: values => {
    const id=Math.floor(Math.random()*500);
    dispatch(insertPost({id,title: values.title, description:values.description}))
    .unwrap()
    .then(()=>{navigate("/");})
    .catch((error)=>{console.log(error);});
      }
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>Title</Form.Label>
      <Form.Control type="text"
      name="title"
      onChange={formik.handleChange}
      value={formik.values.title}
      isInvalid={!!formik.errors.title}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.title}</Form.Control.Feedback>
    </Form.Group>
    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
      <Form.Label>Description</Form.Label>
      <Form.Control as="textarea" rows={3}
      name="description"
      onChange={formik.handleChange}
      value={formik.values.description}
      isInvalid={!!formik.errors.description}
       />
       <Form.Control.Feedback type="invalid">{formik.errors.description}</Form.Control.Feedback>
    </Form.Group>
    <Loading loading={loading} error={error}>
    <Button variant="primary" type="submit">Submit</Button>
    </Loading>
  </Form>
  )
}

export default withGuard(AddPost);













































////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////                 Without Formik
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import React,{useState} from 'react';
// import { useDispatch,useSelector } from 'react-redux';
// import {Form,Button} from 'react-bootstrap';
// import { insertPost } from '../state/postSlice';
// import { useNavigate } from 'react-router-dom';
// import Loading from './../components/Loading';
// import withGuard from '../util/withGuard';
// const AddPost=() =>{
//   const [title,setTitle]=useState("");
//   const [description,setDescription]=useState("");
//   const dispatch = useDispatch();
//   const navigate=useNavigate();
//   const {loading,error}=useSelector((state)=>state.posts);
//   const formHandler=(e)=>{
// e.preventDefault();
// // console.log("AddPost");
// const id=Math.floor(Math.random()*500);
// dispatch(insertPost({id,title,description}))
// .unwrap()
// .then(()=>{navigate("/");})
// .catch((error)=>{console.log(error);})
// ;
//   };
//   return (
//     <Form onSubmit={formHandler}>
//     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//       <Form.Label>Title</Form.Label>
//       <Form.Control type="text"
//       onChange={(e)=>setTitle(e.target.value)}
//       value={title}
//         />
//     </Form.Group>
//     <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
//       <Form.Label>Description</Form.Label>
//       <Form.Control as="textarea" rows={3}
//       onChange={(e)=>setDescription(e.target.value)}
//       value={description}
//        />
//     </Form.Group>
//     <Loading loading={loading} error={error}>
//     <Button variant="primary" type="submit">Submit</Button>
//     </Loading>
//   </Form>
//   )
// }

// export default withGuard(AddPost);