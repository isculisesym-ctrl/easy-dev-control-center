/**
 * Service Registry - Central registry for all available services
 * Implements singleton pattern for global access
 */

import { IService, IServiceRegistry } from '../types';
import { logger } from '../utils/logger';

export class ServiceRegistry implements IServiceRegistry {
  private static instance: ServiceRegistry;
  private services: Map<string, IService> = new Map();

  private constructor() {}

  /**
   * Get singleton instance
   */
  static getInstance(): ServiceRegistry {
    if (!ServiceRegistry.instance) {
      ServiceRegistry.instance = new ServiceRegistry();
    }
    return ServiceRegistry.instance;
  }

  /**
   * Register a new service
   */
  register(service: IService): void {
    if (this.services.has(service.name)) {
      logger.warn(`Service ${service.name} is already registered, overwriting...`);
    }
    this.services.set(service.name, service);
    logger.debug(`Service registered: ${service.name}`);
  }

  /**
   * Get service by name
   */
  get(name: string): IService | undefined {
    return this.services.get(name);
  }

  /**
   * Get all services
   */
  getAll(): IService[] {
    return Array.from(this.services.values());
  }

  /**
   * List all service names
   */
  list(): string[] {
    return Array.from(this.services.keys());
  }

  /**
   * Check if service exists
   */
  has(name: string): boolean {
    return this.services.has(name);
  }

  /**
   * Get total number of services
   */
  count(): number {
    return this.services.size;
  }

  /**
   * Clear all services (useful for testing)
   */
  clear(): void {
    this.services.clear();
  }
}

export const registry = ServiceRegistry.getInstance();
