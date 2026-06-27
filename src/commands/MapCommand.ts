/**
 * Map Command
 * Displays system inventory and installed tools
 */

import Table from 'cli-table3';
import chalk from 'chalk';
import { BaseCommand } from '../core/BaseCommand';
import {
  isMacOS,
  isLinux,
  getMacOSVersion,
  commandExists,
  getVersion,
  isBrewInstalled,
} from '../utils/system';

export class MapCommand extends BaseCommand {
  name = 'map';
  description = 'Show system inventory and installed tools';

  async execute(): Promise<void> {
    this.logger.header('System Inventory Map');

    // System Info
    this.showSystemInfo();

    // Installed Tools
    this.showInstalledTools();

    // Node Packages
    await this.showNodePackages();

    // Python Packages
    await this.showPythonPackages();
  }

  private showSystemInfo(): void {
    this.logger.section('System Information');

    const table = new Table({
      head: [chalk.bold.cyan('Property'), chalk.bold.cyan('Value')],
      style: { head: [], border: ['grey'] },
    });

    table.push(['Platform', isMacOS() ? 'macOS' : isLinux() ? 'Linux' : 'Unknown']);

    if (isMacOS()) {
      table.push(['OS Version', getMacOSVersion()]);
    }

    table.push(['Architecture', process.arch]);
    table.push(['Node.js', process.version]);

    console.log(table.toString());
  }

  private showInstalledTools(): void {
    this.logger.section('Development Tools');

    const tools = [
      { name: 'Homebrew', cmd: 'brew' },
      { name: 'Git', cmd: 'git' },
      { name: 'Node.js', cmd: 'node' },
      { name: 'npm', cmd: 'npm' },
      { name: 'Python 3', cmd: 'python3' },
      { name: 'Poetry', cmd: 'poetry' },
      { name: 'PostgreSQL', cmd: 'psql' },
      { name: 'Ollama', cmd: 'ollama' },
      { name: 'Docker', cmd: 'docker' },
      { name: 'VS Code', cmd: 'code' },
    ];

    const table = new Table({
      head: [chalk.bold.cyan('Tool'), chalk.bold.cyan('Installed'), chalk.bold.cyan('Version')],
      style: { head: [], border: ['grey'] },
    });

    for (const tool of tools) {
      const installed = commandExists(tool.cmd);
      const status = installed ? chalk.green('✓') : chalk.red('✗');
      const version = installed ? getVersion(tool.cmd) : 'N/A';

      table.push([tool.name, status, version]);
    }

    console.log(table.toString());
  }

  private async showNodePackages(): Promise<void> {
    this.logger.section('Node.js Global Packages');

    if (!commandExists('npm')) {
      this.logger.warn('npm not found');
      return;
    }

    const packages = [
      'typescript',
      'ts-node',
      '@nestjs/cli',
      'create-next-app',
      'create-react-app',
      'pnpm',
      'promptfoo',
    ];

    const table = new Table({
      head: [chalk.bold.cyan('Package'), chalk.bold.cyan('Installed')],
      style: { head: [], border: ['grey'] },
    });

    for (const pkg of packages) {
      const installed = commandExists(pkg) ? chalk.green('✓') : chalk.red('✗');
      table.push([pkg, installed]);
    }

    console.log(table.toString());
  }

  private async showPythonPackages(): Promise<void> {
    this.logger.section('Python Packages');

    if (!commandExists('pip3')) {
      this.logger.warn('pip3 not found');
      return;
    }

    const packages = [
      'anthropic',
      'openai',
      'langchain',
      'llama-index',
      'jupyter',
      'ragas',
      'llm',
    ];

    const table = new Table({
      head: [chalk.bold.cyan('Package'), chalk.bold.cyan('Status')],
      style: { head: [], border: ['grey'] },
    });

    for (const pkg of packages) {
      // In a real implementation, this would check pip list
      const status = chalk.yellow('~');
      table.push([pkg, status]);
    }

    console.log(table.toString());
    this.logger.info('Note: Run "pip3 list" for detailed package information');
  }
}
