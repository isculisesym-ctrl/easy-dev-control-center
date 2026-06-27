# easy-dev-control-center 🎮

> **Only I need stop all f*cking apps in my mac 😅**
>
> *Stop managing your dev environment like it's 2015. Take control like a boss.*

---

## What's This? 🚀

Tired of opening Activity Monitor to kill PostgreSQL? Tired of juggling `brew services` commands? 

**`easy-dev` is your command center.** One command. Total control.

```bash
easy-dev stop all     # ☠️ NUKE EVERYTHING
easy-dev start all    # 🔥 RESURRECT ALL
easy-dev status       # 👀 WHAT'S RUNNING?
easy-dev map          # 🗺️  WHAT DO I HAVE?
```

That's it. That's the power.

---

## The Problem 😤

```
You:    "PostgreSQL, why are you eating 2GB RAM?"
PG:     *silence*
You:    *opens Activity Monitor, finds 47 processes running*
You:    "I'm just running a blog..."
You:    *clicks kill, refreshes, kill again*
You:    "This should be ONE COMMAND."
```

**It should be.**

---

## The Solution ✨

```bash
npm install -g easy-dev-control-center
easy-dev stop all
```

Boom. 🎯 Done.

---

## Features (Real Ones) 💪

✅ **Start/Stop Services** - PostgreSQL, Node, Python, Ollama, Git  
✅ **Batch Operations** - Control everything at once or pick one  
✅ **System Inventory** - See exactly what's installed (versions + all)  
✅ **Beautiful Output** - Colored tables, spinners, not ugly CLI junk  
✅ **Status Dashboard** - Real-time service status overview  
✅ **Error Handling** - Tells you WHY something failed  
✅ **Type Safe** - Written in TypeScript (no surprises)  
✅ **Extensible** - Add your own services (we made it easy)  

---

## Installation 📦

### The Fast Way
```bash
npm install -g easy-dev-control-center
easy-dev status
```

### From Source (For Developers)
```bash
git clone https://github.com/ulisesym/easy-dev-control-center
cd easy-dev-control-center
npm install
npm run build
npm link
easy-dev status
```

---

## Usage 🎯

### See What's Running
```bash
easy-dev status
```

Output:
```
╔════════════════════════════════════════════════════════╗
║              Service Status                           ║
╚════════════════════════════════════════════════════════╝

┌────────────┬───────────┬─────────────────────────────────┐
│ Service    │ Status    │ Description                     │
├────────────┼───────────┼─────────────────────────────────┤
│ PostgreSQL │ ✓ running │ Open-source relational database │
│ Node.js    │ ✓ running │ JavaScript runtime environment  │
│ Python     │ ✓ running │ Python programming language     │
│ Ollama     │ ✗ stopped │ Local LLM runtime               │
│ Git        │ ✓ running │ Version control system          │
└────────────┴───────────┴─────────────────────────────────┘
```

### Start Everything
```bash
easy-dev start all
```

### Kill Everything
```bash
easy-dev stop all
```

### Target Specific Service
```bash
easy-dev stop postgres      # Just PostgreSQL
easy-dev start ollama       # Just Ollama
```

### System Inventory
```bash
easy-dev map
```

Shows:
- 🖥️ System info (OS, architecture, Node version)
- 📦 Installed tools (Git, Docker, Python, etc.)
- 📚 Global npm packages
- 🐍 Python packages

---

## Why This is Different 🏆

| Feature | Activity Monitor | `brew services` | **easy-dev** |
|---------|-----------------|-----------------|-------------|
| See all services | ❌ Messy | ⚠️ Terminal only | ✅ Beautiful table |
| Start/stop multiple | ❌ Click each | ⚠️ One at a time | ✅ `all` command |
| Check versions | ❌ No | ❌ No | ✅ Full inventory |
| Error messages | ❌ Cryptic | ⚠️ Sometimes | ✅ Clear & helpful |
| Fast | ❌ Slow | ✅ Fast | ✅ Fastest |
| Command line | ❌ No | ✅ Yes | ✅ Yes + prettier |

---

## Architecture 🏗️

Built with enterprise patterns, not scripts:

```
Service Layer      Abstract base, interface-driven
  ↓
Service Registry   Singleton pattern, centralized
  ↓
Commands           Each command is a class
  ↓
CLI                Beautiful output layer
```

**Translation:** Boring but solid. Like a 401k. But for code.

---

## For Developers 👨‍💻

### Setup
```bash
git clone https://github.com/ulisesym/easy-dev-control-center
cd easy-dev-control-center
npm install
npm run dev status
```

### Tests
```bash
npm test           # Run tests
npm test:watch     # Watch mode
npm test:coverage  # Coverage report
```

### Linting
```bash
npm run lint       # Check
npm run lint:fix   # Fix
npm run format     # Format with Prettier
```

### Building
```bash
npm run build      # TypeScript → JavaScript
npm run type-check # Type safety
npm start          # Run compiled version
```

---

## Want to Add a Service? 💡

Easy. Dead simple.

1. **Create file** `src/services/YourService.ts`
2. **Extend BaseService**
3. **Implement 3 methods** (status, start, stop)
4. **Register in CLI**
5. **Submit PR** ✅

```typescript
import { BaseService } from '../core/BaseService';
import { ServiceStatus } from '../types';

export class RedisService extends BaseService {
  name = 'redis';
  displayName = 'Redis';
  description = 'In-memory data store';

  async status(): Promise<ServiceStatus> {
    // Your logic here
  }

  async start(): Promise<void> {
    // Your logic here
  }

  async stop(): Promise<void> {
    // Your logic here
  }
}
```

See? No magic. Just code.

---

## What's Included 📋

- ✅ Full TypeScript source code
- ✅ Jest tests (14 passing)
- ✅ ESLint + Prettier configured
- ✅ GitHub Actions CI/CD
- ✅ Comprehensive documentation
- ✅ MIT License (copy freely)

---

## Roadmap 🗺️

**Now:**
- ✅ PostgreSQL, Node, Python, Ollama, Git
- ✅ Start/stop/status/map commands
- ✅ Beautiful terminal output

**Soon:**
- 🔜 Redis service
- 🔜 MongoDB service
- 🔜 Docker container management
- 🔜 Configuration file support
- 🔜 Health checks
- 🔜 Interactive UI (fzf-based)

**Future:**
- 🎯 Web dashboard
- 🎯 Webhooks for service events
- 🎯 Metrics & analytics
- 🎯 Multi-user support

---

## FAQ ❓

**Q: Will this break my system?**  
A: No. We use standard `brew services` and system commands. If something's wrong, we tell you exactly what it is.

**Q: Can I use this on Linux?**  
A: Not yet, but it's built for it. Help us make it work? (See CONTRIBUTING)

**Q: Is this production-ready?**  
A: Yes. 14 tests passing. Type-safe. ESLint clean. Ship it.

**Q: Can I add my own services?**  
A: YES. That's the whole point. It's extensible on purpose.

**Q: Do you collect data?**  
A: Nope. Open source. Local only. Your business stays your business.

---

## Real Talk 💬

This started because one person was tired of the same problem every day.

Now it's a tool that:
- Works perfectly
- Handles errors gracefully  
- Looks beautiful
- Runs lightning fast
- Is easy to extend
- Has zero dependencies on proprietary stuff

That's not just a CLI tool. That's a **statement**.

---

## Support 🤝

- 🐛 Found a bug? [Open an issue](https://github.com/ulisesym/easy-dev-control-center/issues)
- 💡 Got an idea? [Start a discussion](https://github.com/ulisesym/easy-dev-control-center/discussions)
- 🔧 Want to contribute? [See CONTRIBUTING.md](./CONTRIBUTING.md)
- ⭐ Like it? Star the repo. It helps.

---

## Contributing 🎯

See [CONTRIBUTING.md](./CONTRIBUTING.md) for:
- How to add services
- Code style guide
- Testing requirements
- Commit message format
- PR process

**TL;DR:** Make it clean, test it, document it, submit it. Done.

---

## License 📄

MIT. Use it. Fork it. Build on it. Make money with it. IDC.

See [LICENSE](./LICENSE) for the legal stuff.

---

## Made With ❤️

By developers, for developers.

No corporate sponsors. No tracking. No BS.

Just code that works.

---

## Next Steps 🚀

```bash
npm install -g easy-dev-control-center
easy-dev status

# Then bookmark this. You'll use it daily.
```

---

**Stop managing. Start controlling.** 🎮

*easy-dev: Your dev environment, actually under control.*

---

### One More Thing... 

Try this:
```bash
easy-dev stop all
# Everything dies
# Silence. Peace. Your Mac, finally at rest.
# You're welcome.
```
