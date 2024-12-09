document.addEventListener("DOMContentLoaded", function() {
    var authToken = localStorage.getItem("authToken");
    if (!authToken) {
        window.location.href = "index.html";
    }
    
    var assetType = document.getElementById("assetType");
    var devicesTable = document.getElementById("devicesTable").getElementsByTagName('tbody')[0];
    var searchInput = document.getElementById("searchInput"); 
    var deviceDetails = document.getElementById("deviceDetails");
    var deviceNameElem = document.getElementById("deviceName");
    var detailList = document.getElementById("detailList");

    var data = fetchData();

    function groupBySerialNumber(data) {
        return data.reduce((acc, device) => {
            (acc[device.serialNumber] = acc[device.serialNumber] || []).push(device);
            return acc;
        }, {});
    }

    function renderTable(data) {
        devicesTable.innerHTML = "";
        var groupedData = groupBySerialNumber(data);
        
        for (const [serialNumber, devices] of Object.entries(groupedData)) {
            var row = devicesTable.insertRow();
            var hardwareCell = row.insertCell(0);
            var userCell = row.insertCell(1);

            hardwareCell.textContent = `${devices[0].hardwareName} (${devices.length} Geräte)`;
            hardwareCell.classList.add("device-name");

            userCell.textContent = devices.map(device => `${device.firstName} ${device.lastName}`).join(", ");
            
            hardwareCell.onclick = function() {
                if (deviceDetails.style.display === "block" && deviceNameElem.textContent === devices[0].hardwareName) {
                    deviceDetails.style.display = "none";
                } else {
                    showDeviceDetails(devices);
                }
            }
        }
    }

    function showDeviceDetails(devices) {
        let details = document.getElementById("deviceDetails");
        deviceDetails.style.display = "block";
        deviceNameElem.textContent = devices[0].hardwareName;

        let usersHtml = devices.map(device => `
            <div class="user-item">
                <div class="user-name">${device.firstName} ${device.lastName}</div>
                <div class="user-details">
                    <div><strong>Device Type:</strong> ${device.assetType}</div>
                    <div><strong>Serial Number:</strong> ${device.serialNumber}</div>
                    <div><strong>Software:</strong> ${device.software}</div>
                    <div><strong>License Key:</strong> ${device.licenseKey}</div>
                    <div><strong>Handed Over:</strong> ${device.handedOver}</div>
                    <div><strong>Get Back:</strong> ${device.getBack}</div>
                    <div><strong>Condition:</strong> ${device.hwCondition}</div>
                    <div><strong>In Use:</strong> ${device.inUse ? "Yes" : "No"}</div>
                </div>
            </div>
        `).join("");

        detailList.innerHTML = usersHtml;
        details.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    searchInput.addEventListener("input", function() {
        var filter = searchInput.value.toLowerCase();
        var filteredData = data.filter(function(device) {
            return device.hardwareName.toLowerCase().includes(filter) || 
                device.firstName.toLowerCase().includes(filter) || 
                device.lastName.toLowerCase().includes(filter);
        });
        renderTable(filteredData);
    });

    document.addEventListener("click", function(event) {
        var isClickInsideTable = devicesTable.contains(event.target);
        var isClickInsideDetails = deviceDetails.contains(event.target);
        if (!isClickInsideTable && !isClickInsideDetails) {
            deviceDetails.style.display = "none";
        }
    });

    renderTable(data);
});
