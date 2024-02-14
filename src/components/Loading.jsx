import React,{Fragment} from 'react'

export default function Loading({loading,error,children}) {
  const elementType = children.type.displayName;
  const renderHandler = ()=>{
    if(elementType === "Button"){
      const cloneButton = React.cloneElement(
        children,
        { disabled: true },
        "Loading..."
      );
      return(
        <Fragment>
        {
          loading ? (cloneButton):
          error ? (
            <Fragment>
            {children}
            <p>
            <br/>
            {error}
            </p>
            </Fragment>
          ) :
          (children)
        }
        </Fragment>
      )
    }
    return(
      <Fragment>
      {
        loading ? (<p>loading please wait ....</p>):
        error ? (
          <p>
          {error}
          </p>
        ) :
        (children)
      }
      </Fragment>
    )
  }
  return renderHandler();
};