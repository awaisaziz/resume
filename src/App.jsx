import React, { useState, useEffect, useRef } from 'react';
import yaml from 'js-yaml';
import { marked } from 'marked';

// --- Components ---

const Navbar = ({ activeSection, theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['about', 'experience', 'education', 'certifications', 'research', 'projects', 'resume', 'contact'];

  return (
    <header id="navbar" className={scrolled ? 'scrolled' : ''}>
      <nav className="nav-container">
        <a className="nav-logo" href="#hero">Awais Aziz</a>
        <div className="nav-controls" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem', padding: '0.5rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)'
            }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
        <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          <span></span><span></span><span></span>
        </button>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {links.map((link) => (
            <li key={link}>
              <a
                href={link === 'about' ? '#hero' : `#${link}`}
                className={(activeSection === link || (link === 'about' && activeSection === 'hero')) ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisible, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={`back-to-top ${visible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
      <span>Top</span>
    </button>
  );
};

const Hero = ({ meta, bodyHtml, tagline, base }) => (
  <section id="hero" className="hero-section">
    <div className="hero-content">
      <div className="hero-left">
        <div className="hero-avatar-wrap">
          <img
            id="heroAvatar"
            src={`${base}profile.jpg`}
            alt={meta?.name || "Awais Aziz"}
            className="hero-avatar"
            onError={(e) => { e.target.src = 'https://avatars.githubusercontent.com/u/52965709?v=4'; }}
          />
        </div>
        <div className="hero-social-links">
          {meta?.email && (
            <a href={`mailto:${meta.email}`} className="social-icon email-link" title="Email">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <span>{meta.email}</span>
            </a>
          )}
          {meta?.linkedin && (
            <a href={meta.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon" title="LinkedIn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              <span>{meta.linkedin.replace(/https?:\/\/(www\.)?/, '')}</span>
            </a>
          )}
          {meta?.github && (
            <a href={meta.github} target="_blank" rel="noopener noreferrer" className="social-icon" title="GitHub">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
              <span>{meta.github.replace(/https?:\/\/(www\.)?/, '')}</span>
            </a>
          )}
          {meta?.aws && (
            <a href={meta.aws} target="_blank" rel="noopener noreferrer" className="social-icon" title="AWS Certifications">
              <span style={{ fontWeight: 800, fontSize: '1.1em' }}>AWS</span>
              <span>Certifications</span>
            </a>
          )}
        </div>
      </div>
      <div className="hero-text">
        <p className="hero-greeting">Hello, I'm</p>
        <h1 className="hero-name gradient-text">{meta?.name || "Awais Aziz"}</h1>
        <p className="hero-title dynamic-text">{tagline || meta?.title || "Software Engineer & AI/ML Enthusiast"}</p>
        <div className="hero-bio" dangerouslySetInnerHTML={{ __html: bodyHtml }} />

      </div>
    </div>
    <div className="hero-scroll-indicator"><span></span></div>
  </section>
);

const Section = ({ id, title, children, subtitle }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} ref={ref} className={`section fade-in ${isVisible ? 'visible' : ''}`}>
      <div className="container">
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
};

const FadeInChild = ({ children, delay = 0, className = '', onClick }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setIsVisible(true), delay);
        observer.disconnect();
      }
    }, { threshold: 0.12 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`fade-in ${isVisible ? 'visible' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const Experience = ({ items }) => {
  if (!items || items.length === 0) return <p className="text-muted">No experience entries found.</p>;
  return (
    <div className="timeline">
      {items.map((item, idx) => (
        <FadeInChild key={idx} delay={idx * 80} className="timeline-item">
          <span className="timeline-year">{item.date}</span>
          <div className="timeline-degree">{item.role}</div>
          <div className="timeline-institution">💼 {item.company}</div>
          <ul className="timeline-desc experience-list">
            {(item.highlights || []).map((h, i) => <li key={i}>{h}</li>)}
          </ul>
        </FadeInChild>
      ))}
    </div>
  );
};

const Education = ({ items }) => {
  if (!items || items.length === 0) return <p className="text-muted">No education entries found.</p>;
  return (
    <div className="timeline">
      {items.map((item, idx) => (
        <FadeInChild key={idx} delay={idx * 80} className="timeline-item">
          <span className="timeline-year">{item.year}</span>
          <div className="timeline-degree">{item.degree}</div>
          <div className="timeline-institution">🎓 {item.institution}</div>
          <p className="timeline-desc">{item.description}</p>
        </FadeInChild>
      ))}
    </div>
  );
};

const Research = ({ items }) => {
  if (!items || items.length === 0) return <p className="text-muted">No research entries found.</p>;
  return (
    <div className="research-grid">
      {items.map((res, idx) => (
        <FadeInChild key={idx} delay={idx * 80} className="research-card">
          <div className="research-header">
            <span className="research-type">{res.type}</span>
            <span className="research-date">{res.date}</span>
          </div>
          <h3 className="research-title">{res.title}</h3>
          <p className="research-venue">📍 {res.venue}</p>
          <p className="research-authors">👥 {res.authors}</p>
          <div className="research-actions">
            {res.url && <a href={res.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">Read Paper ↗</a>}
          </div>
        </FadeInChild>
      ))}
    </div>
  );
};

const ContactForm = () => {
  const [status, setStatus] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('contactFormData');
    return saved ? JSON.parse(saved) : { name: '', email: '', message: '' };
  });

  useEffect(() => {
    localStorage.setItem('contactFormData', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation to ensure fields are not empty or just whitespace
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('VALIDATION_ERROR');
      return;
    }

    // Check if email contains '@'
    if (!formData.email.includes('@')) {
      setStatus('VALIDATION_ERROR_EMAIL');
      return;
    }

    setIsSending(true);
    setStatus('');

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('SUCCESS');
        setFormData({ name: '', email: '', message: '' });
        localStorage.removeItem('contactFormData');
      } else {
        setStatus('ERROR');
      }
    } catch (err) {
      setStatus('ERROR');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="contact-form-container">
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="message">Description</label>
          <textarea id="message" name="message" rows="5" placeholder="How can I help you?" value={formData.message} onChange={handleChange} required></textarea>
        </div>

        {status === 'VALIDATION_ERROR' && <p className="form-status error" style={{ margin: '0', textAlign: 'left', color: 'var(--warning)' }}>Please fill out all fields.</p>}
        {status === 'VALIDATION_ERROR_EMAIL' && <p className="form-status error" style={{ margin: '0', textAlign: 'left', color: 'var(--warning)' }}>Please enter a valid email address containing '@'.</p>}
        {status === 'ERROR' && <p className="form-status error" style={{ margin: '0', textAlign: 'left', color: '#ef4444' }}>Error sending message. Please try again later.</p>}
        {status === 'SUCCESS' && <p className="form-status success" style={{ margin: '0', textAlign: 'left', color: 'var(--success)' }}>Message sent successfully!</p>}

        <button
          type="submit"
          className="btn btn-primary btn-lg"
          disabled={isSending}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          {isSending ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

const Certifications = ({ items, base }) => {
  if (!items || items.length === 0) return <p className="text-muted">No certifications found.</p>;
  return (
    <>
      <div className="cert-grid">
        {items.map((cert, idx) => (
          <FadeInChild key={idx} delay={idx * 80} className="cert-card">
            {cert.badge_url ? (
              <img
                className="cert-badge"
                src={`${base}${cert.badge_url}`}
                alt={`${cert.name} badge`}
                loading="lazy"
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              />
            ) : null}
            <div className="cert-badge-placeholder" style={{ display: cert.badge_url ? 'none' : 'flex' }}>🏅</div>

            <div>
              <div className="cert-name">{cert.name}</div>
              <div className="cert-issuer">{cert.issuer}</div>
            </div>
            <div className="cert-footer">
              {cert.credential_url && (
                <a href={cert.credential_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">View Credential ↗</a>
              )}
            </div>
          </FadeInChild>
        ))}
      </div>
    </>
  );
};

const Projects = ({ items, base }) => {
  if (!items || items.length === 0) return <p className="text-muted">No projects found.</p>;

  const getPollinationsUrl = (projectName, description) => {
    const short = `${projectName} software project ${(description || '').slice(0, 60)}`;
    let hash = 0;
    for (let i = 0; i < projectName.length; i++) {
      hash = (Math.imul(31, hash) + projectName.charCodeAt(i)) | 0;
    }
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(short)}?width=640&height=360&nologo=true&seed=${Math.abs(hash)}`;
  };

  return (
    <div className="project-grid">
      {items.map((proj, idx) => {
        const aiImageUrl = getPollinationsUrl(proj.name, proj.description);
        const imageUrl = proj.image ? `${base}${proj.image}` : aiImageUrl; // base-relative path for public assets

        return (
          <FadeInChild
            key={idx}
            delay={idx * 80}
            className="project-card"
            onClick={() => {
              if (proj.repo_url) window.open(proj.repo_url, "_blank");
            }}
          >
            <div className="project-img-wrap">
              <img
                className="project-img"
                src={imageUrl}
                alt={`${proj.name} screenshot`}
                loading="lazy"
                onError={(e) => { if (e.target.src !== aiImageUrl) e.target.src = aiImageUrl; }}
              />
              <div className="project-img-overlay"></div>
            </div>
            <div className="project-body">
              <div className="project-name">
                {proj.repo_url ? (
                  <a
                    href={proj.repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {proj.name}
                  </a>
                ) : proj.name}
              </div>
              <p className="project-desc">{proj.description}</p>
              <div className="tech-stack">
                {(proj.tech || []).map((t, i) => <span key={i} className="tech-pill">{t}</span>)}
              </div>
              <div className="project-actions">
                {proj.repo_url && (
                  <a
                    href={proj.repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    GitHub ↗
                  </a>
                )}
                {proj.live_url && (
                  <a
                    href={proj.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Live Demo ↗
                  </a>
                )}
              </div>
            </div>
          </FadeInChild>
        );
      })}
    </div>
  );
};

// --- Main App ---

function App() {
  const [data, setData] = useState({
    aboutMeta: {},
    aboutBody: '',
    experience: [],
    education: [],
    research: [],
    certifications: [],
    projects: []
  });
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const taglines = [
    "Software Engineer & AI/ML Specialist",
    "Architecting Intelligent Systems",
    "Turning Data into Actionable Insights",
    "Neural Network Explorer & Full-Stack Developer",
    "Crafting Seamless Digital Experiences",
    "Innovating at the Intersection of AI & Cloud",
    "Building the Future with Machine Learning",
    "Open Source Contributor & Problem Solver",
    "Research Interest: AI in Education"
  ];

  useEffect(() => {
    const handleClick = (e) => {
      const ripple = document.createElement('div');
      ripple.className = 'ripple';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 800);
    };

    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    document.body.classList.add('js-animate');

    const interval = setInterval(() => {
      setTaglineIdx((prev) => (prev + 1) % taglines.length);
    }, 4000);

    const fetchData = async () => {
      try {
        const base = import.meta.env.BASE_URL;
        const [aboutRes, expRes, eduRes, resRes, certRes, projRes] = await Promise.all([
          fetch(`${base}about.md`),
          fetch(`${base}data/experience.yaml`),
          fetch(`${base}data/education.yaml`),
          fetch(`${base}data/research.yaml`),
          fetch(`${base}data/certifications.yaml`),
          fetch(`${base}data/projects.yaml`)
        ]);
        const aboutText = await aboutRes.text();
        const expText = await expRes.text();
        const eduText = await eduRes.text();
        const resText = await resRes.text();
        const certText = await certRes.text();
        const projText = await projRes.text();

        const FM_REGEX = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
        const match = aboutText.match(FM_REGEX);
        let aboutMeta = {};
        let aboutBody = aboutText;
        if (match) {
          aboutMeta = yaml.load(match[1]) || {};
          aboutBody = match[2];
        }

        setData({
          aboutMeta,
          aboutBody: marked.parse(aboutBody),
          experience: yaml.load(expText)?.experience || [],
          education: yaml.load(eduText)?.education || [],
          research: yaml.load(resText)?.research || [],
          certifications: yaml.load(certText)?.certifications || [],
          projects: yaml.load(projText)?.projects || [],
        });
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'education', 'certifications', 'research', 'projects', 'resume', 'contact'];
      let current = '';
      for (const sec of sections) {
        const element = document.getElementById(sec);
        if (element) {
          const offset = element.offsetTop - 100;
          if (window.scrollY >= offset) current = sec;
        }
      }
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary, #0f172a)' }}>
      <div style={{ textAlign: 'center', color: 'var(--text-primary, #e2e8f0)' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚡</div>
        <p style={{ fontFamily: 'Inter, sans-serif', opacity: 0.7 }}>Loading...</p>
      </div>
    </div>
  );

  const { aboutMeta, aboutBody, experience, education, research, certifications, projects } = data;
  const base = import.meta.env.BASE_URL;

  return (
    <>
      <Navbar activeSection={activeSection} theme={theme} toggleTheme={toggleTheme} />
      <Hero meta={aboutMeta} bodyHtml={aboutBody} tagline={taglines[taglineIdx]} base={base} />
      <Section id="experience" title="Experience">
        <Experience items={experience} />
      </Section>
      <Section id="education" title="Education">
        <Education items={education} />
      </Section>
      <Section id="certifications" title="Certifications">
        <Certifications items={certifications} base={base} />
      </Section>
      <Section id="research" title="Research">
        <Research items={research} />
      </Section>
      <Section id="projects" title="Projects" subtitle="A collection of things I've built — from AI systems to web applications.">
        <Projects items={projects} base={base} />
      </Section>
      <Section id="resume" title="Resume">
        <div className="resume-pro-wrapper">
          <div className="resume-pro-card">
            <div className="resume-pro-content">
              <div className="resume-pro-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
              <div className="resume-pro-text">
                <h3>Grab My Resume</h3>
                <p>A concise, overview of my technical and soft skills, professional experience, and key accomplishments.</p>
              </div>
              <a href={`${base}resume.pdf`} download className="btn-pro-download">
                <span>Download PDF</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </a>
            </div>
            <div className="resume-pro-bg"></div>
          </div>
        </div>
      </Section>
      <Section id="contact" title="Get In Touch" subtitle="I'm always open to new opportunities and collaborations.">
        <ContactForm email={aboutMeta.email} />
      </Section>

      <footer className="footer">
        <div className="container">
          <p>Built with ❤️ by <strong>{aboutMeta?.name || "Awais Aziz"}</strong></p>
          {/* <p className="footer-sub">Powered by React + Vite. Edit the <code>public/data/</code> files to update content.</p> */}
        </div>
      </footer>
      <BackToTop />
    </>
  );
}

export default App;
