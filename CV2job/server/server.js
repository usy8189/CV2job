const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const pdfParse = require('pdf-parse');
const Groq = require('groq-sdk');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// Initialize Groq client
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

app.post('/api/analyze-resume', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        console.log('📄', req.file.originalname);

        // Extract text from PDF
        let text;
        try {
            const data = await pdfParse(req.file.buffer);
            text = data.text;
            console.log('📝 Extracted:', text.length, 'chars');

            if (!text || text.trim().length < 50) {
                throw new Error('PDF seems empty');
            }
        } catch (err) {
            console.error('❌ PDF error:', err.message);
            return res.status(400).json({ error: 'Cannot read PDF' });
        }

        // Analyze with Groq (Llama)
        try {
            console.log('🤖 Calling Groq AI...');

            const completion = await groq.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: "You are a resume analyzer. Extract information and return ONLY valid JSON, no markdown."
                    },
                    {
                        role: "user",
                        content: `Analyze this resume and return JSON with 5 best matching job roles:
{
  "suggestedRoles": [
    {"title": "Job Title 1", "matchScore": 95},
    {"title": "Job Title 2", "matchScore": 88},
    {"title": "Job Title 3", "matchScore": 82},
    {"title": "Job Title 4", "matchScore": 78},
    {"title": "Job Title 5", "matchScore": 72}
  ],
  "skills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
  "experienceLevel": "Entry Level OR Mid Level OR Senior Level",
  "summary": "2 sentence summary"
}

Resume:
${text.substring(0, 8000)}`
                    }
                ],
                model: "llama-3.3-70b-versatile",
                temperature: 0.3,
                max_tokens: 600
            });

            const aiText = completion.choices[0].message.content;
            console.log('✅ Got response:', aiText.substring(0, 100));

            const cleaned = aiText.replace(/```json/g, '').replace(/```/g, '').trim();
            const analysis = JSON.parse(cleaned);

            res.json({ success: true, analysis });

        } catch (aiErr) {
            console.error('❌ AI error:', aiErr.message);
            return res.status(500).json({ error: 'AI analysis failed: ' + aiErr.message });
        }

    } catch (err) {
        console.error('❌ Server error:', err.message);
        res.status(500).json({ error: 'Server error: ' + err.message });
    }
});

app.post('/api/search-jobs', async (req, res) => {
    try {
        const { jobTitle, location } = req.body;
        console.log(`🔍 "${jobTitle}" in "${location || 'Remote'}"`);

        const response = await axios.get('https://jsearch.p.rapidapi.com/search', {
            params: { query: `${jobTitle} ${location || 'Remote'}`, page: '1', num_pages: '1' },
            headers: {
                'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                'x-rapidapi-host': 'jsearch.p.rapidapi.com'
            }
        });

        const jobs = response.data.data.slice(0, 6).map(j => ({
            id: j.job_id,
            title: j.job_title,
            company: j.employer_name,
            location: j.job_city ? `${j.job_city}, ${j.job_country}` : 'Remote',
            type: j.job_employment_type || 'Full-time',
            salary: j.job_min_salary ? `$${j.job_min_salary}-$${j.job_max_salary}` : 'Not listed',
            matchScore: '95%',
            applyLink: j.job_apply_link
        }));

        console.log(`✅ ${jobs.length} jobs`);
        res.json({ success: true, jobs });

    } catch (e) {
        console.error('❌', e.message);
        res.status(500).json({ error: 'Job search failed' });
    }
});

app.listen(port, () => console.log(`✅ http://localhost:${port}`));
