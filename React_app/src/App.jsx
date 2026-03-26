import React, { useState } from "react";
import UserTable from "./tables/UserTable";
import EditUserForm from "./forms/EditUserForm";
import AddUserForm from "./forms/AddUserForm";

const App = () => {
  const usersData = [
    { id: 1, nev: "magyar tarsza", ertekid: 1, ev: 1982, katid: 8 },
    { id: 2, nev: "dobozi pikkelyescsiga", ertekid: 1, ev: 2001, katid: 5 },
    { id: 3, nev: "ritka hegyiszitakoto", ertekid: 1, ev: 2005, katid: 8 }
  ];

  const [users, setUsers] = useState(usersData);
  const [currentUser, setCurrentUser] = useState({ id: null, nev: '', ev: '', katid: 1, ertekid: 1 });
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
    <div className="container mt-4">
      {/* 1. FEJLÉC SZAKASZ */}
      <div className="p-4 rounded shadow-sm mb-3" style={{
        backgroundColor: '#a89393',
        color: 'white',
        textAlign: 'center'
      }}>
        <h1 className="m-0" style={{ fontWeight: 'bold' }}>Védett fajok katalógusa</h1>
      </div>

      {/* 2. JAVÍTOTT NAVIGÁCIÓ - Két szintet lépünk vissza */}
      <div className="mb-4" style={{ textAlign: 'left' }}>
        <a href="../../index.html" style={{
          textDecoration: 'underline',
          color: '#4a4a4a',
          fontWeight: 'bold',
          fontSize: '1.1rem'
        }}>
          ← Vissza a főoldalra
        </a>
      </div>

      {/* 3. ÚRLAP SZAKASZ */}
      <div className="mb-5">
        <h2 className="mb-3" style={{ color: '#5a4a4a', fontWeight: 'bold' }}>
          {editing ? "Védett faj adatainak szerkesztése" : "Új védett faj hozzáadása"}
        </h2>
        <div className="p-4 rounded-4 shadow-sm" style={{
          backgroundColor: '#f3f0f0',
          border: '1px solid #dcd7d7'
        }}>
          {!editing ? (
            <AddUserForm addUser={addUser} />
          ) : (
            <EditUserForm
              setEditing={setEditing}
              currentUser={currentUser}
              updateUser={updateUser}
            />
          )}
        </div>
      </div>

      {/* 4. TÁBLÁZAT SZAKASZ */}
      <div>
        <h2 className="mb-3" style={{ color: '#5a4a4a', fontWeight: 'bold' }}>Védett fajok megtekintése</h2>
        <div className="card border-0 shadow-sm" style={{ borderRadius: '15px', overflow: 'hidden' }}>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>

      <footer className="mt-5 mb-4 text-center" style={{ color: '#a89393' }}>
        <small>Készítette: Molnár Emese & Verebély Annamária</small>
      </footer>
    </div>
  );
};

export default App;