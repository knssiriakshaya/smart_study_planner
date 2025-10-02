const studyLevelSelect = document.getElementById("studyLevel");
const streamSelect = document.getElementById("stream");
const subjectSelect = document.getElementById("subject");
const topicsSelect = document.getElementById("topics");
const deadlineInput = document.getElementById("deadline");
const taskList = document.getElementById("taskList");

const studyLevelSection = document.getElementById("studyLevelSection");
const taskFormSection = document.getElementById("taskFormSection");
const changeLevelBtn = document.getElementById("changeLevelBtn");

const customStreamContainer = document.getElementById("customStreamContainer");
const customSubjectContainer = document.getElementById("customSubjectContainer");
const customTopicContainer = document.getElementById("customTopicContainer");
const customLevelContainer = document.getElementById("customLevelContainer");

const customStreamInput = document.getElementById("customStream");
const customSubjectInput = document.getElementById("customSubject");
const customTopicInput = document.getElementById("customTopic");
const customStudyLevelInput = document.getElementById("customStudyLevel");

// Initial setup
taskFormSection.style.display = "none";
changeLevelBtn.style.display = "none";
customLevelContainer.style.display = "none";
customStreamContainer.style.display = "none";
customSubjectContainer.style.display = "none";
customTopicContainer.style.display = "none";
topicsSelect.disabled = false;

const studyLevelData = {
  "School Education": {
    Mathematics: ["Algebra", "Geometry", "Trigonometry", "Calculus", "Statistics", "Probability"],
    History: ["Ancient History", "Medieval History", "Modern History", "Indian History", "World History"],
    Geography: ["Physical Geography", "Human Geography", "Climatology", "Cartography", "Environmental Geography"],
    Civics: ["Constitution", "Governance", "Rights and Duties", "Political Systems", "Judiciary"],
    Economics: ["Microeconomics", "Macroeconomics", "Economic Development", "Supply and Demand", "Market Structures"],
    Biology: ["Cell Biology", "Genetics", "Human Physiology", "Ecology", "Evolution", "Microbiology"],
    Chemistry: ["Atomic Structure", "Chemical Reactions", "Organic Chemistry", "Thermodynamics", "Periodic Table"],
    Physics: ["Mechanics", "Optics", "Electricity", "Magnetism", "Thermodynamics", "Quantum Physics"],
    English: ["Grammar", "Literature Analysis", "Composition", "Poetry", "Prose"],
    "Foreign Languages": ["Vocabulary", "Grammar", "Conversation", "Translation", "Culture Studies"],
    Hindi: ["Grammar", "Literature", "Composition", "Poetry", "Prose"],
    Telugu: ["Grammar", "Literature", "Composition", "Poetry", "Prose"]
  },

  "Pre-University": {
    "MPC": {
      Mathematics: ["Advanced Calculus", "Vectors", "Integration"],
      Physics: ["Quantum Mechanics", "Electromagnetism"],
      Chemistry: ["Organic Chemistry", "Thermodynamics"],
      English: ["Literature Analysis", "Grammar", "Composition"],
      Sanskrit: ["Classical Literature", "Grammar", "Poetics"]
    },
    "BiPC": {
      Biology: ["Genetics", "Cell Biology", "Human Physiology"],
      Physics: ["Mechanics", "Optics", "Electricity"],
      Chemistry: ["Atomic Structure", "Chemical Reactions", "Organic Chemistry"],
      English: ["Literature Analysis", "Grammar", "Composition"],
      Sanskrit: ["Classical Literature", "Grammar", "Poetics"]
    },
    Commerce: {
      Accountancy: ["Financial Accounting", "Balance Sheets"],
      "Business Studies": ["Principles of Management", "Marketing"],
      Economics: ["Microeconomics", "Macroeconomics"],
      English: ["Literature Analysis", "Grammar", "Composition"],
      Sanskrit: ["Classical Literature", "Grammar", "Poetics"]
    },
    Humanities: {
      History: ["Ancient Civilizations", "Modern History"],
      "Political Science": ["Political Systems", "International Relations"],
      Psychology: ["Cognitive Psychology", "Abnormal Psychology"],
      Sociology: ["Social Structures", "Cultural Dynamics"],
      English: ["Literature Analysis", "Grammar", "Composition"],
      Sanskrit: ["Classical Literature", "Grammar", "Poetics"]
    }
  },

  "Undergraduate": {
    "Computer Science Engineering": {
      "DSA": ["Arrays", "Linked Lists", "Trees", "Graphs", "Sorting", "Searching Algorithms"],
      "OS": ["Processes", "Threads", "Memory Management", "File Systems"],
      "DBMS": ["SQL", "Normalization", "Relational Algebra", "Transaction Management"],
      "Python": ["Syntax", "OOPs Concepts", "Libraries"],
      "AI": ["Neural Networks", "Deep Learning", "Reinforcement Learning"]
    },
    "Mechanical Engineering": {
      Thermodynamics: ["Laws of Thermodynamics", "Heat Engines", "Refrigeration Cycles"],
      "Fluid Mechanics": ["Fluid Properties", "Fluid Statics", "Fluid Dynamics"],
      "Machine Design": ["Design of Gears", "Bearings", "Shafts", "Stress Analysis"]
    },
    "Civil Engineering": {
      "Structural Analysis": ["Beams", "Columns", "Trusses", "Stress-Strain Analysis"],
      "Geotechnical Engineering": ["Soil Mechanics", "Foundation Engineering", "Soil Testing"],
      "Transportation Engineering": ["Highway Design", "Traffic Engineering", "Railway Engineering"]
    }
  },

  "Postgraduate": {
    "Cyber Security": ["Cryptography", "Network Security", "Ethical Hacking", "Cyber Forensics"],
    "Data Science": ["Big Data Analytics", "Machine Learning", "Data Mining", "Statistical Modeling"],
    "Structural Engineering": ["Advanced Structural Analysis", "Finite Element Methods", "Bridge Engineering", "Earthquake Engineering"]
  },

  "Doctoral (Ph.D.)": {
    "Computer Science": ["Novel Algorithm Design", "Database Efficiency", "Security Vulnerabilities"],
    Biology: ["Genetic Mechanisms", "Ecological Impact", "Protein Synthesis"],
    History: ["Comparative Political Systems", "Socioeconomic Impact of Events", "Philosophical Movement Analysis"]
  },

  other: {
    other: []
  }
};

studyLevelSelect.addEventListener("change", () => {
  const level = studyLevelSelect.value;
  if (level === "other") {
    customLevelContainer.style.display = "block";
  } else {
    customLevelContainer.style.display = "none";
  }
});

function confirmLevel() {
  let studyLevel = studyLevelSelect.value;

  if (!studyLevel) {
    alert("Please select a study level.");
    return;
  }

  if (studyLevel === "other") {
    studyLevel = customStudyLevelInput.value.trim();
    if (!studyLevel) {
      alert("Please enter a valid study level.");
      return;
    }
  }

  studyLevelSection.style.display = "none";
  taskFormSection.style.display = "block";
  changeLevelBtn.style.display = "block";

  // If user selected "other", skip dropdowns → show only text fields
  if (studyLevelSelect.value === "other") {
    streamSelect.style.display = "none";
    subjectSelect.style.display = "none";
    topicsSelect.style.display = "none";

    customStreamContainer.style.display = "block";
    customSubjectContainer.style.display = "block";
    customTopicContainer.style.display = "block";
  } else {
    populateStreams(studyLevel);
  }
}


function populateStreams(level) {
  streamSelect.innerHTML = "<option disabled selected>Select stream</option>";

  // Hide stream dropdown for these levels including "other"
  if (
    level === "School Education" || 
    level === "Postgraduate" || 
    level === "Doctoral (Ph.D.)" || 
    level.toLowerCase() === "other"
  ) {
    // If it’s custom "other" level → only text fields
    if (level.toLowerCase() === "other") {
      streamSelect.style.display = "none";
      subjectSelect.style.display = "none";
      topicsSelect.style.display = "none";

      customStreamContainer.style.display = "block";
      customSubjectContainer.style.display = "block";
      customTopicContainer.style.display = "block";
      return;
    }

    streamSelect.style.display = "none";
    customStreamContainer.style.display = "none";
    populateSubjects(level, null);
    return;
  }

  streamSelect.style.display = "block";
  const streams = Object.keys(studyLevelData[level] || {});
  streams.forEach(stream => {
    const opt = document.createElement("option");
    opt.value = stream;
    opt.textContent = stream;
    streamSelect.appendChild(opt);
  });

  const otherStreamOpt = document.createElement("option");
otherStreamOpt.value = "other";
otherStreamOpt.textContent = 'Other (Please select "Other" in subject field also)';
streamSelect.appendChild(otherStreamOpt);

}




streamSelect.addEventListener("change", () => {
  const level = studyLevelSelect.value === "other" ? customStudyLevelInput.value.trim() : studyLevelSelect.value;

  // If stream selection is hidden (e.g., "other" study level), skip
  
  if (streamSelect.style.display === "none") return;

  const stream = streamSelect.value;

  if (stream === "other") {
    // Keep subject and topic dropdowns visible
    customStreamContainer.style.display = "block";
    subjectSelect.style.display = "block";
    topicsSelect.style.display = "block";

    // Hide custom inputs until explicitly selected
    customSubjectContainer.style.display = "none";
    customTopicContainer.style.display = "none";

    // Clear subject/topic dropdowns so user can select
    subjectSelect.innerHTML = "<option disabled selected>Select subject</option>";
    topicsSelect.innerHTML = "<option disabled selected>Select topic</option>";

    // Populate subjects if possible
    populateSubjects(level, null);
  } else {
    customStreamContainer.style.display = "none";
    subjectSelect.style.display = "block";
    topicsSelect.style.display = "block";
    customSubjectContainer.style.display = "none";
    customTopicContainer.style.display = "none";

    populateSubjects(level, stream);
  }
});




function populateSubjects(level, stream = null) {
  subjectSelect.innerHTML = "<option disabled selected>Select subject</option>";
  topicsSelect.innerHTML = "<option disabled selected>Select topic</option>";

  let subjects = [];

  if (!studyLevelData[level]) return;

  if (stream && studyLevelData[level][stream]) {
    subjects = Object.keys(studyLevelData[level][stream]);
  } else if (!stream) {
    subjects = Object.keys(studyLevelData[level]);
  }

  subjects.forEach(subject => {
    const opt = document.createElement("option");
    opt.value = subject;
    opt.textContent = subject;
    subjectSelect.appendChild(opt);
  });

  const otherSubjectOpt = document.createElement("option");
  otherSubjectOpt.value = "other";
  otherSubjectOpt.textContent = "Other";
  subjectSelect.appendChild(otherSubjectOpt);
}

subjectSelect.addEventListener("change", () => {
  const subject = subjectSelect.value;
  topicsSelect.innerHTML = "<option disabled selected>Select topic</option>";

  if (subject === "other") {
    customSubjectContainer.style.display = "block";
    customTopicContainer.style.display = "block";
    topicsSelect.disabled = true;
    return;
  } else {
    customSubjectContainer.style.display = "none";
    topicsSelect.disabled = false;
  }

  let level = studyLevelSelect.value;
  if (level === "other") {
    level = customStudyLevelInput.value.trim();
  }

  let stream = streamSelect.value;
  if (stream === "other") {
    stream = customStreamInput.value.trim();
  }

  if (level && subject && studyLevelData[level]) {
    let topics = [];

    if (stream && studyLevelData[level][stream] && studyLevelData[level][stream][subject]) {
      topics = studyLevelData[level][stream][subject];
    } else if (studyLevelData[level][subject]) {
      topics = studyLevelData[level][subject];
    }

    if (topics) {
      topics.forEach((topic) => {
        const opt = document.createElement("option");
        opt.value = topic;
        opt.textContent = topic;
        topicsSelect.appendChild(opt);
      });
    }
  }

  const otherTopicOpt = document.createElement("option");
  otherTopicOpt.value = "other";
  otherTopicOpt.textContent = "Other";
  topicsSelect.appendChild(otherTopicOpt);

  customTopicContainer.style.display = "none";
});

topicsSelect.addEventListener("change", () => {
  const topic = topicsSelect.value;
  if (topic === "other") {
    customTopicContainer.style.display = "block";
  } else {
    customTopicContainer.style.display = "none";
  }
});

if (deadlineInput) {
  const today = new Date().toISOString().split("T")[0];
  deadlineInput.setAttribute("min", today);
}

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

function addTask() {
  let studyLevel = studyLevelSelect.value === "other" ? customStudyLevelInput.value.trim() : studyLevelSelect.value;

  let subject = "";
  let topic = "";
  let stream = "";

  if (studyLevelSelect.value === "other") {
    // If study level is custom "other" → always use text fields
    stream = customStreamInput.value.trim();
    subject = customSubjectInput.value.trim();
    topic = customTopicInput.value.trim();
  } else {
    // Normal levels
    subject = subjectSelect.value === "other" ? customSubjectInput.value.trim() : subjectSelect.value;
    topic = subjectSelect.value === "other"
      ? customTopicInput.value.trim()
      : (topicsSelect.value === "other" ? customTopicInput.value.trim() : topicsSelect.value);

    if (streamSelect.style.display !== "none") {
      stream = streamSelect.value === "other" ? customStreamInput.value.trim() : streamSelect.value;
    }
  }

  const deadline = deadlineInput.value;

  if (!studyLevel || !subject || !topic || !deadline || topic === "Select topic") {
    alert("Please fill all fields!");
    return;
  }

  const task = {
    level: studyLevel,
    stream,
    subject,
    topic,
    deadline,
    completed: false
  };

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}
function updateProgressBar() {
  const total = tasks.length;
  const done = tasks.filter(t => t.completed).length;
  const progressPercent = total === 0 ? 0 : (done / total) * 100;

  document.getElementById("taskProgress").style.width = progressPercent + "%";
  document.getElementById("progressText").textContent = `${done} / ${total} tasks completed`;
}


function renderTasks() {
  taskList.innerHTML = "";

  // Sort tasks by deadline (earliest first)
  tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${task.level.toUpperCase()}</strong> 
        ${task.stream ? `- ${task.stream}` : ""} <br>
        ${task.subject} (${task.topic}) <br>
        Deadline: ${task.deadline}
      </div>
      <div>
        <button class="complete" onclick="completeTask(${index})">${task.completed ? "Undo" : "Complete"}</button>
        <button class="delete" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    if (task.completed) {
      li.style.textDecoration = "line-through";
      li.style.opacity = "0.7";
    }
    taskList.appendChild(li);
  });
  updateProgressBar();

}



function completeTask(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function changeLevel() {
  studyLevelSection.style.display = "block";
  taskFormSection.style.display = "none";
  changeLevelBtn.style.display = "none";
  studyLevelSelect.value = "";
  streamSelect.innerHTML = "";
  subjectSelect.innerHTML = "";
  topicsSelect.innerHTML = "";
  deadlineInput.value = "";
  customStudyLevelInput.value = "";
  customStreamInput.value = "";
  customSubjectInput.value = "";
  customTopicInput.value = "";
  customLevelContainer.style.display = "none";
  customStreamContainer.style.display = "none";
  customSubjectContainer.style.display = "none";
  customTopicContainer.style.display = "none";
}
