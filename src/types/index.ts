/**
 * Core type definitions for Easy Dev Control Center
 */

/**
 * Service status enumeration
 */
export enum ServiceStatus {
  RUNNING = 'running',
  STOPPED = 'stopped',
  ERROR = 'error',
  UNKNOWN = 'unknown',
}

/**
 * Service information interface
 */
export interface IService {
  name: string;
  displayName: string;
  description: string;
  status(): Promise<ServiceStatus>;
  start(): Promise<void>;
  stop(): Promise<void>;
  restart(): Promise<void>;
  getLogs(): Promise<string>;
}

/**
 * System information interface
 */
export interface ISystemInfo {
  platform: NodeJS.Platform;
  arch: string;
  osVersion: string;
  nodeVersion: string;
  pythonVersion?: string;
}

/**
 * Service registry interface
 */
export interface IServiceRegistry {
  register(service: IService): void;
  get(name: string): IService | undefined;
  getAll(): IService[];
  list(): string[];
}

/**
 * CLI command interface
 */
export interface ICommand {
  name: string;
  description: string;
  execute(...args: string[]): Promise<void>;
}

/**
 * Application config interface
 */
export interface IConfig {
  services: Map<string, ServiceConfig>;
}

/**
 * Individual service config
 */
export interface ServiceConfig {
  enabled: boolean;
  autoStart?: boolean;
  [key: string]: unknown;
}

/**
 * Command result
 */
export interface CommandResult {
  success: boolean;
  message: string;
  data?: unknown;
}
