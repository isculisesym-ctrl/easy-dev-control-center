# Easy Dev Control Center 🚀

> Only I need stop all f*cking apps in my mac 😅

A powerful CLI tool to manage your development environment on macOS and Linux. Control PostgreSQL, Node.js, Python, Ollama, Git, and more from a single command.

## Features ✨

- **Service Management**: Start, stop, and restart services with a single command
- **System Inventory**: Map your entire development environment
- **Status Monitoring**: Real-time status of all services
- **Batch Operations**: Control multiple services at once
- **Beautiful UI**: Colored output with spinners and tables
- **Extensible**: Easy to add new services and commands
- **Well-Tested**: Comprehensive test coverage
- **Type-Safe**: Built with TypeScript for reliability

## Installation 📦

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Install from npm

```bash
npm install -g easy-dev-control-center
easy-dev status
```

### Install from source

```bash
git clone https://github.com/ulisesym/easy-dev-control-center.git
cd easy-dev-control-center
npm install
npm run build
npm link
easy-dev status
```

## Quick Start 🏃

```bash
# Check status of all services
easy-dev status

# Start all services
easy-dev start all

# Start specific service
easy-dev start postgres

# Stop all services
easy-dev stop all

# View system inventory
easy-dev map
```

## Commands 📋

### `status`
Display the current status of all registered services.

```bash
easy-dev status
```

**Output:**
```
╔════════════════════════════════════════════════════╗
║         Service Status                            ║
╚════════════════════════════════════════════════════╝

┌─────────────────┬──────────────┬────────────────────┐
│ Service         │ Status       │ Description        │
├─────────────────┼──────────────┼────────────────────┤
│ PostgreSQL      │ ✓ running    │ Database           │
│ Node.js         │ ✓ running    │ JavaScript runtime │
│ Python          │ ✓ running    │ Python env         │
│ Ollama          │ ✗ stopped    │ Local LLM          │
│ Git             │ ✓ running    │ Version control    │
└─────────────────┴──────────────┴────────────────────┘
```

### `start [service|all]`
Start one or all services.

```bash
# Start all services
easy-dev start all

# Start specific service
easy-dev start postgres
easy-dev start ollama
```

### `stop [service|all]`
Stop one or all services.

```bash
# Stop all services
easy-dev stop all

# Stop specific service
easy-dev stop postgres
```

### `map`
Display a complete inventory of your development environment.

```bash
easy-dev map
```

Shows:
- System information (OS, arch, Node version)
- Installed development tools
- Global npm packages
- Installed Python packages

## Supported Services 🛠

- **PostgreSQL** - Relational database
- **Node.js** - JavaScript runtime
- **Python** - Python environment
- **Ollama** - Local LLM runtime
- **Git** - Version control system

More services coming soon!

## Architecture 🏗

This project follows enterprise-grade architecture patterns:

```
src/
├── bin/              # CLI entrypoint
├── core/             # Core abstractions
│   ├── BaseService.ts
│   ├── BaseCommand.ts
│   └── ServiceRegistry.ts
├── services/         # Service implementations
├── commands/         # Command implementations
├── utils/            # Utilities (logger, system)
└── types/            # TypeScript interfaces
```

### Key Design Patterns

1. **Service Layer Pattern**: Each service inherits from `BaseService` and implements `IService`
2. **Registry Pattern**: `ServiceRegistry` manages all services
3. **Command Pattern**: Each CLI command implements `ICommand`
4. **Singleton**: Registry uses singleton for global access
5. **Abstract Base Classes**: Enforce consistency across services and commands

## Contributing 🤝

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Quick Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests
5. Commit (`git commit -am 'Add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Adding a New Service

1. Create a new file in `src/services/YourService.ts`
2. Extend `BaseService`
3. Implement required methods
4. Register in `src/bin/cli.ts`
5. Add tests in `src/services/__tests__/YourService.test.ts`

Example:

```typescript
import { BaseService } from '../core/BaseService';
import { ServiceStatus } from '../types';

export class MyService extends BaseService {
  name = 'myservice';
  displayName = 'My Service';
  description = 'Description of my service';

  async status(): Promise<ServiceStatus> {
    // Implementation
  }

  async start(): Promise<void> {
    // Implementation
  }

  async stop(): Promise<void> {
    // Implementation
  }
}
```

## Development 🔨

### Setup

```bash
git clone https://github.com/ulisesym/easy-dev-control-center.git
cd easy-dev-control-center
npm install
```

### Scripts

```bash
# Development
npm run dev              # Run CLI with ts-node
npm run build           # Compile TypeScript
npm run start           # Run compiled version

# Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix linting issues
npm run format          # Format with Prettier
npm run type-check      # Type checking

# Testing
npm test                # Run tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

### Running in Development

```bash
# Using ts-node
npm run dev status

# After building
npm run build
npm run start status
```

## Testing 🧪

This project uses Jest for testing.

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

## Code Quality ✅

- **TypeScript**: Full type safety
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Jest**: Testing framework
- **Pre-commit checks**: Type checking, linting

## License 📄

MIT License - see [LICENSE](./LICENSE) file for details

## Troubleshooting 🆘

### Command not found

If `easy-dev` is not found after installation:

```bash
npm list -g easy-dev-control-center
npm link easy-dev-control-center
```

### Permission denied

Some services may require sudo:

```bash
sudo easy-dev start postgres
```

### Service not found

Check available services:

```bash
easy-dev status
```

## Roadmap 🗺

- [ ] Interactive menu UI (fzf-based)
- [ ] Service configuration file support
- [ ] Docker container management
- [ ] Redis service
- [ ] MongoDB service
- [ ] MySQL/MariaDB service
- [ ] Service health checks
- [ ] Webhooks for service state changes
- [ ] Web dashboard
- [ ] Linux support improvements

## Community 👥

- Found a bug? [Open an issue](https://github.com/ulisesym/easy-dev-control-center/issues)
- Have a feature idea? [Start a discussion](https://github.com/ulisesym/easy-dev-control-center/discussions)
- Want to contribute? [See CONTRIBUTING.md](./CONTRIBUTING.md)

## Support ❤️

If this tool helps you, please consider:

- ⭐ Starring the repository
- 📢 Sharing with other developers
- 🐛 Reporting issues
- 💡 Suggesting improvements

---

Made with ❤️ by the Easy Dev community
