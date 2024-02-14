import React,{useEffect} from 'react'
import Loading from "../components/Loading";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {Form,Button} from 'react-bootstrap';
import usePostDetails from "../hooks/use-post-details";
import {editPost} from "../state/postSlice";
import withGuard from '../util/withGuard';
import { useFormik } from 'formik';
import {postSchema} from "../util/validationSchema";
const  EditPost = ()=> {
  const {loading , record , error} = usePostDetails();

  const dispatch = useDispatch();
  const navigate=useNavigate();
  useEffect(()=>{
    dispatch({type:"posts/cleanRecord"})
      },[dispatch])


  const formik = useFormik({
    initialValues: {
      title: record ? record.title : "",
      description: record ? record.description : "",
    },
    enableReinitialize: true,
   validationSchema:postSchema,
    onSubmit: values => {
  dispatch(editPost({id:record.id, title: values.title,description:values.description}))
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
export default withGuard(EditPost);




/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////                  Without Formik
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React,{useState,useEffect} from 'react'
// import Loading from "../components/Loading";
// import { useDispatch , useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import {Form,Button} from 'react-bootstrap';
// import usePostDetails from "../hooks/use-post-details";
// import {editPost} from "../state/postSlice";
// import withGuard from '../util/withGuard';
// const  EditPost = ()=> {
//   const {loading , record , error} = usePostDetails();
//   const [title,setTitle]=useState("");
//   const [description,setDescription]=useState("");
//   useEffect(()=>{
//     if(record ){
//       setTitle(record.title);
//       setDescription(record.description);
//     }
//   },[record])

//   const dispatch = useDispatch();
//   const navigate=useNavigate();
//   useEffect(()=>{
//     dispatch({type:"posts/cleanRecord"})
//       },[dispatch])
//   const formHandler=(e)=>{
// e.preventDefault();
// // console.log("AddPost");
// dispatch(editPost({id:record.id,title,description}))
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
// export default withGuard(EditPost);