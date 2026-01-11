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

            // Animated avatar: replace static image with a canvas-based face
            const avatarCanvas = document.getElementById('avatarCanvas');
            if (avatarCanvas && avatarCanvas.getContext) {
                const ctx = avatarCanvas.getContext('2d');
                let DPR = window.devicePixelRatio || 1;
                function resizeCanvas() {
                    const size = 220;
                    avatarCanvas.style.width = size + 'px';
                    avatarCanvas.style.height = size + 'px';
                    avatarCanvas.width = Math.floor(size * DPR);
                    avatarCanvas.height = Math.floor(size * DPR);
                    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
                }
                resizeCanvas();
                window.addEventListener('resize', () => { DPR = window.devicePixelRatio || 1; resizeCanvas(); });

                let last = 0;
                let blinkTimer = 0;
                let isBlinking = false;
                let wavePhase = 0; // controls waving arm

                function drawFace(now) {
                    const t = now / 1000;
                    const size = Math.min(220, avatarCanvas.clientWidth);
                    ctx.clearRect(0, 0, avatarCanvas.width, avatarCanvas.height);

                    // smooth time
                    const dt = Math.min(0.05, (now - last) / 1000 || 0);
                    last = now;

                    // blinking logic: blink every 3-6s
                    blinkTimer -= dt;
                    if (blinkTimer <= 0) {
                        isBlinking = true;
                        blinkTimer = 3 + Math.random() * 3;
                        setTimeout(() => { isBlinking = false; }, 120);
                    }

                    // waving: continuous subtle sine (stronger amplitude for visible motion)
                    wavePhase = (wavePhase + dt * 2.6) % (Math.PI * 2);
                    const waveAngle = Math.sin(wavePhase) * 1.1; // radians

                    const cx = size / 2;
                    const cy = size / 2 - 6;
                    const headR = size * 0.38;

                    // background subtle radial
                    const g = ctx.createLinearGradient(0, 0, size, size);
                    g.addColorStop(0, 'rgba(255,255,255,0.06)');
                    g.addColorStop(1, 'rgba(255,255,255,0)');
                    ctx.fillStyle = g;
                    ctx.fillRect(0, 0, size, size);

                    // head
                    ctx.beginPath();
                    ctx.fillStyle = '#ffeccf';
                    ctx.strokeStyle = 'rgba(0,0,0,0.06)';
                    ctx.lineWidth = 2;
                    ctx.arc(cx, cy, headR, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();

                    // cheeks
                    ctx.beginPath();
                    ctx.fillStyle = 'rgba(255,120,120,0.12)';
                    ctx.arc(cx - headR * 0.45, cy + headR * 0.18, headR * 0.12, 0, Math.PI * 2);
                    ctx.arc(cx + headR * 0.45, cy + headR * 0.18, headR * 0.12, 0, Math.PI * 2);
                    ctx.fill();

                    // eyes (blinking)
                    const eyeY = cy - headR * 0.12;
                    const eyeXOffset = headR * 0.36;
                    const eyeW = headR * 0.24;
                    const eyeH = isBlinking ? 2 : headR * 0.14;

                    ctx.fillStyle = '#fff';
                    // left eye
                    ctx.beginPath();
                    roundRect(ctx, cx - eyeXOffset - eyeW / 2, eyeY - eyeH / 2, eyeW, eyeH, 8);
                    ctx.fill();
                    // right eye
                    ctx.beginPath();
                    roundRect(ctx, cx + eyeXOffset - eyeW / 2, eyeY - eyeH / 2, eyeW, eyeH, 8);
                    ctx.fill();

                    // pupils (hide when blinking)
                    if (!isBlinking) {
                        ctx.fillStyle = '#2b2b2b';
                        ctx.beginPath();
                        ctx.arc(cx - eyeXOffset, eyeY, headR * 0.06, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.beginPath();
                        ctx.arc(cx + eyeXOffset, eyeY, headR * 0.06, 0, Math.PI * 2);
                        ctx.fill();
                    } else {
                        // draw subtle eyelid line when blinking
                        ctx.strokeStyle = 'rgba(50,50,50,0.65)';
                        ctx.lineWidth = Math.max(2, headR * 0.06);
                        ctx.beginPath();
                        ctx.moveTo(cx - eyeXOffset - eyeW / 2 + 4, eyeY);
                        ctx.lineTo(cx - eyeXOffset + eyeW / 2 - 4, eyeY);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(cx + eyeXOffset - eyeW / 2 + 4, eyeY);
                        ctx.lineTo(cx + eyeXOffset + eyeW / 2 - 4, eyeY);
                        ctx.stroke();
                    }

                    // mouth (smile)
                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(50,50,50,0.7)';
                    ctx.lineWidth = 3;
                    const mouthW = headR * 0.9;
                    const mouthH = headR * 0.28;
                    ctx.arc(cx, cy + headR * 0.25, mouthW / 2, Math.PI * 0.15, Math.PI * 0.85);
                    ctx.stroke();

                    // left arm (static)
                    // right arm waving: shoulder at right-bottom of head
                    const shoulderX = cx + headR * 0.8;
                    const shoulderY = cy + headR * 0.1;
                    // draw upper arm (rotating)
                    ctx.save();
                    ctx.translate(shoulderX, shoulderY);
                    ctx.rotate(waveAngle);
                    // upper arm
                    ctx.fillStyle = '#f6d8b0';
                    roundRect(ctx, 0, -6, headR * 0.9, headR * 0.22, headR * 0.12);
                    // hand
                    ctx.beginPath();
                    ctx.arc(headR * 0.9 + 6, 0, headR * 0.16, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();

                    // hair accent
                    ctx.beginPath();
                    ctx.fillStyle = 'rgba(30,60,120,0.06)';
                    ctx.ellipse(cx - headR * 0.32, cy - headR * 0.8, headR * 0.9, headR * 0.6, -0.6, 0, Math.PI * 2);
                    ctx.fill();

                    requestAnimationFrame(drawFace);
                }

                // tiny helper for rounded rect
                function roundRect(ctx, x, y, w, h, r) {
                    const radius = Math.min(r, h / 2, w / 2);
                    ctx.moveTo(x + radius, y);
                    ctx.arcTo(x + w, y, x + w, y + h, radius);
                    ctx.arcTo(x + w, y + h, x, y + h, radius);
                    ctx.arcTo(x, y + h, x, y, radius);
                    ctx.arcTo(x, y, x + w, y, radius);
                    ctx.closePath();
                }

                requestAnimationFrame(drawFace);
            }

            // Set LinkedIn button
            const linkedinHref = data.contact.linkedin && (data.contact.linkedin.src || data.contact.linkedin);
            const linkedinBtn = document.getElementById('linkedinBtn');
            if (linkedinHref) {
                linkedinBtn.href = linkedinHref;
                linkedinBtn.textContent = 'Connect on LinkedIn';
            } else {
                linkedinBtn.style.display = 'none';
            }

            // Contact button opens mail client to your address
            const contactBtn = document.getElementById('contactBtn');
            if (contactBtn) {
                const mail = 'snaik303@gmail.com';
                const subject = encodeURIComponent('Message from website');
                const body = encodeURIComponent('\n\n--\nSent from profile site');
                contactBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.location.href = `mailto:${mail}?subject=${subject}&body=${body}`;
                });
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
                            <div class="inner">
                                <div class="content" style="border-left: 6px solid var(--accent); padding: 12px 14px;">
                                    <div class="meta">${exp.duration}</div>
                                    <h3 class="job-title">${exp.title}</h3>
                                    <div class="company">${exp.company}</div>
                                    <p>${exp.description}</p>
                                </div>
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
                            <div class="inner">
                                <div class="content" style="border-left: 6px solid var(--accent-2); padding: 12px 14px;">
                                    <div class="meta">${edu.startYear || 'N/A'} - ${edu.endYear || 'N/A'}</div>
                                    <h3 class="job-title">${edu.degree}</h3>
                                    <div class="company">${edu.institution}</div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;

            // Skills with animated bars
            const skillPercents = {
                'JavaScript': 92,
                'Python': 88,
                'React': 90,
                'Node.js': 86,
                'SQL': 80,
                'Docker': 78,
                'Scrum Master': 88,
                'Product Owner': 90,
                'Agile Methodologies': 90,
                'Sprint Planning': 86,
                'Backlog Management': 88,
                'User Stories': 85,
                'Acceptance Criteria': 84,
                'Sprint Retrospectives': 82,
                'Stakeholder Management': 87,
                'Roadmapping': 86,
                'Prioritization': 88,
                'JIRA': 86,
                'Confluence': 82,
                'Release Planning': 84,
                'Cross-functional Leadership': 88,
                'Product Strategy': 86,
                'Metrics & KPIs': 82,
                'OKRs': 80,
                'User Research': 78,
                'UX Collaboration': 76,
                'Requirement Analysis': 85,
                'Facilitation': 84,
                'Coaching': 80,
                'Communication': 90
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

            // IntersectionObserver to trigger timeline 'in-view' animations
            const obs = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    }
                });
            }, {threshold: 0.25});
            document.querySelectorAll('.timeline .container').forEach(el => obs.observe(el));
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});