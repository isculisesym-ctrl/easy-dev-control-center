/**
 * Stop Command
 * Stops one or all services
 */

import ora from 'ora';
import { BaseCommand } from '../core/BaseCommand';

export class StopCommand extends BaseCommand {
  name = 'stop';
  description = 'Stop services (usage: stop [service-name] or stop all)';

  async execute(...args: string[]): Promise<void> {
    const serviceArg = args[0];

    if (!serviceArg) {
      this.logger.error('Please specify a service or "all"');
      this.showHelp();
      return;
    }

    if (serviceArg.toLowerCase() === 'all') {
      await this.stopAll();
    } else {
      await this.stopOne(serviceArg);
    }
  }

  private async stopAll(): Promise<void> {
    this.logger.header('Stopping All Services');

    const services = this.registry.getAll();
    let successCount = 0;
    let failureCount = 0;

    for (const service of services) {
      const spinner = ora(`Stopping ${service.displayName}...`).start();
      try {
        await service.stop();
        spinner.succeed(`${service.displayName} stopped`);
        successCount++;
      } catch (error) {
        spinner.fail(`Failed to stop ${service.displayName}`);
        if (error instanceof Error) {
          this.logger.error(`  └─ ${error.message}`);
        }
        failureCount++;
      }
    }

    this.logger.divider();
    this.logger.info(`Stopped: ${successCount}, Failed: ${failureCount}`);
  }

  private async stopOne(serviceName: string): Promise<void> {
    const service = this.registry.get(serviceName);

    if (!service) {
      this.logger.error(`Service "${serviceName}" not found`);
      this.logger.info(`Available services: ${this.registry.list().join(', ')}`);
      return;
    }

    const spinner = ora(`Stopping ${service.displayName}...`).start();
    try {
      await service.stop();
      spinner.succeed(`${service.displayName} stopped`);
    } catch (error) {
      spinner.fail(`Failed to stop ${service.displayName}`);
      if (error instanceof Error) {
        this.logger.error(error.message);
      }
    }
  }
}
