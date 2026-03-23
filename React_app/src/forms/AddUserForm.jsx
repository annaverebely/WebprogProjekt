import React, { useState} from "react";

const AddUserForm = props => {
  const [user, setUser] = useState({nev:"",ertekid:"",ev:"",katid:""});
  
  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if (!user.nev || !user.ertekid || !user.ev || !user.katid) return;
        props.addUser(user);
        setUser({nev:"",ertekid:"",ev:"",katid:""});
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
      <button>Új védett faj hozzáadása</button>
    </form>
  );
};
export default AddUserForm;
