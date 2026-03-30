const apiURL = 'ertek_api.php';

// READ 
async function loadErtekek() {
    const res = await fetch(apiURL);
    const data = await res.json();
    const tbody = document.getElementById('fetchTableBody');
    
    tbody.innerHTML = '';

    data.forEach(item => {
        tbody.innerHTML += `
            <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 15px;">${item.id}</td>
                <td style="padding: 15px; font-weight: bold;">${Number(item.forint).toLocaleString()} Ft</td>
                <td style="padding: 15px; text-align: right;">
                    <button onclick="prepareEdit(${item.id}, ${item.forint})" class="btn btn-warning btn-sm px-3">Szerkesztés</button>
                    <button onclick="deleteErtek(${item.id})" class="btn btn-danger btn-sm px-3">Törlés</button>
                </td>
            </tr>`;
    });
}

// CREATE / UPDATE mentés
async function saveErtek() {
    const id = document.getElementById('ertekId').value;
    const forint = document.getElementById('forintErtek').value;
    
    if (!forint) return alert("Kérlek, adj meg egy összeget!");

    const method = id ? 'PUT' : 'POST';
    const bodyData = id ? { id, forint } : { forint };

    await fetch(apiURL, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
    });

    resetForm();
    loadErtekek();
}

function prepareEdit(id, forint) {
    document.getElementById('ertekId').value = id;
    document.getElementById('forintErtek').value = forint;
    document.getElementById('submitBtn').innerText = "Módosítás mentése";
}

function resetForm() {
    document.getElementById('ertekId').value = '';
    document.getElementById('forintErtek').value = '';
    document.getElementById('submitBtn').innerText = "Mentés";
}

//Delete
async function deleteErtek(id) {
    if(!confirm("Biztosan törlöd?")) return;
    await fetch(`${apiURL}?id=${id}`, { method: 'DELETE' });
    loadErtekek();
}

loadErtekek();