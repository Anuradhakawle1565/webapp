const students = [
  {
    name: "Anaya Sharma",
    studentId: "STU-101",
    className: "10-A",
    studentId: "SCH-101",
    level: "School",
    department: "Science",
    program: "12 Science",
    term: "12-A",
    attendance: 96,
    grade: 91,
    score: 91,
    credits: 0,
    feeStatus: "Paid",
    status: "Active",
    placementStatus: "Not Applicable",
    advisor: "Mrs. Deshmukh",
  },
  {
    name: "Rohan Mehta",
    studentId: "STU-102",
    className: "10-B",
    studentId: "SCH-102",
    level: "School",
    department: "Commerce",
    program: "11 Commerce",
    term: "11-B",
    attendance: 78,
    grade: 84,
    score: 84,
    credits: 0,
    feeStatus: "Pending",
    status: "Active",
    placementStatus: "Not Applicable",
    advisor: "Mr. Sane",
  },
  {
    name: "Meera Iyer",
    studentId: "STU-103",
    className: "11-A",
    name: "Priya Nair",
    studentId: "COL-201",
    level: "College",
    department: "Computer Science",
    program: "BCA",
    term: "Semester 4",
    attendance: 88,
    grade: 95,
    score: 8.7,
    credits: 82,
    feeStatus: "Paid",
    status: "Active",
    placementStatus: "Training",
    advisor: "Prof. Rao",
  },
  {
    name: "Kabir Khan",
    studentId: "STU-104",
    className: "12-A",
    studentId: "COL-202",
    level: "College",
    department: "Engineering",
    program: "B.Tech CSE",
    term: "Semester 6",
    attendance: 69,
    grade: 73,
    feeStatus: "Pending",
    status: "Review",
    score: 7.1,
    credits: 116,
    feeStatus: "Partial",
    placementStatus: "Training",
    advisor: "Dr. Kulkarni",
  },
  {
    name: "Sara Thomas",
    studentId: "STU-105",
    className: "10-A",
    name: "Meera Iyer",
    studentId: "COL-203",
    level: "College",
    department: "Business Administration",
    program: "BBA",
    term: "Semester 5",
    attendance: 92,
    grade: 87,
    score: 9.1,
    credits: 104,
    feeStatus: "Paid",
    status: "Active",
    placementStatus: "Ready",
    advisor: "Prof. Shah",
  },
  {
    name: "Arjun Patil",
    studentId: "COL-204",
    level: "College",
    department: "Computer Science",
    program: "MCA",
    term: "Semester 2",
    attendance: 84,
    score: 8.2,
    credits: 42,
    feeStatus: "Pending",
    placementStatus: "Not Applicable",
    advisor: "Dr. Menon",
  },
];

const rows = document.querySelector("#studentRows");
const searchInput = document.querySelector("#searchInput");
const classFilter = document.querySelector("#classFilter");
const levelFilter = document.querySelector("#levelFilter");
const departmentFilter = document.querySelector("#departmentFilter");
const form = document.querySelector("#studentForm");
const addButton = document.querySelector("#addStudentBtn");

function average(items, key) {
  if (!items.length) return 0;
  return Math.round(items.reduce((sum, item) => sum + Number(item[key]), 0) / items.length);
  const total = items.reduce((sum, item) => sum + Number(item[key]), 0);
  return Math.round((total / items.length) * 10) / 10;
}

function moneyCount(items) {
  return items.filter((student) => student.feeStatus === "Pending").length;
function pendingFeeCount(items) {
  return items.filter((student) => student.feeStatus !== "Paid").length;
}

function statusBadge(status) {
  const type = status === "Active" ? "good" : "warn";
  return `<span class="badge ${type}">${status}</span>`;
function badge(type, label) {
  return `<span class="badge ${type}">${label}</span>`;
}

function feeBadge(status) {
  const type = status === "Paid" ? "good" : "danger";
  return `<span class="badge ${type}">${status}</span>`;
  if (status === "Paid") return badge("good", status);
  if (status === "Partial") return badge("warn", status);
  return badge("danger", status);
}

function attendanceBadge(value) {
  const type = value >= 85 ? "good" : value >= 75 ? "warn" : "danger";
  return `<span class="badge ${type}">${value}%</span>`;
  if (value >= 85) return badge("good", `${value}%`);
  if (value >= 75) return badge("warn", `${value}%`);
  return badge("danger", `${value}%`);
}

function placementBadge(status) {
  if (status === "Placed" || status === "Ready") return badge("good", status);
  if (status === "Training") return badge("warn", status);
  return badge("neutral", status);
}

function scoreLabel(student) {
  return student.level === "College" ? `${student.score} CGPA` : `${student.score}%`;
}

function getFilteredStudents() {
  const query = searchInput.value.trim().toLowerCase();
  const className = classFilter.value;
  const level = levelFilter.value;
  const department = departmentFilter.value;

  return students.filter((student) => {
    const searchable = `${student.name} ${student.studentId} ${student.className}`.toLowerCase();
    const searchable = [
      student.name,
      student.studentId,
      student.level,
      student.department,
      student.program,
      student.term,
      student.advisor,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = !query || searchable.includes(query);
    const matchesClass = className === "all" || student.className === className;
    return matchesSearch && matchesClass;
    const matchesLevel = level === "all" || student.level === level;
    const matchesDepartment = department === "all" || student.department === department;
    return matchesSearch && matchesLevel && matchesDepartment;
  });
}

function renderStats(items) {
  const collegeStudents = students.filter((student) => student.level === "College");
  const placementReady = students.filter((student) => student.placementStatus === "Ready" || student.placementStatus === "Placed");

  document.querySelector("#totalStudents").textContent = students.length;
  document.querySelector("#collegeStudents").textContent = collegeStudents.length;
  document.querySelector("#avgAttendance").textContent = `${average(students, "attendance")}%`;
  document.querySelector("#avgGrade").textContent = average(students, "grade");
  document.querySelector("#pendingFees").textContent = moneyCount(students);
  document.querySelector("#avgScore").textContent = average(students, "score");
  document.querySelector("#pendingFees").textContent = pendingFeeCount(students);
  document.querySelector("#placementReady").textContent = placementReady.length;

  if (!items.length) {
    rows.innerHTML = `<tr><td colspan="7">No matching student records found.</td></tr>`;
    rows.innerHTML = `<tr><td colspan="10">No matching student records found.</td></tr>`;
  }
}

        <tr>
          <td>
            <strong>${student.name}</strong>
            <small>${student.studentId.toLowerCase()}@openschool.edu</small>
            <small>Advisor: ${student.advisor}</small>
          </td>
          <td>${student.studentId}</td>
          <td>${student.className}</td>
          <td>${student.level}</td>
          <td>
            <strong>${student.program}</strong>
            <small>${student.department}</small>
          </td>
          <td>${student.term}</td>
          <td>${attendanceBadge(student.attendance)}</td>
          <td>${student.grade}</td>
          <td>${scoreLabel(student)}</td>
          <td>${student.credits || "-"}</td>
          <td>${feeBadge(student.feeStatus)}</td>
          <td>${statusBadge(student.status)}</td>
          <td>${placementBadge(student.placementStatus)}</td>
        </tr>
      `
    )
    .filter((student) => student.attendance < 80)
    .sort((a, b) => a.attendance - b.attendance);

  const topStudents = [...students].sort((a, b) => b.grade - a.grade).slice(0, 3);
  const pendingFees = students.filter((student) => student.feeStatus === "Pending");
  const topStudents = [...students].sort((a, b) => b.score - a.score).slice(0, 4);
  const pendingFees = students.filter((student) => student.feeStatus !== "Paid");
  const careerStudents = students.filter((student) => student.level === "College" && student.placementStatus !== "Not Applicable");

  document.querySelector("#attendanceAlerts").innerHTML =
    lowAttendance.length
      ? lowAttendance
          .map((student) => `<li><strong>${student.name}</strong><span>${student.className} | ${student.attendance}% attendance</span></li>`)
          .map((student) => `<li><strong>${student.name}</strong><span>${student.program} | ${student.attendance}% attendance</span></li>`)
          .join("")
      : "<li><strong>All clear</strong><span>No attendance issues.</span></li>";

  document.querySelector("#topStudents").innerHTML = topStudents
    .map((student) => `<li><strong>${student.name}</strong><span>${student.className} | Grade ${student.grade}</span></li>`)
    .map((student) => `<li><strong>${student.name}</strong><span>${student.program} | ${scoreLabel(student)}</span></li>`)
    .join("");

  document.querySelector("#feeAlerts").innerHTML =
    pendingFees.length
      ? pendingFees
          .map((student) => `<li><strong>${student.name}</strong><span>${student.studentId} | Fee pending</span></li>`)
          .map((student) => `<li><strong>${student.name}</strong><span>${student.studentId} | ${student.feeStatus} fee status</span></li>`)
          .join("")
      : "<li><strong>No dues</strong><span>All student fees are paid.</span></li>";

  document.querySelector("#placementAlerts").innerHTML =
    careerStudents.length
      ? careerStudents
          .map((student) => `<li><strong>${student.name}</strong><span>${student.program} | ${student.placementStatus}</span></li>`)
          .join("")
      : "<li><strong>No active placement records</strong><span>Add final-year college students to track placements.</span></li>";
}

function render() {
  students.push({
    name: data.get("name").trim(),
    studentId: data.get("studentId").trim().toUpperCase(),
    className: data.get("className"),
    level: data.get("level"),
    department: data.get("department"),
    program: data.get("program").trim(),
    term: data.get("term").trim(),
    attendance: Number(data.get("attendance")),
    grade: Number(data.get("grade")),
    score: Number(data.get("score")),
    credits: Number(data.get("credits")),
    feeStatus: data.get("feeStatus"),
    status: "Active",
    placementStatus: data.get("placementStatus"),
    advisor: data.get("advisor").trim(),
  });

  form.reset();
  form.level.value = "College";
  form.department.value = "Computer Science";
  form.attendance.value = 90;
  form.grade.value = 75;
  form.score.value = 8.2;
  form.credits.value = 24;
  render();
});

});

searchInput.addEventListener("input", render);
classFilter.addEventListener("change", render);
levelFilter.addEventListener("change", render);
departmentFilter.addEventListener("change", render);

render();
