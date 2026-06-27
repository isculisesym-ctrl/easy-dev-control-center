/**
 * Git Service
 * Manages Git configuration and SSH
 */

import { BaseService } from '../core/BaseService';
import { ServiceStatus } from '../types';
import { commandExists, getVersion, exec } from '../utils/system';

export class GitService extends BaseService {
  name = 'git';
  displayName = 'Git';
  description = 'Version control system';

  async status(): Promise<ServiceStatus> {
    if (!commandExists('git')) {
      return ServiceStatus.STOPPED;
    }

    try {
      exec('ssh -T git@github.com');
      return ServiceStatus.RUNNING;
    } catch {
      return ServiceStatus.UNKNOWN;
    }
  }

  async start(): Promise<void> {
    if (!commandExists('git')) {
      throw new Error('Git is not installed. Install via: brew install git');
    }
  }

  async stop(): Promise<void> {
    throw new Error('Cannot stop Git (it is not a service)');
  }

  async getLogs(): Promise<string> {
    const version = getVersion('git');
    return `Git version: ${version}`;
  }
}
