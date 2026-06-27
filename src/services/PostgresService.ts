/**
 * PostgreSQL Service
 * Manages PostgreSQL database service
 */

import { BaseService } from '../core/BaseService';
import { ServiceStatus } from '../types';
import { startBrewService, stopBrewService, getBrewServices } from '../utils/system';

export class PostgresService extends BaseService {
  name = 'postgres';
  displayName = 'PostgreSQL';
  description = 'Open-source relational database';
  private serviceName = 'postgresql@18';

  async status(): Promise<ServiceStatus> {
    try {
      const services = getBrewServices();
      if (services.includes(this.serviceName) && services.includes('started')) {
        return ServiceStatus.RUNNING;
      }
      if (services.includes(this.serviceName)) {
        return ServiceStatus.STOPPED;
      }
      return ServiceStatus.UNKNOWN;
    } catch {
      return ServiceStatus.ERROR;
    }
  }

  async start(): Promise<void> {
    const success = startBrewService(this.serviceName);
    if (!success) {
      throw new Error(`Failed to start ${this.displayName}`);
    }
  }

  async stop(): Promise<void> {
    const success = stopBrewService(this.serviceName);
    if (!success) {
      throw new Error(`Failed to stop ${this.displayName}`);
    }
  }

  async getLogs(): Promise<string> {
    try {
      return `PostgreSQL@18 logs would be displayed here`;
    } catch {
      return '';
    }
  }
}
