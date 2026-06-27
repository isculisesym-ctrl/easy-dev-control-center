/**
 * Node.js Service
 * Manages Node.js environment
 */

import { BaseService } from '../core/BaseService';
import { ServiceStatus } from '../types';
import { commandExists, getVersion } from '../utils/system';

export class NodeService extends BaseService {
  name = 'node';
  displayName = 'Node.js';
  description = 'JavaScript runtime environment';

  async status(): Promise<ServiceStatus> {
    return commandExists('node') ? ServiceStatus.RUNNING : ServiceStatus.STOPPED;
  }

  async start(): Promise<void> {
    if (!commandExists('node')) {
      throw new Error('Node.js is not installed. Install via: brew install node');
    }
  }

  async stop(): Promise<void> {
    throw new Error('Cannot stop Node.js (it is not a service)');
  }

  async getLogs(): Promise<string> {
    const version = getVersion('node');
    return `Node.js version: ${version}`;
  }
}
