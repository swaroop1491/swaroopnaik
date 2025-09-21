document.addEventListener("DOMContentLoaded", function () {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Header
            document.querySelector('h1').textContent = data.name;
            document.querySelector('.text-center p').innerHTML = `
                <strong>Email:</strong> ${data.contact.email} |
                <strong>Phone:</strong> ${data.contact.phone} |
                <strong>Location:</strong> ${data.contact.location} |
                <a class="icon-link" href="${data.contact.x}" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
                </a>
                <a class="icon-link" href="${data.contact.linkedin}" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                </svg>
                </a>
            `;

            // About
            document.getElementById('about').innerHTML = `
                <h4>About Swaroop</h4>
                <p>${data.about}</p>
            `;

            // Career Timeline with alternating sides and custom color
            document.getElementById('career').innerHTML = `
                <h4>Career Timeline</h4>
                <div class="timeline">
                    ${data.experience.map((exp, idx) => `
                        <div class="container ${idx % 2 === 0 ? 'left' : 'right'}">
                            <div class="content" style="border-left: 8px solid #2196F3; padding: 10px;">
                                <h2 style="color:#2196F3">${exp.duration}</h2>
                                <p><strong>${exp.title}</strong> at ${exp.company}</p>
                                <p>${exp.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;

            // Education Timeline with alternating sides and different color
            document.getElementById('education').innerHTML = `
                <h4>Education Timeline</h4>
                <div class="timeline">
                    ${data.education.map((edu, idx) => `
                        <div class="container ${idx % 2 === 0 ? 'left' : 'right'}">
                            <div class="content" style="border-left: 8px solid #4CAF50; padding: 10px;">
                                <h2 style="color:#4CAF50">${edu.startYear || 'N/A'} - ${edu.endYear || 'N/A'}</h2>
                                <p>${edu.degree}, ${edu.institution}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;

            // Skills
            document.getElementById('skills').innerHTML = `
                <h4>Skills</h4>
                ${data.skills.map(skill =>
                `<span class="badge bg-primary me-1 mb-1">${skill}</span>`
            ).join('')}
            `;

            // Certificates (optional, add if you want)
            // document.getElementById('certificates').innerHTML = `
            //     <h4>Certificates</h4>
            //     <ul>
            //         ${data.certificates.map(cert => 
            //             `<li>${cert.name} (${cert.year})</li>`
            //         ).join('')}
            //     </ul>
            // `;

            // Services
            document.getElementById('services').innerHTML = `
                <h4>Services</h4>
                <ul>
                    ${data.services.map(service =>
                `<li>${service}</li>`
            ).join('')}
                </ul>
            `;

            // Blogs
            document.getElementById('blogs').innerHTML = `
                <h4>Blogs</h4>
                <iframe src="https://telcoshots.blogspot.com/" style="width:100%; height:400px; border:none;"></iframe>
            `;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});