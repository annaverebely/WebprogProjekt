// Kezdő adatok 
let vedettAllatok = [
    { nev: "magyar tarsza", ev: 1982, ertek: 10000 },
    { nev: "ritka hegyiszitakoto", ev: 2005, ertek: 10000 }
];

// Táblázat kirajzolása
function renderTable() {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';

    vedettAllatok.forEach((item, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${item.nev}</td>
                <td>${item.ev}</td>
                <td>${item.ertek.toLocaleString()} Ft</td>
                <td class="action-btns">
                    <button class="edit-btn" onclick="editData(${index})">Módosítás</button>
                    <button class="delete-btn" onclick="deleteData(${index})">Törlés</button>
                </td>
            </tr>
        `;
    });
}

// Mentés (Hozzáadás vagy Módosítás)
function saveData() {
    const nev = document.getElementById('allatNev').value;
    const ev = document.getElementById('allatEv').value;
    const ertek = document.getElementById('allatErtek').value;
    const editIndex = document.getElementById('editIndex').value;

    if (nev === "" || ev === "" || ertek === "") {
        alert("Minden mezőt tölts ki!");
        return;
    }

    const newData = { nev, ev: parseInt(ev), ertek: parseInt(ertek) };

    if (editIndex === "-1") {
        // Új hozzáadása (CREATE)
        vedettAllatok.push(newData);
    } else {
        // Módosítás (UPDATE)
        vedettAllatok[editIndex] = newData;
        document.getElementById('editIndex').value = "-1";
    }

    // Mezők ürítése
    document.getElementById('allatNev').value = '';
    document.getElementById('allatEv').value = '';
    document.getElementById('allatErtek').value = '';
    
    renderTable();
}

// Törlés (DELETE)
function deleteData(index) {
    if (confirm("Biztosan törölni akarod?")) {
        vedettAllatok.splice(index, 1);
        renderTable();
    }
}

// Szerkesztés betöltése az űrlapba
function editData(index) {
    const item = vedettAllatok[index];
    document.getElementById('allatNev').value = item.nev;
    document.getElementById('allatEv').value = item.ev;
    document.getElementById('allatErtek').value = item.ertek;
    document.getElementById('editIndex').value = index;
}

// Első betöltés
renderTable();