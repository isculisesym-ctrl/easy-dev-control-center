/**
 * Start Command
 * Starts one or all services
 */

import ora from 'ora';
import { BaseCommand } from '../core/BaseCommand';

export class StartCommand extends BaseCommand {
  name = 'start';
  description = 'Start services (usage: start [service-name] or start all)';

  async execute(...args: string[]): Promise<void> {
    const serviceArg = args[0];

    if (!serviceArg) {
      this.logger.error('Please specify a service or "all"');
      this.showHelp();
      return;
    }

    if (serviceArg.toLowerCase() === 'all') {
      await this.startAll();
    } else {
      await this.startOne(serviceArg);
    }
  }

  private async startAll(): Promise<void> {
    this.logger.header('Starting All Services');

    const services = this.registry.getAll();
    let successCount = 0;
    let failureCount = 0;

    for (const service of services) {
      const spinner = ora(`Starting ${service.displayName}...`).start();
      try {
        await service.start();
        spinner.succeed(`${service.displayName} started`);
        successCount++;
      } catch (error) {
        spinner.fail(`Failed to start ${service.displayName}`);
        if (error instanceof Error) {
          this.logger.error(`  └─ ${error.message}`);
        }
        failureCount++;
      }
    }

    this.logger.divider();
    this.logger.info(`Started: ${successCount}, Failed: ${failureCount}`);
  }

  private async startOne(serviceName: string): Promise<void> {
    const service = this.registry.get(serviceName);

    if (!service) {
      this.logger.error(`Service "${serviceName}" not found`);
      this.logger.info(`Available services: ${this.registry.list().join(', ')}`);
      return;
    }

    const spinner = ora(`Starting ${service.displayName}...`).start();
    try {
      await service.start();
      spinner.succeed(`${service.displayName} started`);
    } catch (error) {
      spinner.fail(`Failed to start ${service.displayName}`);
      if (error instanceof Error) {
        this.logger.error(error.message);
      }
    }
  }
}
