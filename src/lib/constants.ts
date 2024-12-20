export const GENERATE_RESUME_PROMPT = `
  You are a resume writeer who's job it is to write a specialized resume based on a person's experience and a given job description.

  The resume will be formatted in HTML and should be no more than a single page.

  You should base the resume on the following example: 

  <ExampleResume>
  <body>

    <header>
        <h1>Jake Ryan</h1>
        <p>123-456-7890 | <a href="mailto:jake@su.edu">jake@su.edu</a> | 
        <a href="https://linkedin.com/in/...">linkedin.com/in/jake</a> | 
        <a href="https://github.com/...">github.com/jake</a></p>
    </header>

    <section>
        <h3 class="section-title">Education</h3>
        <ul>
            <li class="item">
                <span class="heading">Southwestern University</span>, Georgetown, TX
                <span class="subheading">Bachelor of Arts in Computer Science, Minor in Business</span>
                <span>Aug. 2018 – May 2021</span>
            </li>
            <li class="item">
                <span class="heading">Blinn College</span>, Bryan, TX
                <span class="subheading">Associate's in Liberal Arts</span>
                <span>Aug. 2014 – May 2018</span>
            </li>
        </ul>
    </section>

    <section>
        <h3 class="section-title">Experience</h3>
            <div class="item">
                <div class="item-header"> 
                    <span class="heading">Undergraduate Research Assistant</span>, Texas A&amp;M University, College Station, TX
                    <span class="subheading">June 2020 – Present</span>
                </div>
                <ul>
                    <li>Developed a REST API using FastAPI and PostgreSQL to store data from learning management systems</li>
                    <li>Developed a full-stack web application using Flask, React, PostgreSQL and Docker to analyze GitHub data</li>
                    <li>Explored ways to visualize GitHub collaboration in a classroom setting</li>
                </ul>
            </div>
            <div class="item">
                <div class="item-header"> 
                    <span class="heading">Information Technology Support Specialist</span>, Southwestern University, Georgetown, TX
                    <span class="subheading">Sep. 2018 – Present</span>
                </div>
                <ul>
                    <li>Communicate with managers to set up campus computers used on campus</li>
                    <li>Assess and troubleshoot computer problems brought by students, faculty and staff</li>
                    <li>Maintain upkeep of computers, classroom equipment, and 200 printers across campus</li>
                </ul>
            </div>
            <div class="item">
                <span class="heading">Artificial Intelligence Research Assistant</span>, Southwestern University, Georgetown, TX
                <span class="subheading">May 2019 – July 2019</span>
                <ul>
                    <li>Explored methods to generate video game dungeons based on <em>The Legend of Zelda</em></li>
                    <li>Developed a game in Java to test the generated dungeons</li>
                    <li>Contributed 50K+ lines of code to an established codebase via Git</li>
                    <li>Conducted a human subject study to determine which video game dungeon generation technique is enjoyable</li>
                    <li>Wrote an 8-page paper and gave multiple presentations on-campus</li>
                    <li>Presented virtually to the World Conference on Computational Intelligence</li>
                </ul>
            </div>
    </section>

    <section>
        <h3 class="section-title">Projects</h3>
            <div class="item">
                <div class="item-header">
                    <span class="heading">Gitlytics</span> | Python, Flask, React, PostgreSQL, Docker
                    <span class="subheading">June 2020 – Present</span>
                </div>
                <ul>
                    <li>Developed a full-stack web application using Flask serving a REST API with React as the frontend</li>
                    <li>Implemented GitHub OAuth to get data from user’s repositories</li>
                    <li>Visualized GitHub data to show collaboration</li>
                    <li>Used Celery and Redis for asynchronous tasks</li>
                </ul>
            </div>
            <div class="item">
                <div class="item-header"> 
                    <span class="heading">Simple Paintball</span> | Spigot API, Java, Maven, TravisCI, Git
                    <span class="subheading">May 2018 – May 2020</span>
                </div>
                <ul>
                    <li>Developed a Minecraft server plugin to entertain kids during free time for a previous job</li>
                    <li>Published plugin to websites gaining 2K+ downloads and an average 4.5/5-star review</li>
                    <li>Implemented continuous delivery using TravisCI to build the plugin upon a new release</li>
                    <li>Collaborated with Minecraft server administrators to suggest features and get feedback about the plugin</li>
                </ul>
            </div>
    </section>

    <section>
        <h3 class="section-title">Technical Skills</h3>
        <ul>
            <li><strong>Languages:</strong> Java, Python, C/C++, SQL (Postgres), JavaScript, HTML/CSS, R</li>
            <li><strong>Frameworks:</strong> React, Node.js, Flask, JUnit, WordPress, Material-UI, FastAPI</li>
            <li><strong>Developer Tools:</strong> Git, Docker, TravisCI, Google Cloud Platform, VS Code, Visual Studio, PyCharm, IntelliJ, Eclipse</li>
            <li><strong>Libraries:</strong> pandas, NumPy, Matplotlib</li>
        </ul>
    </section>

</body>
</ExampleResume>

You will use the following information to generate the resume:

'''
<JobDescription>
  {JOB_DESCRIPTION}
</JobDescription>

<ResumeInfo>
  {INFO}
</ResumeInfo>
'''

Return the HTML resume in the following json format:
{
  content: string,
}

The content variable will store the generate HTML resume.

REMEMBER:

Only use information provided to you
Do not respond with anything other than the HTML resume.
Do not invent information, your knowledge is strictly limited to the information provided in the ResumeInfo Section
You may improve upon the information provided to you but only by rewording the information present.
You should use action words and demonstrate the user's impact.
Try to quantify impact if possible.
You need to choose the ResumeInfo most relevant to the JobDescription. This may require you leaving out osme infomration to keep it within a page limit.
You must ensure the response is valid HTML. The response must be properly formatted HTML code.
`

export const RESUME_CSS = `/* General Styles */
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    line-height: 1.6;
    background-color: #f9f9f9;
    color: #333;
}

/* Header Styles */
header {
    text-align: center;
    background-color: #004080; /* Soft blue background */
    color: white;
    padding: 20px 10px;
}

header h1 {
    font-size: 36px;
    margin: 0;
}

header p {
    margin: 10px 0 0;
    font-size: 16px;
}

header a {
    color: #ffcc00; /* Highlight links in gold */
    text-decoration: none;
}

header a:hover {
    text-decoration: underline;
}

/* Section Styles */
section {
    margin: 30px 15%;
    padding: 20px;
    background: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.section-title {
    font-size: 24px;
    font-weight: bold;
    color: #004080; /* Matches header theme */
    border-bottom: 2px solid #ffcc00; /* Accent underline */
    margin-bottom: 10px;
    padding-bottom: 5px;
}

/* List and Item Styles */
ul {
    padding: 0;
    list-style-type: none;
}

.item {
    margin-bottom: 8px;
}

.item-header {
    display: flex,
    width: 100%,
    flex-direction: row,
    margin-bottom: 2px;
}

.item .heading {
    font-weight: bold;
    font-size: 18px;
    display: block;
    margin-bottom: 5px;
}

.item .subheading {
    font-style: italic;
    color: #555;
    margin-bottom: 5px;
}

.item ul {
    margin-left: 10px;
    list-style-type: disc;
    margin-top: 5px;
}

.item ul li {
    margin-bottom: 5px;
}

/* Skills Section Styles */
section ul li {
    margin-bottom: 5px;
    line-height: 1.4;
}

section ul li strong {
    font-weight: bold;
    color: #004080;
}

/* Responsive Design */
@media (max-width: 768px) {
    section {
        margin: 20px 5%;
    }

    header h1 {
        font-size: 28px;
    }

    header p {
        font-size: 14px;
    }
}
`

export const SIMPLE_RESUME_CSS = `
/* General Styles */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    line-height: 1.5;
    color: #000;
    width: 100%;
}

/* Header Styles */
header {
    text-align: center;
    margin-bottom: 20px;
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
}

header h1 {
    font-size: 24px;
    margin: 0;
}

header p {
    font-size: 14px;
    margin: 5px 0;
}

header a {
    color: inherit;
    text-decoration: none;
}

header a:hover {
    text-decoration: underline;
}

/* Section Styles */
section {
    margin: 5px;
}

.section-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 5px;
}

/* List and Item Styles */
ul {
    padding: 0;
    list-style-type: none;
    margin: 0;
}

.item {
    margin-bottom: 5px;
}

.item .heading {
    font-weight: bold;
    font-size: 16px;
    display: block;
    margin-bottom: 5px;
}

.item-header {
    display: flex,
    width: 100%,
    flex-direction: row,
    margin-bottom: 2px;
}

.item .subheading {
    font-style: italic;
    margin-bottom: 5px;
}

.item ul {
    margin-left: 10px;
    list-style-type: disc;
    margin-top: 5px;
}

.item ul li {
    display: flex,
    width: 100%,
    flex-direction: row,
    margin-bottom: 5px;
}

/* Skills Section Styles */
section ul li {
    margin-bottom: 5px;
}
`