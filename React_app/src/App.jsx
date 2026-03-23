import React, { useState } from "react";
import UserTable from "./tables/UserTable";
import EditUserForm from "./forms/EditUserForm";
import AddUserForm from "./forms/AddUserForm";

const App = () => {
  const usersData = [
    { id: 1, nev: "magyar tarsza", ertekid: 1, ev: null, katid: 8 },
    { id: 2, nev: "dobozi pikkelyescsiga", ertekid: 1, ev: null, katid: 5 },
    { id: 3, nev: "ritka hegyiszitakoto", ertekid: 1, ev: null, katid: 8 }
  ];
  const [users, setUsers] = useState(usersData);
  const [currentUser, setCurrentUser] = useState("");
  const [editing, setEditing] = useState(false);

  const addUser = user => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };
  const deleteUser = id => {
    setEditing(false);
    setUsers(users.filter(user => user.id !== id));
  };
  const editRow = user => {
    setEditing(true);
    setCurrentUser(user);
  };
  const updateUser = (id, updatedUser) => {
    setEditing(false);
    setUsers(users.map(user => (user.id === id ? updatedUser : user)));
  };

  return (
    <div>
      <h1>Védett fajok katalógusa</h1>
      <div>
        <div>
          <div>
              <h2>{editing ? "Védett faj adatainak szerkesztése" : "Új védett faj hozzáadása"}</h2>
              {!editing ? (
                <AddUserForm
                  addUser={addUser}
                />
              ):(
                <EditUserForm
                  setEditing={setEditing}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  updateUser={updateUser}
                />
              )}
          </div>
        </div>
        <div>
          <h2>Védett fajok megtekintése</h2>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  );
};
export default App;
