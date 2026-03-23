import React, { useState, useEffect } from "react";

const EditUserForm = props => {
  const [user, setUser] = useState(props.currentUser);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);
  
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        props.updateUser(user.id, user);
      }}
    >
      <label>Név</label>
      <input type="text" name="nev" value={user.nev} onChange={handleInputChange}/>
      <label>Érték ID</label>
      <input type="text" name="ertekid" value={user.ertekid} onChange={handleInputChange}/>
      <label>Év</label>
      <input type="text" name="ev" value={user.ev} onChange={handleInputChange}/>
      <label>Kategória</label>
      <input type="text" name="katid" value={user.katid} onChange={handleInputChange}/>
      <button>Mentés</button>
      <button onClick={() => props.setEditing(false)}>Mégse</button>
    </form>
  );
};
export default EditUserForm;
