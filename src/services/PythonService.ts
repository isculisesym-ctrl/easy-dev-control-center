/**
 * Python Service
 * Manages Python environment
 */

import { BaseService } from '../core/BaseService';
import { ServiceStatus } from '../types';
import { commandExists, getVersion } from '../utils/system';

export class PythonService extends BaseService {
  name = 'python';
  displayName = 'Python';
  description = 'Python programming language';

  async status(): Promise<ServiceStatus> {
    return commandExists('python3') ? ServiceStatus.RUNNING : ServiceStatus.STOPPED;
  }

  async start(): Promise<void> {
    if (!commandExists('python3')) {
      throw new Error('Python is not installed. Install via: brew install python@3.14');
    }
  }

  async stop(): Promise<void> {
    throw new Error('Cannot stop Python (it is not a service)');
  }

  async getLogs(): Promise<string> {
    const version = getVersion('python3');
    return `Python version: ${version}`;
  }
}
