/**
 * Status Command
 * Displays the status of all registered services
 */

import Table from 'cli-table3';
import chalk from 'chalk';
import { BaseCommand } from '../core/BaseCommand';
import { ServiceStatus } from '../types';

export class StatusCommand extends BaseCommand {
  name = 'status';
  description = 'Show status of all services';

  async execute(): Promise<void> {
    this.logger.header('Service Status');

    const services = this.registry.getAll();

    if (services.length === 0) {
      this.logger.warn('No services registered');
      return;
    }

    const table = new Table({
      head: [
        chalk.bold.cyan('Service'),
        chalk.bold.cyan('Status'),
        chalk.bold.cyan('Description'),
      ],
      style: {
        head: [],
        border: ['grey'],
      },
      wordWrap: true,
    });

    for (const service of services) {
      const status = await service.status();
      const statusColor = this.getStatusColor(status);
      const statusSymbol = this.getStatusSymbol(status);

      table.push([
        chalk.bold(service.displayName),
        statusColor(`${statusSymbol} ${status}`),
        service.description,
      ]);
    }

    console.log(table.toString());
  }

  private getStatusColor(
    status: ServiceStatus
  ): (text: string) => string {
    switch (status) {
      case ServiceStatus.RUNNING:
        return chalk.green;
      case ServiceStatus.STOPPED:
        return chalk.red;
      case ServiceStatus.ERROR:
        return chalk.red.bold;
      default:
        return chalk.yellow;
    }
  }

  private getStatusSymbol(status: ServiceStatus): string {
    switch (status) {
      case ServiceStatus.RUNNING:
        return '✓';
      case ServiceStatus.STOPPED:
        return '✗';
      case ServiceStatus.ERROR:
        return '⚠';
      default:
        return '?';
    }
  }
}
