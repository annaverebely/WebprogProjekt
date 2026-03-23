import React from "react";

const UserTable = props => (
  <table>
    <thead>
      <tr>
        <th>Név</th>
        <th>Érték ID</th>
        <th>Év</th>
        <th>Kategória</th>
      </tr>
    </thead>
    <tbody>
      {props.users.length > 0 ? (
        props.users.map(user => (
          <tr key={user.id}>
            <td>{user.nev}</td>
            <td>{user.ertekid}</td>
            <td>{user.ev}</td>
            <td>{user.katid}</td>
            <td>
              <button onClick={() => {props.editRow(user);}}>Szerkesztés</button>
              <button onClick={() => props.deleteUser(user.id)}>Törlés</button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={5}>Nincs adat</td>
        </tr>
      )}
    </tbody>
  </table>
);
export default UserTable;