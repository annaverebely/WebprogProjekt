const apiURL = '../allatok.php';

// READ - Adatok lekérése
async function loadAllatok() {
    const res = await fetch(apiURL);
    const data = await res.json();
    const tbody = document.getElementById('fetchTableBody');
    tbody.innerHTML = '';

    data.forEach(item => {
        tbody.innerHTML += `
            <tr style="border-bottom: 1px solid #ddd;">
                <td>${item.nev}</td>
                <td>${item.ev || 'N/A'}</td>
                <td>${item.kategoria}</td>
                <td>${parseInt(item.ertek).toLocaleString()} Ft</td>
                <td><button onclick="deleteAllat(${item.id})" style="background:#e74c3c; color:white; border:none; padding:5px; cursor:pointer;">Törlés</button></td>
            </tr>`;
    });
}

// CREATE - Új adat felvitele
async function addAllat() {
    const data = {
        nev: document.getElementById('nev').value,
        ev: document.getElementById('ev').value,
        katid: document.getElementById('kategoria').value,
        ertekid: document.getElementById('ertek').value
    };

    await fetch(apiURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    loadAllatok(); // Frissítés
}

// DELETE - Törlés az adatbázisból
async function deleteAllat(id) {
    if(confirm("Biztosan törlöd az adatbázisból?")) {
        await fetch(`${apiURL}?id=${id}`, { method: 'DELETE' });
        loadAllatok();
    }
}

loadAllatok();