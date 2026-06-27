/**
 * Abstract base class for all CLI commands
 */

import { ICommand } from '../types';
import { registry } from './ServiceRegistry';
import { logger } from '../utils/logger';

export abstract class BaseCommand implements ICommand {
  abstract name: string;
  abstract description: string;

  protected registry = registry;
  protected logger = logger;

  abstract execute(...args: string[]): Promise<void>;

  /**
   * Show help message
   */
  showHelp(): void {
    this.logger.info(`Usage: easy-dev ${this.name}`);
    this.logger.info(`Description: ${this.description}`);
  }
}
