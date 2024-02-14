import React from 'react';
import usePostDetails from "../hooks/use-post-details";
import Loading from "../components/Loading";

export default function Details() {
  const {loading,error,record}= usePostDetails();
  return (
    <Loading loading={loading} error={error}>
    <div>
    <p>Title : {record?.title}</p>
    <p>Description : {record?.description}</p>
    </div>
    </Loading>
  );
};
