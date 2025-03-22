document.addEventListener("DOMContentLoaded", () => {
    const projectNav = document.getElementById("project-nav");
    const projectDisplay = document.getElementById("project-display");

    // Fetch tasks data from the JSON file
    fetch('tasks.json')
        .then(response => response.json())
        .then(data => {
            // Populate the sidebar with project titles
            data.forEach((task, index) => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = "#";
                link.textContent = task.title;
                link.addEventListener("click", () => displayTask(task));
                listItem.appendChild(link);
                projectNav.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error loading tasks:", error));

    // Function to display the selected task's content
    function displayTask(task) {
        // Clear the previous content in the display area
        projectDisplay.innerHTML = `
            <h2>${task.title}</h2>
            <p>${task.description}</p>
        `;

        // If the task has HTML files (like Task 1)
        if (task.htmlFiles) {
            const iframe = document.createElement('iframe');
            iframe.src = task.htmlFiles[0];  // Load the first HTML file (Task 1)
            iframe.style.width = "100%";
            iframe.style.height = "600px";
            iframe.style.border = "none";
            projectDisplay.appendChild(iframe);

            // Load the associated CSS for Task 1
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = task.cssFile;
            iframe.contentWindow.document.head.appendChild(link);
        } 
        // If the task has a single HTML file (like Task 2 and Task 8)
        else if (task.htmlFile) {
            const iframe = document.createElement('iframe');
            iframe.src = task.htmlFile;  // Load HTML file for Task 8
            iframe.style.width = "100%";
            iframe.style.height = "600px";
            iframe.style.border = "none";
            projectDisplay.appendChild(iframe);

            // If the task has a JS file, load it dynamically
            if (task.jsFile) {
                const script = document.createElement("script");
                script.src = task.jsFile;
                script.defer = true;
                document.body.appendChild(script);
            }

            // Load the associated CSS for Task 8
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = task.cssFile;
            iframe.contentWindow.document.head.appendChild(link);
        }
    }
});
