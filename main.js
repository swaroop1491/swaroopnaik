document.addEventListener("DOMContentLoaded", function () {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Header
            document.querySelector('h1').textContent = data.name;
            document.querySelector('.text-center p').innerHTML = `
                <strong>Email:</strong> ${data.contact.email} |
                <strong>Phone:</strong> ${data.contact.phone} |
                <strong>Location:</strong> ${data.contact.location}
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
                <ul>
                    ${data.blogs.map(blog => 
                        `<li><a href="${blog.url}">${blog.title}</a></li>`
                    ).join('')}
                </ul>
            `;
        })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        });