import * as fs from 'fs';
import * as path from 'path';

async function ensureDir(dirPath: string): Promise<void> {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  } catch {}
}

export default async function globalSetup(): Promise<void> {
  // Prepare artifact directories
  await ensureDir(path.resolve('screenshots'));
  await ensureDir(path.resolve('videos'));
  await ensureDir(path.resolve('traces'));
  await ensureDir(path.resolve('test-results'));

  // Validate environment file if present
  try {
    const envPath = path.resolve('cursor.env.json');
    if (fs.existsSync(envPath)) {
      const cfg = JSON.parse(fs.readFileSync(envPath, 'utf-8'));
      // Hydrate env for runtime usage without failing if missing
      process.env.AKIFLOW_BASE_URL = process.env.AKIFLOW_BASE_URL || cfg.AKIFLOW_BASE_URL;
      process.env.AKIFLOW_EMAIL = process.env.AKIFLOW_EMAIL || cfg.AKIFLOW_EMAIL;
      process.env.AKIFLOW_CONFIRMATION_CODE = process.env.AKIFLOW_CONFIRMATION_CODE || cfg.AKIFLOW_CONFIRMATION_CODE;
    }
  } catch {}
}


