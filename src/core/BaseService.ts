/**
 * Abstract base class for all services
 * Provides common interface and utilities
 */

import { IService, ServiceStatus } from '../types';
import { logger } from '../utils/logger';

export abstract class BaseService implements IService {
  abstract name: string;
  abstract displayName: string;
  abstract description: string;

  /**
   * Get current status of the service
   */
  abstract status(): Promise<ServiceStatus>;

  /**
   * Start the service
   */
  abstract start(): Promise<void>;

  /**
   * Stop the service
   */
  abstract stop(): Promise<void>;

  /**
   * Restart the service
   */
  async restart(): Promise<void> {
    logger.info(`Restarting ${this.displayName}...`);
    await this.stop();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await this.start();
    logger.success(`${this.displayName} restarted`);
  }

  /**
   * Get service logs
   */
  async getLogs(): Promise<string> {
    logger.warn(`Logs not implemented for ${this.displayName}`);
    return '';
  }

  /**
   * Check if service is running
   */
  async isRunning(): Promise<boolean> {
    return (await this.status()) === ServiceStatus.RUNNING;
  }

  /**
   * Ensure service is running
   */
  async ensureRunning(): Promise<void> {
    if (!(await this.isRunning())) {
      await this.start();
    }
  }
}
