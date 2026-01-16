// Build script without Next.js version banner
const { spawn } = require('child_process');

// Set environment variable to disable telemetry
process.env.NEXT_TELEMETRY_DISABLED = '1';

// Run build and filter output
const buildProcess = spawn('next', ['build'], {
  env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
  stdio: ['inherit', 'pipe', 'pipe'],
  shell: true
});

let hasError = false;

// Filter stdout
buildProcess.stdout.on('data', (data) => {
  const lines = data.toString().split('\n');
  lines.forEach(line => {
    // Skip Next.js version banner and telemetry messages
    if (!line.includes('Next.js 14') && 
        !line.includes('▲ Next.js') &&
        !line.includes('Attention: Next.js') && 
        !line.includes('telemetry') &&
        !line.includes('This information is used') &&
        line.trim() !== '') {
      process.stdout.write(line + '\n');
    }
  });
});

// Filter stderr (errors)
buildProcess.stderr.on('data', (data) => {
  process.stderr.write(data);
});

buildProcess.on('close', (code) => {
  process.exit(code);
});

buildProcess.on('error', (error) => {
  console.error('Build error:', error);
  process.exit(1);
});