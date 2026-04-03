#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

// ─── Config ──────────────────────────────────────────────────────────────────

const IGNORED_DIRS = new Set([
  'node_modules', '.git', 'dist', 'build', '.next', '.nuxt', 'coverage',
  '.cache', '__pycache__', 'venv', '.venv', 'vendor', 'target', 'bin', 'obj',
  '.terraform', 'tmp', 'logs', '.turbo', 'out', 'Pods', '.gradle', '.svelte-kit',
  '.output', '.vercel', '.netlify', 'elm-stuff', '_build', 'deps', '.tox',
  '.mypy_cache', '.pytest_cache', 'site-packages', 'eggs', '.eggs',
]);

const IGNORED_FILES = new Set([
  '.DS_Store', 'Thumbs.db', 'desktop.ini', '.env', '.env.local',
  '.env.production', '.env.development',
]);

const MAX_FILE_SIZE_BYTES = 1024 * 1024;

const EXT_TO_LANG = {
  '.js': 'JavaScript', '.mjs': 'JavaScript', '.cjs': 'JavaScript',
  '.jsx': 'JSX', '.ts': 'TypeScript', '.tsx': 'TSX',
  '.py': 'Python', '.pyx': 'Python', '.pyi': 'Python',
  '.rs': 'Rust', '.go': 'Go', '.java': 'Java', '.kt': 'Kotlin',
  '.swift': 'Swift', '.c': 'C', '.h': 'C', '.cpp': 'C++', '.hpp': 'C++',
  '.cs': 'C#', '.rb': 'Ruby', '.php': 'PHP', '.dart': 'Dart',
  '.ex': 'Elixir', '.exs': 'Elixir', '.hs': 'Haskell', '.scala': 'Scala',
  '.lua': 'Lua', '.sh': 'Shell', '.bash': 'Shell', '.zsh': 'Shell',
  '.fish': 'Shell', '.ps1': 'PowerShell', '.psm1': 'PowerShell',
  '.html': 'HTML', '.htm': 'HTML', '.css': 'CSS', '.scss': 'SCSS',
  '.less': 'LESS', '.vue': 'Vue', '.svelte': 'Svelte',
  '.yaml': 'YAML', '.yml': 'YAML', '.json': 'JSON', '.toml': 'TOML',
  '.md': 'Markdown', '.mdx': 'MDX', '.sql': 'SQL', '.graphql': 'GraphQL',
  '.gql': 'GraphQL', '.tf': 'Terraform', '.hcl': 'Terraform',
  '.dockerfile': 'Docker', '.tfvars': 'Terraform',
};

const FRAMEWORK_DETECTION = {
  'JavaScript/TypeScript': [
    { file: 'next.config.js', name: 'Next.js' },
    { file: 'next.config.mjs', name: 'Next.js' },
    { file: 'next.config.ts', name: 'Next.js' },
    { file: 'nuxt.config.ts', name: 'Nuxt' },
    { file: 'nuxt.config.js', name: 'Nuxt' },
    { file: 'vite.config.ts', name: 'Vite' },
    { file: 'vite.config.js', name: 'Vite' },
    { file: 'angular.json', name: 'Angular' },
    { file: 'svelte.config.js', name: 'SvelteKit' },
    { file: 'astro.config.mjs', name: 'Astro' },
    { file: 'remix.config.js', name: 'Remix' },
    { file: 'gatsby-config.js', name: 'Gatsby' },
    { file: 'electron-builder.yml', name: 'Electron' },
    { file: 'tauri.conf.json', name: 'Tauri' },
    { file: 'solid-start.config.ts', name: 'SolidJS' },
  ],
  'Python': [
    { file: 'manage.py', name: 'Django', content: 'django' },
    { file: 'wsgi.py', name: 'Django/WSGI' },
    { file: 'asgi.py', name: 'Django/ASGI' },
  ],
  'Go': [{ file: 'go.mod', name: 'Go Modules' }],
  'Rust': [{ file: 'Cargo.toml', name: 'Cargo' }],
};

const DB_DETECTION = [
  { patterns: ['mongoose', 'mongodb'], name: 'MongoDB' },
  { patterns: ['pg', 'postgres', 'postgresql'], name: 'PostgreSQL' },
  { patterns: ['mysql', 'mysql2'], name: 'MySQL' },
  { patterns: ['sqlite', 'sqlite3', 'better-sqlite3'], name: 'SQLite' },
  { patterns: ['redis', 'ioredis'], name: 'Redis' },
  { patterns: ['prisma'], name: 'Prisma' },
  { patterns: ['drizzle-orm', 'drizzle-kit'], name: 'Drizzle' },
  { patterns: ['typeorm'], name: 'TypeORM' },
  { patterns: ['sequelize'], name: 'Sequelize' },
  { patterns: ['@supabase/supabase-js'], name: 'Supabase' },
  { patterns: ['firebase'], name: 'Firebase' },
  { patterns: ['@planetscale/database'], name: 'PlanetScale' },
  { patterns: ['convex'], name: 'Convex' },
  { patterns: ['sqlalchemy'], name: 'SQLAlchemy' },
];

const DEVOPS_DETECTION = [
  { file: 'Dockerfile', name: 'Docker' },
  { file: 'docker-compose.yml', name: 'Docker Compose' },
  { file: 'docker-compose.yaml', name: 'Docker Compose' },
  { file: 'fly.toml', name: 'Fly.io' },
  { file: 'vercel.json', name: 'Vercel' },
  { file: 'netlify.toml', name: 'Netlify' },
  { file: 'render.yaml', name: 'Render' },
  { file: 'railway.json', name: 'Railway' },
  { file: 'serverless.yml', name: 'Serverless Framework' },
  { file: 'k8s.yml', name: 'Kubernetes' },
  { dir: '.github/workflows', name: 'GitHub Actions' },
  { dir: '.gitlab-ci', name: 'GitLab CI' },
  { file: 'Jenkinsfile', name: 'Jenkins' },
  { file: '.circleci/config.yml', name: 'CircleCI' },
  { file: 'terraform.tf', name: 'Terraform' },
  { file: 'main.tf', name: 'Terraform' },
  { file: 'ansible.cfg', name: 'Ansible' },
];

const TOOL_DETECTION = [
  { patterns: ['tailwindcss', '@tailwindcss/'], name: 'Tailwind CSS' },
  { patterns: ['@mui/material', '@emotion/react'], name: 'Material UI' },
  { patterns: ['@chakra-ui/react'], name: 'Chakra UI' },
  { patterns: ['shadcn-ui', '@/components/ui'], name: 'shadcn/ui' },
  { patterns: ['zod'], name: 'Zod' },
  { patterns: ['eslint'], name: 'ESLint' },
  { patterns: ['prettier'], name: 'Prettier' },
  { patterns: ['husky'], name: 'Husky' },
  { patterns: ['lint-staged'], name: 'lint-staged' },
  { patterns: ['vitest'], name: 'Vitest' },
  { patterns: ['jest'], name: 'Jest' },
  { patterns: ['mocha'], name: 'Mocha' },
  { patterns: ['playwright'], name: 'Playwright' },
  { patterns: ['cypress'], name: 'Cypress' },
  { patterns: ['storybook'], name: 'Storybook' },
  { patterns: ['turborepo', 'turbo'], name: 'Turborepo' },
  { patterns: ['lerna'], name: 'Lerna' },
  { patterns: ['nx'], name: 'Nx' },
  { patterns: ['webpack'], name: 'Webpack' },
  { patterns: ['rollup'], name: 'Rollup' },
  { patterns: ['esbuild'], name: 'esbuild' },
  { patterns: ['parcel'], name: 'Parcel' },
  { patterns: ['@trpc/'], name: 'tRPC' },
  { patterns: ['@apollo/', 'apollo-server'], name: 'Apollo GraphQL' },
  { patterns: ['graphql'], name: 'GraphQL' },
  { patterns: ['socket.io'], name: 'Socket.io' },
  { patterns: ['express'], name: 'Express' },
  { patterns: ['fastify'], name: 'Fastify' },
  { patterns: ['koa'], name: 'Koa' },
  { patterns: ['hono'], name: 'Hono' },
  { patterns: ['nestjs', '@nestjs/'], name: 'NestJS' },
  { patterns: ['elysia'], name: 'Elysia' },
  { patterns: ['react-native', 'expo'], name: 'React Native/Expo' },
  { patterns: ['langchain'], name: 'LangChain' },
  { patterns: ['@anthropic-ai/sdk', 'anthropic'], name: 'Anthropic SDK' },
  { patterns: ['openai'], name: 'OpenAI SDK' },
];

const LANG_RUNTIMES = {
  'JavaScript': 'Node.js', 'TypeScript': 'Node.js', 'JSX': 'React',
  'TSX': 'React', 'Python': 'Python', 'Rust': 'Rust', 'Go': 'Go',
  'Java': 'JVM', 'Kotlin': 'JVM', 'Swift': 'Swift', 'Ruby': 'Ruby',
  'PHP': 'PHP', 'Dart': 'Dart', 'Elixir': 'Elixir/Erlang',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    target: process.cwd(),
    mode: 'quick',
    flags: new Set(),
    json: false,
    depth: 4,
    exclude: [],
    deep: false,
    noSave: false,
    saveDir: null,
  };

  for (const arg of args) {
    if (arg === '--full') { opts.mode = 'full'; opts.depth = 6; }
    else if (arg === '--json') opts.json = true;
    else if (arg === '--deep') { opts.deep = true; opts.mode = 'full'; opts.depth = 6; }
    else if (arg === '--structure') opts.flags.add('structure');
    else if (arg === '--stack') opts.flags.add('stack');
    else if (arg === '--dependencies') opts.flags.add('dependencies');
    else if (arg === '--metrics') opts.flags.add('metrics');
    else if (arg === '--entrypoints') opts.flags.add('entrypoints');
    else if (arg === '--markdown') opts.flags.add('markdown');
    else if (arg === '--no-save') opts.noSave = true;
    else if (arg.startsWith('--save-dir=')) opts.saveDir = arg.split('=').slice(1).join('=');
    else if (arg.startsWith('--depth=')) opts.depth = parseInt(arg.split('=')[1], 10) || opts.depth;
    else if (arg.startsWith('--exclude=')) opts.exclude = arg.split('=')[1].split(',');
    else if (arg.startsWith('-') && !arg.startsWith('--')) {
      for (const ch of arg.slice(1)) {
        if (ch === 's') opts.flags.add('structure');
        if (ch === 't') opts.flags.add('stack');
        if (ch === 'd') opts.flags.add('dependencies');
        if (ch === 'm') opts.flags.add('metrics');
        if (ch === 'e') opts.flags.add('entrypoints');
        if (ch === 'j') opts.json = true;
        if (ch === 'f') { opts.mode = 'full'; opts.depth = 6; }
      }
    }
    else if (!arg.startsWith('-')) opts.target = path.resolve(arg);
  }

  if (opts.flags.size === 0) {
    ['structure', 'stack', 'dependencies', 'metrics', 'entrypoints'].forEach(f => opts.flags.add(f));
  }

  return opts;
}

function shouldIgnore(name, relPath, extraExcludes) {
  if (IGNORED_DIRS.has(name)) return true;
  if (IGNORED_FILES.has(name)) return true;
  if (extraExcludes.some(ex => relPath.includes(ex))) return true;
  if (name.startsWith('.') && name !== '.' && !name.match(/^\.(env|gitignore|eslintrc|prettierrc|editorconfig)/)) return true;
  return false;
}

function walkDir(dir, maxDepth, extraExcludes, depth = 0, relPrefix = '') {
  const entries = [];
  if (depth > maxDepth) return entries;

  let items;
  try { items = fs.readdirSync(dir, { withFileTypes: true }); }
  catch { return entries; }

  items.sort((a, b) => {
    if (a.isDirectory() && !b.isDirectory()) return -1;
    if (!a.isDirectory() && b.isDirectory()) return 1;
    return a.name.localeCompare(b.name);
  });

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const relPath = relPrefix ? `${relPrefix}/${item.name}` : item.name;
    if (shouldIgnore(item.name, relPath, extraExcludes)) continue;

    const fullPath = path.join(dir, item.name);
    const isLast = i === items.length - 1;

    if (item.isDirectory()) {
      entries.push({ type: 'dir', name: item.name, relPath, depth, isLast });
      const childEntries = walkDir(fullPath, maxDepth, extraExcludes, depth + 1, relPath);
      entries.push(...childEntries);
    } else {
      let size = 0;
      try { size = fs.statSync(fullPath).size; } catch {}
      entries.push({ type: 'file', name: item.name, relPath, fullPath, depth, isLast, size });
    }
  }
  return entries;
}

function buildTree(entries) {
  let tree = '.\n';
  for (const e of entries) {
    let prefix = '';
    for (let d = 0; d < e.depth; d++) {
      let ancestor = null;
      const idx = entries.indexOf(e);
      for (let j = idx - 1; j >= 0; j--) {
        if (entries[j].depth === d) { ancestor = entries[j]; break; }
        if (entries[j].depth < d) { ancestor = entries[j]; break; }
      }
      prefix += ancestor && ancestor.isLast ? '    ' : '│   ';
    }
    const connector = e.isLast ? '└── ' : '├── ';
    tree += `${prefix}${connector}${e.name}\n`;
  }
  return tree;
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + 'B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + 'KB';
  return (bytes / (1024 * 1024)).toFixed(1) + 'MB';
}

function countLines(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content.split('\n').length;
  } catch { return 0; }
}

function readJsonSafe(filePath) {
  try { return JSON.parse(fs.readFileSync(filePath, 'utf-8')); }
  catch { return null; }
}

function readFileSafe(filePath, maxLen = 5000) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content.length > maxLen ? content.slice(0, maxLen) + '\n... (truncated)' : content;
  } catch { return null; }
}

function findFiles(root, dir, pattern) {
  const results = [];
  const fullDir = path.join(root, dir);
  if (!fs.existsSync(fullDir)) return results;

  let items;
  try { items = fs.readdirSync(fullDir, { withFileTypes: true }); }
  catch { return results; }

  for (const item of items) {
    if (item.isFile() && item.name.match(pattern)) {
      results.push(path.join(fullDir, item.name));
    }
  }
  return results;
}

function scanDir(root, dir) {
  const fullDir = path.join(root, dir);
  if (!fs.existsSync(fullDir)) return [];
  try {
    return fs.readdirSync(fullDir, { withFileTypes: true })
      .filter(e => e.isFile())
      .map(e => path.join(fullDir, e.name));
  } catch { return []; }
}

function scanDirRecursive(root, dir, maxDepth = 5) {
  const results = [];
  const fullDir = path.join(root, dir);
  if (!fs.existsSync(fullDir)) return results;

  function walk(current, depth) {
    if (depth > maxDepth) return;
    let items;
    try { items = fs.readdirSync(current, { withFileTypes: true }); }
    catch { return; }
    for (const item of items) {
      const fp = path.join(current, item.name);
      if (item.isFile()) results.push(fp);
      else if (item.isDirectory() && !IGNORED_DIRS.has(item.name)) walk(fp, depth + 1);
    }
  }
  walk(fullDir, 0);
  return results;
}

// ─── Basic Analysis ──────────────────────────────────────────────────────────

function analyzeProject(root, entries, opts) {
  const result = {};
  const allFiles = entries.filter(e => e.type === 'file');

  if (opts.flags.has('stack') || opts.flags.size === 5) {
    result.overview = detectOverview(root);
  }
  if (opts.flags.has('stack')) {
    result.stack = detectStack(root, allFiles);
  }
  if (opts.flags.has('entrypoints')) {
    result.entryPoints = detectEntryPoints(root, allFiles);
  }
  if (opts.flags.has('metrics')) {
    result.metrics = detectMetrics(root, allFiles);
  }
  if (opts.flags.has('dependencies')) {
    result.dependencies = detectDependencies(root);
  }
  if (opts.flags.has('structure')) {
    result.structure = buildTree(entries);
  }

  // Deep analysis
  if (opts.deep) {
    result.deep = {};
    result.deep.apiEndpoints = deepApiEndpoints(root);
    result.deep.databaseSchema = deepDatabaseSchema(root);
    result.deep.envVars = deepEnvVars(root);
    result.deep.architecture = deepArchitecture(root, entries);
    result.deep.auth = deepAuth(root);
    result.deep.keyFiles = deepKeyFiles(root);
    result.deep.eventSystem = deepEventSystem(root);
    result.deep.config = deepConfig(root);
    result.deep.serviceLayer = deepServiceLayer(root);
    result.deep.moduleBoundaries = deepModuleBoundaries(root, entries);
    result.deep.businessLogic = deepBusinessLogic(root);
    result.deep.dataFlow = deepDataFlow(root);
    result.deep.integrations = deepIntegrations(root);
    result.deep.performance = deepPerformance(root);
    result.deep.codeQuality = deepCodeQuality(root);
    result.deep.deployment = deepDeployment(root);
  }

  return result;
}

function detectOverview(root) {
  const pkg = readJsonSafe(path.join(root, 'package.json'));
  const pyCfg = fs.existsSync(path.join(root, 'pyproject.toml'));
  const cargo = readJsonSafe(path.join(root, 'Cargo.toml'));
  const goMod = readFileSafe(path.join(root, 'go.mod'));
  const composer = readJsonSafe(path.join(root, 'composer.json'));

  const overview = { name: path.basename(root), description: '', type: 'unknown' };

  if (composer) {
    overview.name = Object.keys(composer.name || {})[0] || overview.name;
    if (typeof composer.name === 'string') overview.name = composer.name;
    overview.description = composer.description || '';
    overview.type = 'Laravel/PHP';
  } else if (pkg) {
    overview.name = pkg.name || overview.name;
    overview.description = pkg.description || '';
    overview.version = pkg.version || '';
    overview.license = pkg.license || '';
    overview.author = typeof pkg.author === 'string' ? pkg.author : (pkg.author?.name || '');
    overview.type = pkg.type === 'module' ? 'ES Module' : (pkg.scripts?.dev ? 'Application' : 'Library');
    if (pkg.workspaces) overview.type = 'Monorepo';
  } else if (cargo) {
    overview.name = cargo.package?.name || overview.name;
    overview.description = cargo.package?.description || '';
    overview.version = cargo.package?.version || '';
    overview.type = 'Rust Project';
  } else if (goMod) {
    const modMatch = goMod.match(/module\s+(.+)/);
    if (modMatch) overview.name = modMatch[1].split('/').pop();
    overview.type = 'Go Project';
  } else if (pyCfg) {
    overview.type = 'Python Project';
  }

  const allFileNames = fs.readdirSync(root);
  if (allFileNames.includes('Dockerfile')) overview.type += ' (Containerized)';

  return overview;
}

function detectStack(root, allFiles) {
  const stack = {
    languages: new Set(), frameworks: new Set(), databases: new Set(),
    devops: new Set(), tools: new Set(), runtimes: new Set(), packageManagers: new Set(),
  };

  for (const f of allFiles) {
    const ext = path.extname(f.name).toLowerCase();
    if (EXT_TO_LANG[ext]) stack.languages.add(EXT_TO_LANG[ext]);
  }

  if (allFiles.some(f => f.name === 'Dockerfile')) stack.languages.add('Docker');
  if (allFiles.some(f => f.name.match(/Makefile/))) stack.tools.add('Make');

  if (fs.existsSync(path.join(root, 'package-lock.json'))) stack.packageManagers.add('npm');
  if (fs.existsSync(path.join(root, 'yarn.lock'))) stack.packageManagers.add('Yarn');
  if (fs.existsSync(path.join(root, 'pnpm-lock.yaml'))) stack.packageManagers.add('pnpm');
  if (fs.existsSync(path.join(root, 'bun.lockb')) || fs.existsSync(path.join(root, 'bun.lock'))) stack.packageManagers.add('Bun');
  if (fs.existsSync(path.join(root, 'Pipfile.lock'))) stack.packageManagers.add('Pipenv');
  if (fs.existsSync(path.join(root, 'poetry.lock'))) stack.packageManagers.add('Poetry');
  if (fs.existsSync(path.join(root, 'requirements.txt'))) stack.packageManagers.add('pip');
  if (fs.existsSync(path.join(root, 'Cargo.lock'))) stack.packageManagers.add('Cargo');
  if (fs.existsSync(path.join(root, 'go.sum'))) stack.packageManagers.add('Go Modules');
  if (fs.existsSync(path.join(root, 'composer.lock'))) stack.packageManagers.add('Composer');

  for (const [category, checks] of Object.entries(FRAMEWORK_DETECTION)) {
    for (const check of checks) {
      if (fs.existsSync(path.join(root, check.file))) {
        stack.frameworks.add(check.name);
        if (check.content) {
          const content = readFileSafe(path.join(root, check.file));
          if (content && content.toLowerCase().includes(check.content)) stack.frameworks.add(check.name);
        }
      }
    }
  }

  // Laravel detection
  if (fs.existsSync(path.join(root, 'artisan'))) stack.frameworks.add('Laravel');
  if (fs.existsSync(path.join(root, 'composer.json'))) {
    const comp = readJsonSafe(path.join(root, 'composer.json'));
    if (comp) {
      const allDeps = { ...comp.require, ...comp['require-dev'] };
      if (allDeps['laravel/framework']) stack.frameworks.add('Laravel');
      if (allDeps['inertiajs/inertia-laravel']) stack.frameworks.add('Inertia.js');
      if (allDeps['livewire/livewire']) stack.frameworks.add('Livewire');
    }
  }

  const allDeps = new Set();
  const pkg = readJsonSafe(path.join(root, 'package.json'));
  if (pkg) {
    Object.keys(pkg.dependencies || {}).forEach(d => allDeps.add(d));
    Object.keys(pkg.devDependencies || {}).forEach(d => allDeps.add(d));
  }
  const pyReqs = readFileSafe(path.join(root, 'requirements.txt'));
  if (pyReqs) pyReqs.split('\n').forEach(l => allDeps.add(l.split(/[=<>!]/)[0].trim()));

  for (const db of DB_DETECTION) {
    if (db.patterns.some(p => allDeps.has(p) || [...allDeps].some(d => d.includes(p)))) {
      stack.databases.add(db.name);
    }
  }

  // Check Laravel DB config
  const dbConfig = readFileSafe(path.join(root, 'config/database.php'));
  if (dbConfig) {
    if (dbConfig.includes("'mysql'")) stack.databases.add('MySQL');
    if (dbConfig.includes("'pgsql'")) stack.databases.add('PostgreSQL');
    if (dbConfig.includes("'sqlite'")) stack.databases.add('SQLite');
  }

  for (const check of DEVOPS_DETECTION) {
    if (check.file && fs.existsSync(path.join(root, check.file))) stack.devops.add(check.name);
    if (check.dir && fs.existsSync(path.join(root, check.dir))) stack.devops.add(check.name);
  }

  for (const tool of TOOL_DETECTION) {
    if (tool.patterns.some(p => allDeps.has(p) || [...allDeps].some(d => d.includes(p)))) {
      stack.tools.add(tool.name);
    }
  }

  for (const lang of stack.languages) {
    if (LANG_RUNTIMES[lang]) stack.runtimes.add(LANG_RUNTIMES[lang]);
  }

  const toArr = s => [...s].sort();
  return {
    languages: toArr(stack.languages), frameworks: toArr(stack.frameworks),
    databases: toArr(stack.databases), devops: toArr(stack.devops),
    tools: toArr(stack.tools), runtimes: toArr(stack.runtimes),
    packageManagers: toArr(stack.packageManagers),
  };
}

function detectEntryPoints(root, allFiles) {
  const entryPoints = [];

  const pkg = readJsonSafe(path.join(root, 'package.json'));
  if (pkg) {
    if (pkg.main) entryPoints.push({ type: 'main', file: pkg.main });
    if (pkg.bin) {
      if (typeof pkg.bin === 'string') entryPoints.push({ type: 'bin', file: pkg.bin });
      else Object.entries(pkg.bin).forEach(([name, file]) => entryPoints.push({ type: 'bin', name, file }));
    }
    if (pkg.scripts) {
      Object.entries(pkg.scripts).forEach(([name, cmd]) => {
        entryPoints.push({ type: 'npm script', name, command: cmd });
      });
    }
  }

  // Laravel
  if (fs.existsSync(path.join(root, 'artisan'))) entryPoints.push({ type: 'entry file', file: 'artisan' });
  if (fs.existsSync(path.join(root, 'public/index.php'))) entryPoints.push({ type: 'entry file', file: 'public/index.php' });
  if (fs.existsSync(path.join(root, 'routes/web.php'))) entryPoints.push({ type: 'entry file', file: 'routes/web.php' });
  if (fs.existsSync(path.join(root, 'routes/api.php'))) entryPoints.push({ type: 'entry file', file: 'routes/api.php' });

  const entryPatterns = [
    'index.js', 'index.ts', 'index.mjs', 'index.cjs',
    'src/index.js', 'src/index.ts', 'src/main.js', 'src/main.ts',
    'src/app.js', 'src/app.ts', 'src/server.js', 'src/server.ts',
    'server.js', 'server.ts', 'app.js', 'app.ts',
    'main.py', 'app.py', 'manage.py', '__main__.py',
    'main.go', 'cmd/main.go', 'src/main.rs',
  ];

  for (const pattern of entryPatterns) {
    if (fs.existsSync(path.join(root, pattern))) entryPoints.push({ type: 'entry file', file: pattern });
  }

  if (fs.existsSync(path.join(root, 'app'))) entryPoints.push({ type: 'framework', name: 'Next.js App Router', dir: 'app/' });
  if (fs.existsSync(path.join(root, 'pages'))) entryPoints.push({ type: 'framework', name: 'Pages Router', dir: 'pages/' });
  if (fs.existsSync(path.join(root, 'src/app'))) entryPoints.push({ type: 'framework', name: 'Next.js App Router', dir: 'src/app/' });
  if (fs.existsSync(path.join(root, 'src/pages'))) entryPoints.push({ type: 'framework', name: 'Pages Router', dir: 'src/pages/' });

  return entryPoints;
}

function detectMetrics(root, allFiles) {
  const langBreakdown = {};
  let totalLines = 0;
  let totalSize = 0;
  const fileSizes = [];

  for (const f of allFiles) {
    const ext = path.extname(f.name).toLowerCase();
    const lang = EXT_TO_LANG[ext] || 'Other';
    const fullPath = path.join(root, f.relPath);

    if (!langBreakdown[lang]) langBreakdown[lang] = { files: 0, lines: 0, size: 0 };

    let lines = 0;
    try {
      if (f.size < MAX_FILE_SIZE_BYTES) lines = countLines(fullPath);
    } catch {}

    langBreakdown[lang].files++;
    langBreakdown[lang].lines += lines;
    langBreakdown[lang].size += f.size;
    totalLines += lines;
    totalSize += f.size;
    fileSizes.push({ name: f.relPath, size: f.size, lines, lang });
  }

  fileSizes.sort((a, b) => b.lines - a.lines);

  const testFiles = allFiles
    .filter(f => f.name.match(/\.(test|spec)\./) || f.relPath.match(/__tests__|tests?\/|spec\//))
    .map(f => f.relPath);

  return {
    totalFiles: allFiles.length,
    totalLines,
    totalSize: formatBytes(totalSize),
    languages: Object.entries(langBreakdown)
      .map(([lang, data]) => ({ lang, ...data, size: formatBytes(data.size) }))
      .sort((a, b) => b.lines - a.lines),
    largestFiles: fileSizes.slice(0, 10).map(f => ({ ...f, size: formatBytes(f.size) })),
    testFiles: testFiles.slice(0, 20),
    testFileCount: testFiles.length,
  };
}

function detectDependencies(root) {
  const deps = {};

  const pkg = readJsonSafe(path.join(root, 'package.json'));
  if (pkg) {
    deps.node = {
      production: Object.keys(pkg.dependencies || {}).length,
      dev: Object.keys(pkg.devDependencies || {}).length,
      total: Object.keys(pkg.dependencies || {}).length + Object.keys(pkg.devDependencies || {}).length,
      productionList: Object.keys(pkg.dependencies || {}).sort(),
      devList: Object.keys(pkg.devDependencies || {}).sort(),
    };
  }

  // PHP/Composer
  const composer = readJsonSafe(path.join(root, 'composer.json'));
  if (composer) {
    deps.php = {
      production: Object.keys(composer.require || {}).length,
      dev: Object.keys(composer['require-dev'] || {}).length,
      total: Object.keys(composer.require || {}).length + Object.keys(composer['require-dev'] || {}).length,
      productionList: Object.keys(composer.require || {}).sort(),
      devList: Object.keys(composer['require-dev'] || {}).sort(),
    };
  }

  const reqs = readFileSafe(path.join(root, 'requirements.txt'));
  if (reqs) {
    const lines = reqs.split('\n').filter(l => l.trim() && !l.startsWith('#'));
    deps.python = { count: lines.length, packages: lines.map(l => l.split(/[=<>!]/)[0].trim()).sort() };
  }

  const pyproject = readFileSafe(path.join(root, 'pyproject.toml'));
  if (pyproject && !deps.python) deps.python = { configFile: 'pyproject.toml' };

  const goMod = readFileSafe(path.join(root, 'go.mod'));
  if (goMod) {
    const requires = goMod.split('require (')[1];
    if (requires) {
      const pkgLines = requires.split(')')[0].split('\n').filter(l => l.trim());
      deps.go = { count: pkgLines.length };
    }
  }

  const cargo = readJsonSafe(path.join(root, 'Cargo.toml'));
  if (cargo) {
    deps.rust = {
      dependencies: Object.keys(cargo.dependencies || {}).length,
      devDependencies: Object.keys(cargo['dev-dependencies'] || {}).length,
    };
  }

  return deps;
}

// ═══════════════════════════════════════════════════════════════════════════════
// ─── DEEP ANALYSIS MODULES ───────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

// ─── 1. API Endpoint Map ─────────────────────────────────────────────────────

function deepApiEndpoints(root) {
  const endpoints = [];

  // Laravel routes
  const routeFiles = ['web.php', 'api.php', 'console.php', 'channels.php', 'settings.php', 'auth.php'];
  for (const rf of routeFiles) {
    const fp = path.join(root, 'routes', rf);
    if (!fs.existsSync(fp)) continue;
    const content = readFileSafe(fp, 100000);
    if (!content) continue;

    const prefix = rf.replace('.php', '');
    const parsed = parseLaravelRoutes(content, prefix, fp);
    endpoints.push(...parsed);
  }

  // Check help/ subdirectory routes
  const helpRoutes = path.join(root, 'help', 'routes');
  if (fs.existsSync(helpRoutes)) {
    for (const rf of routeFiles) {
      const fp = path.join(helpRoutes, rf);
      if (!fs.existsSync(fp)) continue;
      const content = readFileSafe(fp, 100000);
      if (!content) continue;
      const prefix = 'help/' + rf.replace('.php', '');
      endpoints.push(...parseLaravelRoutes(content, prefix, fp));
    }
  }

  // Express/Fastify routes
  const jsRouteFiles = [];
  const routeDirs = ['routes', 'src/routes', 'api', 'src/api'];
  for (const d of routeDirs) {
    jsRouteFiles.push(...scanDir(root, d));
  }
  for (const fp of jsRouteFiles) {
    const content = readFileSafe(fp, 100000);
    if (!content) continue;
    endpoints.push(...parseExpressRoutes(content, fp));
  }

  // Next.js API routes
  const nextApiDirs = ['app/api', 'pages/api', 'src/app/api', 'src/pages/api'];
  for (const d of nextApiDirs) {
    const files = scanDirRecursive(root, d);
    for (const fp of files) {
      const content = readFileSafe(fp, 50000);
      if (!content) continue;
      const relPath = fp.replace(root, '').replace(/\\/g, '/');
      endpoints.push(...parseNextApiRoutes(content, relPath));
    }
  }

  // Go HTTP handlers
  const goFiles = scanDirRecursive(root, '', 3).filter(f => f.endsWith('.go'));
  for (const fp of goFiles) {
    const content = readFileSafe(fp, 100000);
    if (!content) continue;
    endpoints.push(...parseGoRoutes(content, fp.replace(root, '')));
  }

  // Controllers (for context)
  const controllers = parseLaravelControllers(root);
  return { endpoints, controllers };
}

function parseLaravelRoutes(content, source, filePath) {
  const endpoints = [];
  const lines = content.split('\n');
  let currentMiddleware = [];
  let currentPrefix = '';
  let currentNamespace = '';
  let groupDepth = 0;
  const groupStack = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith('//') || line.startsWith('*') || line.startsWith('use ')) continue;

    // Route::group or Route::prefix or Route::middleware
    const groupMatch = line.match(/Route::(group|prefix|middleware)\s*\(\s*\[?/);
    if (groupMatch) {
      groupDepth++;
      // Extract prefix
      const prefixMatch = line.match(/'prefix'\s*=>\s*'([^']+)'/);
      if (prefixMatch) currentPrefix = prefixMatch[1];

      // Extract middleware
      const mwMatch = line.match(/'middleware'\s*=>\s*\[([^\]]+)\]/);
      if (mwMatch) {
        const mws = mwMatch[1].match(/'([^']+)'/g);
        if (mws) currentMiddleware = mws.map(m => m.replace(/'/g, ''));
      }
      groupStack.push({ prefix: currentPrefix, middleware: [...currentMiddleware] });
    }

    // Route::get, Route::post, etc.
    const routeMatch = line.match(/Route::(get|post|put|patch|delete|options|any|match)\s*\(\s*'([^']+)'/i);
    if (routeMatch) {
      const method = routeMatch[1].toUpperCase();
      let routePath = routeMatch[2];
      if (currentPrefix) routePath = currentPrefix + '/' + routePath;
      routePath = '/' + routePath.replace(/\/+/g, '/');

      // Extract controller/action
      const controllerMatch = line.match(/\[(\w+Controller)::class,\s*'(\w+)'\]/);
      const actionMatch = line.match(/(\w+Controller)@(\w+)/);
      const inlineAction = line.match(/function\s*\(/);

      let controller = '', action = '';
      if (controllerMatch) { controller = controllerMatch[1]; action = controllerMatch[2]; }
      else if (actionMatch) { controller = actionMatch[1]; action = actionMatch[2]; }
      else if (inlineAction) { action = 'closure'; }

      // Extract inline middleware
      let mw = [...currentMiddleware];
      const inlineMw = line.match(/->middleware\(\s*['"]([^'"]+)['"]\s*\)/);
      if (inlineMw) mw.push(inlineMw[1]);
      const inlineMwArr = line.match(/->middleware\(\s*\[([^\]]+)\]\s*\)/);
      if (inlineMwArr) {
        const mws = inlineMwArr[1].match(/'([^']+)'/g);
        if (mws) mw.push(...mws.map(m => m.replace(/'/g, '')));
      }

      // Extract name
      const nameMatch = line.match(/->name\(\s*'([^']+)'\s*\)/);
      const name = nameMatch ? nameMatch[1] : '';

      endpoints.push({
        method, path: routePath, controller, action, middleware: mw,
        name, source: path.basename(filePath), line: i + 1,
      });
    }

    // Route::resource / Route::apiResource
    const resMatch = line.match(/Route::(resource|apiResource)\s*\(\s*'([^']+)',\s*(\w+Controller)/);
    if (resMatch) {
      const isApi = resMatch[1] === 'apiResource';
      const basePath = resMatch[2];
      const ctrl = resMatch[3];
      const methods = isApi
        ? ['GET', 'POST', 'PUT/PATCH', 'DELETE']
        : ['GET', 'POST', 'GET', 'PUT/PATCH', 'DELETE', 'GET', 'GET'];
      const actions = isApi
        ? ['index', 'store', 'update', 'destroy']
        : ['index', 'store', 'create', 'update', 'destroy', 'show', 'edit'];

      for (let j = 0; j < methods.length; j++) {
        endpoints.push({
          method: methods[j],
          path: '/' + basePath + (j > 1 ? '/{id}' : ''),
          controller: ctrl, action: actions[j],
          middleware: [...currentMiddleware], name: '',
          source: path.basename(filePath), line: i + 1,
        });
      }
    }

    // Close group
    if (line.includes('});') && groupDepth > 0) {
      groupDepth--;
      const prev = groupStack.pop();
      if (prev) {
        currentPrefix = groupStack.length > 0 ? groupStack[groupStack.length - 1].prefix : '';
        currentMiddleware = groupStack.length > 0 ? groupStack[groupStack.length - 1].middleware : [];
      }
    }
  }

  return endpoints;
}

function parseExpressRoutes(content, filePath) {
  const endpoints = [];
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const m = line.match(/(?:router|app|route)\.(get|post|put|patch|delete|all)\s*\(\s*['"`]([^'"`]+)['"`]/i);
    if (m) {
      endpoints.push({
        method: m[1].toUpperCase(), path: m[2], controller: '', action: '',
        middleware: [], name: '', source: path.basename(filePath), line: i + 1,
      });
    }
  }
  return endpoints;
}

function parseNextApiRoutes(content, relPath) {
  const endpoints = [];
  const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
  for (const method of methods) {
    if (content.includes(`export ${method}`) || content.includes(`export async function ${method}`)) {
      const routePath = relPath
        .replace(/\/route\.(js|ts)$/, '')
        .replace(/\/index\.(js|ts)$/, '')
        .replace(/\/\[(\w+)\]/g, '/{$1}')
        .replace(/^\/(app|pages)\/api/, '');
      endpoints.push({ method, path: routePath || '/', controller: '', action: method.toLowerCase(),
        middleware: [], name: '', source: relPath, line: 0 });
    }
  }
  return endpoints;
}

function parseGoRoutes(content, filePath) {
  const endpoints = [];
  const patterns = [
    /\.(HandleFunc|Handle|Get|Post|Put|Patch|Delete)\s*\(\s*"([^"]+)"/g,
    /\.(GET|POST|PUT|PATCH|DELETE|HandleFunc)\s*\(\s*"([^"]+)"/g,
  ];
  for (const pat of patterns) {
    let m;
    while ((m = pat.exec(content)) !== null) {
      const methodMap = { 'HandleFunc': 'ANY', 'Handle': 'ANY', 'Get': 'GET', 'Post': 'POST', 'Put': 'PUT', 'Patch': 'PATCH', 'Delete': 'DELETE',
        'GET': 'GET', 'POST': 'POST', 'PUT': 'PUT', 'PATCH': 'PATCH', 'DELETE': 'DELETE' };
      endpoints.push({
        method: methodMap[m[1]] || m[1].toUpperCase(), path: m[2], controller: '', action: '',
        middleware: [], name: '', source: filePath, line: 0,
      });
    }
  }
  return endpoints;
}

function parseLaravelControllers(root) {
  const controllers = [];
  const ctrlDirs = [
    path.join(root, 'app', 'Http', 'Controllers'),
    path.join(root, 'help', 'app', 'Http', 'Controllers'),
  ];

  for (const ctrlDir of ctrlDirs) {
    if (!fs.existsSync(ctrlDir)) continue;
    const files = scanDirRecursive(ctrlDir, '', 3);
    for (const fp of files) {
      if (!fp.endsWith('.php')) continue;
      const content = readFileSafe(fp, 50000);
      if (!content) continue;

      const classMatch = content.match(/class\s+(\w+)\s+extends\s+\w+/);
      if (!classMatch) continue;
      const className = classMatch[1];

      // Find public methods
      const methods = [];
      const methodRegex = /public\s+function\s+(\w+)\s*\(([^)]*)\)/g;
      let mm;
      while ((mm = methodRegex.exec(content)) !== null) {
        methods.push({ name: mm[1], params: mm[2].trim() });
      }

      const relPath = fp.replace(root + '/', '');
      controllers.push({ class: className, file: relPath, methods });
    }
  }
  return controllers;
}

// ─── 2. Database Schema ──────────────────────────────────────────────────────

function deepDatabaseSchema(root) {
  const tables = [];

  // Laravel migrations
  const migrationDirs = [
    path.join(root, 'database', 'migrations'),
    path.join(root, 'help', 'database', 'migrations'),
  ];

  for (const mDir of migrationDirs) {
    if (!fs.existsSync(mDir)) continue;
    const prefix = mDir.includes('/help/') ? 'help/' : '';
    const files = fs.readdirSync(mDir).filter(f => f.endsWith('.php')).map(f => path.join(mDir, f));
    for (const fp of files) {
      const content = readFileSafe(fp, 100000);
      if (!content) continue;
      tables.push(...parseLaravelMigration(content, fp, prefix));
    }
  }

  // Eloquent models
  const models = parseLaravelModels(root);

  return { tables, models };
}

function parseLaravelMigration(content, filePath, prefix) {
  const tables = [];

  // Schema::create
  const createMatch = content.match(/Schema::create\s*\(\s*'([^']+)'/);
  if (createMatch) {
    const tableName = prefix + createMatch[1];
    const columns = extractLaravelColumns(content);
    const indexes = extractLaravelIndexes(content);
    const foreignKeys = extractLaravelForeignKeys(content);
    tables.push({ name: tableName, type: 'create', columns, indexes, foreignKeys, file: path.basename(filePath) });
  }

  // Schema::table (alterations)
  const alterMatches = content.matchAll(/Schema::table\s*\(\s*'([^']+)'/g);
  for (const m of alterMatches) {
    const tableName = prefix + m[1];
    const columns = extractLaravelColumns(content);
    tables.push({ name: tableName, type: 'alter', columns, indexes: [], foreignKeys: [], file: path.basename(filePath) });
  }

  // Schema::dropIfExists
  const dropMatches = content.matchAll(/Schema::dropIfExists\s*\(\s*'([^']+)'/g);
  for (const m of dropMatches) {
    tables.push({ name: prefix + m[1], type: 'drop', columns: [], indexes: [], foreignKeys: [], file: path.basename(filePath) });
  }

  return tables;
}

function extractLaravelColumns(content) {
  const columns = [];
  // Match lines inside the Schema closure
  const closureMatch = content.match(/function\s*\([^)]*\)\s*\{([\s\S]*)\}\s*\);/);
  if (!closureMatch) return columns;

  const body = closureMatch[1];
  const lines = body.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('$table->')) continue;

    // Extract column definition
    const colMatch = trimmed.match(/\$table->(\w+)\s*\(\s*(?:'([^']*)'|)/);
    if (!colMatch) continue;

    const type = colMatch[1];
    const name = colMatch[2] || '';

    // Skip special table methods
    if (['timestamps', 'softDeletes', 'rememberToken', 'nullableTimestamps', 'morphs', 'nullableMorphs', 'uuidMorphs'].includes(type) && !name) {
      // Handle as column with derived name
      const derivedNames = {
        'timestamps': ['created_at', 'updated_at'],
        'softDeletes': ['deleted_at'],
        'rememberToken': ['remember_token'],
      };
      const dnames = derivedNames[type] || [type];
      for (const dn of dnames) {
        columns.push({ name: dn, type, nullable: type === 'softDeletes', default: null });
      }
      continue;
    }

    if (!name && !['id', 'timestamps', 'softDeletes'].includes(type)) continue;

    const nullable = trimmed.includes('->nullable()');
    const defaultMatch = trimmed.match(/->default\s*\(\s*([^)]+)\s*\)/);
    const defaultVal = defaultMatch ? defaultMatch[1].replace(/['"]/g, '') : null;
    const unsigned = trimmed.includes('->unsigned()');

    columns.push({ name: name || type, type, nullable, default: defaultVal, unsigned });
  }

  return columns;
}

function extractLaravelIndexes(content) {
  const indexes = [];
  const indexRegex = /\$table->(index|unique|primary|spatialIndex|fulltext)\s*\(\s*(?:\[([^\]]+)\]|'([^']+)')/g;
  let m;
  while ((m = indexRegex.exec(content)) !== null) {
    const type = m[1];
    const cols = (m[2] || m[3]).split(',').map(c => c.trim().replace(/['"]/g, ''));
    indexes.push({ type, columns: cols });
  }

  // Also catch ->unique() chained on column definitions
  const uniqueRegex = /\$table->\w+\s*\(\s*'(\w+)'.*?->unique\(\)/g;
  while ((m = uniqueRegex.exec(content)) !== null) {
    indexes.push({ type: 'unique', columns: [m[1]] });
  }

  return indexes;
}

function extractLaravelForeignKeys(content) {
  const fks = [];
  // $table->foreignId('x')->constrained('y')
  const fkRegex = /\$table->foreignId\s*\(\s*'(\w+)'\s*\)->constrained\s*\(\s*(?:'([^']+)')?/g;
  let m;
  while ((m = fkRegex.exec(content)) !== null) {
    fks.push({ column: m[1], references: 'id', onTable: m[2] || m[1].replace(/_id$/, '') + 's', onDelete: '' });
  }

  // $table->foreign('x')->references('y')->on('z')
  const fkRegex2 = /\$table->foreign\s*\(\s*'(\w+)'\s*\)->references\s*\(\s*'(\w+)'\s*\)->on\s*\(\s*'([^']+)'\s*\)(?:->onDelete\s*\(\s*'([^']+)'\s*\))?/g;
  while ((m = fkRegex2.exec(content)) !== null) {
    fks.push({ column: m[1], references: m[2], onTable: m[3], onDelete: m[4] || '' });
  }

  return fks;
}

function parseLaravelModels(root) {
  const models = [];
  const modelDirs = [
    path.join(root, 'app', 'Models'),
    path.join(root, 'help', 'app', 'Models'),
  ];

  for (const mDir of modelDirs) {
    if (!fs.existsSync(mDir)) continue;
    const prefix = mDir.includes('/help/') ? 'help/' : '';
    const files = fs.readdirSync(mDir).filter(f => f.endsWith('.php')).map(f => path.join(mDir, f));
    for (const fp of files) {
      const content = readFileSafe(fp, 50000);
      if (!content) continue;

      const classMatch = content.match(/class\s+(\w+)\s+extends\s+(\w+)/);
      if (!classMatch) continue;

      const name = classMatch[1];
      const parent = classMatch[2];

      // fillable
      const fillableMatch = content.match(/protected\s+\$fillable\s*=\s*\[([^\]]*)\]/s);
      const fillable = fillableMatch
        ? fillableMatch[1].match(/'([^']+)'/g)?.map(s => s.replace(/'/g, '')) || []
        : [];

      // guarded
      const guardedMatch = content.match(/protected\s+\$guarded\s*=\s*\[([^\]]*)\]/s);
      const guarded = guardedMatch
        ? guardedMatch[1].match(/'([^']+)'/g)?.map(s => s.replace(/'/g, '')) || []
        : [];

      // casts
      const castsMatch = content.match(/protected\s+\$casts\s*=\s*\[([^\]]*)\]/s);
      const casts = {};
      if (castsMatch) {
        const castEntries = castsMatch[1].matchAll(/'(\w+)'\s*=>\s*'([^']+)'/g);
        for (const ce of castEntries) casts[ce[1]] = ce[2];
      }

      // table
      const tableMatch = content.match(/protected\s+\$table\s*=\s*'([^']+)'/);
      const table = tableMatch ? tableMatch[1] : '';

      // relationships
      const relationships = [];
      const relRegex = /public\s+function\s+(\w+)\s*\(\s*\)\s*\{[\s]*return\s+\$this->(hasMany|belongsTo|hasOne|belongsToMany|morphTo|morphMany|morphOne|morphToMany)\s*\(\s*(?:([\w\\]+)::class)?(?:\s*,\s*'([^']+)')?/g;
      let rm;
      while ((rm = relRegex.exec(content)) !== null) {
        relationships.push({
          name: rm[1], type: rm[2], relatedModel: (rm[3] || '').split('\\').pop(),
          foreignKey: rm[4] || '',
        });
      }

      models.push({ name, parent, table, fillable, guarded, casts, relationships, file: prefix + 'app/Models/' + path.basename(fp) });
    }
  }

  return models;
}

// ─── 3. Environment Variables ────────────────────────────────────────────────

function deepEnvVars(root) {
  const envVars = new Map();

  // Parse .env.example
  const envFiles = ['.env.example', '.env.sample', '.env.template', '.env.stub'];
  for (const ef of envFiles) {
    const fp = path.join(root, ef);
    if (!fs.existsSync(fp)) continue;
    const content = readFileSafe(fp, 50000);
    if (!content) continue;
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const m = trimmed.match(/^([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/);
      if (m) {
        const name = m[1];
        const example = m[2].replace(/^["']|["']$/g, '');
        if (!envVars.has(name)) envVars.set(name, { name, example: '', source: '', usage: [] });
        const ev = envVars.get(name);
        ev.example = example;
        ev.source = ef;
      }
    }
  }

  // Scan PHP files for env() calls
  const phpFiles = scanDirRecursive(root, 'app', 4)
    .concat(scanDirRecursive(root, 'config', 2))
    .concat(scanDirRecursive(root, 'routes', 2))
    .concat(scanDirRecursive(root, 'help', 5))
    .filter(f => f.endsWith('.php'));

  for (const fp of phpFiles) {
    const content = readFileSafe(fp, 50000);
    if (!content) continue;
    const relPath = fp.replace(root + '/', '');

    // env('KEY') or env("KEY")
    const envRegex = /env\s*\(\s*['"]([A-Z_][A-Z0-9_]*)['"]/g;
    let m;
    while ((m = envRegex.exec(content)) !== null) {
      const name = m[1];
      if (!envVars.has(name)) envVars.set(name, { name, example: '', source: '', usage: [] });
      const ev = envVars.get(name);
      if (!ev.usage.includes(relPath)) ev.usage.push(relPath);
    }

    // config('file.key') references
    const configRegex = /config\s*\(\s*['"]([\w.]+)['"]/g;
    while ((m = configRegex.exec(content)) !== null) {
      // Store config references as pseudo-env if they use env() in config
    }
  }

  // Scan config files for env() calls with defaults
  const configFiles = scanDir(root, 'config')
    .concat(scanDir(path.join(root, 'help'), 'config').map(f => f));
  const configDir = path.join(root, 'config');
  const configDirFiles = fs.existsSync(configDir)
    ? fs.readdirSync(configDir).filter(f => f.endsWith('.php')).map(f => path.join(configDir, f))
    : [];

  for (const fp of configDirFiles) {
    const content = readFileSafe(fp, 50000);
    if (!content) continue;
    const relPath = fp.replace(root + '/', '');
    const envRegex = /env\s*\(\s*['"]([A-Z_][A-Z0-9_]*)['"](?:\s*,\s*([^)]+))?\)/g;
    let m;
    while ((m = envRegex.exec(content)) !== null) {
      const name = m[1];
      const defaultVal = m[2] ? m[2].trim().replace(/^["']|["']$/g, '') : '';
      if (!envVars.has(name)) envVars.set(name, { name, example: defaultVal, source: '', usage: [] });
      const ev = envVars.get(name);
      if (!ev.usage.includes(relPath)) ev.usage.push(relPath);
      if (!ev.example && defaultVal) ev.example = defaultVal;
    }
  }

  // Also scan JS/TS for process.env
  const jsFiles = scanDirRecursive(root, 'src', 3)
    .concat(scanDirRecursive(root, '', 2))
    .filter(f => /\.(js|ts|jsx|tsx|mjs|cjs)$/.test(f));

  for (const fp of jsFiles) {
    const content = readFileSafe(fp, 50000);
    if (!content) continue;
    const relPath = fp.replace(root + '/', '');
    const envRegex = /process\.env\.([A-Z_][A-Z0-9_]*)/g;
    let m;
    while ((m = envRegex.exec(content)) !== null) {
      const name = m[1];
      if (!envVars.has(name)) envVars.set(name, { name, example: '', source: '', usage: [] });
      const ev = envVars.get(name);
      if (!ev.usage.includes(relPath)) ev.usage.push(relPath);
    }
  }

  return [...envVars.values()].sort((a, b) => a.name.localeCompare(b.name));
}

// ─── 4. Architecture Patterns ───────────────────────────────────────────────

function deepArchitecture(root, entries) {
  const patterns = [];
  const dirNames = entries.filter(e => e.type === 'dir').map(e => e.name);
  const dirPaths = new Set(dirNames);

  // Laravel/MVC detection
  const hasControllers = dirPaths.has('Controllers') || fs.existsSync(path.join(root, 'app', 'Http', 'Controllers'));
  const hasModels = dirPaths.has('Models') || fs.existsSync(path.join(root, 'app', 'Models'));
  const hasViews = dirPaths.has('views') || fs.existsSync(path.join(root, 'resources', 'views'));

  if (hasControllers && hasModels) {
    patterns.push({
      pattern: 'MVC (Model-View-Controller)',
      confidence: 'high',
      evidence: ['app/Http/Controllers/', 'app/Models/', hasViews ? 'resources/views/' : 'Inertia.js (SPA)'],
    });
  }

  // Service Layer
  const hasServices = fs.existsSync(path.join(root, 'app', 'Services'));
  if (hasServices) {
    const serviceFiles = fs.readdirSync(path.join(root, 'app', 'Services')).filter(f => f.endsWith('.php'));
    patterns.push({
      pattern: 'Service Layer',
      confidence: 'high',
      evidence: [`app/Services/ (${serviceFiles.length} services)`],
    });
  }

  // Event-Driven
  const hasEvents = fs.existsSync(path.join(root, 'app', 'Events'));
  const hasListeners = fs.existsSync(path.join(root, 'app', 'Listeners'));
  if (hasEvents || hasListeners) {
    const eventCount = hasEvents ? fs.readdirSync(path.join(root, 'app', 'Events')).filter(f => f.endsWith('.php')).length : 0;
    const listenerCount = hasListeners ? fs.readdirSync(path.join(root, 'app', 'Listeners')).filter(f => f.endsWith('.php')).length : 0;
    patterns.push({
      pattern: 'Event-Driven',
      confidence: 'medium',
      evidence: [`app/Events/ (${eventCount} events)`, `app/Listeners/ (${listenerCount} listeners)`],
    });
  }

  // Observer Pattern
  const hasObservers = fs.existsSync(path.join(root, 'app', 'Observers'));
  if (hasObservers) {
    const obsFiles = fs.readdirSync(path.join(root, 'app', 'Observers')).filter(f => f.endsWith('.php'));
    patterns.push({
      pattern: 'Observer Pattern',
      confidence: 'high',
      evidence: [`app/Observers/ (${obsFiles.length} observers)`],
    });
  }

  // Repository Pattern
  const hasRepositories = fs.existsSync(path.join(root, 'app', 'Repositories'));
  if (hasRepositories) {
    patterns.push({
      pattern: 'Repository Pattern',
      confidence: 'medium',
      evidence: ['app/Repositories/'],
    });
  }

  // Job Queue / Async Processing
  const hasJobs = fs.existsSync(path.join(root, 'app', 'Jobs'));
  const hasNotifications = fs.existsSync(path.join(root, 'app', 'Notifications'));
  if (hasJobs || hasNotifications) {
    const jobCount = hasJobs ? fs.readdirSync(path.join(root, 'app', 'Jobs')).filter(f => f.endsWith('.php')).length : 0;
    patterns.push({
      pattern: 'Job Queue / Async Processing',
      confidence: 'medium',
      evidence: [`app/Jobs/ (${jobCount} jobs)`, hasNotifications ? 'app/Notifications/' : ''].filter(Boolean),
    });
  }

  // Multi-Tenant
  const composer = readJsonSafe(path.join(root, 'composer.json'));
  if (composer) {
    const allDeps = { ...composer.require, ...composer['require-dev'] };
    if (allDeps['spatie/laravel-multitenancy'] || allDeps['tenancy/tenancy-for-laravel']) {
      patterns.push({
        pattern: 'Multi-Tenancy',
        confidence: 'high',
        evidence: ['Composer dependency: multitenancy package'],
      });
    }
  }

  // Check for company_id pattern (manual tenancy)
  const modelsDir = path.join(root, 'app', 'Models');
  if (fs.existsSync(modelsDir)) {
    const modelFiles = fs.readdirSync(modelsDir).filter(f => f.endsWith('.php'));
    let companyIdCount = 0;
    for (const mf of modelFiles.slice(0, 10)) {
      const content = readFileSafe(path.join(modelsDir, mf));
      if (content && (content.includes('company_id') || content.includes('belongsTo(Company'))) {
        companyIdCount++;
      }
    }
    if (companyIdCount >= 2) {
      patterns.push({
        pattern: 'Multi-Tenancy (Company-scoped)',
        confidence: 'high',
        evidence: [`${companyIdCount} models reference company_id`],
      });
    }
  }

  // Modular / Plugin Architecture
  const hasModules = fs.existsSync(path.join(root, 'Modules')) || fs.existsSync(path.join(root, 'modules'));
  if (hasModules) {
    patterns.push({
      pattern: 'Modular Architecture',
      confidence: 'high',
      evidence: ['Modules/ directory present'],
    });
  }

  // API-first
  const hasApiRoutes = fs.existsSync(path.join(root, 'routes', 'api.php'));
  if (hasApiRoutes) {
    patterns.push({
      pattern: 'REST API',
      confidence: 'high',
      evidence: ['routes/api.php present'],
    });
  }

  // Spatie Permissions
  if (composer) {
    const allDeps = { ...composer.require, ...composer['require-dev'] };
    if (allDeps['spatie/laravel-permission']) {
      patterns.push({
        pattern: 'Role-Based Access Control (RBAC)',
        confidence: 'high',
        evidence: ['spatie/laravel-permission in composer.json'],
      });
    }
  }

  // SPA / Inertia
  if (fs.existsSync(path.join(root, 'resources', 'js'))) {
    patterns.push({
      pattern: 'SPA Frontend',
      confidence: 'medium',
      evidence: ['resources/js/ directory'],
    });
  }

  return patterns;
}

// ─── 5. Authentication Flow ──────────────────────────────────────────────────

function deepAuth(root) {
  const result = {
    mechanism: 'Unknown',
    providers: [],
    guards: [],
    middleware: [],
    details: [],
  };

  // Check composer deps
  const composer = readJsonSafe(path.join(root, 'composer.json'));
  if (composer) {
    const allDeps = { ...composer.require, ...composer['require-dev'] };
    if (allDeps['laravel/sanctum']) { result.mechanism = 'Laravel Sanctum (Token + Cookie Auth)'; result.details.push('Sanctum installed'); }
    if (allDeps['laravel/passport']) { result.mechanism = 'Laravel Passport (OAuth2)'; result.details.push('Passport installed'); }
    if (allDeps['tymon/jwt-auth']) { result.mechanism = 'JWT Authentication'; result.details.push('tymon/jwt-auth installed'); }
    if (allDeps['spatie/laravel-permission']) result.details.push('Spatie Permission (RBAC)');
  }

  // Check auth config
  const authConfig = readFileSafe(path.join(root, 'config', 'auth.php'));
  if (authConfig) {
    // Extract guards
    const guardRegex = /'(\w+)'\s*=>\s*\[(?:[^\]]*)'driver'\s*=>\s*'([^']+)'/g;
    let m;
    while ((m = guardRegex.exec(authConfig)) !== null) {
      result.guards.push({ name: m[1], driver: m[2] });
    }

    // Extract providers
    const providerRegex = /'(\w+)'\s*=>\s*\[\s*'driver'\s*=>\s*'([^']+)'/g;
    while ((m = providerRegex.exec(authConfig)) !== null) {
      result.providers.push({ name: m[1], driver: m[2] });
    }
  }

  // Check middleware
  const middlewareDir = path.join(root, 'app', 'Http', 'Middleware');
  if (fs.existsSync(middlewareDir)) {
    const mwFiles = fs.readdirSync(middlewareDir).filter(f => f.endsWith('.php'));
    for (const mf of mwFiles) {
      const content = readFileSafe(path.join(middlewareDir, mf));
      if (!content) continue;
      const classMatch = content.match(/class\s+(\w+)/);
      const isAuth = content.includes('auth') || content.includes('Auth') || content.includes('authenticate');
      result.middleware.push({
        name: classMatch ? classMatch[1] : mf,
        file: mf,
        authRelated: isAuth,
      });
    }
  }

  // Check auth routes
  const authRoutes = readFileSafe(path.join(root, 'routes', 'auth.php'));
  if (authRoutes) {
    if (authRoutes.includes('login')) result.details.push('Login routes defined');
    if (authRoutes.includes('register')) result.details.push('Registration routes defined');
    if (authRoutes.includes('password')) result.details.push('Password reset routes defined');
    if (authRoutes.includes('invitation')) result.details.push('Invitation-based registration');
  }

  // Check BaseAuthenticatable model
  if (fs.existsSync(path.join(root, 'app', 'Models', 'BaseAuthenticatable.php'))) {
    result.details.push('Custom BaseAuthenticatable model');
  }

  // Check for social auth
  if (composer) {
    const allDeps = { ...composer.require, ...composer['require-dev'] };
    if (allDeps['laravel/socialite']) {
      result.details.push('Socialite installed (social auth)');
      result.providers.push({ name: 'Socialite', driver: 'oauth' });
    }
  }

  // Check user model
  const userModel = readFileSafe(path.join(root, 'app', 'Models', 'User.php'));
  if (userModel) {
    if (userModel.includes('MustVerifyEmail')) result.details.push('Email verification required');
    if (userModel.includes('HasApiTokens')) result.details.push('API token authentication (Sanctum)');
    if (userModel.includes('Notifiable')) result.details.push('Notifications enabled');
  }

  // Impersonation
  if (fs.existsSync(path.join(root, 'app', 'Http', 'Controllers', 'ImpersonateController.php'))) {
    result.details.push('User impersonation supported');
  }

  return result;
}

// ─── 6. Key File Summaries ──────────────────────────────────────────────────

function deepKeyFiles(root) {
  const summaries = [];

  // Entry points and configs
  const keyPatterns = [
    { path: 'artisan', desc: 'Laravel CLI entry point' },
    { path: 'public/index.php', desc: 'Web entry point' },
    { path: 'composer.json', desc: 'PHP dependency manifest' },
    { path: 'package.json', desc: 'Node.js dependency manifest' },
    { path: 'routes/web.php', desc: 'Web routes' },
    { path: 'routes/api.php', desc: 'API routes' },
    { path: 'routes/auth.php', desc: 'Authentication routes' },
    { path: 'routes/settings.php', desc: 'Settings routes' },
    { path: 'config/app.php', desc: 'Application config' },
    { path: 'config/auth.php', desc: 'Authentication config' },
    { path: 'config/database.php', desc: 'Database config' },
    { path: 'config/mail.php', desc: 'Mail config' },
    { path: 'config/queue.php', desc: 'Queue config' },
    { path: 'app/Providers/AppServiceProvider.php', desc: 'Main service provider' },
    { path: 'app/Models/BaseModel.php', desc: 'Base model class' },
    { path: 'app/Models/BaseAuthenticatable.php', desc: 'Base authenticatable model' },
    { path: 'app/Http/Controllers/BaseController.php', desc: 'Base controller' },
    { path: 'vite.config.ts', desc: 'Vite build config' },
    { path: 'tsconfig.json', desc: 'TypeScript config' },
    { path: 'phpunit.xml', desc: 'PHPUnit test config' },
  ];

  for (const kp of keyPatterns) {
    const fp = path.join(root, kp.path);
    if (!fs.existsSync(fp)) continue;
    const content = readFileSafe(fp, 3000);
    if (!content) continue;

    const summary = summarizeFile(kp.path, content, kp.desc);
    summaries.push(summary);
  }

  return summaries;
}

function summarizeFile(filePath, content, description) {
  const lines = content.split('\n');
  const summary = { file: filePath, description, lines: lines.length };

  // Extract key info based on file type
  if (filePath.endsWith('.json')) {
    try {
      const json = JSON.parse(content);
      summary.keys = Object.keys(json).slice(0, 10);
      if (json.name) summary.name = json.name;
      if (json.version) summary.version = json.version;
      if (json.scripts) summary.scripts = Object.keys(json.scripts);
    } catch {}
  } else if (filePath.endsWith('.php')) {
    // Extract class name
    const classMatch = content.match(/class\s+(\w+)/);
    if (classMatch) summary.className = classMatch[1];
    // Extract namespace
    const nsMatch = content.match(/namespace\s+([\w\\]+)/);
    if (nsMatch) summary.namespace = nsMatch[1];
    // Extract traits
    const traits = content.match(/use\s+([\w\\]+Trait)/g);
    if (traits) summary.traits = traits.map(t => t.replace('use ', ''));
    // Extract key methods
    const methods = content.match(/public\s+function\s+(\w+)/g);
    if (methods) summary.publicMethods = methods.map(m => m.match(/function\s+(\w+)/)[1]).slice(0, 10);
    // Key imports
    const imports = content.match(/use\s+([\w\\]+);/g);
    if (imports) summary.keyImports = imports.map(i => i.replace('use ', '').replace(';', '')).slice(0, 8);
  } else if (filePath.endsWith('.ts') || filePath.endsWith('.js')) {
    const funcs = content.match(/(?:export\s+)?(?:function|const)\s+(\w+)/g);
    if (funcs) summary.exports = funcs.map(f => f.replace(/(?:export\s+)?(?:function|const)\s+/, '')).slice(0, 10);
  }

  // Brief excerpt
  const nonEmptyLines = lines.filter(l => l.trim() && !l.trim().startsWith('//') && !l.trim().startsWith('*'));
  summary.excerpt = nonEmptyLines.slice(0, 5).join('\n').substring(0, 300);

  return summary;
}

// ─── 7. Event System ────────────────────────────────────────────────────────

function deepEventSystem(root) {
  const events = [];
  const listeners = [];
  const jobs = [];
  const observers = [];
  const notifications = [];
  const mail = [];

  // Events
  const eventsDir = path.join(root, 'app', 'Events');
  if (fs.existsSync(eventsDir)) {
    for (const f of fs.readdirSync(eventsDir).filter(f => f.endsWith('.php'))) {
      const content = readFileSafe(path.join(eventsDir, f));
      if (!content) continue;
      const classMatch = content.match(/class\s+(\w+)/);
      const implementsMatch = content.match(/implements\s+([\w,]+)/g);
      const props = content.match(/public\s+(?:function\s+)?\$(\w+)/g);
      events.push({
        name: classMatch ? classMatch[1] : f.replace('.php', ''),
        file: f,
        properties: props ? props.map(p => p.match(/\$(\w+)/)[1]) : [],
        interfaces: implementsMatch || [],
      });
    }
  }

  // Listeners
  const listenersDir = path.join(root, 'app', 'Listeners');
  if (fs.existsSync(listenersDir)) {
    for (const f of fs.readdirSync(listenersDir).filter(f => f.endsWith('.php'))) {
      const content = readFileSafe(path.join(listenersDir, f));
      if (!content) continue;
      const classMatch = content.match(/class\s+(\w+)/);
      const handlesMatch = content.match(/handles\s*=\s*\[([^\]]+)\]/s);
      listeners.push({
        name: classMatch ? classMatch[1] : f.replace('.php', ''),
        file: f,
        handles: handlesMatch ? handlesMatch[1].match(/[\w\\]+::class/g)?.map(h => h.replace('::class', '').split('\\').pop()) : [],
      });
    }
  }

  // Jobs
  const jobsDir = path.join(root, 'app', 'Jobs');
  if (fs.existsSync(jobsDir)) {
    for (const f of fs.readdirSync(jobsDir).filter(f => f.endsWith('.php'))) {
      const content = readFileSafe(path.join(jobsDir, f));
      if (!content) continue;
      const classMatch = content.match(/class\s+(\w+)/);
      const queueMatch = content.match(/public\s+\$queue\s*=\s*['"]([^'"]+)['"]/);
      const triesMatch = content.match(/public\s+\$tries\s*=\s*(\d+)/);
      const timeoutMatch = content.match(/public\s+\$timeout\s*=\s*(\d+)/);
      jobs.push({
        name: classMatch ? classMatch[1] : f.replace('.php', ''),
        file: f,
        queue: queueMatch ? queueMatch[1] : 'default',
        tries: triesMatch ? parseInt(triesMatch[1]) : null,
        timeout: timeoutMatch ? parseInt(timeoutMatch[1]) : null,
      });
    }
  }

  // Observers
  const observersDir = path.join(root, 'app', 'Observers');
  if (fs.existsSync(observersDir)) {
    for (const f of fs.readdirSync(observersDir).filter(f => f.endsWith('.php'))) {
      const content = readFileSafe(path.join(observersDir, f));
      if (!content) continue;
      const classMatch = content.match(/class\s+(\w+)/);
      const methods = content.match(/public\s+function\s+(creating|created|updating|updated|deleting|deleted|saving|saved|restoring|restored|forceDeleting|forceDeleted)\s*\(/g);
      observers.push({
        name: classMatch ? classMatch[1] : f.replace('.php', ''),
        file: f,
        events: methods ? methods.map(m => m.match(/function\s+(\w+)/)[1]) : [],
      });
    }
  }

  // Notifications
  const notifDir = path.join(root, 'app', 'Notifications');
  if (fs.existsSync(notifDir)) {
    for (const f of fs.readdirSync(notifDir).filter(f => f.endsWith('.php'))) {
      const content = readFileSafe(path.join(notifDir, f));
      if (!content) continue;
      const classMatch = content.match(/class\s+(\w+)/);
      notifications.push({ name: classMatch ? classMatch[1] : f.replace('.php', ''), file: f });
    }
  }

  // Mail
  const mailDir = path.join(root, 'app', 'Mail');
  if (fs.existsSync(mailDir)) {
    for (const f of fs.readdirSync(mailDir).filter(f => f.endsWith('.php'))) {
      const content = readFileSafe(path.join(mailDir, f));
      if (!content) continue;
      const classMatch = content.match(/class\s+(\w+)/);
      const envelope = content.match(/public\s+function\s+envelope\(\)/);
      mail.push({
        name: classMatch ? classMatch[1] : f.replace('.php', ''),
        file: f,
        mailable: true,
      });
    }
  }

  // Event-Listener mapping (from EventServiceProvider)
  const eventServiceProvider = readFileSafe(path.join(root, 'app', 'Providers', 'EventServiceProvider.php'));
  const eventMap = [];
  if (eventServiceProvider) {
    const mapMatch = eventServiceProvider.match(/protected\s+\$listen\s*=\s*\[([\s\S]*?)\];/);
    if (mapMatch) {
      const entries = mapMatch[1].matchAll(/([\w\\]+)\s*=>\s*\[([^\]]+)\]/g);
      for (const e of entries) {
        const event = e[1].split('\\').pop();
        const listenersList = e[2].match(/[\w\\]+::class/g)?.map(l => l.replace('::class', '').split('\\').pop()) || [];
        eventMap.push({ event, listeners: listenersList });
      }
    }
  }

  return { events, listeners, jobs, observers, notifications, mail, eventMap };
}

// ─── 8. Config Summary ──────────────────────────────────────────────────────

function deepConfig(root) {
  const configs = [];

  const configDir = path.join(root, 'config');
  if (!fs.existsSync(configDir)) return configs;

  const configFiles = fs.readdirSync(configDir).filter(f => f.endsWith('.php'));
  for (const cf of configFiles) {
    const content = readFileSafe(path.join(configDir, cf), 30000);
    if (!content) continue;

    const envVars = [];
    const envRegex = /env\s*\(\s*['"]([A-Z_][A-Z0-9_]*)['"](?:\s*,\s*([^)]+))?\)/g;
    let m;
    while ((m = envRegex.exec(content)) !== null) {
      envVars.push({ key: m[1], default: m[2] ? m[2].trim() : 'null' });
    }

    // Extract top-level keys
    const topLevel = [];
    const keyRegex = /^\s*'(\w+)'\s*=>/gm;
    while ((m = keyRegex.exec(content)) !== null) {
      topLevel.push(m[1]);
    }

    configs.push({
      file: cf.replace('.php', ''),
      path: 'config/' + cf,
      envVars,
      topLevelKeys: [...new Set(topLevel)].slice(0, 20),
      size: content.length,
    });
  }

  return configs;
}

// ─── 9. Service Layer Map ────────────────────────────────────────────────────

function deepServiceLayer(root) {
  const services = [];

  const serviceDirs = [
    { dir: path.join(root, 'app', 'Services'), prefix: '' },
    { dir: path.join(root, 'help', 'app', 'Services'), prefix: 'help/' },
  ];

  for (const { dir, prefix } of serviceDirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.php') && !fs.statSync(path.join(dir, f)).isDirectory());

    for (const f of files) {
      const content = readFileSafe(path.join(dir, f), 50000);
      if (!content) continue;

      const classMatch = content.match(/class\s+(\w+)/);
      if (!classMatch) continue;

      // Extract methods
      const methods = [];
      const methodRegex = /public\s+(?:static\s+)?function\s+(\w+)\s*\(([^)]*)\)/g;
      let mm;
      while ((mm = methodRegex.exec(content)) !== null) {
        methods.push({ name: mm[1], params: mm[2].trim() });
      }

      // Extract dependencies (constructor injection)
      const deps = [];
      const constructorMatch = content.match(/public\s+function\s+__construct\s*\(([^)]*)\)/s);
      if (constructorMatch) {
        const params = constructorMatch[1].matchAll(/(?:[\w\\]+)\s+\$(\w+)/g);
        for (const p of params) deps.push(p[1]);
      }

      // Class dependencies (use statements)
      const imports = [];
      const importRegex = /use\s+([\w\\]+);/g;
      while ((mm = importRegex.exec(content)) !== null) {
        const imp = mm[1];
        if (!imp.startsWith('Illuminate\\') && !imp.startsWith('App\\Services')) {
          imports.push(imp.split('\\').pop());
        }
      }

      // Responsibility (from docblock)
      const docMatch = content.match(/\/\*\*[\s*]*([^@*]+)/);
      const responsibility = docMatch ? docMatch[1].trim().replace(/\s*\*\s*/g, ' ').trim().substring(0, 200) : '';

      services.push({
        name: classMatch[1],
        file: prefix + 'app/Services/' + f,
        methods,
        dependencies: deps,
        keyImports: [...new Set(imports)].slice(0, 8),
        responsibility,
      });
    }

    // Scan subdirectories (e.g., Omnichannel/)
    const subDirs = fs.readdirSync(dir, { withFileTypes: true }).filter(d => d.isDirectory());
    for (const sd of subDirs) {
      const subFiles = fs.readdirSync(path.join(dir, sd.name)).filter(f => f.endsWith('.php'));
      for (const f of subFiles) {
        const content = readFileSafe(path.join(dir, sd.name, f), 50000);
        if (!content) continue;
        const classMatch = content.match(/class\s+(\w+)/);
        if (!classMatch) continue;

        const methods = [];
        const methodRegex = /public\s+(?:static\s+)?function\s+(\w+)/g;
        let mm;
        while ((mm = methodRegex.exec(content)) !== null) methods.push({ name: mm[1] });

        services.push({
          name: classMatch[1],
          file: prefix + 'app/Services/' + sd.name + '/' + f,
          methods,
          dependencies: [],
          keyImports: [],
          responsibility: '',
        });
      }
    }
  }

  return services;
}

// ─── 10. Module Boundaries ──────────────────────────────────────────────────

function deepModuleBoundaries(root, entries) {
  const modules = [];

  // Map Laravel app/ directory structure
  const appDir = path.join(root, 'app');
  if (!fs.existsSync(appDir)) return modules;

  const appSubDirs = fs.readdirSync(appDir, { withFileTypes: true }).filter(d => d.isDirectory());

  for (const sd of appSubDirs) {
    if (IGNORED_DIRS.has(sd.name)) continue;
    const dirPath = path.join(appDir, sd.name);
    let fileCount = 0;
    let phpCount = 0;

    try {
      const items = fs.readdirSync(dirPath, { withFileTypes: true, recursive: true });
      fileCount = items.filter(i => i.isFile()).length;
      phpCount = items.filter(i => i.isFile() && i.name.endsWith('.php')).length;
    } catch {}

    // Find dependencies (what this module imports from other modules)
    const dependsOn = new Set();
    const phpFiles = scanDirRecursive(dirPath, '', 3).filter(f => f.endsWith('.php')).slice(0, 15);
    for (const fp of phpFiles) {
      const content = readFileSafe(fp, 30000);
      if (!content) continue;
      const imports = content.matchAll(/use\s+App\\(\w+)/g);
      for (const imp of imports) {
        const mod = imp[1];
        if (mod !== sd.name) dependsOn.add(mod);
      }
    }

    modules.push({
      name: sd.name,
      type: 'Laravel Module',
      path: 'app/' + sd.name + '/',
      files: fileCount,
      phpFiles: phpCount,
      dependsOn: [...dependsOn].sort(),
    });
  }

  // Help subdirectory as separate module
  const helpDir = path.join(root, 'help');
  if (fs.existsSync(helpDir)) {
    let helpFileCount = 0;
    try {
      helpFileCount = scanDirRecursive(helpDir, '', 5).length;
    } catch {}

    modules.push({
      name: 'Help (Helpdesk)',
      type: 'Laravel Sub-application',
      path: 'help/',
      files: helpFileCount,
      phpFiles: 0,
      dependsOn: [],
    });
  }

  // Cross-module connections (reverse mapping)
  const connectionMap = {};
  for (const mod of modules) {
    for (const dep of mod.dependsOn) {
      if (!connectionMap[dep]) connectionMap[dep] = [];
      if (!connectionMap[dep].includes(mod.name)) connectionMap[dep].push(mod.name);
    }
  }

  return { modules, dependedOnBy: connectionMap };
}

// ─── 11. Business Logic ─────────────────────────────────────────────────────

function deepBusinessLogic(root) {
  const rules = [];
  const validators = [];
  const services = [];

  // Laravel Validation Rules (app/Rules)
  const rulesDir = path.join(root, 'app', 'Rules');
  if (fs.existsSync(rulesDir)) {
    const ruleFiles = scanDirRecursive(rulesDir, '', 3).filter(f => f.endsWith('.php'));
    for (const fp of ruleFiles) {
      const content = readFileSafe(fp, 15000);
      const name = path.basename(fp, '.php');
      const implMatch = content.match(/implements\s+Rule/i) ? 'Rule' : '';
      const methods = content.match(/(function\s+\w+)/g)?.map(m => m.replace('function ', '')) || [];
      rules.push({ name, file: fp.replace(root, ''), implements: implMatch, methods: methods.slice(0, 5) });
    }
  }

  // Laravel Form Requests (app/Http/Requests)
  const requestsDir = path.join(root, 'app', 'Http', 'Requests');
  if (fs.existsSync(requestsDir)) {
    const reqFiles = scanDirRecursive(requestsDir, '', 3).filter(f => f.endsWith('.php'));
    for (const fp of reqFiles) {
      const content = readFileSafe(fp, 20000);
      const name = path.basename(fp, '.php');
      const authorize = content.includes('return true') || content.includes('$this->user()');
      const rulesMethod = content.includes('function rules');
      const messagesMethod = content.includes('function messages');
      validators.push({ name, file: fp.replace(root, ''), authorize, rules: rulesMethod, messages: messagesMethod });
    }
  }

  // Domain Services (app/Services that contain business logic)
  const servicesDir = path.join(root, 'app', 'Services');
  if (fs.existsSync(servicesDir)) {
    const serviceFiles = scanDirRecursive(servicesDir, '', 4).filter(f => f.endsWith('.php'));
    for (const fp of serviceFiles) {
      const content = readFileSafe(fp, 25000);
      const name = path.basename(fp, '.php');
      const methods = content.match(/(function\s+\w+)/g)?.map(m => m.replace('function ', '')) || [];
      const hasLogic = /if|foreach|switch|try|catch/.test(content);
      const docblock = content.match(/\/\*\*[\s\S]*?\*\//)?.[0] || '';
      services.push({ name, file: fp.replace(root, ''), methods: methods.slice(0, 8), hasLogic, docblock: docblock.substring(0, 200) });
    }
  }

  // Model Accessors/Mutators (business logic in models)
  const modelsDir = path.join(root, 'app', 'Models');
  const modelAccessors = [];
  if (fs.existsSync(modelsDir)) {
    const modelFiles = scanDirRecursive(modelsDir, '', 4).filter(f => f.endsWith('.php'));
    for (const fp of modelFiles) {
      const content = readFileSafe(fp, 30000);
      const name = path.basename(fp, '.php');
      const accessors = content.match(/function get(\w+)Attribute/g)?.map(a => a.replace('function get', '').replace('Attribute', '')) || [];
      const mutators = content.match(/function set(\w+)Attribute/g)?.map(m => m.replace('function set', '').replace('Attribute', '')) || [];
      const scopes = content.match(/function scope(\w+)/g)?.map(s => s.replace('function scope', '')) || [];
      if (accessors.length || mutators.length || scopes.length) {
        modelAccessors.push({ name, file: fp.replace(root, ''), accessors, mutators, scopes });
      }
    }
  }

  // Business Rules in Controllers (complex logic in controllers)
  const httpDir = path.join(root, 'app', 'Http', 'Controllers');
  const controllerLogic = [];
  if (fs.existsSync(httpDir)) {
    const ctrlFiles = scanDirRecursive(httpDir, '', 5).filter(f => f.endsWith('.php'));
    for (const fp of ctrlFiles) {
      const content = readFileSafe(fp, 30000);
      const name = path.basename(fp, '.php');
      const methods = content.match(/(public\s+function\s+\w+)/g)?.map(m => m.replace('public function ', '')) || [];
      const complexity = (content.match(/if|foreach|switch|while|try|catch/g) || []).length;
      if (complexity > 10) {
        controllerLogic.push({ name, file: fp.replace(root, ''), methods: methods.slice(0, 6), complexity });
      }
    }
  }

  return { rules, validators, services, modelAccessors, controllerLogic };
}

// ─── 12. Data Flow ───────────────────────────────────────────────────────

function deepDataFlow(root) {
  const caches = [];
  const queues = [];
  const jobs = [];
  const middlewares = [];

  // Laravel Cache (app/Cache and config/cache.php)
  const cacheConfig = path.join(root, 'config', 'cache.php');
  if (fs.existsSync(cacheConfig)) {
    const content = readFileSafe(cacheConfig, 15000);
    const stores = content.match(/'([a-z]+)'\s*=>\s*\[/g)?.map(s => s.replace(/['\[\]=>/]/g, '').trim()) || [];
    const driver = content.match(/'driver'\s*=>\s*'([^']+)'/)?.[1] || 'file';
    caches.push({ type: 'config', stores, driver, file: '/config/cache.php' });
  }

  // Cache tags usage
  const cacheDir = path.join(root, 'app', 'Cache');
  if (fs.existsSync(cacheDir)) {
    const cacheFiles = scanDirRecursive(cacheDir, '', 3).filter(f => f.endsWith('.php'));
    for (const fp of cacheFiles) {
      const content = readFileSafe(fp, 10000);
      caches.push({ type: 'class', name: path.basename(fp, '.php'), file: fp.replace(root, ''), hasTags: content.includes('tags') });
    }
  }

  // Laravel Queues (config/queue.php)
  const queueConfig = path.join(root, 'config', 'queue.php');
  if (fs.existsSync(queueConfig)) {
    const content = readFileSafe(queueConfig, 15000);
    const connections = content.match(/'([a-z]+)'\s*=>\s*\[/g)?.map(c => c.replace(/['\[\]=>/]/g, '').trim()).filter(c => c !== 'connections') || [];
    const defaultQueue = content.match(/'default'\s*=>\s*'([^']+)'/)?.[1] || 'sync';
    queues.push({ type: 'config', connections, defaultQueue, file: '/config/queue.php' });
  }

  // Queue Jobs (app/Jobs)
  const jobsDir = path.join(root, 'app', 'Jobs');
  if (fs.existsSync(jobsDir)) {
    const jobFiles = scanDirRecursive(jobsDir, '', 4).filter(f => f.endsWith('.php'));
    for (const fp of jobFiles) {
      const content = readFileSafe(fp, 20000);
      const name = path.basename(fp, '.php');
      const implList = content.match(/implements\s+(\w+)/g)?.map(i => i.replace('implements ', '')) || [];
      const shouldQueue = content.includes('ShouldQueue');
      const unique = content.includes('ShouldBeUnique');
      const retries = content.match(/\$tries\s*=\s*(\d+)/)?.[1] || '3';
      const timeout = content.match(/\$timeout\s*=\s*(\d+)/)?.[1] || null;
      const dispatch = content.match(/dispatch\s*\(\s*new\s+(\w+)/g)?.map(d => d.replace(/dispatch\s*\(\s*new\s+/, '')) || [];
      jobs.push({ name, file: fp.replace(root, ''), implements: implList, shouldQueue, unique, retries, timeout, dispatches: dispatch.slice(0, 3) });
    }
  }

  // Async Jobs (chunks, batches)
  const batchJobs = [];
  const chunkJobs = [];
  const entries = scanDirRecursive(root, '', 5);
  for (const fp of entries) {
    if (!fp.endsWith('.php')) continue;
    const content = readFileSafe(fp, 20000);
    if (content.includes('Bus::batch') || content.includes('dispatch(new Batch')) {
      batchJobs.push({ file: fp.replace(root, ''), hasBatches: true });
    }
    if (content.includes('chunk') && content.includes('dispatch')) {
      chunkJobs.push({ file: fp.replace(root, ''), hasChunkDispatch: true });
    }
  }

  // Middleware (HTTP kernel)
  const kernelFile = path.join(root, 'app', 'Http', 'Kernel.php');
  if (fs.existsSync(kernelFile)) {
    const content = readFileSafe(kernelFile, 15000);
    const global = content.match(/\$middleware\s*=\s*\[([\s\S]*?)\];/)?.[1]?.match(/'([^']+)'/g)?.map(m => m.replace(/'/g, '')) || [];
    const api = content.match(/\$middlewareGroups\s*=\s*\[([\s\S]*?'api'[\s\S]*?)\]/)?.[0]?.match(/'([^']+)'/g)?.map(m => m.replace(/'/g, '')) || [];
    const web = content.match(/\$middlewareGroups\s*=\s*\[([\s\S]*?'web'[\s\S]*?)\]/)?.[0]?.match(/'([^']+)'/g)?.map(m => m.replace(/'/g, '')) || [];
    const routeMiddleware = content.match(/\$middlewareAliases\s*=\s*\[([\s\S]*?)\];/)?.[1]?.match(/'([^']+)'/g)?.map(m => m.replace(/'/g, '')) || [];
    middlewares.push({ global: global.slice(0, 10), api: api.slice(0, 10), web: web.slice(0, 10), routeMiddleware: routeMiddleware.slice(0, 20) });
  }

  return { caches, queues, jobs, batchJobs, chunkJobs, middlewares };
}

// ─── 13. Integrations ─────────────────────────────────────────────────────

function deepIntegrations(root) {
  const apis = [];
  const webhooks = [];
  const externalServices = [];

  // External API Clients (app/Services/*Client or *Service)
  const servicesDir = path.join(root, 'app', 'Services');
  if (fs.existsSync(servicesDir)) {
    const serviceFiles = scanDirRecursive(servicesDir, '', 4).filter(f => f.endsWith('.php'));
    for (const fp of serviceFiles) {
      const content = readFileSafe(fp, 25000);
      const name = path.basename(fp, '.php');
      // Detect external API calls
      const httpClient = content.match(/Http::|Guzzle|Client::|axios|fetch\(/g) || [];
      const apiEndpoints = content.match(/['"]https?:\/\/[^\s'"]+['"]/g)?.map(e => e.replace(/['"]/g, '')) || [];
      const authHeaders = content.match(/Authorization|Bearer|API_Key|X-API-Key/g) || [];
      const hasToken = content.includes('$token') || content.includes('$apiKey') || content.includes('$secret');
      if (httpClient.length || apiEndpoints.length) {
        apis.push({ name, file: fp.replace(root, ''), httpClient: httpClient.slice(0, 3), endpoints: apiEndpoints.slice(0, 5), hasAuth: !!authHeaders.length, hasToken });
      }
    }
  }

  // Webhook definitions (routes/webhook.php, config/webhooks.php)
  const webhookRoutes = path.join(root, 'routes', 'webhook.php');
  if (fs.existsSync(webhookRoutes)) {
    const content = readFileSafe(webhookRoutes, 10000);
    const routes = content.match(/Route::\w+\(['"]([^'"]+)['"]/g)?.map(r => r.replace(/Route::\w+\(['"]|['"]/g, '')) || [];
    webhooks.push({ type: 'routes', file: '/routes/webhook.php', routes });
  }

  // Webhook Controllers
  const entries = scanDirRecursive(root, '', 6);
  for (const fp of entries) {
    if (!fp.includes('Webhook') || !fp.endsWith('.php')) continue;
    const content = readFileSafe(fp, 20000);
    const name = path.basename(fp, '.php');
    const methods = content.match(/public\s+function\s+(\w+)/g)?.map(m => m.replace('public function ', '')) || [];
    const rawInput = content.includes('$request->all()') || content.includes('file_get_contents');
    webhooks.push({ type: 'controller', name, file: fp.replace(root, ''), methods, rawInput });
  }

  // External service configs (.env keys for external services)
  const envFile = path.join(root, '.env');
  const externalKeys = [];
  if (fs.existsSync(envFile)) {
    const content = readFileSafe(envFile, 10000);
    const keyPattern = /^(STRIPE|PAYPAL|TWILIO|SENDGRID|AWS|GOOGLE|FACEBOOK|SLACK|DISCORD|MAILGUN|SNS|SQUARE|RAZORPAY|FLUTTERWAVE)(_|\w*=)/m;
    const matches = content.match(new RegExp(keyPattern, 'gm')) || [];
    for (const m of matches) {
      const key = m.split('=')[0];
      if (!externalKeys.includes(key)) externalKeys.push(key);
    }
  }
  if (externalKeys.length) {
    externalServices.push({ type: 'env', keys: externalKeys, source: '.env' });
  }

  // Laravel Socialite (social auth)
  const socialiteConfig = path.join(root, 'config', 'services.php');
  if (fs.existsSync(socialiteConfig)) {
    const content = readFileSafe(socialiteConfig, 10000);
    const providers = content.match(/'([a-z]+)'\s*=>\s*\[/g)?.map(p => p.replace(/['\[\]=>/]/g, '').trim()).filter(p => !['services', 'mail'].includes(p)) || [];
    if (providers.length) {
      externalServices.push({ type: 'socialite', providers, file: '/config/services.php' });
    }
  }

  return { apis, webhooks, externalServices };
}

// ─── 14. Performance ─────────────────────────────────────────────────────

function deepPerformance(root) {
  const n1Queries = [];
  const missingIndexes = [];
  const slowQueries = [];
  const eagerLoads = [];

  // N+1 Query Detection (models without with() in controller loops)
  const modelsDir = path.join(root, 'app', 'Models');
  if (fs.existsSync(modelsDir)) {
    const modelFiles = scanDirRecursive(modelsDir, '', 4).filter(f => f.endsWith('.php'));
    for (const fp of modelFiles) {
      const content = readFileSafe(fp, 20000);
      const name = path.basename(fp, '.php');
      const relationships = content.match(/(function\s+\w+\(\))\s*\{[\s\S]*?return\s+\$this->(hasOne|hasMany|belongsTo|belongsToMany|morphOne|morphMany)/g) || [];
      if (relationships.length) {
        const relNames = relationships.map(r => r.match(/function\s+(\w+)/)?.[1]).filter(Boolean);
        if (relNames.length) {
          eagerLoads.push({ model: name, file: fp.replace(root, ''), relationships: relNames });
        }
      }
    }
  }

  // Missing Database Indexes (foreign keys without indexes)
  const migrationsDir = path.join(root, 'database', 'migrations');
  const foreignKeys = [];
  if (fs.existsSync(migrationsDir)) {
    const migFiles = scanDirRecursive(migrationsDir, '', 2).filter(f => f.endsWith('.php'));
    for (const fp of migFiles.slice(0, 30)) {
      const content = readFileSafe(fp, 15000);
      const fks = content.match(/foreignId\(['"]([^'"]+)['"]\)->/g) || [];
      const tableName = content.match(/\$table\s*=\s*['"](\w+)['"]/)?.[1] || 'unknown';
      for (const fk of fks) {
        const col = fk.match(/foreignId\(['"]([^'"]+)['"]/)?.[1];
        if (col) foreignKeys.push({ table: tableName, column: col, file: fp.replace(root, '') });
      }
    }
  }
  if (foreignKeys.length) {
    missingIndexes.push({ type: 'foreign_keys', count: foreignKeys.length, details: foreignKeys.slice(0, 15) });
  }

  // Slow Query Patterns (raw queries without limit or where)
  const entries = scanDirRecursive(root, '', 6);
  for (const fp of entries) {
    if (!fp.endsWith('.php')) continue;
    const content = readFileSafe(fp, 30000);
    const rawQueries = content.match(/DB::select\(|DB::raw\(|whereRaw\(|joinRaw\(/g) || [];
    if (rawQueries.length > 5) {
      const noLimit = content.includes('get()') && !content.includes('limit(') && !content.includes('take(');
      const noWhere = content.includes('where(') === false;
      if (noLimit || noWhere) {
        slowQueries.push({ file: fp.replace(root, ''), rawQueries: rawQueries.length, noLimit, noWhere });
      }
    }
  }

  // Unoptimized Eloquent (all() without limit)
  const controllerDirs = [path.join(root, 'app', 'Http', 'Controllers'), path.join(root, 'app', 'Http', 'Controllers', 'Api')];
  for (const ctrlDir of controllerDirs) {
    if (!fs.existsSync(ctrlDir)) continue;
    const ctrlFiles = scanDirRecursive(ctrlDir, '', 5).filter(f => f.endsWith('.php'));
    for (const fp of ctrlFiles) {
      const content = readFileSafe(fp, 25000);
      const name = path.basename(fp, '.php');
      const allCalls = content.match(/\w+::all\(\)/g) || [];
      if (allCalls.length > 3) {
        n1Queries.push({ controller: name, file: fp.replace(root, ''), allCalls: allCalls.length, warning: 'multiple all() calls without pagination' });
      }
    }
  }

  return { n1Queries, missingIndexes, slowQueries, eagerLoads };
}

// ─── 15. Code Quality ─────────────────────────────────────────────────────

function deepCodeQuality(root) {
  const deadCode = [];
  const complexity = [];
  const smells = [];

  // Dead Code Detection (unused methods, unreachable code)
  const entries = scanDirRecursive(root, '', 5);
  for (const fp of entries) {
    if (!fp.endsWith('.php')) continue;
    const content = readFileSafe(fp, 30000);
    
    // Empty methods
    const emptyMethods = content.match(/function\s+\w+\(\)\s*\{\s*\}/g) || [];
    if (emptyMethods.length > 2) {
      deadCode.push({ type: 'empty_methods', file: fp.replace(root, ''), count: emptyMethods.length });
    }

    // TODO/FIXME comments
    const todos = content.match(/\/\/\s*(TODO|FIXME|XXX|HACK):?\s*(.*)/g) || [];
    if (todos.length > 5) {
      deadCode.push({ type: 'todos', file: fp.replace(root, ''), count: todos.length, samples: todos.slice(0, 3) });
    }

    // Cyclomatic complexity estimation
    const complexityScore = (content.match(/if|elseif|switch|case|while|for|foreach|catch|\?\?|\?:|&&|\|\|/g) || []).length;
    const lineCount = content.split('\n').length;
    const complexityRatio = complexityScore / Math.max(lineCount, 1);
    if (complexityRatio > 0.15 && lineCount > 100) {
      complexity.push({ file: fp.replace(root, ''), lines: lineCount, complexity: complexityScore, ratio: complexityRatio.toFixed(2) });
    }
  }

  // Code smells (Laravel anti-patterns)
  for (const fp of entries.slice(0, 100)) {
    if (!fp.endsWith('.php')) continue;
    const content = readFileSafe(fp, 25000);

    // God Objects (controllers with >20 methods)
    if (fp.includes('Controller') && (content.match(/public\s+function\s+\w+/g) || []).length > 20) {
      smells.push({ type: 'god_controller', file: fp.replace(root, ''), methods: (content.match(/public\s+function\s+\w+/g) || []).length });
    }

    // Fat Models (models with >30 methods)
    if (fp.includes('/Models/') && (content.match(/public\s+function\s+\w+/g) || []).length > 30) {
      smells.push({ type: 'fat_model', file: fp.replace(root, ''), methods: (content.match(/public\s+function\s+\w+/g) || []).length });
    }

    // Hardcoded config values
    const hardcoded = content.match(/['"]https?:\/\/[^\s'"]+['"]/g) || [];
    if (hardcoded.length > 3) {
      smells.push({ type: 'hardcoded_urls', file: fp.replace(root, ''), count: hardcoded.length });
    }
  }

  return { deadCode, complexity, smells };
}

// ─── 16. Deployment ─────────────────────────────────────────────────────

function deepDeployment(root) {
  const docker = [];
  const ciCd = [];
  const infra = [];

  // Dockerfiles
  const dockerfiles = scanDirRecursive(root, '', 2).filter(f => f.includes('Dockerfile') || f.endsWith('.dockerfile'));
  for (const fp of dockerfiles) {
    const content = readFileSafe(fp, 10000);
    const baseImage = content.match(/FROM\s+([^\s]+)/)?.[1] || 'unknown';
    const hasPhp = content.includes('php');
    const hasNode = content.includes('node');
    const hasNginx = content.includes('nginx');
    docker.push({ file: fp.replace(root, ''), baseImage, hasPhp, hasNode, hasNginx });
  }

  // docker-compose.yml
  const composeFiles = scanDirRecursive(root, '', 2).filter(f => f.includes('docker-compose'));
  for (const fp of composeFiles) {
    const content = readFileSafe(fp, 15000);
    const services = content.match(/^\s{2}(\w+):/gm)?.map(s => s.trim()) || [];
    const hasMysql = content.includes('mysql') || content.includes('mariadb');
    const hasRedis = content.includes('redis');
    const hasNginx = content.includes('nginx');
    docker.push({ file: fp.replace(root, ''), type: 'compose', services: services.slice(0, 10), hasMysql, hasRedis, hasNginx });
  }

  // CI/CD (GitHub Actions, GitLab CI)
  const githubWorkflows = path.join(root, '.github', 'workflows');
  if (fs.existsSync(githubWorkflows)) {
    const wfFiles = scanDirRecursive(githubWorkflows, '', 2).filter(f => f.endsWith('.yml') || f.endsWith('.yaml'));
    for (const fp of wfFiles) {
      const content = readFileSafe(fp, 10000);
      const jobs = content.match(/^\s{2}(\w+):/gm)?.map(j => j.trim()) || [];
      const hasTests = content.includes('test') || content.includes('phpunit');
      const hasLint = content.includes('php-cs-fixer') || content.includes('pint');
      ciCd.push({ file: fp.replace(root, ''), type: 'github', jobs: jobs.slice(0, 8), hasTests, hasLint });
    }
  }

  const gitlabCi = path.join(root, '.gitlab-ci.yml');
  if (fs.existsSync(gitlabCi)) {
    const content = readFileSafe(gitlabCi, 8000);
    ciCd.push({ file: '/.gitlab-ci.yml', type: 'gitlab', hasContent: content.length > 0 });
  }

  // Infrastructure (Terraform, Kubernetes)
  const k8sFiles = scanDirRecursive(root, '', 3).filter(f => f.endsWith('.yml') && (f.includes('deployment') || f.includes('service') || f.includes('ingress')));
  for (const fp of k8sFiles) {
    const content = readFileSafe(fp, 5000);
    const kind = content.match(/kind:\s*(\w+)/)?.[1] || 'unknown';
    infra.push({ file: fp.replace(root, ''), kind });
  }

  const tfFiles = scanDirRecursive(root, '', 2).filter(f => f.endsWith('.tf'));
  for (const fp of tfFiles) {
    const content = readFileSafe(fp, 8000);
    const resources = content.match(/resource\s+"([^"]+)"/g)?.map(r => r.replace('resource "', '').replace('"', '')) || [];
    infra.push({ file: fp.replace(root, ''), type: 'terraform', resources: resources.slice(0, 5) });
  }

  // Deployment scripts
  const deployScripts = scanDirRecursive(root, '', 2).filter(f => f.includes('deploy') || f.includes('Dockerfile'));
  for (const fp of deployScripts) {
    const content = readFileSafe(fp, 5000);
    if (content.includes('composer install') || content.includes('npm install') || content.includes('php artisan')) {
      docker.push({ file: fp.replace(root, ''), type: 'deploy_script', hasDeps: true });
    }
  }

  return { docker, ciCd, infra };
}

// ─── Output Formatting ───────────────────────────────────────────────────────

function formatMarkdown(result, target) {
  let md = `# 📊 System Analysis Report\n\n`;
  md += `> Generated by Codebase Scanner v2.0.0\n`;
  md += `> Target: \`${target}\`\n`;
  md += `> Date: ${new Date().toISOString()}\n\n`;
  md += `---\n\n`;

  // Overview
  if (result.overview) {
    const o = result.overview;
    md += `## 📋 Project Overview\n\n`;
    md += `| Field | Value |\n|---|---|\n`;
    md += `| Name | ${o.name || 'N/A'} |\n`;
    if (o.description) md += `| Description | ${o.description} |\n`;
    if (o.version) md += `| Version | ${o.version} |\n`;
    if (o.license) md += `| License | ${o.license} |\n`;
    if (o.author) md += `| Author | ${o.author} |\n`;
    md += `| Type | ${o.type || 'N/A'} |\n\n`;
  }

  // Tech Stack
  if (result.stack) {
    const s = result.stack;
    md += `## 🛠️ Tech Stack\n\n`;
    if (s.languages.length) md += `**Languages:** ${s.languages.join(', ')}\n\n`;
    if (s.runtimes.length) md += `**Runtimes:** ${s.runtimes.join(', ')}\n\n`;
    if (s.frameworks.length) md += `**Frameworks:** ${s.frameworks.join(', ')}\n\n`;
    if (s.databases.length) md += `**Databases:** ${s.databases.join(', ')}\n\n`;
    if (s.packageManagers.length) md += `**Package Managers:** ${s.packageManagers.join(', ')}\n\n`;
    if (s.tools.length) md += `**Tools:** ${s.tools.join(', ')}\n\n`;
    if (s.devops.length) md += `**DevOps:** ${s.devops.join(', ')}\n\n`;
  }

  // Entry Points
  if (result.entryPoints && result.entryPoints.length) {
    md += `## 🚪 Entry Points\n\n`;
    const npmScripts = result.entryPoints.filter(e => e.type === 'npm script');
    const bins = result.entryPoints.filter(e => e.type === 'bin');
    const files = result.entryPoints.filter(e => e.type === 'entry file');
    const framework = result.entryPoints.filter(e => e.type === 'framework');
    const main = result.entryPoints.filter(e => e.type === 'main');

    if (main.length) { md += `**Main:**\n`; main.forEach(e => md += `- \`${e.file}\`\n`); md += `\n`; }
    if (bins.length) { md += `**CLI Binaries:**\n`; bins.forEach(e => md += `- \`${e.name || 'default'}\` → \`${e.file}\`\n`); md += `\n`; }
    if (files.length) { md += `**Entry Files:**\n`; files.forEach(e => md += `- \`${e.file}\`\n`); md += `\n`; }
    if (framework.length) { md += `**Framework:**\n`; framework.forEach(e => md += `- ${e.name} (\`${e.dir}\`)\n`); md += `\n`; }
    if (npmScripts.length) {
      md += `**NPM Scripts:**\n`;
      md += `| Script | Command |\n|---|---|\n`;
      npmScripts.forEach(e => md += `| ${e.name} | \`${e.command}\` |\n`);
      md += `\n`;
    }
  }

  // Metrics
  if (result.metrics) {
    const m = result.metrics;
    md += `## 📊 Code Metrics\n\n`;
    md += `| Metric | Value |\n|---|---|\n`;
    md += `| Total Files | ${m.totalFiles} |\n`;
    md += `| Total Lines | ${m.totalLines.toLocaleString()} |\n`;
    md += `| Total Size | ${m.totalSize} |\n`;
    md += `| Test Files | ${m.testFileCount} |\n\n`;

    if (m.languages.length) {
      md += `**Language Breakdown:**\n\n`;
      md += `| Language | Files | Lines | Size |\n|---|---|---|---|\n`;
      m.languages.forEach(l => { md += `| ${l.lang} | ${l.files} | ${l.lines.toLocaleString()} | ${l.size} |\n`; });
      md += `\n`;
    }

    if (m.largestFiles.length) {
      md += `**Largest Files:**\n\n`;
      md += `| File | Lines | Size |\n|---|---|---|\n`;
      m.largestFiles.forEach(f => { md += `| \`${f.name}\` | ${f.lines.toLocaleString()} | ${f.size} |\n`; });
      md += `\n`;
    }

    if (m.testFiles.length) {
      md += `**Test Files:**\n`;
      m.testFiles.forEach(f => md += `- \`${f}\`\n`);
      md += `\n`;
    }
  }

  // Dependencies
  if (result.dependencies && Object.keys(result.dependencies).length) {
    md += `## 📦 Dependencies\n\n`;
    const deps = result.dependencies;
    if (deps.php) {
      md += `**PHP (Composer):** ${deps.php.production} production, ${deps.php.dev} dev (${deps.php.total} total)\n\n`;
      if (deps.php.productionList.length) {
        md += `<details><summary>Production Dependencies (${deps.php.productionList.length})</summary>\n\n`;
        md += deps.php.productionList.map(d => `- \`${d}\``).join('\n');
        md += `\n\n</details>\n\n`;
      }
      if (deps.php.devList.length) {
        md += `<details><summary>Dev Dependencies (${deps.php.devList.length})</summary>\n\n`;
        md += deps.php.devList.map(d => `- \`${d}\``).join('\n');
        md += `\n\n</details>\n\n`;
      }
    }
    if (deps.node) {
      md += `**Node.js:** ${deps.node.production} production, ${deps.node.dev} dev (${deps.node.total} total)\n\n`;
      if (deps.node.productionList.length) {
        md += `<details><summary>Production Dependencies (${deps.node.productionList.length})</summary>\n\n`;
        md += deps.node.productionList.map(d => `- \`${d}\``).join('\n');
        md += `\n\n</details>\n\n`;
      }
    }
    if (deps.python) md += `**Python:** ${deps.python.count || 'N/A'} packages\n\n`;
    if (deps.go) md += `**Go:** ${deps.go.count} dependencies\n\n`;
    if (deps.rust) md += `**Rust:** ${deps.rust.dependencies} deps, ${deps.rust.devDependencies} dev deps\n\n`;
  }

  // Structure
  if (result.structure) {
    md += `## 📁 Folder Structure\n\n`;
    md += `<details><summary>Click to expand</summary>\n\n`;
    md += `\`\`\`\n${result.structure}\`\`\`\n\n</details>\n\n`;
  }

  // ═══ DEEP SECTIONS ═══
  if (result.deep) {
    const d = result.deep;

    // 1. API Endpoints
    if (d.apiEndpoints) {
      md += `## 🌐 API Endpoints (deep)\n\n`;
      const endpoints = d.apiEndpoints.endpoints || [];
      const controllers = d.apiEndpoints.controllers || [];

      if (endpoints.length) {
        // Group by source file
        const bySource = {};
        for (const ep of endpoints) {
          const src = ep.source || 'unknown';
          if (!bySource[src]) bySource[src] = [];
          bySource[src].push(ep);
        }

        for (const [src, eps] of Object.entries(bySource)) {
          md += `**${src}:**\n\n`;
          md += `| Method | Path | Controller | Action | Middleware |\n|---|---|---|---|---|\n`;
          for (const ep of eps) {
            const method = `\`${ep.method}\``;
            const p = ep.path || '/';
            const ctrl = ep.controller || '-';
            const act = ep.action || '-';
            const mw = ep.middleware?.length ? ep.middleware.join(', ') : '-';
            md += `| ${method} | \`${p}\` | ${ctrl} | ${act} | ${mw} |\n`;
          }
          md += `\n`;
        }
        md += `> **Total:** ${endpoints.length} endpoints\n\n`;
      }

      if (controllers.length) {
        md += `<details><summary>Controllers (${controllers.length})</summary>\n\n`;
        md += `| Controller | File | Methods |\n|---|---|---|\n`;
        for (const c of controllers) {
          const methods = c.methods.map(m => `${m.name}(${m.params})`).join(', ');
          md += `| ${c.class} | \`${c.file}\` | ${methods} |\n`;
        }
        md += `\n</details>\n\n`;
      }
    }

    // 2. Database Schema
    if (d.databaseSchema) {
      md += `## 🗄️ Database Schema (deep)\n\n`;
      const tables = d.databaseSchema.tables || [];
      const models = d.databaseSchema.models || [];

      if (tables.length) {
        const createTables = tables.filter(t => t.type === 'create');
        for (const t of createTables) {
          md += `### Table: \`${t.name}\` (${t.file})\n\n`;
          if (t.columns.length) {
            md += `| Column | Type | Nullable | Default |\n|---|---|---|---|\n`;
            for (const c of t.columns) {
              md += `| ${c.name} | ${c.type} | ${c.nullable ? '✅' : '❌'} | ${c.default || '-'} |\n`;
            }
            md += `\n`;
          }
          if (t.foreignKeys.length) {
            md += `**Foreign Keys:**\n`;
            for (const fk of t.foreignKeys) {
              md += `- \`${fk.column}\` → \`${fk.onTable}\`.\`${fk.references}\`${fk.onDelete ? ' (onDelete: ' + fk.onDelete + ')' : ''}\n`;
            }
            md += `\n`;
          }
          if (t.indexes.length) {
            md += `**Indexes:**\n`;
            for (const idx of t.indexes) {
              md += `- ${idx.type}: ${idx.columns.join(', ')}\n`;
            }
            md += `\n`;
          }
        }
        const alterTables = tables.filter(t => t.type === 'alter');
        if (alterTables.length) {
          md += `<details><summary>Schema Alterations (${alterTables.length})</summary>\n\n`;
          for (const t of alterTables) {
            md += `- \`${t.name}\` (${t.file}): ${t.columns.length} column changes\n`;
          }
          md += `\n</details>\n\n`;
        }
      }

      if (models.length) {
        md += `### Eloquent Models\n\n`;
        md += `| Model | Table | Fillable | Relationships |\n|---|---|---|---|\n`;
        for (const m of models) {
          const fillable = m.fillable.length > 5 ? m.fillable.slice(0, 5).join(', ') + ` +${m.fillable.length - 5}` : m.fillable.join(', ');
          const rels = m.relationships.map(r => `${r.name}(${r.type})`).join(', ') || '-';
          md += `| ${m.name} | ${m.table || 'auto'} | ${fillable || '-'} | ${rels} |\n`;
        }
        md += `\n`;

        // Detailed relationships
        const modelsWithRels = models.filter(m => m.relationships.length > 0);
        if (modelsWithRels.length) {
          md += `<details><summary>Model Relationships Detail</summary>\n\n`;
          for (const m of modelsWithRels) {
            md += `**${m.name}:**\n`;
            for (const r of m.relationships) {
              md += `- \`${r.name}\` → ${r.type}(${r.relatedModel})${r.foreignKey ? ' [FK: ' + r.foreignKey + ']' : ''}\n`;
            }
            md += `\n`;
          }
          md += `</details>\n\n`;
        }
      }
    }

    // 3. Environment Variables
    if (d.envVars && d.envVars.length) {
      md += `## 🔧 Environment Variables (deep)\n\n`;
      md += `| Variable | Example Value | Source | Used In |\n|---|---|---|---|\n`;
      for (const ev of d.envVars) {
        const example = ev.example || '-';
        const src = ev.source || '-';
        const usage = ev.usage.length ? ev.usage.slice(0, 3).join(', ') + (ev.usage.length > 3 ? ` +${ev.usage.length - 3}` : '') : '-';
        md += `| \`${ev.name}\` | ${example} | ${src} | ${usage} |\n`;
      }
      md += `\n> **Total:** ${d.envVars.length} environment variables\n\n`;
    }

    // 4. Architecture Patterns
    if (d.architecture && d.architecture.length) {
      md += `## 🏗️ Architecture Patterns (deep)\n\n`;
      md += `| Pattern | Confidence | Evidence |\n|---|---|---|\n`;
      for (const p of d.architecture) {
        md += `| ${p.pattern} | ${p.confidence} | ${p.evidence.join('; ')} |\n`;
      }
      md += `\n`;
    }

    // 5. Authentication
    if (d.auth) {
      md += `## 🔐 Authentication (deep)\n\n`;
      md += `**Mechanism:** ${d.auth.mechanism}\n\n`;

      if (d.auth.guards.length) {
        md += `**Guards:**\n`;
        md += `| Guard | Driver |\n|---|---|\n`;
        for (const g of d.auth.guards) md += `| ${g.name} | ${g.driver} |\n`;
        md += `\n`;
      }

      if (d.auth.providers.length) {
        md += `**Providers:**\n`;
        md += `| Provider | Driver |\n|---|---|\n`;
        for (const p of d.auth.providers) md += `| ${p.name} | ${p.driver} |\n`;
        md += `\n`;
      }

      if (d.auth.middleware.filter(m => m.authRelated).length) {
        md += `**Auth-related Middleware:**\n`;
        for (const m of d.auth.middleware.filter(m => m.authRelated)) {
          md += `- \`${m.name}\` (${m.file})\n`;
        }
        md += `\n`;
      }

      if (d.auth.details.length) {
        md += `**Details:**\n`;
        for (const detail of d.auth.details) md += `- ${detail}\n`;
        md += `\n`;
      }
    }

    // 6. Key File Summaries
    if (d.keyFiles && d.keyFiles.length) {
      md += `## 📄 Key File Summaries (deep)\n\n`;
      for (const kf of d.keyFiles) {
        md += `### \`${kf.file}\` — ${kf.description}\n\n`;
        md += `- **Lines:** ${kf.lines}\n`;
        if (kf.className) md += `- **Class:** ${kf.className}\n`;
        if (kf.namespace) md += `- **Namespace:** ${kf.namespace}\n`;
        if (kf.publicMethods?.length) md += `- **Public Methods:** ${kf.publicMethods.join(', ')}\n`;
        if (kf.keyImports?.length) md += `- **Key Imports:** ${kf.keyImports.join(', ')}\n`;
        if (kf.exports?.length) md += `- **Exports:** ${kf.exports.join(', ')}\n`;
        if (kf.scripts?.length) md += `- **Scripts:** ${kf.scripts.join(', ')}\n`;
        if (kf.name) md += `- **Name:** ${kf.name}\n`;
        if (kf.version) md += `- **Version:** ${kf.version}\n`;
        if (kf.keys?.length) md += `- **Top-Level Keys:** ${kf.keys.join(', ')}\n`;
        md += `\n`;
      }
    }

    // 7. Event System
    if (d.eventSystem) {
      const es = d.eventSystem;
      md += `## ⚡ Event System (deep)\n\n`;

      if (es.events.length) {
        md += `### Events (${es.events.length})\n\n`;
        md += `| Event | Properties | File |\n|---|---|---|\n`;
        for (const e of es.events) {
          md += `| ${e.name} | ${e.properties.join(', ') || '-'} | ${e.file} |\n`;
        }
        md += `\n`;
      }

      if (es.listeners.length) {
        md += `### Listeners (${es.listeners.length})\n\n`;
        md += `| Listener | Handles | File |\n|---|---|---|\n`;
        for (const l of es.listeners) {
          md += `| ${l.name} | ${l.handles.join(', ') || '-'} | ${l.file} |\n`;
        }
        md += `\n`;
      }

      if (es.jobs.length) {
        md += `### Jobs (${es.jobs.length})\n\n`;
        md += `| Job | Queue | Tries | Timeout | File |\n|---|---|---|---|---|\n`;
        for (const j of es.jobs) {
          md += `| ${j.name} | ${j.queue} | ${j.tries || '-'} | ${j.timeout || '-'}s | ${j.file} |\n`;
        }
        md += `\n`;
      }

      if (es.observers.length) {
        md += `### Observers (${es.observers.length})\n\n`;
        md += `| Observer | Events | File |\n|---|---|---|\n`;
        for (const o of es.observers) {
          md += `| ${o.name} | ${o.events.join(', ') || '-'} | ${o.file} |\n`;
        }
        md += `\n`;
      }

      if (es.notifications.length) {
        md += `### Notifications (${es.notifications.length})\n\n`;
        for (const n of es.notifications) md += `- \`${n.name}\` (${n.file})\n`;
        md += `\n`;
      }

      if (es.mail.length) {
        md += `### Mail (${es.mail.length})\n\n`;
        for (const m of es.mail) md += `- \`${m.name}\` (${m.file})\n`;
        md += `\n`;
      }

      if (es.eventMap.length) {
        md += `### Event → Listener Map\n\n`;
        md += `| Event | Listeners |\n|---|---|\n`;
        for (const em of es.eventMap) {
          md += `| ${em.event} | ${em.listeners.join(', ')} |\n`;
        }
        md += `\n`;
      }
    }

    // 8. Configuration
    if (d.config && d.config.length) {
      md += `## ⚙️ Configuration (deep)\n\n`;
      for (const c of d.config) {
        md += `### \`${c.file}.php\`\n\n`;
        if (c.topLevelKeys.length) {
          md += `**Keys:** ${c.topLevelKeys.join(', ')}\n\n`;
        }
        if (c.envVars.length) {
          md += `| Env Var | Default |\n|---|---|\n`;
          for (const ev of c.envVars) {
            md += `| \`${ev.key}\` | ${ev.default} |\n`;
          }
          md += `\n`;
        }
      }
    }

    // 9. Service Layer
    if (d.serviceLayer && d.serviceLayer.length) {
      md += `## 🔌 Service Layer (deep)\n\n`;
      md += `| Service | Methods | Dependencies | Responsibility |\n|---|---|---|---|\n`;
      for (const s of d.serviceLayer) {
        const methods = s.methods.map(m => m.name).slice(0, 5).join(', ') + (s.methods.length > 5 ? ` +${s.methods.length - 5}` : '');
        const deps = s.dependencies.join(', ') || '-';
        const resp = s.responsibility ? s.responsibility.substring(0, 100) : '-';
        md += `| ${s.name} | ${methods} | ${deps} | ${resp} |\n`;
      }
      md += `\n`;
    }

    // 10. Module Boundaries
    if (d.moduleBoundaries) {
      md += `## 🧩 Module Boundaries (deep)\n\n`;
      const mb = d.moduleBoundaries;

      md += `### Module Overview\n\n`;
      md += `| Module | Type | Files | Depends On |\n|---|---|---|---|\n`;
      for (const m of mb.modules) {
        md += `| ${m.name} | ${m.type} | ${m.files} | ${m.dependsOn.join(', ') || '-'} |\n`;
      }
      md += `\n`;

      // Dependency graph
      const depPairs = [];
      for (const m of mb.modules) {
        for (const dep of m.dependsOn) {
          depPairs.push(`${dep} ← ${m.name}`);
        }
      }
      if (depPairs.length) {
        md += `### Dependency Graph\n\n`;
        for (const pair of depPairs) md += `- ${pair}\n`;
        md += `\n`;
      }

      // Most depended on
      const dependedOn = mb.dependedOnBy || {};
      const mostDepended = Object.entries(dependedOn).sort((a, b) => b[1].length - a[1].length).slice(0, 10);
      if (mostDepended.length) {
        md += `### Most Depended-On Modules\n\n`;
        md += `| Module | Depended On By |\n|---|---|\n`;
        for (const [mod, deps] of mostDepended) {
          md += `| ${mod} | ${deps.join(', ')} |\n`;
        }
        md += `\n`;
      }
    }
  }

  md += `---\n\n*Generated by [Codebase Scanner](https://clawhub.com/skills/codebase-scanner) v2.0.0*\n`;

  return md;
}

// ─── Main ────────────────────────────────────────────────────────────────────

function main() {
  const opts = parseArgs();
  const target = opts.target;

  if (!fs.existsSync(target)) {
    console.error(`❌ Error: Path not found: ${target}`);
    process.exit(1);
  }

  if (!fs.statSync(target).isDirectory()) {
    console.error(`❌ Error: Not a directory: ${target}`);
    process.exit(1);
  }

  const entries = walkDir(target, opts.depth, opts.exclude);
  const result = analyzeProject(target, entries, opts);

  if (opts.json) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log(formatMarkdown(result, target));
  }

  // Auto-save report as .md file
  if (!opts.noSave && !opts.json) {
    try {
      const reportMd = generateReportFile(result, target);
      const projectName = path.basename(target).toLowerCase().replace(/[^a-z0-9-]/g, '-');
      const date = new Date().toISOString().split('T')[0];
      const fileName = `${projectName}-scan-${date}.md`;

      // Determine save location: --save-dir > /reports folder > project root
      let saveDir = opts.saveDir || target;
      if (!opts.saveDir) {
        const reportsDir = path.join(target, 'reports');
        if (fs.existsSync(reportsDir) && fs.statSync(reportsDir).isDirectory()) {
          saveDir = reportsDir;
        }
      }

      const savePath = path.join(saveDir, fileName);
      fs.writeFileSync(savePath, reportMd, 'utf-8');
      console.error(`\n📄 Report saved to: ${savePath}`);

      // Copy to workspace and send to Discord
      try {
        const workspacePath = '/root/.openclaw/workspace/' + fileName;
        fs.writeFileSync(workspacePath, reportMd, 'utf-8');
        console.error(`📤 Copied to workspace: ${workspacePath}`);
      } catch (copyErr) {
        // ignore copy errors
      }
    } catch (err) {
      console.error(`\n⚠️ Could not save report: ${err.message}`);
    }
  }
}

// ─── Report File Generator (v3.0 System Understanding) ────────────────────

function generateReportFile(result, target) {
  const projectName = path.basename(target);
  const deep = result.deep || {};
  let md = '';

  // Header
  md += `# ${projectName} — system understanding report\n\n`;
  md += `> scanned source: ${target}\n`;
  md += `> scanned ref: develop\n`;
  md += `> scan mode: exhaustive markdown report\n`;
  md += `> confidence note: Static codebase analysis. Runtime behavior, actual API contracts, and live data flows are inferred from code patterns and may differ from production reality.\n\n---\n\n`;

  // Executive Summary
  md += `## executive summary\n\n`;
  const summaryLines = [];
  if (result.overview?.type) summaryLines.push(`type: ${result.overview.type}`);
  if (result.stack?.frameworks?.length) summaryLines.push(`frameworks: ${result.stack.frameworks.join(', ')}`);
  if (deep.apiEndpoints?.length) summaryLines.push(`API surface: ${deep.apiEndpoints.length} routes`);
  if (deep.databaseSchema?.tables?.length) summaryLines.push(`database: ${deep.databaseSchema.tables.length} tables`);
  if (deep.serviceLayer?.length) summaryLines.push(`services: ${deep.serviceLayer.length} classes`);
  if (deep.keyFiles?.controllers?.length) summaryLines.push(`controllers: ${deep.keyFiles.controllers.length}`);
  if (deep.eventSystem?.events?.length) summaryLines.push(`events: ${deep.eventSystem.events.length}`);
  md += summaryLines.join(' · ') + '.\n\n';

  // Repository Identity and Scope
  md += `## repository identity and scope\n\n`;
  md += `| aspect | value |\n|---|---|\n`;
  md += `| project name | ${result.overview?.name || projectName} |\n`;
  md += `| project type | ${result.overview?.type || 'unknown'} |\n`;
  if (result.stack?.languages?.length) md += `| languages | ${result.stack.languages.join(', ')} |\n`;
  if (result.stack?.frameworks?.length) md += `| frameworks | ${result.stack.frameworks.join(', ')} |\n`;
  md += `| scan boundary | full recursive scan of ${target} |\n`;
  md += `| confidence | static analysis only — runtime behavior inferred\n\n`;

  // Top-Level Structure
  md += `## top-level structure\n\n`;
  if (result.structure) {
    const lines = result.structure.split('\n').slice(0, 40);
    md += '```\n' + lines.join('\n') + '\n```\n\n';
    md += '*fact: directory structure from filesystem walk*\n\n';
  }

  // Runtime Entrypoints
  md += `## runtime entrypoints\n\n`;
  if (deep.apiEndpoints?.length) md += `- HTTP API: ${deep.apiEndpoints.length} routes registered\n`;
  if (deep.keyFiles?.controllers?.length) md += `- Controllers: ${deep.keyFiles.controllers.length} controller classes\n`;
  const cmdDir = path.join(target, 'app', 'Console', 'Commands');
  if (fs.existsSync(cmdDir)) {
    try {
      const cmds = scanDirRecursive(cmdDir, '', 3).filter(f => f.endsWith('.php')).length;
      if (cmds) md += `- CLI Commands: ${cmds} Artisan commands\n`;
    } catch {}
  }
  const jobsDir = path.join(target, 'app', 'Jobs');
  if (fs.existsSync(jobsDir)) {
    try {
      const jobs = scanDirRecursive(jobsDir, '', 3).filter(f => f.endsWith('.php')).length;
      if (jobs) md += `- Queue Jobs: ${jobs} job classes\n`;
    } catch {}
  }
  md += '\n';

  // API and Interface Surface
  md += `## api and interface surface\n\n`;
  if (deep.apiEndpoints?.length) {
    md += `### HTTP Routes (${deep.apiEndpoints.length} total)\n\n`;
    md += '| method | path | controller | evidence |\n|---|---|---|---|\n';
    deep.apiEndpoints.slice(0, 80).forEach(ep => {
      const ctrl = ep.controller ? ep.controller + (ep.action ? '@' + ep.action : '') : (ep.action || '-');
      const evidence = ep.middleware ? 'middleware: ' + ep.middleware : 'fact: route definition found';
      md += `| ${ep.method} | ${ep.path} | ${ctrl} | ${evidence} |\n`;
    });
    if (deep.apiEndpoints.length > 80) md += '\n*weak inference: ' + (deep.apiEndpoints.length - 80) + ' more routes omitted*\n';
    md += '\n';
  }
  if (deep.keyFiles?.controllers?.length) {
    md += `### Controllers (${deep.keyFiles.controllers.length})\n\n`;
    md += '| controller | file |\n|---|---|\n';
    deep.keyFiles.controllers.slice(0, 30).forEach(c => md += `| ${c.class || '-'} | ${c.file || '-'} |\n`);
    md += '\n';
  }

  // Database and Persistence Model
  md += `## database and persistence model\n\n`;
  const dbTables = Array.isArray(deep.databaseSchema) ? deep.databaseSchema : (deep.databaseSchema?.tables || []);
  if (dbTables.length) {
    md += `### Tables (${dbTables.length})\n\n`;
    md += '| table | evidence |\n|---|---|\n';
    dbTables.slice(0, 50).forEach(t => md += `| ${t.name || t} | fact: migration found |\n`);
    if (dbTables.length > 50) md += '\n*weak inference: ' + (dbTables.length - 50) + ' more tables omitted*\n';
    md += '\n';
  }
  const dbModels = Array.isArray(deep.databaseSchema?.models) ? deep.databaseSchema.models : [];
  if (dbModels.length) {
    md += `### ORM Models (${dbModels.length})\n\n`;
    md += '| model | table | relationships |\n|---|---|---|\n';
    dbModels.slice(0, 20).forEach(m => {
      const rels = m.relationships?.length ? m.relationships.join(', ') : '-';
      md += `| ${m.class || '-'} | ${m.table || '-'} | ${rels} |\n`;
    });
    md += '\n';
  }

  // Auth, Permissions, and Tenancy
  md += `## auth, permissions, and tenancy\n\n`;
  if (deep.auth?.guards?.length) {
    md += '### Authentication Guards\n\n';
    deep.auth.guards.forEach(g => md += `- fact: guard '${g.name || g}' driver '${g.driver || 'default'}'\n`);
    md += '\n';
  }
  if (deep.auth?.providers?.length) {
    md += '### User Providers\n\n';
    deep.auth.providers.forEach(p => md += `- fact: provider '${p.name || p}' driver '${p.driver || 'default'}'\n`);
    md += '\n';
  }
  if (deep.auth?.middleware?.length) {
    md += '### Auth Middleware\n\n';
    deep.auth.middleware.forEach(m => md += `- fact: middleware '${m}' registered\n`);
    md += '\n';
  }
  const envContent = readFileSafe(path.join(target, '.env'), 5000) || '';
  if (envContent.includes('TENANT') || envContent.includes('MULTI_TENANT')) {
    md += '- strong inference: multi-tenancy detected from .env\n';
  }
  if (!deep.auth) md += '*weak inference: no explicit auth config — may use Laravel default*\n\n';

  // Services, Jobs, Events, and Automation
  md += `## services, jobs, events, and automation\n\n`;
  if (deep.serviceLayer?.length) {
    md += `### Services (${deep.serviceLayer.length})\n\n`;
    deep.serviceLayer.slice(0, 15).forEach(s => {
      const methods = s.methods ? s.methods.join(', ') : 'unknown';
      md += `- ${s.class}: ${methods}\n`;
    });
    md += '\n';
  }
  if (deep.eventSystem?.events?.length) {
    md += `### Events (${deep.eventSystem.events.length})\n\n`;
    deep.eventSystem.events.slice(0, 12).forEach(e => md += `- ${e.name || e}\n`);
    md += '\n';
  }
  if (deep.eventSystem?.listeners?.length) {
    md += `### Listeners (${deep.eventSystem.listeners.length})\n\n`;
    deep.eventSystem.listeners.slice(0, 12).forEach(l => md += `- ${l.name}: handles ${l.handles || 'unknown'}\n`);
    md += '\n';
  }
  if (deep.dataFlow?.jobs?.length) {
    md += `### Queue Jobs\n\n`;
    deep.dataFlow.jobs.slice(0, 8).forEach(j => md += `- ${j.name}: queue=${j.shouldQueue}, retries=${j.retries}\n`);
    md += '\n';
  }

  // Integrations and External Dependencies
  md += `## integrations and external dependencies\n\n`;
  if (deep.integrations?.apis?.length) {
    md += '### External API Clients\n\n';
    deep.integrations.apis.slice(0, 8).forEach(a => {
      const auth = a.hasAuth ? 'fact: auth found' : 'weak inference: internal';
      md += `- ${a.name}: ${a.endpoints?.slice(0, 2).join(', ') || 'unknown'} — ${auth}\n`;
    });
    md += '\n';
  }
  if (deep.integrations?.externalServices?.length) {
    md += '### External Services\n\n';
    deep.integrations.externalServices.forEach(e => {
      if (e.type === 'env' && e.keys?.length) md += `- fact: ${e.keys.join(', ')} in .env\n`;
    });
    md += '\n';
  }
  if (deep.integrations?.webhooks?.length) {
    md += '### Webhooks\n\n';
    deep.integrations.webhooks.slice(0, 5).forEach(w => md += `- ${w.type}: ${w.name || w.file || 'unknown'}\n`);
    md += '\n';
  }
  if (!deep.integrations?.apis?.length && !deep.integrations?.externalServices?.length) {
    md += '*weak inference: no explicit external integrations detected*\n\n';
  }

  // Module Boundaries and Dependency Map
  md += `## module boundaries and dependency map\n\n`;
  if (deep.moduleBoundaries?.modules?.length) {
    md += '| module | type | files | depends on |\n|---|---|---|---|\n';
    deep.moduleBoundaries.modules.slice(0, 12).forEach(m => {
      const deps = m.dependsOn?.length ? m.dependsOn.join(', ') : '-';
      md += `| ${m.name} | ${m.type || 'module'} | ${m.files || m.phpFiles || 0} | ${deps} |\n`;
    });
    md += '\n*fact: module structure from app/ directory analysis*\n\n';
  } else {
    md += '*weak inference: no explicit module boundaries detected*\n\n';
  }

  // Configuration and Environment
  md += `## configuration and environment\n\n`;
  if (deep.envVars?.length) {
    md += '### Key Environment Variables\n\n';
    md += '| variable | default | evidence |\n|---|---|---|\n';
    deep.envVars.slice(0, 15).forEach(ev => md += `| ${ev.name} | ${ev.default || '-'} | fact: in .env or config |\n`);
    md += '\n';
  }
  if (deep.config?.length) {
    md += '### Config Files\n\n';
    deep.config.forEach(c => md += `- ${c.file}: ${c.type || 'config'}\n`);
    md += '\n';
  }

  // Architecture Observations
  md += `## architecture observations\n\n`;
  if (deep.architecture?.patterns?.length) {
    deep.architecture.patterns.forEach(p => md += `- ${p.pattern}: ${p.evidence || 'detected'} — strong inference\n`);
  }
  if (result.metrics?.totalFiles > 2000) {
    md += `- strong inference: large codebase (${result.metrics.totalFiles} files) suggests enterprise/SaaS\n`;
  }
  if (deep.codeQuality?.smells?.length) {
    md += `- strong inference: ${deep.codeQuality.smells.length} code quality issues detected\n`;
  }
  md += '\n';

  // Unknowns and Confidence Boundaries
  md += `## unknowns and confidence boundaries\n\n`;
  md += '- Runtime behavior: weak inference from code patterns, not verified\n';
  md += '- API contracts: weak inference from routes, actual format unknown\n';
  md += '- Data flows: weak inference, no runtime verification\n';
  md += '- External integrations: strong inference from code, live status unknown\n';
  md += '- Performance: weak inference, no benchmarking\n';
  md += '- Security: weak inference from config, no penetration testing\n\n';

  // Appendices
  md += `## appendices\n\n`;

  // Appendix A: Routes
  if (deep.apiEndpoints?.length) {
    md += `### A. Full Route Inventory (${deep.apiEndpoints.length})\n\n`;
    md += '| method | path | controller@method |\n|---|---|---|\n';
    deep.apiEndpoints.forEach(ep => {
      const ctrl = ep.controller ? ep.controller + (ep.action ? '@' + ep.action : '') : (ep.action || '-');
      md += `| ${ep.method} | ${ep.path} | ${ctrl} |\n`;
    });
    md += '\n';
  }

  // Appendix B: Tables
  if (dbTables.length) {
    md += `### B. Full Table Inventory (${dbTables.length})\n\n`;
    dbTables.forEach((t, i) => md += `${i + 1}. \`${t.name || t}\`\n`);
    md += '\n';
  }

  // Appendix C: Services
  if (deep.serviceLayer?.length) {
    md += `### C. Full Service Inventory (${deep.serviceLayer.length})\n\n`;
    deep.serviceLayer.forEach(s => md += `- ${s.class}: ${s.file}\n`);
    md += '\n';
  }

  // Appendix D: Events-Listeners
  if (deep.eventSystem?.eventListenerMap && Object.keys(deep.eventSystem.eventListenerMap).length) {
    md += '### D. Event-Listener Map\n\n';
    Object.entries(deep.eventSystem.eventListenerMap).forEach(([event, listeners]) => {
      md += `- ${event} → ${listeners.join(', ')}\n`;
    });
    md += '\n';
  }

  md += '---\n\n*Generated by Codebase Scanner v3.0.0 — system understanding approach*\n';

  return md;
}

main();
