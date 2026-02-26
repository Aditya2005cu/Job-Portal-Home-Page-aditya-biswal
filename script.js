// 1. Our Mock Database (Now with Unique IDs!) 🗄️
const jobsDatabase = [
    { id: 1, title: "Frontend Developer 🎨💻", company: "Tech Innovators", location: "Bangalore", category: "it", skills: "html, css, javascript", description: "Required: HTML, CSS, Basic JavaScript." },
    { id: 2, title: "Full Stack Developer ⚙️🌐", company: "EdTech Solutions", location: "Chandigarh", category: "full-stack", skills: "java, html, css, full stack", description: "Required: Java backend, HTML/CSS frontend." },
    { id: 3, title: "Cyber Security Analyst 🔐", company: "SecureNet India", location: "Delhi", category: "it", skills: "security, networking, python", description: "Required: Network monitoring and ethical hacking skills." },
    { id: 4, title: "Avionics Software Engineer ✈️", company: "AeroDynamics", location: "Pune", category: "it", skills: "c++, python, hardware", description: "Required: C++ & Python for flight control systems." },
    { id: 5, title: "Financial Analyst 💰", company: "Global Bank", location: "Mumbai", category: "finance", skills: "excel, accounting, math", description: "Required: Strong accounting and Excel skills." },
    { id: 6, title: "Digital Marketer 📱📈", company: "AdSpace Inc.", location: "Remote", category: "it", skills: "seo, social media", description: "Required: SEO, Social Media Management." }
];

// 2. The Dynamic Search Function ⚙️✨
function revealJobs() {
    document.getElementById("job-results").style.display = "block";
    const categoryInput = document.getElementById("job-category").value.toLowerCase();
    const skillsInput = document.getElementById("skills").value.toLowerCase().trim();
    const locationInput = document.getElementById("location").value.toLowerCase().trim();
    const resultsContainer = document.getElementById("dynamic-job-list");
    resultsContainer.innerHTML = ""; 

    const filteredJobs = jobsDatabase.filter(job => {
        const matchesCategory = (categoryInput === "all" || job.category === categoryInput);
        const matchesLocation = (locationInput === "" || job.location.toLowerCase().includes(locationInput));
        const matchesSkills = (skillsInput === "" || job.skills.toLowerCase().includes(skillsInput) || job.title.toLowerCase().includes(skillsInput));
        return matchesCategory && matchesLocation && matchesSkills;
    });

    if (filteredJobs.length === 0) {
        resultsContainer.innerHTML = "<h3 style='color: #cf0833;'>No jobs found matching your search. Try changing the filters! 😢</h3>";
    } else {
        filteredJobs.forEach(job => {
            // 👇 NOTICE THE NEW ONCLICK EVENT IN THE BUTTON! 
            const jobCardHTML = `
                <div class="job-card">
                    <h4 style="margin-top: 0; color: #333;">${job.title}</h4>
                    <p style="color: #666; font-size: 14px;"><strong>${job.company}</strong> | 📍 ${job.location}</p>
                    <p style="color: #444; font-size: 14px;">${job.description}</p>
                    <button class="apply-btn" onclick="applyToJob(${job.id})">Apply 💌</button>
                </div>
            `;
            resultsContainer.innerHTML += jobCardHTML;
        });
    }
}

// 3. THE NEW APPLICATION FUNCTION 💌💾
function applyToJob(jobId) {
    // Find the exact job the user clicked using its ID
    const selectedJob = jobsDatabase.find(job => job.id === jobId);

    // Retrieve the user's existing applications from browser memory (or create an empty array if it's their first time)
    let appliedJobs = JSON.parse(localStorage.getItem("myApplications")) || [];

    // Check if they already applied to prevent duplicates!
    const alreadyApplied = appliedJobs.some(job => job.id === jobId);

    if (!alreadyApplied) {
        // Add a "Status" and "Date" to the job data
        const newApplication = {
            ...selectedJob,
            status: "Under Review ⏳", 
            dateApplied: new Date().toLocaleDateString()
        };
        
        // Add it to the list and save it back to browser memory
        appliedJobs.push(newApplication);
        localStorage.setItem("myApplications", JSON.stringify(appliedJobs));
    } else {
        alert("You have already applied for this position! 🚀");
    }

    // Redirect the user to the new dashboard page! 🌍
    window.location.href = "applied-jobs.html";
}