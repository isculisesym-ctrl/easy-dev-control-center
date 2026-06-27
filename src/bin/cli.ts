#!/usr/bin/env node

/**
 * Easy Dev Control Center CLI
 * Main entry point
 */

import chalk from 'chalk';
import { registry } from '../core/ServiceRegistry';
import { logger } from '../utils/logger';

// Import services
import { PostgresService } from '../services/PostgresService';
import { NodeService } from '../services/NodeService';
import { PythonService } from '../services/PythonService';
import { OllamaService } from '../services/OllamaService';
import { GitService } from '../services/GitService';

// Import commands
import { StatusCommand } from '../commands/StatusCommand';
import { StartCommand } from '../commands/StartCommand';
import { StopCommand } from '../commands/StopCommand';
import { MapCommand } from '../commands/MapCommand';

const commands = {
  status: new StatusCommand(),
  start: new StartCommand(),
  stop: new StopCommand(),
  map: new MapCommand(),
};

async function main(): Promise<void> {
  try {
    // Register all services
    registry.register(new PostgresService());
    registry.register(new NodeService());
    registry.register(new PythonService());
    registry.register(new OllamaService());
    registry.register(new GitService());

    // Get command from arguments
    const args = process.argv.slice(2);
    const commandName = args[0];
    const commandArgs = args.slice(1);

    // Show help if no command
    if (!commandName) {
      showHelp();
      process.exit(0);
    }

    // Execute command
    const command = commands[commandName as keyof typeof commands];

    if (!command) {
      logger.error(`Unknown command: ${commandName}`);
      showHelp();
      process.exit(1);
    }

    await command.execute(...commandArgs);
  } catch (error) {
    logger.error('An error occurred');
    if (error instanceof Error) {
      logger.error(error.message);
    }
    process.exit(1);
  }
}

function showHelp(): void {
  console.log(
    chalk.bold.cyan(`
╔════════════════════════════════════════════════════╗
║  Easy Dev Control Center v0.1.0                   ║
║  Manage your dev environment like a boss 🚀       ║
╚════════════════════════════════════════════════════╝
  `)
  );

  console.log(chalk.bold('Usage:'));
  console.log('  easy-dev <command> [options]\n');

  console.log(chalk.bold('Commands:'));
  Object.entries(commands).forEach(([name, cmd]) => {
    console.log(`  ${chalk.cyan(name.padEnd(12))} ${cmd.description}`);
  });

  console.log(chalk.bold('\nExamples:'));
  console.log('  easy-dev status              # Show all services');
  console.log('  easy-dev start all           # Start all services');
  console.log('  easy-dev stop postgres       # Stop PostgreSQL');
  console.log('  easy-dev map                 # System inventory');
}

main();
