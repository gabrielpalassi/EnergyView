# EnergyView

[EnergyView](https://energyview.vercel.app/) is a cutting-edge research and development initiative in the Digital Twin domain, aimed at building a robust, distributed system for real-time energy monitoring and analysis.

This repository houses the front-end component of the project.

<p>
  <img src="./images/desktop-light.png" height=300>
  <img src="./images/mobile-light.png" height=300>
</p>

<p>
  <img src="./images/desktop-dark.png" height=300>
  <img src="./images/mobile-dark.png" height=300>
</p>

The platform captures granular consumption and demand data from the Software Laboratory of the Electrical Engineering Building at Poli-USP through a network of IoT devices. This data is then processed and transformed into intuitive dashboards that enable detailed analysis of energy usage patterns.

## Features

- Real-time energy monitoring
- Intuitive dashboards for data visualization
- Detailed analysis of energy usage patterns
- Responsive design

## Running

### Requirements

- [Bun](https://bun.sh/) 1.4.4 or newer (runtime, package manager, and formatter)

### How to run

1. Clone the repository;
2. Open a terminal and _cd_ into the repository's directory;
3. Run `bun install` to install dependencies and initialize Husky's Git hooks;
4. Run `bun run dev` to serve the app.

Commit `bun.lock` when dependencies change. For reproducible installs in CI, use
`bun install --frozen-lockfile`. Run `bun run build` to type check with Bun and create
a production build with Vite.

`bunfig.toml` configures package scripts to use the Bun runtime, including Vite
and ESLint. A separate Node.js installation is not required.

## Code Quality

To ensure code quality and consistency, the following tools are included:

- **Type checking**: Use Bun's built-in type checker for both TypeScript projects.

  ```bash
  bun run typecheck
  ```

  The `--no-script` flag selects Bun's type checker instead of the project's
  `check` script. The TypeScript package remains installed for ESLint's TypeScript
  tooling.

- **Formatting**: Use Bun's built-in formatter, configured in `bunfig.toml`, to format code and sort Tailwind CSS classes.

  ```bash
  bun run format
  ```

  To check formatting without modifying files, run `bun fmt --check`.

- **Linting**: Employ ESLint to identify and address code quality issues.

  ```bash
  bun run lint
  ```

- **Combined checks**: Run type checking, linting, and formatting in one step.

  ```bash
  bun run check
  ```

  We use [Husky](https://typicode.github.io/husky/#/) to enforce code quality. The _check_ script runs before each commit to type check with Bun, apply ESLint fixes, then format with `bun fmt`. The commit will only proceed if all three commands succeed. Review and stage any resulting changes before committing.

## Contributing

We welcome contributions from the community! To get started, please follow these guidelines:

### Commit Message Guidelines

Please ensure your commit messages adhere to the following format:

```
<type>(<scope>): <subject>
```

#### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

#### Scope

The scope should be the name of the module affected (as perceived by the person reading the changelog generated from commit messages). It could also be something like the feature worked on, etc.

#### Subject

The subject contains a succinct description of the change:

- Use the imperative, present tense: "change" not "changed" nor "changes"
- Do not capitalize the first letter
- Do not end the subject with a period

### Pull Request Process

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'feat(scope): add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the GPL-3 License. See the [LICENSE](./LICENSE) file for more details.
