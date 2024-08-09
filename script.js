// Global veri saklama değişkenleri
let birimIdCounter = 1;
let firmaIdCounter = 1;
let veriIdCounter = 1;
// DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    const savedPage = localStorage.getItem('currentPage') || 'birim';

    // Verileri yükle
    loadBirimData();
    loadFirmaData();
    loadVeriData();
    updateBirimDropdown();
    updateFirmaDropdown();

    // ID sayaçlarını yükle
    birimIdCounter = parseInt(localStorage.getItem('birimIdCounter') || '1', 10);
    firmaIdCounter = parseInt(localStorage.getItem('firmaIdCounter') || '1', 10);
    veriIdCounter = parseInt(localStorage.getItem('veriIdCounter') || '1', 10);

    showTable(savedPage); // Seçili sekmeyi göster

    // Buton click event listener'ları
    document.getElementById('birimButton').addEventListener('click', () => {
        showTable('birim');
        localStorage.setItem('currentPage', 'birim');
    });
    document.getElementById('firmaButton').addEventListener('click', () => {
        showTable('firma');
        localStorage.setItem('currentPage', 'firma');
    });
    document.getElementById('veriButton').addEventListener('click', () => {
        showTable('veri');
        localStorage.setItem('currentPage', 'veri');
        updateBirimDropdown();
        updateFirmaDropdown();
    });

    document.getElementById('birimAddButton').addEventListener('click', () => toggleForm('birimForm', true));
    document.getElementById('firmaAddButton').addEventListener('click', () => toggleForm('firmaForm', true));
    document.getElementById('veriEkleButton').addEventListener('click', addVeriRow);

    document.getElementById('birimForm').addEventListener('submit', e => {
        e.preventDefault();
        addBirim();
        e.target.reset(); // Formu temizle
        toggleForm('birimForm', false);
    });
    document.getElementById('firmaForm').addEventListener('submit', e => {
        e.preventDefault();
        addFirma();
        e.target.reset(); // Formu temizle
        toggleForm('firmaForm', false);
    });

    document.querySelector('#myVeriTable').addEventListener('click', handleVeriActions);
});
// Form ve tablo görünümünü toggle eden fonksiyon
function showTable(table) {
    document.getElementById('birimTableContainer').style.display = (table === 'birim') ? 'block' : 'none';
    document.getElementById('firmaTableContainer').style.display = (table === 'firma') ? 'block' : 'none';
    document.getElementById('veriTableContainer').style.display = (table === 'veri') ? 'block' : 'none';
}

function toggleForm(formId, show) {
    const form = document.getElementById(formId);
    form.style.display = show ? 'block' : 'none';
}

function toggleEditMode(row, editMode) {
    const cells = row.querySelectorAll('td[contenteditable]');
    const editButton = row.querySelector('.editButton');
    const saveButton = row.querySelector('.saveButton');

    cells.forEach(cell => cell.contentEditable = editMode);
    editButton.style.display = 'none';  // Düzenle butonunu gizleyin
    saveButton.style.display = 'inline-block';  // Kaydet butonunu gösterin
}



// Birim ekleme fonksiyonu
function addBirim() {
    const birimAd = document.getElementById('birimAd').value;
    if (birimAd.trim()) {
        const rowCount = document.querySelectorAll('#myBirimTable tr').length + 1;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${rowCount}</td>
            <td contenteditable="true">${birimAd}</td>
            <td>
                <div class="action-buttons">
                    <button class="editButton" onclick="editRow(this)">Düzenle</button>
                    <button class="saveButton" onclick="saveRow(this)" style="display:none">Kaydet</button>
                    <button name="BirimButonu" onclick="deleteRow(this)">Sil</button>
                </div>
            </td>
        `;
        document.getElementById('myBirimTable').appendChild(row);
        saveBirimData();
    }
}



// Firma ekleme fonksiyonu
function addFirma() {
    const firmaAd = document.getElementById('firmaAd').value;
    if (firmaAd.trim()) {
        const rowCount = document.querySelectorAll('#myFirmaTable tr').length + 1;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${rowCount}</td>
            <td contenteditable="true">${firmaAd}</td>
            <td>
                <div class="action-buttons">
                    <button class="editButton" onclick="editRow(this)">Düzenle</button>
                    <button class="saveButton" onclick="saveRow(this)" style="display:none">Kaydet</button>
                    <button name="FirmaButonu" onclick="deleteRow(this)">Sil</button>
                </div>
            </td>
        `;
        document.getElementById('myFirmaTable').appendChild(row);
        saveFirmaData();
    }
}

// Veri ekleme fonksiyonu
function addVeriRow() {
    const sozlesmeAdi = document.getElementById('veriSözleşmeUygulamalarAdı')?.innerText.trim();
    const departman = Array.from(document.getElementById('veriDepartman')?.selectedOptions).map(option => option.text).join(', ');
    const firmaAd = document.getElementById('veriFirmaAd')?.value.trim();
    const firmaKontakt = document.getElementById('veriFirmaKontakt')?.innerText.trim();  // Updated
    const firmaKontaktMail = document.getElementById('veriFirmaKontaktMail')?.innerText.trim();
    const firmaTelefon = document.getElementById('veriFirmaTelefon')?.innerText.trim();
    const firmaSorumlu = document.getElementById('veriFirmaSorumlu')?.innerText.trim();
    const firmaSorumluMail = document.getElementById('veriFirmaSorumluMail')?.innerText.trim();
    const firmaSorumluCepNo = document.getElementById('veriFirmaSorumluCepNo')?.innerText.trim();
    const odemeBilgisi = document.getElementById('veriÖdemeBilgisi')?.innerText.trim();
    const tutar = document.getElementById('veriTutar')?.innerText.trim();
    const baslangicTarih = document.getElementById('veriBaşlangıçTarih')?.innerText.trim();
    const bitisTarih = document.getElementById('veriBitişTarih')?.innerText.trim();
    const aciklama = document.getElementById('veriAçıklama')?.innerText.trim();

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${sozlesmeAdi || ''}</td>
        <td>${departman || ''}</td>
        <td>${firmaAd || ''}</td>
        <td>${firmaKontakt || ''}</td>
        <td>${firmaKontaktMail || ''}</td>
        <td>${firmaTelefon || ''}</td>
        <td>${firmaSorumlu || ''}</td>
        <td>${firmaSorumluMail || ''}</td>
        <td>${firmaSorumluCepNo || ''}</td>
        <td>${odemeBilgisi || ''}</td>
        <td>${tutar || ''}</td>
        <td>${baslangicTarih || ''}</td>
        <td>${bitisTarih || ''}</td>
        <td>${aciklama || ''}</td>
        <td>
            <div class="action-buttons">
                <button class="editVeri">Düzenle</button>
                <button class="saveVeri" style="display:none">Kaydet</button>
                <button class="deleteVeri">Sil</button>
            </div>
        </td>
    `;
    document.querySelector('#myVeriTable tbody').appendChild(newRow);
    saveVeriData();
}




// Verileri kaydetme fonksiyonları
function saveBirimData() {
    const birimData = Array.from(document.querySelectorAll('#myBirimTable tr')).map(row => {
        const cells = row.querySelectorAll('td');
        return {
            id: cells[0].innerText,
            ad: cells[1].innerText
        };
    });
    localStorage.setItem('birimData', JSON.stringify(birimData));
}

function saveFirmaData() {
    const firmaData = Array.from(document.querySelectorAll('#myFirmaTable tr')).map(row => {
        const cells = row.querySelectorAll('td');
        return {
            id: cells[0].innerText,
            ad: cells[1].innerText
        };
    });
    localStorage.setItem('firmaData', JSON.stringify(firmaData));
}
function saveVeriData() {
    const veriData = Array.from(document.querySelectorAll('#myVeriTable tbody tr')).map(row => {
        const cells = row.querySelectorAll('td');
        return {
            sozlesmeAdi: cells[0].innerText,
            departman: cells[1].innerText,
            firmaAd: cells[2].innerText,
            firmaKontakt: cells[3].innerText,
            firmaKontaktMail: cells[4].innerText,
            firmaTelefon: cells[5].innerText,
            firmaSorumlu: cells[6].innerText,
            firmaSorumluMail: cells[7].innerText,
            firmaSorumluCepNo: cells[8].innerText,
            odemeBilgisi: cells[9].innerText,
            tutar: cells[10].innerText,
            baslangicTarih: cells[11].innerText,
            bitisTarih: cells[12].innerText,
            aciklama: cells[13].innerText
        };
    });
    console.log('Saving data to localStorage:', veriData); // Kontrol amaçlı eklenmiş
    localStorage.setItem('veriData', JSON.stringify(veriData));
}

// Verileri yükleme fonksiyonları
function loadBirimData() {
    const birimData = JSON.parse(localStorage.getItem('birimData')) || [];
    birimData.forEach((data, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td contenteditable="true">${data.ad}</td>
            <td>
                <div class="action-buttons">
                    <button class="editButton" onclick="editRow(this)">Düzenle</button>
                    <button class="saveButton" onclick="saveRow(this)" style="display:none">Kaydet</button>
                    <button onclick="deleteRow(this)">Sil</button>
                </div>
            </td>
        `;
        document.getElementById('myBirimTable').appendChild(row);
    });
}


function loadFirmaData() {
    const firmaData = JSON.parse(localStorage.getItem('firmaData')) || [];
    firmaData.forEach((data, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td contenteditable="true">${data.ad}</td>
            <td>
                <div class="action-buttons">
                    <button class="editButton" onclick="editRow(this)">Düzenle</button>
                    <button class="saveButton" onclick="saveRow(this)" style="display:none">Kaydet</button>
                    <button onclick="deleteRow(this)">Sil</button>
                </div>
            </td>
        `;
        document.getElementById('myFirmaTable').appendChild(row);
    });
}

function loadVeriData() {
    const veriData = JSON.parse(localStorage.getItem('veriData')) || [];
    veriData.forEach(data => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.sozlesmeAdi || ''}</td>
            <td>${data.departman || ''}</td>
            <td>${data.firmaAd || ''}</td>
            <td>${data.firmaKontakt || ''}</td>
            <td>${data.firmaKontaktMail || ''}</td>
            <td>${data.firmaTelefon || ''}</td>
            <td>${data.firmaSorumlu || ''}</td>
            <td>${data.firmaSorumluMail || ''}</td>
            <td>${data.firmaSorumluCepNo || ''}</td>
            <td>${data.odemeBilgisi || ''}</td>
            <td>${data.tutar || ''}</td>
            <td>${data.baslangicTarih || ''}</td>
            <td>${data.bitisTarih || ''}</td>
            <td>${data.aciklama || ''}</td>
            <td>
                <div class="action-buttons">
                    <button class="editVeri">Düzenle</button>
                    <button class="saveVeri" style="display:none">Kaydet</button>
                    <button class="deleteVeri">Sil</button>
                </div>
            </td>
        `;
        document.querySelector('#myVeriTable tbody').appendChild(row);
    });
}

// Dropdown menü güncelleme fonksiyonları
function updateBirimDropdown() {
    const birimDropdown = document.getElementById('veriDepartman');
    birimDropdown.innerHTML = ''; // Clear existing options

    const birimData = JSON.parse(localStorage.getItem('birimData')) || [];
    birimData.forEach(item => {
        const option = document.createElement('option');
        option.value = item.ad;
        option.text = item.ad;
        birimDropdown.add(option);
    });
    
    $(birimDropdown).multiselect({
        includeSelectAllOption: true,
        selectAllText: 'Tümünü Seç',
        selectAllValue: 'multiselect-all',
        enableFiltering: true,
        filterPlaceholder: 'Ara...'
    });
}

function updateFirmaDropdown() {
    const firmaDropdown = document.getElementById('veriFirmaAd');
    firmaDropdown.innerHTML = '';
    const firmaData = JSON.parse(localStorage.getItem('firmaData')) || [];
    firmaData.forEach(item => {
        const option = document.createElement('option');
        option.value = item.ad;
        option.text = item.ad;
        firmaDropdown.add(option);
    });
}

// Veri tablosu işlevleri
function handleVeriActions(event) {
    if (event.target.classList.contains('editVeri')) {
        editVeriRow(event.target);
    } else if (event.target.classList.contains('saveVeri')) {
        saveVeriRow(event.target);
    } else if (event.target.classList.contains('deleteVeri')) {
        deleteVeriRow(event.target);
    }
}
document.querySelector('#myBirimTable').addEventListener('click', handleBirimActions);
document.querySelector('#myFirmaTable').addEventListener('click', handleFirmaActions);
document.querySelector('#myBirimTable').addEventListener('click', event => {
    if (event.target.classList.contains('editButton')) {
        editRow(event.target);
    } else if (event.target.classList.contains('saveButton')) {
        saveRow(event.target);
    } else if (event.target.classList.contains('deleteButton')) {
        deleteRow(event.target);
    }
});

document.querySelector('#myFirmaTable').addEventListener('click', event => {
    if (event.target.classList.contains('editButton')) {
        editRow(event.target);
    } else if (event.target.classList.contains('saveButton')) {
        saveRow(event.target);
    } else if (event.target.classList.contains('deleteButton')) {
        deleteRow(event.target);
    }
});

function handleBirimActions(event) {
    const target = event.target;
    if (target.classList.contains('editButton')) {
        editRow(target);
    } else if (target.classList.contains('saveButton')) {
        saveRow(target);
    } else if (target.classList.contains('deleteButton')) {
        deleteRow(target);
    }
}

function handleFirmaActions(event) {
    const target = event.target;
    if (target.classList.contains('editButton')) {
        editRow(target);
    } else if (target.classList.contains('saveButton')) {
        saveRow(target);
    } else if (target.classList.contains('deleteButton')) {
        deleteRow(target);
    }
}


function editVeriRow(button) {
    const row = button.closest('tr');
    row.querySelectorAll('td').forEach(cell => cell.contentEditable = true);
    button.style.display = 'none';
    row.querySelector('.saveVeri').style.display = 'inline';
}

function saveVeriRow(button) {
    const row = button.closest('tr');
    row.querySelectorAll('td').forEach(cell => cell.contentEditable = false);
    button.style.display = 'none';
    row.querySelector('.editVeri').style.display = 'inline';
    saveVeriData();
}

function deleteVeriRow(button) {
    const row = button.closest('tr');
    row.remove();
    saveVeriData();
}


function editRow(button) {
    const row = button.closest('tr');
    if (!row) return; // Exit if row is not found

    const cells = row.querySelectorAll('td[contenteditable]');
    const saveButton = row.querySelector('.saveButton');
    const editButton = row.querySelector('.editButton');
    
    if (cells.length === 0) return; // Exit if no editable cells are found
    if (saveButton) saveButton.style.display = 'inline';
    if (editButton) editButton.style.display = 'none';

    cells.forEach(cell => cell.contentEditable = true);
}


function saveRow(button) {
    const row = button.closest('tr');
    if (!row) return; // Exit if row is not found

    const cells = row.querySelectorAll('td[contenteditable]');
    const editButton = row.querySelector('.editButton');
    const saveButton = row.querySelector('.saveButton');
    
    if (cells.length === 0) return; // Exit if no editable cells are found
    if (saveButton) saveButton.style.display = 'none';
    if (editButton) editButton.style.display = 'inline';
    

    cells.forEach(cell => cell.contentEditable = false);
    saveBirimData();
    saveFirmaData();
}

function deleteRow(button) {
    const row = button.closest('tr');
    row.remove();
    updateRowNumbers(); // Satır silindikten sonra numaraları güncelle
    saveBirimData();    // İlgili verileri kaydet
    saveFirmaData();   // İlgili verileri kaydet
}


function updateRowNumbers() {
    // Firma tablosu için satır numaralarını güncelle
    const firmaRows = document.querySelectorAll('#myFirmaTable tbody tr');
    firmaRows.forEach((row, index) => {
        row.querySelector('td').innerText = index + 1;
    });

    // Birim tablosu için satır numaralarını güncelle
    const birimRows = document.querySelectorAll('#myBirimTable tbody tr');
    birimRows.forEach((row, index) => {
        row.querySelector('td').innerText = index + 1;
    });
}

// jQuery ile multiselect
$(document).ready(function() {
    $('#veriDepartman').multiselect({
        includeSelectAllOption: true, // "Tümünü Seç" seçeneğini ekler
        nonSelectedText: 'Seç', // Hiçbir seçenek seçilmemişse görünen metin
        enableFiltering: true, // Filtreleme özelliğini etkinleştirir
        enableCaseInsensitiveFiltering: true // Büyük/küçük harf duyarlılığını kaldırır
    }) 

updateBirimDropdown(); // Sayfa yüklendiğinde dropdown güncelleme
    
});
$(document).ready(function() {
    // Function to show the selected section and hide others
    function showSection(sectionId) {
        $('#birimTableContainer').hide();
        $('#firmaTableContainer').hide();
        $('#veriTableContainer').hide();
        $(sectionId).show();
    }
    

    // Event listeners for the navbar links
    $('#showBirim').click(function() {
        showSection('#birimTableContainer');
        localStorage.setItem('currentPage', 'birimTableContainer');
    });

    $('#showFirma').click(function() {
        showSection('#firmaTableContainer');
        localStorage.setItem('currentPage', 'firmaTableContainer');
    });

    $('#showVeri').click(function() {
        showSection('#veriTableContainer');
        localStorage.setItem('currentPage', 'veriTableContainer');
    });

    // Show the saved section on page load
    const savedPage = localStorage.getItem('currentPage') || 'birimTableContainer';
    showSection(`#${savedPage}`);
});
document.getElementById('exportButton').addEventListener('click', () => {
    let table, sheetName, fileName;

    if (document.getElementById('birimTableContainer').style.display !== 'none') {
        table = document.querySelector('#birimTable');
        sheetName = "Birim Tablosu";
        fileName = 'birim_tablosu.xlsx';
    } else if (document.getElementById('firmaTableContainer').style.display !== 'none') {
        table = document.querySelector('#firmaTable');
        sheetName = "Firma Tablosu";
        fileName = 'firma_tablosu.xlsx';
    } else if (document.getElementById('veriTableContainer').style.display !== 'none') {
        table = document.querySelector('#myVeriTable');
        sheetName = "Veri Tablosu";
        fileName = 'veri_tablosu.xlsx';
    } else {
        alert('Export edilecek tablo bulunamadı.');
        return;
    }

    // Create a new table to modify
    const newTable = document.createElement('table');
    newTable.innerHTML = table.innerHTML;

    // Remove the last column from each row
    newTable.querySelectorAll('tr').forEach(row => {
        const cells = row.querySelectorAll('th, td');
        if (cells.length > 0) {
            cells[cells.length - 1].remove();
        }
    });

    // Remove the last row
    const rows = newTable.querySelectorAll('tr');
    if (rows.length > 0) {
        const lastRow = rows[rows.length - 1];
        if (lastRow.parentNode) {
            lastRow.parentNode.removeChild(lastRow);
        }
    }

    // Export the modified table
    const wb = XLSX.utils.table_to_book(newTable, { sheet: sheetName });
    XLSX.writeFile(wb, fileName);
});
