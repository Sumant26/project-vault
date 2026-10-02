# Contributing to Project Vault

We welcome contributions! Please follow these steps to keep the codebase clean, robust, and well-tested.

## 🛠️ Development Workflow

1. **Fork and Clone:**
   ```bash
   git clone https://github.com/your-username/project-vault.git
   cd project-vault
   npm install
   ```

2. **Branching:**
   Create a descriptive feature branch:
   ```bash
   git checkout -b feature/awesome-new-view
   ```

3. **Coding Standards:**
   - Use TypeScript strict mode with no implicit `any`.
   - Keep components modular and single-responsibility.
   - Maintain the warm, cozy aesthetic using design tokens defined in `src/styles/variables.css`.

4. **Testing:**
   Ensure all tests pass before opening a PR:
   ```bash
   npm run test
   npm run test:coverage
   ```

5. **Commit Messages:**
   Follow Conventional Commits:
   - `feat: add tablet rotation switcher in viewport mode`
   - `fix: correct iframe sandbox permissions for local storage`
   - `test: add coverage for export modal`
