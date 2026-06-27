/**
 * System utilities for detecting and interacting with system services
 */

import { execSync, spawn, ChildProcess } from 'child_process';
import { logger } from './logger';

/**
 * Execute a shell command and return output
 */
export function exec(command: string): string {
  try {
    return execSync(command, { encoding: 'utf-8' }).trim();
  } catch (error) {
    logger.debug(`Command failed: ${command}`);
    return '';
  }
}

/**
 * Execute a shell command asynchronously
 */
export function execAsync(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const output = exec(command);
      resolve(output);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Check if a command exists in PATH
 */
export function commandExists(command: string): boolean {
  const checkCmd = process.platform === 'win32' ? `where ${command}` : `which ${command}`;
  try {
    exec(checkCmd);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get the version of an installed tool
 */
export function getVersion(command: string, versionFlag: string = '--version'): string {
  try {
    const output = exec(`${command} ${versionFlag}`);
    // Extract version number (first occurrence of x.x.x pattern)
    const match = output.match(/(\d+\.\d+\.\d+)/);
    return match ? match[1] : output.split('\n')[0];
  } catch {
    return 'unknown';
  }
}

/**
 * Check if running on macOS
 */
export function isMacOS(): boolean {
  return process.platform === 'darwin';
}

/**
 * Check if running on Linux
 */
export function isLinux(): boolean {
  return process.platform === 'linux';
}

/**
 * Get macOS version
 */
export function getMacOSVersion(): string {
  if (!isMacOS()) return '';
  try {
    return exec('sw_vers -productVersion');
  } catch {
    return 'unknown';
  }
}

/**
 * Check if a process is running by name
 */
export function isProcessRunning(processName: string): boolean {
  try {
    const output = exec(`pgrep -f ${processName}`);
    return output.length > 0;
  } catch {
    return false;
  }
}

/**
 * Get process ID
 */
export function getPID(processName: string): number | null {
  try {
    const output = exec(`pgrep -f ${processName}`);
    const pid = output.split('\n')[0];
    return pid ? parseInt(pid, 10) : null;
  } catch {
    return null;
  }
}

/**
 * Kill a process by name
 */
export function killProcess(processName: string): boolean {
  try {
    const pid = getPID(processName);
    if (pid) {
      exec(`kill -9 ${pid}`);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Check if Homebrew is installed
 */
export function isBrewInstalled(): boolean {
  return commandExists('brew');
}

/**
 * Get Homebrew services list
 */
export function getBrewServices(): string {
  if (!isBrewInstalled()) return '';
  try {
    return exec('brew services list');
  } catch {
    return '';
  }
}

/**
 * Start a Homebrew service
 */
export function startBrewService(serviceName: string): boolean {
  try {
    exec(`brew services start ${serviceName}`);
    return true;
  } catch {
    return false;
  }
}

/**
 * Stop a Homebrew service
 */
export function stopBrewService(serviceName: string): boolean {
  try {
    exec(`brew services stop ${serviceName}`);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if running with sudo
 */
export function isRunningAsSudo(): boolean {
  return process.getuid?.() === 0;
}

/**
 * Delay execution (for spinner effects)
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
