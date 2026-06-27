/**
 * PostgreSQL Service Tests
 */

import { PostgresService } from '../PostgresService';
import { ServiceStatus } from '../../types';
import * as system from '../../utils/system';

jest.mock('../../utils/system');

describe('PostgresService', () => {
  let service: PostgresService;

  beforeEach(() => {
    service = new PostgresService();
    jest.clearAllMocks();
  });

  describe('name', () => {
    it('should have correct name', () => {
      expect(service.name).toBe('postgres');
    });

    it('should have display name', () => {
      expect(service.displayName).toBe('PostgreSQL');
    });

    it('should have description', () => {
      expect(service.description).toBe('Open-source relational database');
    });
  });

  describe('status', () => {
    it('should return RUNNING when service is started', async () => {
      (system.getBrewServices as jest.Mock).mockReturnValue(
        'postgresql@18 started'
      );

      const status = await service.status();
      expect(status).toBe(ServiceStatus.RUNNING);
    });

    it('should return STOPPED when service is not running', async () => {
      (system.getBrewServices as jest.Mock).mockReturnValue(
        'postgresql@18 none'
      );

      const status = await service.status();
      expect(status).toBe(ServiceStatus.STOPPED);
    });

    it('should return UNKNOWN when service is not found', async () => {
      (system.getBrewServices as jest.Mock).mockReturnValue('');

      const status = await service.status();
      expect(status).toBe(ServiceStatus.UNKNOWN);
    });

    it('should return ERROR on exception', async () => {
      (system.getBrewServices as jest.Mock).mockImplementation(() => {
        throw new Error('Command failed');
      });

      const status = await service.status();
      expect(status).toBe(ServiceStatus.ERROR);
    });
  });

  describe('start', () => {
    it('should start the service', async () => {
      (system.startBrewService as jest.Mock).mockReturnValue(true);

      await expect(service.start()).resolves.toBeUndefined();
      expect(system.startBrewService).toHaveBeenCalledWith('postgresql@18');
    });

    it('should throw on failure', async () => {
      (system.startBrewService as jest.Mock).mockReturnValue(false);

      await expect(service.start()).rejects.toThrow(
        'Failed to start PostgreSQL'
      );
    });
  });

  describe('stop', () => {
    it('should stop the service', async () => {
      (system.stopBrewService as jest.Mock).mockReturnValue(true);

      await expect(service.stop()).resolves.toBeUndefined();
      expect(system.stopBrewService).toHaveBeenCalledWith('postgresql@18');
    });

    it('should throw on failure', async () => {
      (system.stopBrewService as jest.Mock).mockReturnValue(false);

      await expect(service.stop()).rejects.toThrow(
        'Failed to stop PostgreSQL'
      );
    });
  });

  describe('isRunning', () => {
    it('should return true when service is running', async () => {
      (system.getBrewServices as jest.Mock).mockReturnValue(
        'postgresql@18 started'
      );

      const isRunning = await service.isRunning();
      expect(isRunning).toBe(true);
    });

    it('should return false when service is stopped', async () => {
      (system.getBrewServices as jest.Mock).mockReturnValue(
        'postgresql@18 none'
      );

      const isRunning = await service.isRunning();
      expect(isRunning).toBe(false);
    });
  });

  describe('restart', () => {
    it('should stop and start the service', async () => {
      (system.stopBrewService as jest.Mock).mockReturnValue(true);
      (system.startBrewService as jest.Mock).mockReturnValue(true);

      await service.restart();

      expect(system.stopBrewService).toHaveBeenCalled();
      expect(system.startBrewService).toHaveBeenCalled();
    });
  });
});
