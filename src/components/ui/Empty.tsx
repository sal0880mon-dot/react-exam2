import React from "react";

const Empty = React.memo(() => {
    console.log('empty re-render');
  return (
    <div>Empty</div>
  )
})

export default Empty