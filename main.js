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

            // Career
            // Career Timeline
            document.getElementById('career').innerHTML = `
                <h4>Career Timeline</h4>
                <ul class="timeline">
                    ${data.experience.map(exp => 
                        `<li>
                            <span class="timeline-year">${exp.duration}</span>
                            <div class="timeline-content">
                                <strong>${exp.title}</strong> at ${exp.company}
                            </div>
                        </li>`
                    ).join('')}
                </ul>
            `;

            // Education Timeline
            document.getElementById('education').innerHTML = `
                <h4>Education Timeline</h4>
                <ul class="timeline">
                    ${data.education.map(edu => 
                        `<li>
                            <span class="timeline-year">${edu.year}</span>
                            <div class="timeline-content">
                                ${edu.degree}, ${edu.institution}
                            </div>
                        </li>`
                    ).join('')}
                </ul>
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