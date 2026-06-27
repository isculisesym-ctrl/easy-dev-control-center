# Contributing to Easy Dev Control Center 🤝

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful and constructive. We're building this for the community.

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Basic knowledge of TypeScript
- Familiarity with the project structure

### Setup Development Environment

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/easy-dev-control-center.git
cd easy-dev-control-center

# Install dependencies
npm install

# Build project
npm run build

# Run tests
npm test

# Run linter
npm run lint
```

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `test/` - Tests
- `refactor/` - Refactoring

### 2. Make Changes

Follow these practices:

- **Write type-safe code**: Always use TypeScript types
- **Follow patterns**: Use existing patterns (BaseService, BaseCommand, etc.)
- **Add tests**: Every feature should have tests (>80% coverage)
- **Document code**: Add JSDoc comments for public APIs
- **Format code**: Run `npm run format` before committing

### 3. Commit Guidelines

```bash
# Good
git commit -m "feat: add Redis service support"
git commit -m "fix: handle PostgreSQL service errors gracefully"
git commit -m "docs: update README with new features"
git commit -m "test: add tests for MapCommand"

# Avoid
git commit -m "updates"
git commit -m "fix stuff"
```

Use conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `test:` - Tests
- `refactor:` - Code refactoring
- `style:` - Code style changes
- `chore:` - Build, dependencies, etc.

### 4. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then open a PR on GitHub with:
- Clear title describing what changed
- Description of why the change was needed
- Reference to any related issues
- Screenshots if UI-related

## Adding a New Service

New services are the most common contribution. Here's the process:

### 1. Create Service File

```typescript
// src/services/MyServiceService.ts
import { BaseService } from '../core/BaseService';
import { ServiceStatus } from '../types';

export class MyServiceService extends BaseService {
  name = 'myservice';
  displayName = 'My Service';
  description = 'Description of the service';

  async status(): Promise<ServiceStatus> {
    // Check if service is running
    // Return ServiceStatus.RUNNING, STOPPED, or ERROR
  }

  async start(): Promise<void> {
    // Start the service
  }

  async stop(): Promise<void> {
    // Stop the service
  }

  async getLogs(): Promise<string> {
    // Optional: return service logs
    return '';
  }
}
```

### 2. Add Tests

```typescript
// src/services/__tests__/MyServiceService.test.ts
import { MyServiceService } from '../MyServiceService';
import { ServiceStatus } from '../../types';

describe('MyServiceService', () => {
  let service: MyServiceService;

  beforeEach(() => {
    service = new MyServiceService();
  });

  describe('status', () => {
    it('should return RUNNING when service is running', async () => {
      // Mock implementation
      const status = await service.status();
      // Assert status
    });
  });

  describe('start', () => {
    it('should start the service', async () => {
      await service.start();
      const status = await service.status();
      expect(status).toBe(ServiceStatus.RUNNING);
    });
  });
});
```

### 3. Register in CLI

```typescript
// src/bin/cli.ts
import { MyServiceService } from '../services/MyServiceService';

// In main():
registry.register(new MyServiceService());
```

### 4. Update README

Add your service to the "Supported Services" section in README.md.

## Adding a New Command

Commands are CLI operations. Process:

### 1. Create Command File

```typescript
// src/commands/MyCommand.ts
import { BaseCommand } from '../core/BaseCommand';

export class MyCommand extends BaseCommand {
  name = 'mycommand';
  description = 'Do something amazing';

  async execute(...args: string[]): Promise<void> {
    // Implementation
    this.logger.success('Done!');
  }
}
```

### 2. Register in CLI

```typescript
// src/bin/cli.ts
import { MyCommand } from '../commands/MyCommand';

const commands = {
  // ...
  mycommand: new MyCommand(),
};
```

### 3. Add to Help Text

The help text is auto-generated from command descriptions.

## Testing Requirements

- **Coverage**: Aim for >80% code coverage
- **Unit tests**: Test individual functions
- **Integration tests**: Test commands with services
- **Mocking**: Mock system calls in tests

```bash
# Run coverage report
npm run test:coverage

# Watch mode (useful during development)
npm run test:watch
```

## Code Style Guide

### TypeScript

```typescript
// ✅ Good
export async function statusService(): Promise<ServiceStatus> {
  const isRunning = await checkProcess();
  return isRunning ? ServiceStatus.RUNNING : ServiceStatus.STOPPED;
}

// ❌ Avoid
export async function statusService() {
  return await checkProcess() ? 'running' : 'stopped';
}
```

### Naming Conventions

- Classes: `PascalCase` (e.g., `PostgresService`)
- Functions: `camelCase` (e.g., `getStatus`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRIES`)
- Private members: `_privateVar`

### Documentation

Add JSDoc for public APIs:

```typescript
/**
 * Check if a service is running
 * @param serviceName - Name of the service
 * @returns True if service is running
 */
export async function isServiceRunning(serviceName: string): Promise<boolean> {
  // Implementation
}
```

## Before Submitting

- [ ] Code builds without errors (`npm run build`)
- [ ] All tests pass (`npm test`)
- [ ] Code is formatted (`npm run format`)
- [ ] No linting errors (`npm run lint`)
- [ ] TypeScript is strict (`npm run type-check`)
- [ ] Test coverage is >80%
- [ ] README is updated if needed
- [ ] Commit messages follow convention

## Pull Request Process

1. Update README/docs if adding features
2. Ensure CI/CD passes (GitHub Actions)
3. Request review from maintainers
4. Address feedback
5. Squash commits before merge if requested

## Questions or Need Help?

- 💬 Open a discussion on GitHub
- 🐛 Check existing issues
- 📖 Read documentation
- 👥 Ask in community forums

## Recognition

Contributors are recognized in:
- README.md contributors section
- Release notes
- GitHub's contributor page

---

Thank you for making Easy Dev Control Center better! 🚀
