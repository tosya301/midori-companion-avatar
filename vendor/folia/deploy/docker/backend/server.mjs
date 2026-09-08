import express from 'express';
import generateTheme from '/app/api/generate-theme.js';
import generateOpenAiTheme from '/app/api/generate-theme_openai.js';
import lyricProxy from '/app/api/lyric-proxy.js';

// 当前文件：把现有 Vercel 风格处理器装配为 Docker 常驻 HTTP 服务。

const app = express();
const port = Number(process.env.PORT || 3000);

app.disable('x-powered-by');
app.set('trust proxy', true);
app.use(express.json({ limit: '4mb' }));
app.use(express.text({ type: ['text/*', 'application/xml'], limit: '4mb' }));

app.get('/api/healthz', (_req, res) => {
    res.json({ ok: true, service: 'folia-web-api' });
});
app.all('/api/generate-theme', generateTheme);
app.all('/api/generate-theme_openai', generateOpenAiTheme);
app.all('/api/lyric-proxy', lyricProxy);

app.use((error, _req, res, _next) => {
    console.error('[folia-web-api] Unhandled request error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`[folia-web-api] listening on 0.0.0.0:${port}`);
});
