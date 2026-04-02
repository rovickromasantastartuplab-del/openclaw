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

const MAX_FILE_SIZE_BYTES = 1024 * 1024; // skip files > 1MB

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
  'Go': [
    { file: 'go.mod', name: 'Go Modules' },
  ],
  'Rust': [
    { file: 'Cargo.toml', name: 'Cargo' },
  ],
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
    mode: 'quick', // quick | full
    flags: new Set(),
    json: false,
    depth: 4,
    exclude: [],
  };

  for (const arg of args) {
    if (arg === '--full') { opts.mode = 'full'; opts.depth = 6; }
    else if (arg === '--json') opts.json = true;
    else if (arg === '--structure') opts.flags.add('structure');
    else if (arg === '--stack') opts.flags.add('stack');
    else if (arg === '--dependencies') opts.flags.add('dependencies');
    else if (arg === '--metrics') opts.flags.add('metrics');
    else if (arg === '--entrypoints') opts.flags.add('entrypoints');
    else if (arg === '--markdown') opts.flags.add('markdown');
    else if (arg === '--depth') {} // handled below
    else if (arg.startsWith('--depth=')) opts.depth = parseInt(arg.split('=')[1], 10) || opts.depth;
    else if (arg.startsWith('--exclude=')) opts.exclude = arg.split('=')[1].split(',');
    else if (arg.startsWith('-') && !arg.startsWith('--')) {
      // short flags: -s -m -d etc
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

  // if no specific flags, show everything
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
      entries.push({ type: 'file', name: item.name, relPath, depth, isLast, size });
    }
  }
  return entries;
}

function buildTree(entries) {
  // Group entries by depth to track sibling order
  let tree = '.\n';

  for (const e of entries) {
    // Build the visual prefix by looking at ancestors' isLast status
    // We need to find the ancestor at each depth level
    let prefix = '';

    // For each depth level from 0 to e.depth-1, find the ancestor and check isLast
    for (let d = 0; d < e.depth; d++) {
      // Find the ancestor at depth d that is an ancestor of this entry
      // Walk backwards through entries to find the closest ancestor at depth d
      let ancestor = null;
      const idx = entries.indexOf(e);
      for (let j = idx - 1; j >= 0; j--) {
        if (entries[j].depth === d) {
          ancestor = entries[j];
          break;
        }
        if (entries[j].depth < d) {
          ancestor = entries[j];
          break;
        }
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

// ─── Analysis ────────────────────────────────────────────────────────────────

function analyzeProject(root, entries, opts) {
  const result = {};
  const allFiles = entries.filter(e => e.type === 'file');

  // Project overview
  if (opts.flags.has('stack') || opts.flags.size === 5) {
    result.overview = detectOverview(root);
  }

  // Tech stack
  if (opts.flags.has('stack')) {
    result.stack = detectStack(root, allFiles);
  }

  // Entry points
  if (opts.flags.has('entrypoints')) {
    result.entryPoints = detectEntryPoints(root, allFiles);
  }

  // Code metrics
  if (opts.flags.has('metrics')) {
    result.metrics = detectMetrics(root, allFiles);
  }

  // Dependencies
  if (opts.flags.has('dependencies')) {
    result.dependencies = detectDependencies(root);
  }

  // Structure
  if (opts.flags.has('structure')) {
    result.structure = buildTree(entries);
  }

  return result;
}

function detectOverview(root) {
  const pkg = readJsonSafe(path.join(root, 'package.json'));
  const pyCfg = fs.existsSync(path.join(root, 'pyproject.toml'));
  const cargo = readJsonSafe(path.join(root, 'Cargo.toml'));
  const goMod = readFileSafe(path.join(root, 'go.mod'));

  const overview = { name: path.basename(root), description: '', type: 'unknown' };

  if (pkg) {
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

  // infer type from file presence
  const allFileNames = fs.readdirSync(root);
  if (allFileNames.includes('Dockerfile')) overview.type += ' (Containerized)';

  return overview;
}

function detectStack(root, allFiles) {
  const stack = {
    languages: new Set(),
    frameworks: new Set(),
    databases: new Set(),
    devops: new Set(),
    tools: new Set(),
    runtimes: new Set(),
    packageManagers: new Set(),
  };

  // Languages from file extensions
  for (const f of allFiles) {
    const ext = path.extname(f.name).toLowerCase();
    if (EXT_TO_LANG[ext]) {
      stack.languages.add(EXT_TO_LANG[ext]);
    }
  }

  // Check for special files
  if (allFiles.some(f => f.name === 'Dockerfile')) stack.languages.add('Docker');
  if (allFiles.some(f => f.name.match(/Makefile/))) stack.tools.add('Make');

  // Package managers
  if (fs.existsSync(path.join(root, 'package-lock.json'))) stack.packageManagers.add('npm');
  if (fs.existsSync(path.join(root, 'yarn.lock'))) stack.packageManagers.add('Yarn');
  if (fs.existsSync(path.join(root, 'pnpm-lock.yaml'))) stack.packageManagers.add('pnpm');
  if (fs.existsSync(path.join(root, 'bun.lockb')) || fs.existsSync(path.join(root, 'bun.lock'))) stack.packageManagers.add('Bun');
  if (fs.existsSync(path.join(root, 'Pipfile.lock'))) stack.packageManagers.add('Pipenv');
  if (fs.existsSync(path.join(root, 'poetry.lock'))) stack.packageManagers.add('Poetry');
  if (fs.existsSync(path.join(root, 'requirements.txt'))) stack.packageManagers.add('pip');
  if (fs.existsSync(path.join(root, 'Cargo.lock'))) stack.packageManagers.add('Cargo');
  if (fs.existsSync(path.join(root, 'go.sum'))) stack.packageManagers.add('Go Modules');

  // Frameworks from config files
  for (const [category, checks] of Object.entries(FRAMEWORK_DETECTION)) {
    for (const check of checks) {
      if (fs.existsSync(path.join(root, check.file))) {
        stack.frameworks.add(check.name);
        if (check.content) {
          const content = readFileSafe(path.join(root, check.file));
          if (content && content.toLowerCase().includes(check.content)) {
            stack.frameworks.add(check.name);
          }
        }
      }
    }
  }

  // Read all dependency sources
  const allDeps = new Set();
  const pkg = readJsonSafe(path.join(root, 'package.json'));
  if (pkg) {
    Object.keys(pkg.dependencies || {}).forEach(d => allDeps.add(d));
    Object.keys(pkg.devDependencies || {}).forEach(d => allDeps.add(d));
  }
  const pyReqs = readFileSafe(path.join(root, 'requirements.txt'));
  if (pyReqs) pyReqs.split('\n').forEach(l => allDeps.add(l.split(/[=<>!]/)[0].trim()));

  // DB detection
  for (const db of DB_DETECTION) {
    if (db.patterns.some(p => allDeps.has(p) || [...allDeps].some(d => d.includes(p)))) {
      stack.databases.add(db.name);
    }
  }

  // DevOps detection
  for (const check of DEVOPS_DETECTION) {
    if (check.file && fs.existsSync(path.join(root, check.file))) {
      stack.devops.add(check.name);
    }
    if (check.dir && fs.existsSync(path.join(root, check.dir))) {
      stack.devops.add(check.name);
    }
  }

  // Tool detection
  for (const tool of TOOL_DETECTION) {
    if (tool.patterns.some(p => allDeps.has(p) || [...allDeps].some(d => d.includes(p)))) {
      stack.tools.add(tool.name);
    }
  }

  // Runtimes
  for (const lang of stack.languages) {
    if (LANG_RUNTIMES[lang]) stack.runtimes.add(LANG_RUNTIMES[lang]);
  }

  // Convert sets to sorted arrays
  const toArr = s => [...s].sort();
  return {
    languages: toArr(stack.languages),
    frameworks: toArr(stack.frameworks),
    databases: toArr(stack.databases),
    devops: toArr(stack.devops),
    tools: toArr(stack.tools),
    runtimes: toArr(stack.runtimes),
    packageManagers: toArr(stack.packageManagers),
  };
}

function detectEntryPoints(root, allFiles) {
  const entryPoints = [];

  // package.json scripts & bin
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

  // Common entry files
  const entryPatterns = [
    'index.js', 'index.ts', 'index.mjs', 'index.cjs',
    'src/index.js', 'src/index.ts', 'src/main.js', 'src/main.ts',
    'src/app.js', 'src/app.ts', 'src/server.js', 'src/server.ts',
    'server.js', 'server.ts', 'app.js', 'app.ts',
    'main.py', 'app.py', 'manage.py', '__main__.py',
    'main.go', 'cmd/main.go', 'src/main.rs',
  ];

  for (const pattern of entryPatterns) {
    if (fs.existsSync(path.join(root, pattern))) {
      entryPoints.push({ type: 'entry file', file: pattern });
    }
  }

  // Next.js pages/app dir
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

  // Test files
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

  // Node.js
  const pkg = readJsonSafe(path.join(root, 'package.json'));
  if (pkg) {
    deps.node = {
      production: Object.keys(pkg.dependencies || {}).length,
      dev: Object.keys(pkg.devDependencies || {}).length,
      total: Object.keys(pkg.dependencies || {}).length + Object.keys(pkg.devDependencies || {}).length,
      productionList: Object.keys(pkg.dependencies || {}).sort(),
      ...(process.env.NODE_ENV === 'full' || true ? {
        devList: Object.keys(pkg.devDependencies || {}).sort()
      } : {}),
    };
  }

  // Python
  const reqs = readFileSafe(path.join(root, 'requirements.txt'));
  if (reqs) {
    const lines = reqs.split('\n').filter(l => l.trim() && !l.startsWith('#'));
    deps.python = { count: lines.length, packages: lines.map(l => l.split(/[=<>!]/)[0].trim()).sort() };
  }

  const pyproject = readFileSafe(path.join(root, 'pyproject.toml'));
  if (pyproject && !deps.python) {
    deps.python = { configFile: 'pyproject.toml' };
  }

  // Go
  const goMod = readFileSafe(path.join(root, 'go.mod'));
  if (goMod) {
    const requires = goMod.split('require (')[1];
    if (requires) {
      const pkgLines = requires.split(')')[0].split('\n').filter(l => l.trim());
      deps.go = { count: pkgLines.length };
    }
  }

  // Rust
  const cargo = readJsonSafe(path.join(root, 'Cargo.toml'));
  if (cargo) {
    deps.rust = {
      dependencies: Object.keys(cargo.dependencies || {}).length,
      devDependencies: Object.keys(cargo['dev-dependencies'] || {}).length,
    };
  }

  return deps;
}

// ─── Output Formatting ───────────────────────────────────────────────────────

function formatMarkdown(result, target) {
  let md = `# 📊 System Analysis Report\n\n`;
  md += `> Generated by Codebase Scanner v1.0.0\n`;
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

    if (main.length) {
      md += `**Main:**\n`;
      main.forEach(e => md += `- \`${e.file}\`\n`);
      md += `\n`;
    }
    if (bins.length) {
      md += `**CLI Binaries:**\n`;
      bins.forEach(e => md += `- \`${e.name || 'default'}\` → \`${e.file}\`\n`);
      md += `\n`;
    }
    if (files.length) {
      md += `**Entry Files:**\n`;
      files.forEach(e => md += `- \`${e.file}\`\n`);
      md += `\n`;
    }
    if (framework.length) {
      md += `**Framework:**\n`;
      framework.forEach(e => md += `- ${e.name} (\`${e.dir}\`)\n`);
      md += `\n`;
    }
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
      m.languages.forEach(l => {
        md += `| ${l.lang} | ${l.files} | ${l.lines.toLocaleString()} | ${l.size} |\n`;
      });
      md += `\n`;
    }

    if (m.largestFiles.length) {
      md += `**Largest Files:**\n\n`;
      md += `| File | Lines | Size |\n|---|---|---|\n`;
      m.largestFiles.forEach(f => {
        md += `| \`${f.name}\` | ${f.lines.toLocaleString()} | ${f.size} |\n`;
      });
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

    if (deps.node) {
      md += `**Node.js:** ${deps.node.production} production, ${deps.node.dev} dev (${deps.node.total} total)\n\n`;
      if (deps.node.productionList.length) {
        md += `<details><summary>Production Dependencies (${deps.node.productionList.length})</summary>\n\n`;
        md += deps.node.productionList.map(d => `- \`${d}\``).join('\n');
        md += `\n\n</details>\n\n`;
      }
      if (deps.node.devList && deps.node.devList.length) {
        md += `<details><summary>Dev Dependencies (${deps.node.devList.length})</summary>\n\n`;
        md += deps.node.devList.map(d => `- \`${d}\``).join('\n');
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

  md += `---\n\n*Generated by [Codebase Scanner](https://clawhub.com/skills/codebase-scanner) v1.0.0*\n`;

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

  // Scan
  const entries = walkDir(target, opts.depth, opts.exclude);
  const result = analyzeProject(target, entries, opts);

  // Output
  if (opts.json) {
    console.log(JSON.stringify(result, null, 2));
  } else if (opts.flags.has('markdown')) {
    console.log(formatMarkdown(result, target));
  } else {
    console.log(formatMarkdown(result, target));
  }
}

main();
