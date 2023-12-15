document.getElementById("form1").addEventListener("submit", submitFun1);

var studentDataArr = JSON.parse(localStorage.getItem("studentData")) || [];

function submitFun1(e) {
    document.querySelector("#tbody").innerHTML = "";
    e.preventDefault();
    var name = document.querySelector("#name").value;
    var number = document.querySelector("#number").value;

    var studentObj = {
        name: name,
        number: number,
        status: "Pending"
    };

    studentDataArr.push(studentObj);
    localStorage.setItem("studentData", JSON.stringify(studentDataArr));
    document.querySelector("#form1").reset();
    alert("Student Added Successfully");

    displayFun(studentDataArr);
}

function displayFun(studentDataArr) {
    var count = 1;
    var tbody = document.querySelector("#tbody");
    tbody.innerHTML = "";

    studentDataArr.forEach(function (item, index) {
        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        td1.textContent = count++;
        var td2 = document.createElement("td");
        td2.textContent = item.name;
        var td3 = document.createElement("td");
        td3.textContent = item.number;
        var td4 = document.createElement("td");

        var btn1 = document.createElement("button");
        btn1.textContent = "P";
        btn1.addEventListener("click", function () {
            item.status = "Present";
            displayFun(studentDataArr);
        });

        var btn2 = document.createElement("button");
        btn2.textContent = "A";
        btn2.addEventListener("click", function () {
            item.status = "Absent";
            displayFun(studentDataArr);
        });

        var btnDelete = document.createElement("button");
        btnDelete.textContent = "Delete";
        btnDelete.classList.add("btn-delete");
        btnDelete.addEventListener("click", function () {
            deleteStudent(index);
        });

        if (item.status === "Pending") {
            td4.appendChild(btn1);
            td4.appendChild(btn2);
            td4.appendChild(btnDelete);
        } else if (item.status === "Present") {
            td4.textContent = "Present";
        } else if (item.status === "Absent") {
            td4.textContent = "Absent";
        }

        tr.append(td1, td2, td3, td4);
        tbody.appendChild(tr);
    });
}

function deleteStudent(index) {
    studentDataArr.splice(index, 1);
    localStorage.setItem("studentData", JSON.stringify(studentDataArr));
    displayFun(studentDataArr);
}

function clearData() {
    localStorage.removeItem("studentData");
    studentDataArr = [];
    document.querySelector("#tbody").innerHTML = "";
    alert("Data Cleared Successfully");
}

document.querySelector("#tbody").addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-delete")) {
        var row = event.target.closest("tr");
        var index = Array.from(row.parentNode.children).indexOf(row);
        deleteStudent(index);
    }
});

displayFun(studentDataArr);
