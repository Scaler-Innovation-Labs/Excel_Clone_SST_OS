# Excel Clone React Project

## 🎯 Project Overview
A lightweight Excel clone built with React.js, designed as a learning project for students to understand React concepts, state management, and collaborative development through GitHub. This project implements basic spreadsheet functionality and provides opportunities for enhancement through structured issues and features.

## 🎓 Learning Objectives
- Understanding React components and state management
- Working with complex user interactions
- Implementing grid-based data structures
- Collaborative development using Git and GitHub
- Writing maintainable and scalable code
- Testing and debugging web applications

## 🚀 Features
### Current Features
- Interactive spreadsheet grid
- Cell selection and editing
- Formula bar
- Column and row headers (A, B, C... and 1, 2, 3...)
- Real-time cell updates

### Planned Features (via Issues)
- Keyboard navigation
- Basic formula support
- Cell styling and formatting
- Copy/paste functionality
- Multiple cell selection
- Data persistence
- CSV import/export
- And more...

## 💻 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

### Installation
1. Clone the repository
```bash
git clone https://github.com/Scaler-Innovation-Labs/Excel_Clone_SST_OS.git
cd excel-clone
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure
```
excel-clone/
├── src/
│   ├── components/
│   │   ├── ExcelClone.js     # Main spreadsheet component
│   │   ├── Toolbar.js        # (to be created)
│   │   └── FormulaBar.js     # (to be created)
│   ├── utils/
│   │   ├── formulas.js       # (to be created)
│   │   └── cellUtils.js      # (to be created)
│   ├── App.js
│   └── index.js
├── public/
├── package.json
└── CONTRIBUTING.md
```

## 🤝 How to Contribute

### For Students
1. Fork the repository
2. Find an issue you want to work on
3. Create a new branch for your feature
```bash
git checkout -b feature/issue-number
```
4. Make your changes
5. Commit and push your changes
```bash
git add .
git commit -m "Descriptive commit message"
git push origin feature/issue-number
```
6. Create a Pull Request

### Issue Labels
- `good-first-issue`: Perfect for beginners
- `enhancement`: New features or improvements
- `bug`: Something isn't working
- `documentation`: Documentation improvements
- `advanced`: Complex features requiring more experience

## 📝 Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed
- Write tests for new features
- Test your changes thoroughly

## 🧪 Testing
```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch
```

## 📚 Available Scripts
```bash
npm start        # Start development server
npm test         # Run tests
npm run build    # Build for production
npm run lint     # Check code style
```

## 🛠️ Built With
- [React](https://reactjs.org/) - Frontend framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Jest](https://jestjs.io/) - Testing framework

## 📊 Project Milestones
1. Basic Spreadsheet Functionality
   - Cell editing
   - Basic navigation
   - Formula bar

2. Data Management
   - Formula support
   - Copy/paste
   - Data validation

3. Advanced Features
   - Multiple sheets
   - Cell formatting
   - Import/export

## 🎯 Learning Resources
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Git Workflow](https://guides.github.com/introduction/flow/)
- [JavaScript MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤔 Common Issues and Solutions
### Cell Updates Not Reflecting
- Ensure you're using the state update function correctly
- Check if the cell coordinates are correct
- Verify event handlers are properly bound

### Formula Parsing Issues
- Check formula syntax
- Verify cell references exist
- Look for circular dependencies

## 🔒 Code of Conduct
Please review our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing to the project.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Acknowledgments
- Inspired by Microsoft Excel and Google Sheets
- Built as an educational project for learning React
- Thanks to all contributors who participate in this learning journey

## 📞 Support
If you need help:
1. Check the documentation
2. Look through existing issues
3. Create a new issue with a detailed description
4. Ask for help in the discussions section

## 🚀 Next Steps
1. Pick an issue to work on
2. Join project discussions
3. Share your progress
4. Help others learn

Happy coding! 🎉
