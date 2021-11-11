import React from 'react';

export default ({ user }) => {
    const userDetails = <div>
        <img className="userAvatar" src={user ? user.avatr_url : null} />
        <div className="userId">Id: {user ? user.id : null}</div>
        <div className="userName">Name: {user ? user.login : null}</div>
        <div className="userState">State: {user ? user.login : null}</div>
    </div>
   return <div className="userDetails">
       {user ? userDetails : null}
   </div>
}