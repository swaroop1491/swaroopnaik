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

            // Set avatar using Dicebear avatars (deterministic by name)
            const avatar = document.getElementById('avatar');
            avatar.src = `https://api.dicebear.com/8.x/pixel-art/png?seed=${encodeURIComponent(data.name)}&scale=90`;

            // Set LinkedIn button
            const linkedinHref = data.contact.linkedin && (data.contact.linkedin.src || data.contact.linkedin);
            const linkedinBtn = document.getElementById('linkedinBtn');
            if (linkedinHref) {
                linkedinBtn.href = linkedinHref;
                linkedinBtn.textContent = 'Connect on LinkedIn';
            } else {
                linkedinBtn.style.display = 'none';
            }

            // About
            document.getElementById('about').innerHTML = `
                <h4>About</h4>
                <p>${data.about}</p>
            `;

            // Career Timeline with alternating sides and custom color
            document.getElementById('career').innerHTML = `
                <h4>Career Timeline</h4>
                <div class="timeline">
                    ${data.experience.map((exp, idx) => `
                        <div class="container ${idx % 2 === 0 ? 'left' : 'right'}" style="--i:${idx}">
                            <div class="content" style="border-left: 6px solid var(--accent); padding: 10px;">
                                <h2 style="color:var(--accent)">${exp.duration}</h2>
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
                        <div class="container ${idx % 2 === 0 ? 'left' : 'right'}" style="--i:${idx}">
                            <div class="content" style="border-left: 6px solid var(--accent-2); padding: 10px;">
                                <h2 style="color:var(--accent-2)">${edu.startYear || 'N/A'} - ${edu.endYear || 'N/A'}</h2>
                                <p>${edu.degree}, ${edu.institution}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;

            // Skills with animated bars
            const skillPercents = {
                'JavaScript': 92,'Python':88,'React':90,'Node.js':86,'SQL':80,'Docker':78
            };
            document.getElementById('skills').innerHTML = `
                <h4>Skills</h4>
                <div class="skills-list">
                    ${data.skills.map(skill => `
                        <div class="skill">
                          <div class="label">${skill}</div>
                          <div class="bar"><i style="width:0%" data-target="${skillPercents[skill] || 60}"></i></div>
                        </div>
                    `).join('')}
                </div>
            `;

            // Animate skill bars after a short delay for nice effect
            setTimeout(() => {
                document.querySelectorAll('#skills .bar > i').forEach(el => {
                    const target = el.getAttribute('data-target') || 60;
                    el.style.width = target + '%';
                });
            }, 300);

            // Services
            document.getElementById('services').innerHTML = `
                <h4>Services</h4>
                <ul>
                    ${data.services.map(service =>
                `<li>${service}</li>`
            ).join('')}
                </ul>
            `;

            // Blogs (kept as iframe)
            document.getElementById('blogs').innerHTML = `
                <h4>Blogs</h4>
                <iframe src="https://telcoshots.blogspot.com/" style="width:100%; height:420px; border:none; border-radius:8px; overflow:hidden"></iframe>
            `;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});