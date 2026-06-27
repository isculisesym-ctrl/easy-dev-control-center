/**
 * Logger utility with colored output
 */

import chalk from 'chalk';
import { format } from 'util';

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  SUCCESS = 'success',
}

export class Logger {
  private level: LogLevel = LogLevel.INFO;

  setLevel(level: LogLevel): void {
    this.level = level;
  }

  private shouldLog(messageLevel: LogLevel): boolean {
    const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR, LogLevel.SUCCESS];
    return levels.indexOf(messageLevel) >= levels.indexOf(this.level);
  }

  private formatMessage(prefix: string, message: string, ...args: unknown[]): string {
    const formatted = format(message, ...args);
    const timestamp = new Date().toISOString().split('T')[1].slice(0, -1);
    return `${chalk.gray(`[${timestamp}`]} ${prefix} ${formatted}`;
  }

  debug(message: string, ...args: unknown[]): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.log(this.formatMessage(chalk.blue('DEBUG'), message, ...args));
    }
  }

  info(message: string, ...args: unknown[]): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.log(this.formatMessage(chalk.cyan('ℹ'), message, ...args));
    }
  }

  warn(message: string, ...args: unknown[]): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.log(this.formatMessage(chalk.yellow('⚠'), message, ...args));
    }
  }

  error(message: string, ...args: unknown[]): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(this.formatMessage(chalk.red('✗'), message, ...args));
    }
  }

  success(message: string, ...args: unknown[]): void {
    if (this.shouldLog(LogLevel.SUCCESS)) {
      console.log(this.formatMessage(chalk.green('✓'), message, ...args));
    }
  }

  header(title: string): void {
    console.log(chalk.bold.cyan(`\n╔${'═'.repeat(title.length + 2)}╗`));
    console.log(chalk.bold.cyan(`║ ${title} ║`));
    console.log(chalk.bold.cyan(`╚${'═'.repeat(title.length + 2)}╝\n`));
  }

  section(title: string): void {
    console.log(chalk.bold.magenta(`\n── ${title}`));
  }

  divider(): void {
    console.log(chalk.gray('─'.repeat(60)));
  }
}

export const logger = new Logger();
