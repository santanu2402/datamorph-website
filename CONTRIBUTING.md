# Contributing to DataMorph Website

First off, thank you for considering contributing to DataMorph Website! It's people like you that make DataMorph such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps which reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots and animated GIFs if possible**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and explain which behavior you expected to see instead**
* **Explain why this enhancement would be useful**

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Follow the TypeScript/React styleguide
* Include thoughtfully-worded, well-structured tests
* Document new code
* End all files with a newline

## Development Process

### Setup Development Environment

```bash
# Clone your fork
git clone https://github.com/your-username/datamorph-website.git

# Navigate to directory
cd datamorph-website

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm start
```

### Making Changes

1. Create a new branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "Add some feature"
   ```

3. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Open a Pull Request

### Coding Standards

#### TypeScript/React

* Use functional components with hooks
* Use TypeScript for type safety
* Follow the existing code style
* Use meaningful variable and function names
* Add comments for complex logic
* Keep components small and focused

#### CSS

* Use CSS modules or styled-components
* Follow BEM naming convention
* Use CSS variables for theming
* Ensure responsive design
* Test on multiple browsers

#### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

Example:
```
Add user authentication feature

- Implement login/logout functionality
- Add session management
- Create protected routes
- Update documentation

Fixes #123
```

### Testing

* Write tests for new features
* Ensure all tests pass before submitting PR
* Aim for high test coverage

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Documentation

* Update README.md if needed
* Update relevant documentation in /docs
* Add JSDoc comments for functions
* Update CHANGELOG.md

## Project Structure

```
src/
├── components/     # Reusable components
├── pages/          # Page components
├── services/       # API services
├── context/        # React context
├── hooks/          # Custom hooks
├── utils/          # Utility functions
└── types/          # TypeScript types
```

## Style Guide

### Component Structure

```typescript
import React from 'react';
import './ComponentName.css';

interface ComponentNameProps {
  prop1: string;
  prop2?: number;
}

const ComponentName: React.FC<ComponentNameProps> = ({ prop1, prop2 }) => {
  // Hooks
  const [state, setState] = useState<string>('');

  // Effects
  useEffect(() => {
    // Effect logic
  }, []);

  // Handlers
  const handleClick = () => {
    // Handler logic
  };

  // Render
  return (
    <div className="component-name">
      {/* Component JSX */}
    </div>
  );
};

export default ComponentName;
```

### API Service Structure

```typescript
export const apiFunction = async (param: string): Promise<ReturnType> => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error message');
  }
};
```

## Review Process

1. **Automated Checks**: All PRs must pass automated tests and linting
2. **Code Review**: At least one team member must review and approve
3. **Testing**: Changes must be tested locally
4. **Documentation**: Documentation must be updated if needed

## Community

* Join our discussions on GitHub
* Follow us on LinkedIn
* Star the repository if you find it useful

## Questions?

Feel free to open an issue with your question or contact the team directly through LinkedIn.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to DataMorph! 🚀
