let kategoriak = [
    { id: 1, nev: "halak" },
    { id: 2, nev: "körszájúak" },
    { id: 3, nev: "madarak" },
    { id: 4, nev: "kétéltűek" },
    { id: 5, nev: "puhatestűek" },
    { id: 6, nev: "hüllők" },
    { id: 7, nev: "emlősök" },
    { id: 8, nev: "ízeltlábúak" }
];

let editIndex = -1;

document.addEventListener("DOMContentLoaded", renderTable);

function renderTable() {
    const tbody = document.getElementById('kategoriaTableBody');
    tbody.innerHTML = '';

    kategoriak.forEach((kat, index) => {
        const row = `
            <tr>
                <td class="fw-bold">${kat.id}</td>
                <td>${kat.nev}</td>
                <td class="text-center">
                    <button class="btn btn-sm me-2 shadow-sm" style="background-color: #8e7e7e; color: white;" onclick="prepareEdit(${index})">Szerkesztés</button>
                    <button class="btn btn-sm shadow-sm" style="background-color: #a54242; color: white;" onclick="deleteKategoria(${index})">Törlés</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function handleAction() {
    const input = document.getElementById('kategoriaNev');
    const msg = document.getElementById('validationMsg');
    const button = document.getElementById('submitBtn');
    
    if (input.value.trim() === "") {
        msg.classList.remove('d-none');
        return;
    }
    msg.classList.add('d-none');

    if (editIndex === -1) {
        const ujId = kategoriak.length > 0 ? Math.max(...kategoriak.map(k => k.id)) + 1 : 1;
        kategoriak.push({ id: ujId, nev: input.value.trim() });
    } else {
        kategoriak[editIndex].nev = input.value.trim();
        editIndex = -1; 
        button.innerText = "Hozzáadás"; 
        button.style.backgroundColor = "#8e7e7e";
    }

    input.value = ""; 
    renderTable(); 
}

function prepareEdit(index) {
    const input = document.getElementById('kategoriaNev');
    const button = document.getElementById('submitBtn');
    
    input.value = kategoriak[index].nev;
    
    editIndex = index;
    button.innerText = "Módosítás mentése";
    button.style.backgroundColor = "#5a4a4a"; 

    input.focus();
}

function deleteKategoria(index) {
    if (confirm("Biztosan törölni szeretné ezt a kategóriát?")) {
        if (editIndex === index) {
            editIndex = -1;
            document.getElementById('kategoriaNev').value = "";
            document.getElementById('submitBtn').innerText = "Hozzáadás";
        }
        
        kategoriak.splice(index, 1);
        renderTable();
    }
}