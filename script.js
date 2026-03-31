var selectedIndex = null;
var kategoriak = [
    { id: 1, nev: "halak" },
    { id: 2, nev: "körszájúak" },
    { id: 3, nev: "madarak" },
    { id: 4, nev: "kétéltűek" },
    { id: 5, nev: "puhatestűek" },
    { id: 6, nev: "hüllők" },
    { id: 7, nev: "emlősök" },
    { id: 8, nev: "ízeltlábúak" }
];

document.addEventListener("DOMContentLoaded", function() {
    printArray();
});

function printArray() {
    var tableBody = document.getElementById("kategoriaTableBody");
    tableBody.innerHTML = "";
    
    for (var i = 0; i < kategoriak.length; i++) {
        var row = tableBody.insertRow(tableBody.length);
        
        var cell1 = row.insertCell(0);
        cell1.innerHTML = kategoriak[i].id;
        
        var cell2 = row.insertCell(1);
        cell2.innerHTML = kategoriak[i].nev;
        cell2.style.fontWeight = "bold";
        
        var cell3 = row.insertCell(2);
        cell3.className = "text-center";
        cell3.innerHTML = '<button class="btn btn-warning btn-sm me-2" onClick="onEdit(' + i + ')">Szerkesztés</button>' +
                          '<button class="btn btn-danger btn-sm" onClick="onDelete(' + i + ')">Törlés</button>';
    }
}

function handleAction() {
    if (validate()) {
        var nevInput = document.getElementById("kategoriaNev").value;
        
        if (selectedIndex == null) { 
            var ujId = kategoriak.length > 0 ? Math.max(...kategoriak.map(k => k.id)) + 1 : 1;
            kategoriak.push({ id: ujId, nev: nevInput });
        } else {
            kategoriak[selectedIndex].nev = nevInput;
            selectedIndex = null;
            document.getElementById("submitBtn").innerText = "Hozzáadás";
            document.getElementById("submitBtn").style.backgroundColor = "#8e7e7e";
        }
        
        resetForm();
        printArray();
    }
}

function onEdit(index) {
    selectedIndex = index;
    document.getElementById("kategoriaNev").value = kategoriak[index].nev;
    
    var btn = document.getElementById("submitBtn");
    btn.innerText = "Módosítás mentése";
    btn.style.backgroundColor = "#5a4a4a";
    
    document.getElementById("kategoriaNev").focus();
}

function onDelete(index) {
    if (confirm('Biztosan törölni szeretné ezt a kategóriát?')) {
        kategoriak.splice(index, 1);
        resetForm();
        printArray();
    }
}
 
function resetForm() {
    document.getElementById("kategoriaNev").value = "";
    document.getElementById("validationMsg").classList.add("d-none");
    selectedIndex = null;
}

function validate() {
    var isValid = true;
    if (document.getElementById("kategoriaNev").value.trim() == "") {
        isValid = false;
        document.getElementById("validationMsg").classList.remove("d-none");
    } else {
        isValid = true;
        document.getElementById("validationMsg").classList.add("d-none");
    }
    return isValid;
}