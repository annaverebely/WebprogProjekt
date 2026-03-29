import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // Állapotok (state) definiálása
  const [animals, setAnimals] = useState([]); 
  const [nev, setNev] = useState("");
  const [ertekid, setErtekid] = useState("");
  const [ev, setEv] = useState("");
  const [katid, setKatid] = useState("");
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);

  // Adatok betöltése az oldal indulásakor
  useEffect(() => {
    fetchAnimals();
  }, []);

  // CRUD: Olvasás (Read)
  const fetchAnimals = async () => {
    try {
      const res = await axios.get("api.php");
      if (res.data && res.data.readData) {
        setAnimals(res.data.readData);
        setMessage(res.data.status);
      } else {
        setAnimals([]); 
        setMessage("Nincs megjeleníthető adat.");
      }
    } catch (err) {
      console.error("API hiba:", err);
      setAnimals([]); 
      setMessage("Hiba az API kapcsolódásnál.");
    }
  };

  // CRUD: Létrehozás és Módosítás (Create / Update)
  const submit = async () => {
    if (!nev) return alert("A név megadása kötelező!");
    
    const data = { id: editId, nev, ertekid, ev, katid };
    try {
      let res;
      if (editId) {
        // Módosítás (PUT)
        res = await axios.put("api.php", data);
        setEditId(null);
      } else {
        // Új adat (POST)
        res = await axios.post("api.php", data);
      }
      setMessage(res.data.status);
      // Mezők ürítése
      setNev(""); setErtekid(""); setEv(""); setKatid("");
      fetchAnimals(); 
    } catch (err) {
      setMessage("Mentési hiba történt.");
    }
  };

  // Szerkesztési mód bekapcsolása
  const editAnimal = (animal) => {
    setEditId(animal.id);
    setNev(animal.nev);
    setErtekid(animal.ertekid);
    setEv(animal.ev || "");
    setKatid(animal.katid);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // CRUD: Törlés (Delete)
  const deleteAnimal = async (id) => {
    if (!confirm("Biztosan törölni szeretnéd ezt az elemet?")) return;
    try {
      const res = await axios.delete("api.php", { data: { id } });
      setMessage(res.data.status);
      fetchAnimals();
    } catch (err) {
      setMessage("Törlési hiba történt.");
    }
  };

  return (
    <div className="container mt-5">
      {/* Visszajelző üzenet */}
      <div className="alert alert-info py-2 shadow-sm">{message || "Rendszer készen áll"}</div>
      
      <h3 className="mb-4 text-secondary">Védett állatok kezelése (React + Axios)</h3>
      
      {/* Adatfelviteli űrlap */}
      <div className="card p-4 mb-4 shadow-sm border-0 bg-light">
        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label small text-muted">Állat neve</label>
            <input className="form-control" value={nev} onChange={(e) => setNev(e.target.value)} placeholder="Pl. Vidra" />
          </div>
          <div className="col-md-2">
            <label className="form-label small text-muted">Érték ID</label>
            <input className="form-control" value={ertekid} onChange={(e) => setErtekid(e.target.value)} placeholder="Szám" />
          </div>
          <div className="col-md-2">
            <label className="form-label small text-muted">Év</label>
            <input className="form-control" value={ev} onChange={(e) => setEv(e.target.value)} placeholder="Évszám" />
          </div>
          <div className="col-md-2">
            <label className="form-label small text-muted">Kategória ID</label>
            <input className="form-control" value={katid} onChange={(e) => setKatid(e.target.value)} placeholder="Szám" />
          </div>
          <div className="col-md-3 d-flex align-items-end">
            <button className="btn btn-primary w-100 shadow-sm" onClick={submit}>
              {editId ? "Módosítás mentése" : "Új állat hozzáadása"}
            </button>
          </div>
        </div>
      </div>

      {/* Adattáblázat */}
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-bordered table-hover bg-white mb-0">
          <thead className="table-dark">
              <tr>
                  <th>ID</th>
                  <th>Név</th>
                  <th>Érték ID</th>
                  <th>Év</th>
                  <th>Kat ID</th>
                  <th width="220">Műveletek</th>
              </tr>
          </thead>
          <tbody>
            {animals?.map((animal) => (
              <tr key={animal.id} className="align-middle">
                <td>{animal.id}</td>
                <td className="fw-bold text-dark">{animal.nev}</td>
                <td>{animal.ertekid}</td>
                <td>{animal.ev || "-"}</td>
                <td>{animal.katid}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2 px-3" onClick={() => editAnimal(animal)}>
                    Szerkesztés
                  </button>
                  <button className="btn btn-danger btn-sm px-3" onClick={() => deleteAnimal(animal.id)}>
                    Törlés
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {animals?.length === 0 && (
          <div className="text-center p-5 bg-white border-top">
            <p className="text-muted mb-0">Jelenleg nincs megjeleníthető adat az adatbázisban.</p>
          </div>
        )}
      </div>

      {/* Navigáció */}
      <div className="mt-4 pb-5">
          <a href="index.html" className="btn btn-outline-secondary">
            ← Vissza a főoldalra
          </a>
      </div>
    </div>
  );
}

export default App;