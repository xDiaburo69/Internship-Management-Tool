document.addEventListener("DOMContentLoaded", function() {
<<<<<<< Updated upstream
    var authToken = localStorage.getItem("authToken");
    if (!authToken) {
        window.location.href = "index.html";
    }

    var isAdmin = authToken === "mock-admin-token";
=======

    var authToken = localStorage.getItem("authToken");
    if (!authToken) {
        window.location.href = "login.html";
    }

    var isAdmin = authToken === "mock-admin-token";

>>>>>>> Stashed changes
    var hardwareTable = document.getElementById("hardwareTable").getElementsByTagName('tbody')[0];
    var addDeviceForm = document.getElementById("addDeviceForm");
    var data = fetchData();

    var currentPage = 1;
    var itemsPerPage = 5;

    var modal = document.getElementById("modal");
    var modalContent = document.getElementById("modalDetails");
    var closeModal = document.getElementsByClassName("close")[0];

    function closeModalFunc() {
        modal.style.display = "none";
    }

    closeModal.onclick = closeModalFunc;
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModalFunc();
        }
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {
            closeModalFunc();
        }
    });

    function displayModal(cellValue) {
        if (cellValue) {
            modalContent.textContent = cellValue;
            modal.style.display = "block";
        }
    }

    function createEditableCell(row, cellIndex, value, onSave) {
        var cell = row.insertCell(cellIndex);
        var text = document.createTextNode(value);
        cell.appendChild(text);

        var editButton = document.createElement("button");
        editButton.setAttribute("id", "editButton");
        editButton.innerHTML = "✎";
        editButton.style.marginRight = "-30px";
        editButton.style.marginTop = "-40px";
        cell.appendChild(editButton);

        if (isAdmin)
            editButton.style.marginTop = "-55px";

        editButton.onclick = function(event) {
            event.stopPropagation();
            var originalContent = cell.innerHTML;
            var input = document.createElement("input");
            input.type = "text";
            input.value = value;
            input.style.width = "80%";
            cell.innerHTML = "";
            cell.appendChild(input);

            var saveButton = document.createElement("button");
            saveButton.textContent = "Save";
            cell.appendChild(saveButton);

            saveButton.onclick = function(event) {
                event.stopPropagation();
                onSave(input.value);
                saveData(data);
                renderTable();
            }

            input.onkeydown = function(evt) {
                var key = evt.key;
                if (key === "Enter") {
                    onSave(input.value);
                    saveData(data);
                    renderTable();
                } else if (key === "Escape") {
                    cell.innerHTML = originalContent;
                    renderTable();
                }
            }
            input.focus();
        }

        if (cellIndex !== 11 && cellIndex !== 15 && cellIndex !== 6 && cellIndex !== 14) {
            cell.addEventListener("click", function() {
                displayModal(value);
            });
        }
    }

    function createInput(type, value) {
        let input = document.createElement("input");
        input.type = type;

        if (type === "checkbox") {
            input.checked = value;
        } else {
            input.value = value;
        }

        return input;
    }

    function createCell(row, cellIndex, value, child) {
        var cell = row.insertCell(cellIndex);

        if (child) {
            cell.appendChild(child);
        } else {
            cell.appendChild(document.createTextNode(value));
        }

        if (cellIndex !== 11 && cellIndex !== 15 && cellIndex !== 6 && cellIndex !== 14) {
            cell.addEventListener("click", function() {
                displayModal(value);
            });
        }
    }

    function renderTable() {
        hardwareTable.innerHTML = "";

        var groupedData = data.reduce(function(acc, device) {
            if (!acc[device.serialNumber]) {
                acc[device.serialNumber] = [];
            }
            acc[device.serialNumber].push(device);
            return acc;
        }, {});

        var groupedDataArray = Object.values(groupedData);

        var totalPages = Math.ceil(groupedDataArray.length / itemsPerPage);

        var startIndex = (currentPage - 1) * itemsPerPage;
        var endIndex = Math.min(startIndex + itemsPerPage, groupedDataArray.length);

        for (let i = startIndex; i < endIndex; i++) {
            var deviceGroup = groupedDataArray[i];

<<<<<<< Updated upstream
            deviceGroup.sort(function(a, b) {
                var dateA = new Date(a.handedOver);
                var dateB = new Date(b.handedOver);
                return dateB - dateA;
            });

            var groupRow = hardwareTable.insertRow();
            createCell(groupRow, 0, deviceGroup[0].assetType);
            createCell(groupRow, 1, deviceGroup[0].hardwareName);
            createCell(groupRow, 2, deviceGroup[0].serialNumber);
            createCell(groupRow, 3, "");
            createCell(groupRow, 4, "");
            createCell(groupRow, 5, "");
            createCell(groupRow, 6, "");
            createCell(groupRow, 7, "");
            createCell(groupRow, 8, "");
            createCell(groupRow, 9, "");
            createCell(groupRow, 10, "");
            createCell(groupRow, 11, "");
            createCell(groupRow, 12, "");
            createCell(groupRow, 13, "");
            createCell(groupRow, 14, "");
            createCell(groupRow, 15, "");
            groupRow.style.backgroundColor = "#cddae4";

            deviceGroup.forEach(function(device) {
                var row = hardwareTable.insertRow();
                createCell(row, 0, "");
                createCell(row, 1, "");
                createCell(row, 2, "");
                createCell(row, 3, device.cpu);
                createCell(row, 4, device.ram);
                createCell(row, 5, device.ssdhdd);
                createEditableCell(row, 6, device.software, function(newValue) { device.software = newValue; });
                createEditableCell(row, 7, device.licenseKey, function(newValue) { device.licenseKey = newValue; });
                createCell(row, 8, device.firstName);
                createCell(row, 9, device.lastName);
                createCell(row, 10, device.handedOver);

                let dateInput = createInput("date", device.getBack);
                dateInput.onchange = function() {
                    device.getBack = dateInput.value;
                    saveData(data);
                }
                createCell(row, 11, device.getBack, dateInput);

                createCell(row, 12, device.hwCondition);
                createEditableCell(row, 13, device.comment, function(newValue) { device.comment = newValue; });

                let inUseInput = createInput("checkbox", device.inUse);
                inUseInput.onchange = function() {
                    device.inUse = inUseInput.checked;
                    saveData(data);
                }
                createCell(row, 14, device.inUse, inUseInput);

                if (isAdmin) {
                    var deleteButton = document.createElement("button");
                    deleteButton.textContent = "Delete";

                    deleteButton.onclick = function() {
                        if (confirm("Are you sure you want to delete this item?")) {
                            var deviceIndex = data.indexOf(device);
                            if (deviceIndex !== -1) {
                                data.splice(deviceIndex, 1);
                                saveData(data);
                                renderTable();
                            }
                        }
                    }

                    createCell(row, 15, "Delete", deleteButton);
                } else {
                    createCell(row, 15, "", null);
                }
            });
        }

        document.getElementById("pagination").textContent = `Page ${currentPage} of ${totalPages}`;
        document.getElementById("prevButton").disabled = currentPage === 1;
        document.getElementById("nextButton").disabled = currentPage === totalPages;
=======
            // var actionsCell = row.insertCell(10); // Zelle für die Aktionen erstellen
            if (isAdmin) {
                var deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";

                deleteButton.onclick = function() {
                    if (confirm("Are you sure you want to delete this item?")) {
                        data.splice(index, 1);
                        saveData(data);
                        renderTable();
                    }
                };

                createCell(row, 10, "Delete", deleteButton);
            } else {
                createCell(row, 10, "", null); // Leere Zelle für Nicht-Admins
            }
        });
>>>>>>> Stashed changes
    }

    addDeviceForm.addEventListener("submit", function(event) {
        event.preventDefault();
        var newDevice = {
            assetType: document.getElementById("assetType").value.trim(),
            hardwareName: document.getElementById("hardwareName").value.trim(),
            serialNumber: document.getElementById("serialNumber").value.trim(),
            cpu: document.getElementById("cpu").value.trim(),
            ram: document.getElementById("ram").value.trim(),
            ssdhdd: document.getElementById("ssdhdd").value.trim(),
            software: document.getElementById("software").value.trim(),
            licenseKey: document.getElementById("licenseKey").value.trim(),
            firstName: document.getElementById("firstName").value.trim(),
            lastName: document.getElementById("lastName").value.trim(),
            handedOver: document.getElementById("handedOver").value,
            getBack: document.getElementById("getBack").value,
            hwCondition: document.getElementById("hwCondition").value.trim(),
            comment: document.getElementById("comment").value.trim(),
            inUse: document.getElementById("inUse").checked
        }

        data.push(newDevice);
        saveData(data);
        renderTable();
        addDeviceForm.reset();
    });

    document.getElementById("prevButton").addEventListener("click", function() {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });

    document.getElementById("nextButton").addEventListener("click", function() {
        var totalPages = Math.ceil(data.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
        }
    });

    function adjustTableWidth() {
        var hardwareTable = document.getElementById("hardwareTable");
        hardwareTable.style.width = "100%";
        hardwareTable.style.tableLayout = "fixed";

        var cells = hardwareTable.getElementsByTagName('th');
        for (var i = 0; i < cells.length; i++) {
            cells[i].style.wordWrap = "break-word";
        }
        cells = hardwareTable.getElementsByTagName('td');
        for (var i = 0; i < cells.length; i++) {
            cells[i].style.wordWrap = "break-word";
        }
    }

    adjustTableWidth();
    window.addEventListener('resize', adjustTableWidth);

    renderTable();
});