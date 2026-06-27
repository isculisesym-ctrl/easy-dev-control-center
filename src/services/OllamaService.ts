/**
 * Ollama Service
 * Manages Ollama local LLM service
 */

import { BaseService } from '../core/BaseService';
import { ServiceStatus } from '../types';
import { commandExists, isProcessRunning } from '../utils/system';

export class OllamaService extends BaseService {
  name = 'ollama';
  displayName = 'Ollama';
  description = 'Local LLM runtime';

  async status(): Promise<ServiceStatus> {
    if (!commandExists('ollama')) {
      return ServiceStatus.UNKNOWN;
    }
    return isProcessRunning('ollama') ? ServiceStatus.RUNNING : ServiceStatus.STOPPED;
  }

  async start(): Promise<void> {
    if (!commandExists('ollama')) {
      throw new Error('Ollama is not installed. Install via: brew install --cask ollama');
    }
    // In a real implementation, this would start the Ollama daemon
    throw new Error('Use "open -a Ollama" or start from Applications folder');
  }

  async stop(): Promise<void> {
    throw new Error('Ollama must be stopped from the application menu');
  }

  async getLogs(): Promise<string> {
    return 'Ollama logs available in ~/Library/Logs/Ollama/';
  }
}
