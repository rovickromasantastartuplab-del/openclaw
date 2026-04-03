#!/usr/bin/env node
'use strict';

// ═══════════════════════════════════════════════════════════════════════════
// REPO REVERSE ENGINEER - Architecture-Grade System Scanner
// ═══════════════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

// ═══════════════════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════════════════

const IGNORED_DIRS = new Set([
  'node_modules', '.git', 'dist', 'build', '.next', '.nuxt', 'coverage',
  '.cache', '__pycache__', 'venv', '.venv', 'vendor', 'target', 'bin', 'obj',
  '.terraform', 'tmp', 'logs', '.turbo', 'out', 'Pods', '.gradle', '.svelte-kit',
  '.output', '.vercel', '.netlify', 'elm-stuff', '_build', 'deps', '.tox',
  '.mypy_cache', '.pytest_cache', 'site-packages', 'eggs', '.eggs', 'storage',
]);

const MAX_FILE_SIZE = 1024 * 1024;

// ═══════════════════════════════════════════════════════════════════════════
// PHASE 1: INTAKE - Detect Framework and Scan Boundaries
// ═══════════════════════════════════════════════════════════════════════════

function detectFramework(root) {
  const pkg = readJsonSafe(path.join(root, 'package.json'));
  const composer = readJsonSafe(path.join(root, 'composer.json'));
  const requirements = readFileSafe(path.join(root, 'requirements.txt'), 1000);
  
  // Node.js frameworks
  const hasExpress = pkg?.dependencies?.express || pkg?.dependencies?.fastify;
  const hasNext = pkg?.dependencies?.next || fs.existsSync(path.join(root, 'next.config.js'));
  const hasNuxt = pkg?.dependencies?.nuxt || fs.existsSync(path.join(root, 'nuxt.config.js'));
  
  // PHP frameworks
  const hasLaravel = composer?.require?.laravel || fs.existsSync(path.join(root, 'artisan'));
  const hasSymfony = composer?.require?.symfony || fs.existsSync(path.join(root, 'composer.json'));
  
  // Python frameworks
  const hasDjango = fs.existsSync(path.join(root, 'manage.py')) && requirements?.includes('django');
  const hasFlask = pkg?.dependencies?.flask || requirements?.includes('flask');
  
  // Ruby
  const hasRails = fs.existsSync(path.join(root, 'config', 'application.rb'));
  
  // Go
  const hasGo = fs.existsSync(path.join(root, 'go.mod'));
  
  if (hasLaravel) return 'laravel';
  if (hasExpress) return 'express';
  if (hasNext) return 'nextjs';
  if (hasNuxt) return 'nuxt';
  if (hasDjango) return 'django';
  if (hasFlask) return 'flask';
  if (hasRails) return 'rails';
  if (hasGo) return 'go';
  
  return pkg ? 'nodejs' : 'unknown';
}

function detectLanguages(root) {
  const languages = new Set();
  const entries = scanDirRecursive(root, '', 2);
  
  for (const fp of entries) {
    const ext = path.extname(fp).toLowerCase();
    const langMap = {
      '.js': 'JavaScript', '.mjs': 'JavaScript', '.cjs': 'JavaScript',
      '.jsx': 'JSX', '.ts': 'TypeScript', '.tsx': 'TSX',
      '.py': 'Python', '.rb': 'Ruby', '.php': 'PHP',
      '.go': 'Go', '.rs': 'Rust', '.java': 'Java', '.cs': 'C#',
      '.html': 'HTML', '.css': 'CSS', '.scss': 'SCSS',
      '.json': 'JSON', '.yaml': 'YAML', '.yml': 'YAML',
    };
    if (langMap[ext]) languages.add(langMap[ext]);
  }
  
  return [...languages];
}

function scanDirRecursive(dir, prefix = '', maxDepth = 6) {
  const results = [];
  if (maxDepth <= 0) return results;
  
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      if (IGNORED_DIRS.has(item.name)) continue;
      if (item.name.startsWith('.')) continue;
      
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        results.push(...scanDirRecursive(fullPath, prefix + item.name + '/', maxDepth - 1));
      } else {
        results.push(prefix + item.name);
      }
    }
  } catch {}
  return results;
}

// ═══════════════════════════════════════════════════════════════════════════
// PHASE 2: EXTRACTION - Framework-Aware
// ═══════════════════════════════════════════════════════════════════════════

// ─── Express/Node.js Extraction ───────────────────────────────────────────

function extractExpressRoutes(root) {
  const routes = [];
  const entries = scanDirRecursive(root, '', 5);
  
  for (const fp of entries) {
    if (!fp.endsWith('.js') && !fp.endsWith('.ts')) continue;
    if (fp.includes('node_modules')) continue;
    
    const content = readFileSafe(path.join(root, fp), 50000);
    if (!content) continue;
    
    // app.get('/path', handler)
    const appRoutes = content.matchAll(/(?:app|router|express)\.(get|post|put|delete|patch|options|head)\s*\(\s*['"`]([^'"`]+)['"`]/g);
    for (const match of appRoutes) {
      routes.push({
        method: match[1].toUpperCase(),
        path: match[2],
        file: fp,
        controller: extractControllerName(content, fp),
        evidence: 'fact: Express route found',
      });
    }
    
    // router.get('/path', handler)
    const routerRoutes = content.matchAll(/(?:router\.(get|post|put|delete|patch)|\.get|app\[)(?:\s*\(\s*)?['"`]([^'"`]+)['"`]/g);
    for (const match of routerRoutes) {
      if (match[1]) { // router.method
        routes.push({
          method: match[1].toUpperCase(),
          path: match[2],
          file: fp,
          controller: extractControllerName(content, fp),
          evidence: 'fact: Express route found',
        });
      }
    }
  }
  
  return routes;
}

function extractControllerName(content, fp) {
  const controllerMatch = content.match(/require\(['"]([^'"]*controller[^'"]*)['"]\)/);
  if (controllerMatch) return path.basename(controllerMatch[1], '.js');
  
  const classMatch = content.match(/class\s+(\w+Controller)\s+/);
  if (classMatch) return classMatch[1];
  
  return path.basename(fp, '.js');
}

function extractMongooseModels(root) {
  const models = [];
  const entries = scanDirRecursive(root, '', 5);
  
  for (const fp of entries) {
    if (!fp.endsWith('.js') && !fp.endsWith('.ts')) continue;
    if (fp.includes('node_modules')) continue;
    
    const content = readFileSafe(path.join(root, fp), 30000);
    if (!content) continue;
    
    // mongoose.model('Name', schema)
    const modelMatch = content.match(/mongoose\.model\s*\(\s*['"]([^'"]+)['"]\s*,\s*([^,\n]+)/);
    // new mongoose.Schema
    const schemaMatch = content.match(/new\s+mongoose\.Schema\s*\(\s*\{([\s\S]*?)\}/);
    // Schema methods and statics
    const methods = content.match(/Schema\.method\s*\(\s*['"](\w+)['"]\s*,/g)?.map(m => m.match(/['"](\w+)['"]/)?.[1]).filter(Boolean) || [];
    const statics = content.match(/Schema\.static\s*\(\s*['"](\w+)['"]\s*,/g)?.map(m => m.match(/['"](\w+)['"]/)?.[1]).filter(Boolean) || [];
    // Virtuals
    const virtuals = content.match(/Schema\.virtual\s*\(\s*['"](\w+)['"]\s*/g)?.map(m => m.match(/['"](\w+)['"]/)?.[1]).filter(Boolean) || [];
    // Relationships
    const relationships = [];
    if (content.includes('hasOne') || content.includes('hasMany') || content.includes('belongsTo') || content.includes('ref:')) {
      const relMatch = content.matchAll(/(?:hasOne|hasMany|belongsTo|ref:|populate)\s*\(\s*['"](\w+)['"]/g);
      for (const r of relMatch) relationships.push(r[1]);
    }
    
    if (modelMatch || schemaMatch) {
      const name = modelMatch ? modelMatch[1] : path.basename(fp, '.js').replace(/[-_]?model/i, '');
      models.push({
        name,
        file: fp,
        type: 'Mongoose Model',
        schema: schemaMatch ? 'inline schema detected' : 'schema reference',
        methods: methods.slice(0, 8),
        statics: statics.slice(0, 5),
        virtuals: virtuals.slice(0, 5),
        relationships: relationships,
        evidence: 'fact: mongoose model/schema found',
      });
    }
  }
  
  return models;
}

// Enhanced: Extract database config and connection
function extractDatabaseConfig(root) {
  const dbConfig = { type: null, connections: [], schemas: [] };
  
  // Check package.json for database dependencies
  const pkg = readJsonSafe(path.join(root, 'package.json'));
  const deps = pkg?.dependencies || {};
  
  if (deps.mongoose || deps.mongodb) {
    dbConfig.type = 'MongoDB (Mongoose)';
    dbConfig.connections.push({ type: 'fact', detail: 'MongoDB driver in dependencies' });
  }
  if (deps.pg || deps.postgres) dbConfig.type = 'PostgreSQL';
  if (deps.mysql2 || deps.mysql) dbConfig.type = 'MySQL';
  if (deps.sqlite3) dbConfig.type = 'SQLite';
  
  // Find database config files
  const configFiles = scanDirRecursive(root, '', 3).filter(f => 
    f.includes('config') && (f.endsWith('.js') || f.endsWith('.json')) &&
    (f.includes('database') || f.includes('db') || f.includes('mongo') || f.includes('postgres'))
  );
  
  for (const fp of configFiles.slice(0, 5)) {
    const content = readFileSafe(path.join(root, fp), 15000);
    if (!content) continue;
    
    const connMatch = content.match(/mongodb(?:\+srv)?:\/\/[^\s'"]+/g);
    const uriMatch = content.match(/(?:DB_|DATABASE_|MONGO_|POSTGRES_|MYSQL_)\w+/g);
    
    if (connMatch) {
      dbConfig.schemas.push({ file: fp, type: 'MongoDB connection string', evidence: 'fact: connection found' });
    }
    if (uriMatch) {
      dbConfig.connections.push({ type: 'fact', detail: `env vars: ${uriMatch.slice(0, 5).join(', ')}` });
    }
  }
  
  return dbConfig;
}

function extractExpressMiddleware(root) {
  const middleware = [];
  const entries = scanDirRecursive(root, '', 4);
  
  for (const fp of entries) {
    if (!fp.includes('middleware') && !fp.includes('auth')) continue;
    if (!fp.endsWith('.js') && !fp.endsWith('.ts')) continue;
    
    const content = readFileSafe(path.join(root, fp), 20000);
    if (!content) continue;
    
    // JWT verification
    const hasJWT = content.includes('jwt') || content.includes('jsonwebtoken');
    // bcrypt
    const hasBcrypt = content.includes('bcrypt') || content.includes('hash');
    // passport
    const hasPassport = content.includes('passport');
    // custom middleware function
    const hasCustom = content.match(/function\s+\w+Auth|export\s+function\s+\w+|module\.exports\s*=/);
    
    if (hasJWT || hasBcrypt || hasPassport || hasCustom) {
      middleware.push({
        name: path.basename(fp, '.js'),
        file: fp,
        type: hasJWT ? 'JWT' : hasBcrypt ? 'Password Hash' : hasPassport ? 'Passport' : 'Auth Middleware',
        evidence: 'fact: auth middleware found',
      });
    }
  }
  
  return middleware;
}

function extractExpressServices(root) {
  const services = [];
  const entries = scanDirRecursive(root, '', 4);
  
  for (const fp of entries) {
    if (!fp.includes('service') && !fp.includes('helper') && !fp.includes('util')) continue;
    if (!fp.endsWith('.js') && !fp.endsWith('.ts')) continue;
    if (fp.includes('node_modules')) continue;
    
    const content = readFileSafe(path.join(root, fp), 25000);
    if (!content) continue;
    
    const classMatch = content.match(/class\s+(\w+(?:Service|Helper|Util))\s+/);
    if (classMatch) {
      const methods = content.match(/(?:async\s+)?function\s+(\w+)/g)?.map(m => m.replace(/^(?:async\s+)?function\s+/, '')).slice(0, 10) || [];
      services.push({
        name: classMatch[1],
        file: fp,
        methods: methods,
        evidence: 'fact: service class found',
      });
    }
  }
  
  return services;
}

function extractNodeIntegrations(root) {
  const integrations = [];
  const pkg = readJsonSafe(path.join(root, 'package.json'));
  const deps = pkg?.dependencies || {};
  
  // External API clients
  const apiClients = ['axios', 'got', 'node-fetch', 'undici', 'superagent'];
  for (const client of apiClients) {
    if (deps[client]) {
      integrations.push({
        type: 'HTTP Client',
        name: client,
        evidence: 'fact: in package.json dependencies',
      });
    }
  }
  
  // Database drivers
  const dbDrivers = ['mongoose', 'pg', 'mysql2', 'sqlite3', 'redis', 'ioredis', 'mongodb'];
  for (const db of dbDrivers) {
    if (deps[db]) {
      integrations.push({
        type: 'Database',
        name: db,
        evidence: 'fact: in package.json dependencies',
      });
    }
  }
  
  // Auth
  const authLibs = ['jsonwebtoken', 'bcrypt', 'passport', 'firebase-admin', '@supabase/supabase-js'];
  for (const auth of authLibs) {
    if (deps[auth]) {
      integrations.push({
        type: 'Auth',
        name: auth,
        evidence: 'fact: in package.json dependencies',
      });
    }
  }
  
  // External services
  const extServices = ['stripe', 'twilio', 'sendgrid', 'mailgun', 'aws-sdk', '@slack/web-api'];
  for (const svc of extServices) {
    if (deps[svc]) {
      integrations.push({
        type: 'External Service',
        name: svc,
        evidence: 'fact: in package.json dependencies',
      });
    }
  }
  
  return integrations;
}

function extractExpressWebhooks(root) {
  const webhooks = [];
  const entries = scanDirRecursive(root, '', 5);
  
  for (const fp of entries) {
    if (!fp.includes('webhook')) continue;
    if (!fp.endsWith('.js')) continue;
    
    const content = readFileSafe(path.join(root, fp), 20000);
    if (!content) continue;
    
    const routes = content.matchAll(/(?:app|router)\.(post|put)\s*\(\s*['"`]([^'"`]+)['"`]/g);
    for (const match of routes) {
      webhooks.push({
        method: match[1].toUpperCase(),
        path: match[2],
        file: fp,
        type: 'Webhook',
        evidence: 'fact: webhook endpoint found',
      });
    }
  }
  
  return webhooks;
}

// NEW: Extract jobs, cron, scheduled tasks
function extractExpressJobs(root) {
  const jobs = [];
  const entries = scanDirRecursive(root, '', 5);
  
  for (const fp of entries) {
    if (!fp.endsWith('.js')) continue;
    if (fp.includes('node_modules')) continue;
    
    const content = readFileSafe(path.join(root, fp), 25000);
    if (!content) continue;
    
    // node-cron, cron syntax
    const hasCron = content.includes('cron.schedule') || content.includes('node-cron');
    // Bull/Redis queue
    const hasQueue = content.includes('Queue') || content.includes('bull') || content.includes('async.queue');
    // setInterval/setTimeout for scheduled tasks
    const hasScheduled = content.includes('setInterval') || content.includes('setTimeout');
    // Worker pattern
    const hasWorker = content.includes('Worker') || content.includes('Job') || content.includes('process.nextTick');
    
    if (hasCron || hasQueue || hasScheduled || hasWorker) {
      const name = path.basename(fp, '.js');
      let type = 'Scheduled Task';
      if (hasCron) type = 'Cron Job';
      else if (hasQueue) type = 'Queue Job';
      else if (hasWorker) type = 'Background Worker';
      
      // Extract schedule if present
      let schedule = null;
      if (hasCron) {
        const cronMatch = content.match(/cron\.schedule\s*\(\s*['"]([^'"]+)['"]/);
        schedule = cronMatch ? cronMatch[1] : null;
      }
      
      jobs.push({
        name,
        file: fp,
        type,
        schedule,
        evidence: 'fact: job/scheduler pattern found in code',
      });
    }
  }
  
  return jobs;
}

// NEW: Extract controller handler methods for better route mapping
function extractControllerHandlers(root) {
  const handlers = {};
  const entries = scanDirRecursive(root, '', 4);
  
  for (const fp of entries) {
    if (!fp.includes('controller') || !fp.endsWith('.js')) continue;
    if (fp.includes('node_modules')) continue;
    
    const content = readFileSafe(path.join(root, fp), 30000);
    if (!content) continue;
    
    const controllerName = path.basename(fp, '.js').replace(/Controller$/, '');
    const methods = [];
    
    // Match async function handlerName(req, res)
    const asyncMatches = content.matchAll(/async\s+(?:function\s+)?(\w+)\s*\([^)]*\)/g);
    for (const match of asyncMatches) {
      const methodName = match[1];
      // Filter out non-handlers
      if (!methodName.match(/^(get|post|put|delete|patch|handle|index|create|update|remove|delete|show|list)$/i) &&
          !methodName.includes('Handler') && !methodName.includes('Action')) {
        continue;
      }
      methods.push(methodName);
    }
    
    // Match regular function handlers
    const funcMatches = content.matchAll(/(?:function\s+|module\.exports\s*=\s*)(?:async\s+)?(\w+)\s*\([^)]*\)/g);
    for (const match of funcMatches) {
      const methodName = match[1];
      if (methodName !== 'require' && !methods.includes(methodName)) {
        methods.push(methodName);
      }
    }
    
    if (methods.length > 0) {
      handlers[controllerName] = methods;
    }
  }
  
  return handlers;
}

// NEW: Separate middleware from controllers in auth section
function extractAuthComponents(root) {
  const auth = {
    guards: [],
    providers: [],
    middleware: [],
    controllers: [],
    components: [],
  };
  
  const entries = scanDirRecursive(root, '', 4);
  
  for (const fp of entries) {
    if (!fp.endsWith('.js')) continue;
    if (fp.includes('node_modules')) continue;
    
    const content = readFileSafe(path.join(root, fp), 20000);
    if (!content) continue;
    
    const basename = path.basename(fp, '.js');
    
    // Middleware: auth.js, jwt.js, verify.js, etc.
    if (fp.includes('middleware') || basename.includes('Auth') || basename.includes('Middleware') || 
        basename.includes('Verify') || basename.includes('Guard')) {
      const hasJWT = content.includes('jwt') || content.includes('verify');
      const hasBcrypt = content.includes('bcrypt') || content.includes('hash') || content.includes('compare');
      const hasPassport = content.includes('passport');
      const hasSession = content.includes('session') || content.includes('cookie');
      
      let type = 'Auth Middleware';
      if (hasJWT) type = 'JWT Auth';
      else if (hasBcrypt) type = 'Password Hash';
      else if (hasPassport) type = 'Passport Strategy';
      else if (hasSession) type = 'Session Auth';
      
      auth.middleware.push({
        name: basename,
        file: fp,
        type,
        evidence: 'fact: auth middleware component found',
      });
      continue;
    }
    
    // Controllers with auth logic
    if (fp.includes('controller') || basename.includes('Controller')) {
      if (content.includes('login') || content.includes('register') || content.includes('auth') || 
          content.includes('verify') || content.includes('token') || content.includes('password')) {
        auth.controllers.push({
          name: basename,
          file: fp,
          type: 'Auth Controller',
          evidence: 'fact: auth controller found',
        });
      }
      continue;
    }
    
    // Auth components: strategies, services, etc.
    if (basename.includes('Strategy') || basename.includes('Provider') || basename.includes('Service')) {
      if (content.includes('verify') || content.includes('authenticate') || content.includes('authorize')) {
        auth.components.push({
          name: basename,
          file: fp,
          type: basename.includes('Strategy') ? 'Passport Strategy' : 'Auth Component',
          evidence: 'fact: auth component found',
        });
      }
    }
  }
  
  return auth;
}

// ─── Laravel Extraction ───────────────────────────────────────────────────

function extractLaravelRoutes(root) {
  const routes = [];
  const routeFiles = [
    'routes/api.php', 'routes/web.php', 'routes/channels.php', 'routes/console.php'
  ];
  
  for (const rf of routeFiles) {
    const fp = path.join(root, rf);
    if (!fs.existsSync(fp)) continue;
    
    const content = readFileSafe(fp, 50000);
    if (!content) continue;
    
    // Route::get('/path', 'Controller@method')
    const matches = content.matchAll(/Route::(\w+)\s*\(\s*['"`]([^'"`]+)['"`]\s*,\s*['"]?(\w+)@(\w+)['"]?/g);
    for (const match of matches) {
      routes.push({
        method: match[1].toUpperCase(),
        path: match[2],
        controller: match[3],
        action: match[4],
        file: rf,
        evidence: 'fact: Laravel route found in ' + rf,
      });
    }
    
    // Route::resource
    const resources = content.matchAll(/Route::resource\s*\(\s*['"`]([^'"`]+)['"`]\s*,\s*['"]?(\w+)['"]?/g);
    for (const match of resources) {
      const methods = ['index', 'store', 'show', 'update', 'destroy'];
      for (const m of methods) {
        routes.push({
          method: m === 'index' || m === 'store' ? 'GET' : m === 'update' ? 'PUT' : 'POST',
          path: match[1] + (m === 'index' ? '' : '/' + (m === 'show' ? '{id}' : '')),
          controller: match[2],
          action: m,
          file: rf,
          evidence: 'fact: Laravel resource route',
        });
      }
    }
  }
  
  return routes;
}

function extractLaravelMigrations(root) {
  const migrationsDir = path.join(root, 'database', 'migrations');
  if (!fs.existsSync(migrationsDir)) return [];
  
  const files = scanDirRecursive(migrationsDir, '', 2).filter(f => f.endsWith('.php'));
  const tables = new Map();
  
  for (const fp of files) {
    const content = readFileSafe(path.join(migrationsDir, fp), 20000);
    if (!content) continue;
    
    // Schema::create('table_name'
    const tableMatch = content.match(/Schema::create\s*\(\s*['"]([^'"]+)['"]\s*,/);
    // $table->foreignId
    const fkMatches = content.matchAll(/\$table->(?:foreignId|uuid|ulid)\s*\(['"]([^'"]+)['"]\)/g);
    
    if (tableMatch) {
      const tableName = tableMatch[1];
      const columns = content.match(/\$table->(\w+)\s*\(['"]([^'"]+)['"]\)/g)?.map(m => m.replace(/\$table->/, '').replace(/[()'"]/g, '')) || [];
      
      if (!tables.has(tableName)) {
        tables.set(tableName, { name: tableName, columns: [], file: fp });
      }
      tables.get(tableName).columns.push(...columns);
    }
  }
  
  return [...tables.values()];
}

function extractLaravelModels(root) {
  const models = [];
  const modelsDir = path.join(root, 'app', 'Models');
  if (!fs.existsSync(modelsDir)) return models;
  
  const files = scanDirRecursive(modelsDir, '', 4).filter(f => f.endsWith('.php'));
  
  for (const fp of files) {
    const content = readFileSafe(path.join(modelsDir, fp), 20000);
    if (!content) continue;
    
    const classMatch = content.match(/class\s+(\w+)\s+extends/);
    const tableMatch = content.match(/\$table\s*=\s*['"]([^'"]+)['"]/);
    const fillableMatch = content.match(/\$fillable\s*=\s*\[([^\]]+)\]/);
    const relationships = content.match(/function\s+(\w+)\s*\(\)\s*\{[\s\S]*?return\s+\$this->(hasOne|hasMany|belongsTo|belongsToMany)/g)?.map(r => r.replace(/function\s+/, '').replace(/\s*\(\).*/, '')) || [];
    
    if (classMatch) {
      models.push({
        name: classMatch[1],
        table: tableMatch ? tableMatch[1] : null,
        fillable: fillableMatch ? fillableMatch[1].split(',').map(s => s.trim().replace(/['"]/g, '')) : [],
        relationships: relationships,
        file: fp,
        evidence: 'fact: Laravel model found',
      });
    }
  }
  
  return models;
}

function extractLaravelEvents(root) {
  const events = [];
  const eventsDir = path.join(root, 'app', 'Events');
  if (fs.existsSync(eventsDir)) {
    const files = scanDirRecursive(eventsDir, '', 3).filter(f => f.endsWith('.php'));
    for (const fp of files) {
      const content = readFileSafe(path.join(eventsDir, fp), 10000);
      if (content?.includes('class') && !content.includes('interface')) {
        const name = path.basename(fp, '.php');
        events.push({ name, file: fp, evidence: 'fact: event class found' });
      }
    }
  }
  
  return events;
}

function extractLaravelListeners(root) {
  const listeners = [];
  const listenersDir = path.join(root, 'app', 'Listeners');
  if (fs.existsSync(listenersDir)) {
    const files = scanDirRecursive(listenersDir, '', 3).filter(f => f.endsWith('.php'));
    for (const fp of files) {
      const content = readFileSafe(path.join(listenersDir, fp), 10000);
      if (content?.includes('class')) {
        const handleMatch = content.match(/handle\s*\(\s*(\w+)\s+\$event\s*\)/);
        const name = path.basename(fp, '.php');
        listeners.push({ 
          name, 
          handles: handleMatch ? handleMatch[1] : 'not resolved from registration',
          file: fp,
          evidence: 'fact: listener class found',
        });
      }
    }
  }
  
  return listeners;
}

function extractLaravelServices(root) {
  const services = [];
  const servicesDir = path.join(root, 'app', 'Services');
  if (!fs.existsSync(servicesDir)) return services;
  
  const files = scanDirRecursive(servicesDir, '', 4).filter(f => f.endsWith('.php'));
  
  for (const fp of files) {
    const content = readFileSafe(path.join(servicesDir, fp), 20000);
    if (!content) continue;
    
    const classMatch = content.match(/class\s+(\w+Service)\s+/);
    if (classMatch) {
      const methods = content.match(/(?:public|protected)\s+(?:async\s+)?function\s+(\w+)/g)?.map(m => m.replace(/^(?:public|protected)\s+(?:async\s+)?function\s+/, '')).slice(0, 10) || [];
      services.push({
        name: classMatch[1],
        file: fp,
        methods: methods,
        evidence: 'fact: Laravel service found',
      });
    }
  }
  
  return services;
}

function extractLaravelAuth(root) {
  const auth = { guards: [], providers: [], middleware: [] };
  
  // config/auth.php
  const authConfig = readFileSafe(path.join(root, 'config', 'auth.php'), 15000);
  if (authConfig) {
    const guards = authConfig.match(/'([a-z]+)'\s*=>\s*\[[\s\S]*?'driver'/g);
    if (guards) {
      guards.forEach(g => {
        const name = g.match(/'([a-z]+)'\s*=>/)?.[1];
        const driver = g.match(/'driver'\s*=>\s*'([^']+)'/)?.[1];
        if (name && driver) auth.guards.push({ name, driver });
      });
    }
    
    const providers = authConfig.match(/'([a-z]+)'\s*=>\s*\[[\s\S]*?'driver'/g);
    if (providers) {
      providers.forEach(p => {
        const name = p.match(/'([a-z]+)'\s*=>/)?.[1];
        const driver = p.match(/'driver'\s*=>\s*'([^']+)'/)?.[1];
        if (name && driver) auth.providers.push({ name, driver });
      });
    }
  }
  
  // Kernel.php middleware
  const kernelFile = path.join(root, 'app', 'Http', 'Kernel.php');
  if (fs.existsSync(kernelFile)) {
    const content = readFileSafe(kernelFile, 10000);
    if (content) {
      const middleware = content.match(/'([a-z]+)'/g)?.map(m => m.replace(/'/g, '')).slice(0, 15);
      if (middleware) auth.middleware = middleware;
    }
  }
  
  return auth;
}

// ═══════════════════════════════════════════════════════════════════════════
// PHASE 3: NORMALIZATION - Deduplicate and Canonicalize
// ═══════════════════════════════════════════════════════════════════════════

function normalizeRoutes(routes) {
  const seen = new Set();
  const normalized = [];
  
  for (const r of routes) {
    const key = `${r.method}:${r.path}`;
    if (!seen.has(key)) {
      seen.add(key);
      normalized.push(r);
    }
  }
  
  return normalized;
}

function normalizeTables(tables) {
  const seen = new Set();
  const normalized = [];
  
  for (const t of tables) {
    if (!seen.has(t.name)) {
      seen.add(t.name);
      normalized.push(t);
    }
  }
  
  return normalized;
}

function normalizeServices(services) {
  const seen = new Set();
  const normalized = [];
  
  for (const s of services) {
    const key = s.name || s.class;
    if (!seen.has(key)) {
      seen.add(key);
      normalized.push(s);
    }
  }
  
  return normalized;
}

// ═══════════════════════════════════════════════════════════════════════════
// PHASE 4: SYNTHESIS - Infer Workflows
// ═══════════════════════════════════════════════════════════════════════════

function synthesizeWorkflows(data) {
  const workflows = [];
  
  // User authentication flow
  if (data.auth?.controllers?.length || data.auth?.middleware?.length) {
    workflows.push({
      type: 'strong inference',
      description: `User authentication flow detected: ${(data.auth.controllers || []).length} auth controllers, ${(data.auth.middleware || []).length} auth middleware`,
    });
  }
  
  // API → Controller → Service → Database
  if (data.routes?.length && data.services?.length && data.models?.length) {
    workflows.push({
      type: 'strong inference',
      description: `CRUD operation flow: ${data.routes.length} endpoints → services → ${data.models.length} models → database`,
    });
  }
  
  // Event-driven async
  if (data.jobs?.length) {
    const jobTypes = [...new Set(data.jobs.map(j => j.type))].join(', ');
    workflows.push({
      type: 'strong inference',
      description: `Background job processing: ${data.jobs.length} jobs (${jobTypes})`,
    });
  }
  
  // External integrations flow
  if (data.integrations?.length) {
    const dbType = data.dbConfig?.type || 'database';
    workflows.push({
      type: 'strong inference',
      description: `Data persistence: ${dbType} with ${data.integrations.filter(i => i.type === 'Database').length} database drivers`,
    });
  }
  
  // Webhook processing
  if (data.webhooks?.length) {
    workflows.push({
      type: 'strong inference',
      description: `External webhook integration: ${data.webhooks.length} webhook endpoints for third-party callbacks`,
    });
  }
  
  // Payment/transaction flow (common pattern)
  if (data.integrations?.some(i => i.name.includes('stripe') || i.name.includes('payment'))) {
    workflows.push({
      type: 'weak inference',
      description: 'Payment processing flow detected (Stripe or payment integration found)',
    });
  }
  
  // Real-time/notification flow
  if (data.integrations?.some(i => i.name.includes('socket') || i.name.includes('pusher'))) {
    workflows.push({
      type: 'weak inference',
      description: 'Real-time notification flow detected (socket.io or similar)',
    });
  }
  
  return workflows;
}

// ═══════════════════════════════════════════════════════════════════════════
// PHASE 5: RENDERING - 15 Section Report
// ═══════════════════════════════════════════════════════════════════════════

function renderReport(data, target) {
  const projectName = path.basename(target);
  let md = '';
  
  // Header
  md += `# ${projectName} — system understanding report\n\n`;
  md += `> scanned source: ${target}\n`;
  md += `> scanned ref: ${data.branch || 'unknown'}\n`;
  md += `> scan mode: exhaustive markdown report\n`;
  md += `> confidence note: Static codebase analysis. Runtime behavior inferred, not verified.\n\n---\n\n`;
  
  // 1. Executive Summary
  md += `## 1. Executive Summary\n\n`;
  const summary = [];
  if (data.framework) summary.push(`framework: ${data.framework}`);
  if (data.languages?.length) summary.push(`languages: ${data.languages.join(', ')}`);
  if (data.routes?.length) summary.push(`API: ${data.routes.length} routes`);
  if (data.tables?.length) summary.push(`database: ${data.tables.length} tables`);
  if (data.services?.length) summary.push(`services: ${data.services.length} classes`);
  if (data.models?.length) summary.push(`models: ${data.models.length}`);
  md += (summary.join(' · ') || 'static analysis completed') + '.\n\n';
  
  // 2. Repository Identity and Scope
  md += `## 2. Repository Identity and Scope\n\n`;
  md += '| aspect | value |\n|---|---|\n';
  md += `| project name | ${projectName} |\n`;
  md += `| framework | ${data.framework || 'unknown'} |\n`;
  md += `| languages | ${(data.languages || []).join(', ') || 'unknown'} |\n`;
  md += `| scan boundary | full recursive scan |\n`;
  md += `| confidence | static analysis only |\n\n`;
  
  // 3. Top-Level System Map
  md += `## 3. Top-Level System Map\n\n`;
  if (data.structure) {
    md += '```\n' + data.structure.split('\n').slice(0, 40).join('\n') + '\n```\n\n';
  }
  
  // 4. Runtime Entrypoints
  md += `## 4. Runtime Entrypoints\n\n`;
  if (data.routes?.length) md += `- HTTP API: ${data.routes.length} routes\n`;
  if (data.services?.length) md += `- Services: ${data.services.length} classes\n`;
  if (data.jobs?.length) md += `- Jobs: ${data.jobs.length} classes\n`;
  md += '\n';
  
  // 5. API/Interface Surface
  md += `## 5. API/Interface Surface\n\n`;
  if (data.routes?.length) {
    md += `### HTTP Routes (${data.routes.length})\n\n`;
    md += '| method | path | controller | evidence |\n|---|---|---|---|\n';
    data.routes.slice(0, 60).forEach(r => {
      const ctrl = r.controller ? r.controller + (r.action ? '@' + r.action : '') : '-';
      md += `| ${r.method} | ${r.path} | ${ctrl} | ${r.evidence || 'fact: route found'} |\n`;
    });
    md += '\n';
  } else {
    md += '*not resolved from static analysis*\n\n';
  }
  
  // 6. Database and Persistence Model
  md += `## 6. Database and Persistence Model\n\n`;
  
  // Database type and config first
  if (data.dbConfig?.type) {
    md += `### Database Type\n\n`;
    md += `- **${data.dbConfig.type}** — detected from dependencies and config\n`;
    if (data.dbConfig.connections?.length) {
      data.dbConfig.connections.slice(0, 3).forEach(c => {
        md += `- ${c.type}: ${c.detail}\n`;
      });
    }
    md += '\n';
  }
  
  if (data.tables?.length) {
    md += `### Tables (${data.tables.length})\n\n`;
    md += '| table | columns | evidence |\n|---|---|---|\n';
    data.tables.slice(0, 40).forEach(t => {
      const cols = t.columns?.length ? t.columns.slice(0, 5).join(', ') : '-';
      md += `| ${t.name} | ${cols} | ${t.evidence || 'fact: migration found'} |\n`;
    });
    md += '\n';
  } else if (!data.dbConfig?.type) {
    md += '*not resolved from static analysis*\n\n';
  }
  
  // 7. Domain Models and Relationships
  md += `## 7. Domain Models and Relationships\n\n`;
  if (data.models?.length) {
    md += `### Models (${data.models.length})\n\n`;
    md += '| model | type | methods | relationships |\n|---|---|---|---|\n';
    data.models.slice(0, 25).forEach(m => {
      const methods = m.methods?.slice(0, 3).join(', ') || m.statics?.slice(0, 3).join(', ') || '-';
      const rels = m.relationships?.length ? m.relationships.join(', ') : '-';
      md += `| ${m.name} | ${m.type || 'Model'} | ${methods} | ${rels} |\n`;
    });
    md += '\n';
  } else {
    md += '*not resolved from static analysis*\n\n';
  }
  
  // 8. Services and Business Logic
  md += `## 8. Services and Business Logic\n\n`;
  if (data.services?.length) {
    md += '### Service Classes\n\n';
    data.services.slice(0, 20).forEach(s => {
      const name = s.name || s.class || 'unknown';
      const methods = s.methods?.join(', ') || 'unknown';
      md += `- **${name}**: ${methods}\n`;
    });
    md += '\n';
  } else {
    md += '*not resolved from static analysis*\n\n';
  }
  
  // 9. Jobs, Events, Listeners, Observers
  md += `## 9. Jobs, Events, Listeners, Observers\n\n`;
  const hasJobs = data.jobs?.length;
  const hasEvents = data.events?.length;
  const hasListeners = data.listeners?.length;
  
  if (hasJobs) {
    md += `### Background Jobs (${data.jobs.length})\n\n`;
    md += '| job | type | schedule | evidence |\n|---|---|---|---|\n';
    data.jobs.slice(0, 15).forEach(j => {
      const schedule = j.schedule || '-';
      md += `| ${j.name} | ${j.type} | ${schedule} | ${j.evidence} |\n`;
    });
    md += '\n';
  }
  if (hasEvents) {
    md += `### Events (${data.events.length})\n\n`;
    data.events.slice(0, 10).forEach(e => md += `- ${e.name}\n`);
    md += '\n';
  }
  if (hasListeners) {
    md += `### Listeners (${data.listeners.length})\n\n`;
    data.listeners.slice(0, 10).forEach(l => {
      const handles = l.handles || 'not resolved from registration';
      md += `- ${l.name}: handles ${handles}\n`;
    });
    md += '\n';
  }
  if (!hasJobs && !hasEvents && !hasListeners) {
    md += '*not resolved from static analysis*\n\n';
  }
  
  // 10. Auth, Permissions, Tenancy
  md += `## 10. Auth, Permissions, Tenancy\n\n`;
  
  // Separate properly: middleware first, then controllers, then components (for Express)
  if (data.auth?.middleware?.length && Array.isArray(data.auth.middleware[0])) {
    md += '### Auth Middleware\n\n';
    data.auth.middleware.slice(0, 12).forEach(m => {
      md += `- **${m.name}** (${m.type}): ${m.evidence}\n`;
    });
    md += '\n';
  }
  
  if (data.auth?.controllers?.length) {
    md += '### Auth Controllers\n\n';
    data.auth.controllers.slice(0, 8).forEach(c => {
      md += `- **${c.name}**: ${c.evidence}\n`;
    });
    md += '\n';
  }
  
  if (data.auth?.components?.length) {
    md += '### Auth Components\n\n';
    data.auth.components.slice(0, 8).forEach(c => {
      md += `- **${c.name}** (${c.type}): ${c.evidence}\n`;
    });
    md += '\n';
  }
  
  // Fallback for Laravel-style auth (array of strings)
  if (data.auth?.guards?.length && !Array.isArray(data.auth?.middleware?.[0])) {
    md += '### Authentication Guards\n\n';
    data.auth.guards.forEach(g => md += `- fact: guard '${g.name}' driver '${g.driver}'\n`);
    md += '\n';
  }
  if (data.auth?.providers?.length && !Array.isArray(data.auth?.middleware?.[0])) {
    md += '### User Providers\n\n';
    data.auth.providers.forEach(p => md += `- fact: provider '${p.name}' driver '${p.driver}'\n`);
    md += '\n';
  }
  if (data.auth?.middleware?.length && !Array.isArray(data.auth?.middleware?.[0])) {
    md += '### Auth Middleware\n\n';
    data.auth.middleware.forEach(m => md += `- fact: middleware '${m}' registered\n`);
    md += '\n';
  }
  
  if (!data.auth?.guards?.length && !data.auth?.middleware?.length && !data.auth?.controllers?.length) {
    md += '*not resolved from static analysis*\n\n';
  }
  
  // 11. Integrations and External Systems
  md += `## 11. Integrations and External Systems\n\n`;
  if (data.integrations?.length) {
    data.integrations.slice(0, 15).forEach(i => {
      md += `- ${i.type || 'integration'}: ${i.name} — ${i.evidence || 'fact: detected'}\n`;
    });
    md += '\n';
  }
  if (data.webhooks?.length) {
    md += '### Webhooks\n\n';
    data.webhooks.slice(0, 5).forEach(w => md += `- ${w.method} ${w.path} → ${w.file}\n`);
    md += '\n';
  }
  if (!data.integrations?.length && !data.webhooks?.length) {
    md += '*not resolved from static analysis*\n\n';
  }
  
  // 12. Module Boundaries and Dependency Map
  md += `## 12. Module Boundaries and Dependency Map\n\n`;
  md += '*not resolved from static analysis*\n\n';
  
  // 13. Inferred End-to-End Workflows
  md += `## 13. Inferred End-to-End Workflows\n\n`;
  if (data.workflows?.length) {
    data.workflows.forEach(w => md += `- ${w.type}: ${w.description}\n`);
  } else {
    md += '*weak inference: no clear workflow patterns detected*\n';
  }
  md += '\n';
  
  // 14. Risks, Unknowns, and Confidence Boundaries
  md += `## 14. Risks, Unknowns, and Confidence Boundaries\n\n`;
  md += '- Runtime behavior: weak inference from code patterns, not verified\n';
  md += '- API contracts: weak inference from routes, actual format unknown\n';
  md += '- Data flows: weak inference, no runtime verification\n';
  md += '- External integrations: strong inference from dependencies, live status unknown\n';
  md += '- Security: weak inference from config, no penetration testing\n\n';
  
  // 15. Appendices
  md += `## 15. Appendices\n\n`;
  
  if (data.routes?.length) {
    md += `### A. Full Route Inventory (${data.routes.length})\n\n`;
    md += '| method | path | controller@method |\n|---|---|---|\n';
    data.routes.forEach(r => {
      const ctrl = r.controller ? r.controller + (r.action ? '@' + r.action : '') : '-';
      md += `| ${r.method} | ${r.path} | ${ctrl} |\n`;
    });
    md += '\n';
  }
  
  if (data.tables?.length) {
    md += `### B. Full Table Inventory (${data.tables.length})\n\n`;
    data.tables.forEach((t, i) => md += `${i + 1}. \`${t.name}\`\n`);
    md += '\n';
  }
  
  if (data.services?.length) {
    md += `### C. Full Service Inventory (${data.services.length})\n\n`;
    data.services.forEach(s => md += `- ${s.name || s.class}: ${s.file || 'unknown'}\n`);
    md += '\n';
  }
  
  md += '---\n\n*Generated by Repo Reverse Engineer v1.0.0*\n';
  
  return md;
}

// ═══════════════════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════════════════

function readFileSafe(fp, maxSize = 50000) {
  try {
    const stats = fs.statSync(fp);
    if (stats.size > MAX_FILE_SIZE) return null;
    return fs.readFileSync(fp, 'utf-8');
  } catch {
    return null;
  }
}

function readJsonSafe(fp) {
  try {
    const content = readFileSafe(fp, 10000);
    return content ? JSON.parse(content) : null;
  } catch {
    return null;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════

function main() {
  const args = process.argv.slice(2);
  let target = process.cwd();
  let deep = false;
  
  for (const arg of args) {
    if (arg.startsWith('/')) target = arg;
    else if (arg === '--deep') deep = true;
    else if (arg === '--json') deep = true;
  }
  
  if (!fs.existsSync(target)) {
    console.error(`Error: Path not found: ${target}`);
    process.exit(1);
  }
  
  // Phase 1: Intake
  console.error('🔍 Phase 1: Intake...');
  const framework = detectFramework(target);
  const languages = detectLanguages(target);
  
  // Phase 2: Extraction
  console.error('📦 Phase 2: Extraction (' + framework + ')...');
  let routes = [], tables = [], models = [], services = [], events = [], listeners = [], auth = {}, integrations = [], webhooks = [], jobs = [], dbConfig = {};
  let handlers = {}; // Controller handler mapping
  
  if (framework === 'express' || framework === 'nodejs') {
    routes = extractExpressRoutes(target);
    models = extractMongooseModels(target);
    services = extractExpressServices(target);
    integrations = extractNodeIntegrations(target);
    webhooks = extractExpressWebhooks(target);
    jobs = extractExpressJobs(target);
    auth = extractAuthComponents(target); // NEW: better auth separation
    dbConfig = extractDatabaseConfig(target); // NEW: database config
    handlers = extractControllerHandlers(target); // NEW: controller handler mapping
  } else if (framework === 'laravel') {
    routes = extractLaravelRoutes(target);
    tables = extractLaravelMigrations(target);
    models = extractLaravelModels(target);
    services = extractLaravelServices(target);
    events = extractLaravelEvents(target);
    listeners = extractLaravelListeners(target);
    auth = extractLaravelAuth(target);
    integrations = [];
    dbConfig = { type: 'MySQL/PostgreSQL (Laravel)', connections: [], schemas: [] };
  }
  
  // Phase 3: Normalization
  console.error('🔧 Phase 3: Normalization...');
  routes = normalizeRoutes(routes);
  tables = normalizeTables(tables);
  services = normalizeServices(services);
  
  // Phase 4: Synthesis
  console.error('🔗 Phase 4: Synthesis...');
  const workflows = synthesizeWorkflows({ routes, services, models, events, listeners, auth, integrations, jobs, webhooks, dbConfig });
  
  // Structure
  let structure = '';
  try {
    const entries = scanDirRecursive(target, '', 3);
    structure = entries.slice(0, 60).join('\n');
  } catch {}
  
  const data = { framework, languages, routes, tables, models, services, events, listeners, auth, integrations, webhooks, jobs, workflows, structure, dbConfig };
  
  // Phase 5: Rendering
  console.error('📝 Phase 5: Rendering...');
  const report = renderReport(data, target);
  
  console.log(report);
  
  // Auto-save
  const date = new Date().toISOString().split('T')[0];
  const fileName = projectName(target) + '-scan-' + date + '.md';
  const savePath = path.join(target, fileName);
  
  try {
    fs.writeFileSync(savePath, report, 'utf-8');
    console.error('📄 Report saved to: ' + savePath);
    
    // Copy to workspace for Discord
    const workspacePath = '/root/.openclaw/workspace/' + fileName;
    fs.writeFileSync(workspacePath, report, 'utf-8');
    console.error('📤 Copied to workspace: ' + workspacePath);
  } catch (err) {
    console.error('⚠️ Could not save report: ' + err.message);
  }
}

function projectName(target) {
  return path.basename(target).toLowerCase().replace(/[^a-z0-9-]/g, '-');
}

main();