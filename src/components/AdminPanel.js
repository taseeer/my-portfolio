import React, { useState } from 'react';

/* ─── tiny helpers ─────────────────────────────────────── */
const ADMIN_PASSWORD = 'admin123';

const inputCls =
  'w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800';
const labelCls = 'block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide';
const btnPrimary =
  'px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95';
const btnDanger =
  'px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500 text-white hover:bg-red-600 transition-all duration-200 active:scale-95';
const btnSecondary =
  'px-4 py-2 rounded-lg text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-200 active:scale-95';

const sectionBg = 'bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4';

/* ─── tag / array field ──────────────────────────────────── */
function TagField({ label, value = [], onChange }) {
  const [input, setInput] = useState('');
  const add = () => {
    const v = input.trim();
    if (v && !value.includes(v)) { onChange([...value, v]); setInput(''); }
  };
  const remove = (i) => onChange(value.filter((_, idx) => idx !== i));
  return (
    <div className="mb-3">
      <label className={labelCls}>{label}</label>
      <div className="flex gap-2 mb-2">
        <input className={inputCls} value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), add())}
          placeholder="Type and press Enter or Add" />
        <button type="button" onClick={add}
          className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">Add</button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {value.map((t, i) => (
          <span key={i} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
            {t}
            <button type="button" onClick={() => remove(i)}
              className="ml-0.5 text-blue-500 hover:text-red-500 font-bold leading-none">&times;</button>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── collapsible card for list items ───────────────────── */
function ItemCard({ title, children, onDelete, onEdit }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl mb-3 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 cursor-pointer"
        onClick={() => setOpen(!open)}>
        <span className="font-semibold text-gray-800 text-sm">{title}</span>
        <div className="flex gap-2" onClick={e => e.stopPropagation()}>
          <button className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700" onClick={onEdit}>Edit</button>
          <button className={btnDanger} onClick={onDelete}>Delete</button>
          <span className="px-2 py-1 text-gray-400 text-xs">{open ? '▲' : '▼'}</span>
        </div>
      </div>
      {open && <div className="px-4 py-3 bg-white text-sm text-gray-600">{children}</div>}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   SECTION EDITORS
   ─────────────────────────────────────────────────────── */

/* ── Hero / Profile ─────────────────────────────────────── */
function HeroEditor({ data, onChange }) {
  const h = data.hero || {};
  const set = (k, v) => onChange({ ...h, [k]: v });
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-800 mb-4">Hero / Profile Info</h3>
      <div className={sectionBg}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ['name', 'Full Name'], ['title', 'Title (e.g. Junior Lecturer)'],
            ['subtitle', 'Subtitle (e.g. & Full Stack Developer)'], ['location', 'Location'],
            ['badgeText', 'Badge Text (hero badge)'], ['cgpa', 'CGPA (shown in floating card)'],
            ['email', 'Email'], ['phone', 'Phone'], ['github', 'GitHub URL'], ['linkedin', 'LinkedIn URL'],
            ['cvFile', 'CV File Path (e.g. /Taseer_Ullah_CV.pdf)'], ['photo', 'Profile Photo Path (e.g. /Taseer.jpg)'],
          ].map(([k, lbl]) => (
            <div key={k}>
              <label className={labelCls}>{lbl}</label>
              <input className={inputCls} value={h[k] || ''} onChange={e => set(k, e.target.value)} />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <label className={labelCls}>Tagline (hero bio, use \n for line breaks)</label>
          <textarea rows={3} className={inputCls} value={h.tagline || ''}
            onChange={e => set('tagline', e.target.value)} />
        </div>
      </div>
    </div>
  );
}

/* ── Experience ─────────────────────────────────────────── */
const emptyExp = { title: '', organization: '', period: '', location: '', description: '', highlights: [] };

function ExperienceEditor({ data, addItem, updateItem, deleteItem }) {
  const [editing, setEditing] = useState(null); // null | { index, item }
  const [form, setForm] = useState(emptyExp);

  const openNew = () => { setForm(emptyExp); setEditing({ index: -1, item: null }); };
  const openEdit = (i) => { setForm({ ...data.experiences[i] }); setEditing({ index: i, item: data.experiences[i] }); };
  const close = () => setEditing(null);

  const save = () => {
    if (!form.title.trim()) return;
    if (editing.index === -1) addItem('experiences', form);
    else updateItem('experiences', editing.index, form);
    close();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Experience</h3>
        <button className={`${btnPrimary} bg-blue-600`} onClick={openNew}>+ Add Experience</button>
      </div>

      {(data.experiences || []).map((exp, i) => (
        <ItemCard key={i} title={`${exp.title} @ ${exp.organization}`}
          onDelete={() => deleteItem('experiences', i)} onEdit={() => openEdit(i)}>
          <p className="text-gray-500">{exp.period} · {exp.location}</p>
          <p className="mt-1">{exp.description}</p>
        </ItemCard>
      ))}

      {editing && (
        <div className={sectionBg}>
          <h4 className="font-bold text-gray-700 mb-4">{editing.index === -1 ? 'New Experience' : 'Edit Experience'}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[['title','Title/Role'],['organization','Organization'],['period','Period'],['location','Location']].map(([k,lbl]) => (
              <div key={k}>
                <label className={labelCls}>{lbl}</label>
                <input className={inputCls} value={form[k]||''} onChange={e => setForm({...form,[k]:e.target.value})} />
              </div>
            ))}
          </div>
          <div className="mt-3">
            <label className={labelCls}>Description</label>
            <textarea rows={3} className={inputCls} value={form.description||''} onChange={e => setForm({...form,description:e.target.value})} />
          </div>
          <TagField label="Highlights (press Enter to add)" value={form.highlights||[]}
            onChange={v => setForm({...form, highlights: v})} />
          <div className="flex gap-2 mt-4">
            <button className={`${btnPrimary} bg-blue-600`} onClick={save}>Save</button>
            <button className={btnSecondary} onClick={close}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Education ──────────────────────────────────────────── */
const emptyEdu = { degree: '', institution: '', period: '', status: '', cgpa: '', marks: '', division: '', board: '', logo: '', color: 'from-blue-600 to-cyan-600', achievements: [], courses: [], subjects: [] };

const colorOptions = [
  'from-red-600 to-orange-600', 'from-blue-600 to-cyan-600',
  'from-green-600 to-emerald-600', 'from-purple-600 to-pink-600',
  'from-yellow-500 to-orange-500', 'from-indigo-600 to-blue-600',
];

function EducationEditor({ data, addItem, updateItem, deleteItem }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyEdu);

  const openNew = () => { setForm(emptyEdu); setEditing({ index: -1 }); };
  const openEdit = (i) => { setForm({ ...emptyEdu, ...data.education[i] }); setEditing({ index: i }); };
  const close = () => setEditing(null);
  const save = () => {
    if (!form.degree.trim()) return;
    if (editing.index === -1) addItem('education', form);
    else updateItem('education', editing.index, form);
    close();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Education</h3>
        <button className={`${btnPrimary} bg-blue-600`} onClick={openNew}>+ Add Education</button>
      </div>

      {(data.education || []).map((edu, i) => (
        <ItemCard key={i} title={`${edu.degree} — ${edu.institution}`}
          onDelete={() => deleteItem('education', i)} onEdit={() => openEdit(i)}>
          <p className="text-gray-500">{edu.period}</p>
        </ItemCard>
      ))}

      {editing && (
        <div className={sectionBg}>
          <h4 className="font-bold text-gray-700 mb-4">{editing.index === -1 ? 'New Education' : 'Edit Education'}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[['degree','Degree/Program'],['institution','Institution'],['period','Period'],
              ['status','Status'],['cgpa','CGPA'],['marks','Marks'],['division','Division'],
              ['board','Board'],['logo','Logo Path (e.g. /UET.png)']].map(([k,lbl]) => (
              <div key={k}>
                <label className={labelCls}>{lbl}</label>
                <input className={inputCls} value={form[k]||''} onChange={e => setForm({...form,[k]:e.target.value})} />
              </div>
            ))}
            <div>
              <label className={labelCls}>Card Color Gradient</label>
              <select className={inputCls} value={form.color||''} onChange={e => setForm({...form,color:e.target.value})}>
                {colorOptions.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <TagField label="Achievements" value={form.achievements||[]} onChange={v => setForm({...form,achievements:v})} />
          <TagField label="Courses" value={form.courses||[]} onChange={v => setForm({...form,courses:v})} />
          <TagField label="Subjects" value={form.subjects||[]} onChange={v => setForm({...form,subjects:v})} />
          <div className="flex gap-2 mt-4">
            <button className={`${btnPrimary} bg-blue-600`} onClick={save}>Save</button>
            <button className={btnSecondary} onClick={close}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Skills ─────────────────────────────────────────────── */
function SkillsEditor({ data, updateSkillCategory }) {
  const cats = ['frontend', 'backend', 'other'];
  const labels = { frontend: 'Frontend', backend: 'Backend / Database', other: 'Other Skills' };

  const addSkill = (cat) => {
    const arr = [...(data.skills[cat] || []), { name: '', level: 80 }];
    updateSkillCategory(cat, arr);
  };
  const update = (cat, i, field, val) => {
    const arr = [...data.skills[cat]];
    arr[i] = { ...arr[i], [field]: field === 'level' ? Number(val) : val };
    updateSkillCategory(cat, arr);
  };
  const remove = (cat, i) => {
    const arr = data.skills[cat].filter((_, idx) => idx !== i);
    updateSkillCategory(cat, arr);
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-800 mb-4">Technical Skills</h3>
      {cats.map(cat => (
        <div key={cat} className={sectionBg}>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-gray-700">{labels[cat]}</h4>
            <button className={`${btnPrimary} bg-blue-600 text-xs`} onClick={() => addSkill(cat)}>+ Add Skill</button>
          </div>
          {(data.skills[cat] || []).map((skill, i) => (
            <div key={i} className="flex gap-3 items-center mb-2">
              <input className={`${inputCls} flex-1`} placeholder="Skill name" value={skill.name}
                onChange={e => update(cat, i, 'name', e.target.value)} />
              <div className="flex items-center gap-2 w-40">
                <input type="range" min="0" max="100" value={skill.level}
                  onChange={e => update(cat, i, 'level', e.target.value)}
                  className="flex-1" />
                <span className="text-sm font-bold text-blue-600 w-8">{skill.level}%</span>
              </div>
              <button className={btnDanger} onClick={() => remove(cat, i)}>✕</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ── Certifications ─────────────────────────────────────── */
const emptyCert = { name: '', issuer: '' };
function CertificationsEditor({ data, addItem, updateItem, deleteItem }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyCert);
  const openNew = () => { setForm(emptyCert); setEditing({ index: -1 }); };
  const openEdit = (i) => { setForm({ ...data.certifications[i] }); setEditing({ index: i }); };
  const close = () => setEditing(null);
  const save = () => {
    if (!form.name.trim()) return;
    if (editing.index === -1) addItem('certifications', form);
    else updateItem('certifications', editing.index, form);
    close();
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Certifications</h3>
        <button className={`${btnPrimary} bg-blue-600`} onClick={openNew}>+ Add Certification</button>
      </div>
      {(data.certifications || []).map((c, i) => (
        <ItemCard key={i} title={`${c.name} — ${c.issuer}`}
          onDelete={() => deleteItem('certifications', i)} onEdit={() => openEdit(i)}>
          <p>{c.issuer}</p>
        </ItemCard>
      ))}
      {editing && (
        <div className={sectionBg}>
          <h4 className="font-bold text-gray-700 mb-3">{editing.index === -1 ? 'New Certification' : 'Edit Certification'}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div><label className={labelCls}>Certificate Name</label>
              <input className={inputCls} value={form.name} onChange={e => setForm({...form,name:e.target.value})} /></div>
            <div><label className={labelCls}>Issuer</label>
              <input className={inputCls} value={form.issuer} onChange={e => setForm({...form,issuer:e.target.value})} /></div>
          </div>
          <div className="flex gap-2 mt-4">
            <button className={`${btnPrimary} bg-blue-600`} onClick={save}>Save</button>
            <button className={btnSecondary} onClick={close}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Projects ───────────────────────────────────────────── */
const gradientOptions = [
  'from-blue-500 to-cyan-500', 'from-purple-500 to-pink-500',
  'from-orange-500 to-red-500', 'from-green-500 to-emerald-500',
  'from-indigo-500 to-purple-500', 'from-violet-500 to-purple-600',
  'from-yellow-500 to-orange-500', 'from-teal-500 to-green-500',
];
const emptyProject = { title: '', description: '', tech: [], category: '', gradient: 'from-blue-500 to-cyan-500', image: '', liveLink: '', githubLink: '', features: [] };

function ProjectsEditor({ data, addItem, updateItem, deleteItem }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyProject);
  const openNew = () => { setForm(emptyProject); setEditing({ index: -1 }); };
  const openEdit = (i) => { setForm({ ...emptyProject, ...data.projects[i] }); setEditing({ index: i }); };
  const close = () => setEditing(null);
  const save = () => {
    if (!form.title.trim()) return;
    if (editing.index === -1) addItem('projects', form);
    else updateItem('projects', editing.index, form);
    close();
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Projects</h3>
        <button className={`${btnPrimary} bg-blue-600`} onClick={openNew}>+ Add Project</button>
      </div>
      {(data.projects || []).map((p, i) => (
        <ItemCard key={i} title={`${p.title} [${p.category}]`}
          onDelete={() => deleteItem('projects', i)} onEdit={() => openEdit(i)}>
          <p>{p.description}</p>
          <p className="text-xs text-blue-600 mt-1">{(p.tech||[]).join(', ')}</p>
        </ItemCard>
      ))}
      {editing && (
        <div className={sectionBg}>
          <h4 className="font-bold text-gray-700 mb-4">{editing.index === -1 ? 'New Project' : 'Edit Project'}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div><label className={labelCls}>Title</label>
              <input className={inputCls} value={form.title} onChange={e => setForm({...form,title:e.target.value})} /></div>
            <div><label className={labelCls}>Category</label>
              <input className={inputCls} value={form.category} onChange={e => setForm({...form,category:e.target.value})} placeholder="e.g. Full Stack, Python, Security" /></div>
            <div><label className={labelCls}>Live Link</label>
              <input className={inputCls} value={form.liveLink||''} onChange={e => setForm({...form,liveLink:e.target.value})} /></div>
            <div><label className={labelCls}>GitHub Link</label>
              <input className={inputCls} value={form.githubLink||''} onChange={e => setForm({...form,githubLink:e.target.value})} /></div>
            <div><label className={labelCls}>Image URL</label>
              <input className={inputCls} value={form.image||''} onChange={e => setForm({...form,image:e.target.value})} /></div>
            <div><label className={labelCls}>Card Gradient</label>
              <select className={inputCls} value={form.gradient} onChange={e => setForm({...form,gradient:e.target.value})}>
                {gradientOptions.map(g => <option key={g} value={g}>{g}</option>)}
              </select></div>
          </div>
          <div className="mt-3"><label className={labelCls}>Description</label>
            <textarea rows={3} className={inputCls} value={form.description} onChange={e => setForm({...form,description:e.target.value})} /></div>
          <TagField label="Tech Stack" value={form.tech||[]} onChange={v => setForm({...form,tech:v})} />
          <TagField label="Features" value={form.features||[]} onChange={v => setForm({...form,features:v})} />
          <div className="flex gap-2 mt-4">
            <button className={`${btnPrimary} bg-blue-600`} onClick={save}>Save</button>
            <button className={btnSecondary} onClick={close}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Testimonials ───────────────────────────────────────── */
const emptyTestimonial = { name: '', role: '', image: '', text: '', rating: 5 };
function TestimonialsEditor({ data, addItem, updateItem, deleteItem }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyTestimonial);
  const openNew = () => { setForm(emptyTestimonial); setEditing({ index: -1 }); };
  const openEdit = (i) => { setForm({ ...data.testimonials[i] }); setEditing({ index: i }); };
  const close = () => setEditing(null);
  const save = () => {
    if (!form.name.trim()) return;
    if (editing.index === -1) addItem('testimonials', form);
    else updateItem('testimonials', editing.index, form);
    close();
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Testimonials</h3>
        <button className={`${btnPrimary} bg-blue-600`} onClick={openNew}>+ Add Testimonial</button>
      </div>
      {(data.testimonials || []).map((t, i) => (
        <ItemCard key={i} title={`${t.name} — ${t.role}`}
          onDelete={() => deleteItem('testimonials', i)} onEdit={() => openEdit(i)}>
          <p>"{t.text}"</p>
        </ItemCard>
      ))}
      {editing && (
        <div className={sectionBg}>
          <h4 className="font-bold text-gray-700 mb-4">{editing.index === -1 ? 'New Testimonial' : 'Edit Testimonial'}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div><label className={labelCls}>Name</label>
              <input className={inputCls} value={form.name} onChange={e => setForm({...form,name:e.target.value})} /></div>
            <div><label className={labelCls}>Role / Title</label>
              <input className={inputCls} value={form.role} onChange={e => setForm({...form,role:e.target.value})} /></div>
            <div><label className={labelCls}>Photo path (e.g. /photo.jpg)</label>
              <input className={inputCls} value={form.image||''} onChange={e => setForm({...form,image:e.target.value})} /></div>
            <div><label className={labelCls}>Rating (1-5)</label>
              <input type="number" min="1" max="5" className={inputCls} value={form.rating}
                onChange={e => setForm({...form,rating:Number(e.target.value)})} /></div>
          </div>
          <div className="mt-3"><label className={labelCls}>Testimonial Text</label>
            <textarea rows={3} className={inputCls} value={form.text} onChange={e => setForm({...form,text:e.target.value})} /></div>
          <div className="flex gap-2 mt-4">
            <button className={`${btnPrimary} bg-blue-600`} onClick={save}>Save</button>
            <button className={btnSecondary} onClick={close}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Blog Posts ─────────────────────────────────────────── */
const emptyPost = { title: '', excerpt: '', date: '', category: '', image: '', readTime: '' };
function BlogEditor({ data, addItem, updateItem, deleteItem }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyPost);
  const openNew = () => { setForm(emptyPost); setEditing({ index: -1 }); };
  const openEdit = (i) => { setForm({ ...data.blogPosts[i] }); setEditing({ index: i }); };
  const close = () => setEditing(null);
  const save = () => {
    if (!form.title.trim()) return;
    if (editing.index === -1) addItem('blogPosts', form);
    else updateItem('blogPosts', editing.index, form);
    close();
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Blog Posts</h3>
        <button className={`${btnPrimary} bg-blue-600`} onClick={openNew}>+ Add Post</button>
      </div>
      {(data.blogPosts || []).map((p, i) => (
        <ItemCard key={i} title={`${p.title} [${p.category}]`}
          onDelete={() => deleteItem('blogPosts', i)} onEdit={() => openEdit(i)}>
          <p>{p.excerpt}</p>
          <p className="text-xs text-gray-400 mt-1">{p.date} · {p.readTime}</p>
        </ItemCard>
      ))}
      {editing && (
        <div className={sectionBg}>
          <h4 className="font-bold text-gray-700 mb-4">{editing.index === -1 ? 'New Blog Post' : 'Edit Blog Post'}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="md:col-span-2"><label className={labelCls}>Title</label>
              <input className={inputCls} value={form.title} onChange={e => setForm({...form,title:e.target.value})} /></div>
            <div><label className={labelCls}>Category</label>
              <input className={inputCls} value={form.category} onChange={e => setForm({...form,category:e.target.value})} /></div>
            <div><label className={labelCls}>Date</label>
              <input className={inputCls} value={form.date} onChange={e => setForm({...form,date:e.target.value})} placeholder="e.g. January 20, 2026" /></div>
            <div><label className={labelCls}>Read Time</label>
              <input className={inputCls} value={form.readTime} onChange={e => setForm({...form,readTime:e.target.value})} placeholder="e.g. 5 min read" /></div>
            <div><label className={labelCls}>Image URL</label>
              <input className={inputCls} value={form.image||''} onChange={e => setForm({...form,image:e.target.value})} /></div>
          </div>
          <div className="mt-3"><label className={labelCls}>Excerpt</label>
            <textarea rows={3} className={inputCls} value={form.excerpt} onChange={e => setForm({...form,excerpt:e.target.value})} /></div>
          <div className="flex gap-2 mt-4">
            <button className={`${btnPrimary} bg-blue-600`} onClick={save}>Save</button>
            <button className={btnSecondary} onClick={close}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   PASSWORD GATE
   ─────────────────────────────────────────────────────── */
function LoginGate({ onSuccess, onClose }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState(false);
  const attempt = () => {
    if (pw === ADMIN_PASSWORD) { setErr(false); onSuccess(); }
    else { setErr(true); setPw(''); }
  };
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: 'rgba(10,38,71,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
            style={{ background: 'linear-gradient(135deg,#0A2647,#205295)' }}>
            <span className="text-2xl">🔐</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
          <p className="text-sm text-gray-500 mt-1">Enter your password to continue</p>
        </div>
        <input
          type="password"
          className={`${inputCls} mb-3 ${err ? 'border-red-400 ring-2 ring-red-200' : ''}`}
          placeholder="Password"
          value={pw}
          onChange={e => { setPw(e.target.value); setErr(false); }}
          onKeyDown={e => e.key === 'Enter' && attempt()}
          autoFocus
        />
        {err && <p className="text-red-500 text-xs mb-3 text-center">Incorrect password. Try <strong>admin123</strong></p>}
        <div className="flex gap-3">
          <button onClick={onClose} className={`${btnSecondary} flex-1`}>Cancel</button>
          <button onClick={attempt}
            className="flex-1 py-2 rounded-lg text-sm font-semibold text-white"
            style={{ background: 'linear-gradient(135deg,#0A2647,#205295)' }}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN ADMIN PANEL
   ─────────────────────────────────────────────────────── */
const TABS = [
  { id: 'hero', label: '👤 Hero / Profile' },
  { id: 'experiences', label: '💼 Experience' },
  { id: 'education', label: '🎓 Education' },
  { id: 'skills', label: '⚙️ Skills' },
  { id: 'certifications', label: '🏅 Certifications' },
  { id: 'projects', label: '🚀 Projects' },
  { id: 'testimonials', label: '💬 Testimonials' },
  { id: 'blog', label: '📝 Blog Posts' },
];

export default function AdminPanel({ open, onClose, portfolioHook }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [resetConfirm, setResetConfirm] = useState(false);

  const { data, addItem, updateItem, deleteItem, updateSkillCategory, updateHero, resetToDefaults } = portfolioHook;

  if (!open) return null;

  const handleReset = () => {
    resetToDefaults();
    setResetConfirm(false);
  };

  const exportData = () => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'portfolio-data.json'; a.click();
    URL.revokeObjectURL(url);
  };

  const handleHeroChange = (heroData) => updateHero(heroData);

  if (!loggedIn) {
    return <LoginGate onSuccess={() => setLoggedIn(true)} onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 z-[200] flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Top Bar */}
      <div className="flex items-center justify-between px-5 py-3 text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #0A2647 0%, #144272 100%)', flexShrink: 0 }}>
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors lg:hidden">
            <span className="text-lg">☰</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xl">🛠️</span>
            <span className="font-bold text-lg">Portfolio Admin Panel</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={exportData}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/15 hover:bg-white/25 transition-colors flex items-center gap-1">
            📤 Export JSON
          </button>
          {!resetConfirm ? (
            <button onClick={() => setResetConfirm(true)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/80 hover:bg-red-500 transition-colors">
              🔄 Reset Defaults
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-red-600 rounded-lg px-3 py-1.5">
              <span className="text-xs font-semibold">Are you sure?</span>
              <button onClick={handleReset} className="text-xs bg-white text-red-600 font-bold px-2 py-0.5 rounded">Yes</button>
              <button onClick={() => setResetConfirm(false)} className="text-xs bg-white/20 px-2 py-0.5 rounded">No</button>
            </div>
          )}
          <button onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/15 hover:bg-white/25 transition-colors">
            ✕ Close
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-56' : 'w-0 lg:w-56'} overflow-hidden flex-shrink-0 bg-gray-900 transition-all duration-300`}>
          <nav className="py-4">
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSidebarOpen(true); }}
                className={`w-full text-left px-4 py-3 text-sm font-medium transition-all duration-200 border-l-4 ${
                  activeTab === tab.id
                    ? 'border-orange-400 bg-white/10 text-orange-300'
                    : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                }`}>
                {tab.label}
              </button>
            ))}
          </nav>
          <div className="px-4 mt-4 pb-4 border-t border-gray-700 pt-4">
            <p className="text-xs text-gray-500 leading-relaxed">
              Changes are saved automatically to browser storage.
            </p>
            <div className="mt-3 px-3 py-2 bg-orange-500/10 rounded-lg border border-orange-500/30">
              <p className="text-xs text-orange-400 font-semibold">Default password:</p>
              <p className="text-sm text-orange-300 font-mono mt-0.5">admin123</p>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {activeTab === 'hero' && (
            <HeroEditor data={data} onChange={handleHeroChange} />
          )}
          {activeTab === 'experiences' && (
            <ExperienceEditor data={data} addItem={addItem} updateItem={updateItem} deleteItem={deleteItem} />
          )}
          {activeTab === 'education' && (
            <EducationEditor data={data} addItem={addItem} updateItem={updateItem} deleteItem={deleteItem} />
          )}
          {activeTab === 'skills' && (
            <SkillsEditor data={data} updateSkillCategory={updateSkillCategory} />
          )}
          {activeTab === 'certifications' && (
            <CertificationsEditor data={data} addItem={addItem} updateItem={updateItem} deleteItem={deleteItem} />
          )}
          {activeTab === 'projects' && (
            <ProjectsEditor data={data} addItem={addItem} updateItem={updateItem} deleteItem={deleteItem} />
          )}
          {activeTab === 'testimonials' && (
            <TestimonialsEditor data={data} addItem={addItem} updateItem={updateItem} deleteItem={deleteItem} />
          )}
          {activeTab === 'blog' && (
            <BlogEditor data={data} addItem={addItem} updateItem={updateItem} deleteItem={deleteItem} />
          )}
        </main>
      </div>
    </div>
  );
}
