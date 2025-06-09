# 🌟 Terminal Portfolio

![Terminal Portfolio Preview](https://via.placeholder.com/800x400.png?text=Terminal+Portfolio) <!-- Replace with an actual project screenshot -->

Welcome to **Terminal Portfolio**! 🚀 This is an interactive portfolio designed as a command-line terminal, allowing you to explore my projects, skills, and contact details in a unique and engaging way. Inspired by Linux terminal environments, this project offers an immersive experience for both technical and non-technical users.

## 📖 Description

**Terminal Portfolio** is a web application that simulates a command-line interface to present a professional portfolio. Users can navigate through sections like projects, skills, and contact information using terminal-style commands. It includes features like command autocompletion, customizable themes, animations, and a secure contact form with CAPTCHA verification.

The project is designed to be **visually appealing**, **accessible**, and **responsive**, with support for mobile devices and optional sound effects to enhance the experience.

## 🛠 Technologies Used

- **Frontend**: React ⚛️, TypeScript 📜
- **Libraries**:
  - **Lucide-React**: Modern, customizable icons 🎨
  - **EmailJS**: Email sending for the contact form 📧
- **Styling**: Tailwind CSS (implied from classes like `bg-terminal`, `text-terminal-accent`) 🎨
- **Other**:
  - React Context for theme management (`ThemeContext`) 🌙
  - Custom hooks (`useSound`, `useTheme`) 🔧
  - Animations with `TypingAnimation` and CSS transitions ✨
- **Tools**: Vite (likely, given modern React project standards) ⚡

## ✨ Key Features

- **Terminal Interface**: Navigate using commands like `help`, `projects`, `skills`, `whoami`, `contact`, `theme [name]`, `clear`, `logout`, and more. 🖥️
- **Project Portfolio**: Displays projects with images, descriptions, technologies used, and links to GitHub and live demos. 📂
- **Skills Section**: Lists technical skills in a clear format. 📚
- **Contact Form**: Send messages with CAPTCHA verification for added security. 📧
- **Customizable Themes**: Switch between themes (`matrix`, `amber`, `blue`, `white`) using the `theme [name]` command. 🌈
- **Autocompletion and Navigation**: Use the `Tab` key for command autocompletion and `↑/↓` arrows to navigate command history. ⌨️
- **Mobile Support**: Includes a virtual keyboard for mobile devices. 📱
- **Sound Effects**: Enable/disable sounds for keypresses and commands (optional). 🔊
- **Accessibility**: Supports `aria-labels`, `aria-live`, and auto-focus for an inclusive experience. ♿

## 🚀 Installation and Usage

### Prerequisites
- **Node.js** (version 16 or higher) 🟢
- **npm** or **yarn** 📦

### Instructions
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/terminal-portfolio.git
   cd terminal-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up EmailJS** (for the contact form):
   - Sign up at [EmailJS](https://www.emailjs.com/) and obtain your credentials (`Service ID`, `Template ID`, `Public Key`).
   - Update the constants in the `Contact.tsx` component with your credentials.

4. **Start the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open the application**:
   - Open your browser at `http://localhost:5173` (or the port configured by Vite).

6. **Explore the terminal**:
   - Type `help` to see available commands.
   - Use commands like `projects` to view projects or `contact` to send a message.

### Available Commands
| Command            | Description                              | Example                |
|--------------------|------------------------------------------|------------------------|
| `help`            | Shows the list of available commands     | `help`                |
| `projects` / `ls` | Lists all projects                       | `projects`            |
| `skills`          | Displays technical skills                | `skills`              |
| `contact`         | Shows the contact form                   | `contact`             |
| `whoami`          | Information about the author             | `whoami`              |
| `history`         | Shows command history                    | `history`             |
| `theme [name]`    | Switches to a specific theme             | `theme matrix`        |
| `man [project]`   | Shows detailed project information       | `man project-id`      |
| `clear` / `cls`   | Clears the terminal screen               | `clear`               |
| `logout` / `exit` | Simulates logging out                    | `logout`              |

## 📂 Project Structure

```
terminal-portfolio/
├── src/
│   ├── components/
│   │   ├── Terminal.tsx          # Main terminal interface
│   │   ├── CommandProcessor.tsx  # Command processing logic
│   │   ├── Projects.tsx         # Projects section
│   │   ├── Contact.tsx          # Contact form
│   │   ├── Help.tsx             # List of available commands
│   │   ├── ...                  # Other components (Skills, WhoAmI, etc.)
│   ├── contexts/
│   │   ├── ThemeContext.tsx     # Theme management
│   ├── hooks/
│   │   ├── useSound.ts          # Sound effects management
│   ├── data/
│   │   ├── portfolioData.ts     # Static data (projects, skills)
│   ├── App.tsx                  # Main component
│   ├── index.css                # Global styles
├── public/                      # Static assets
├── package.json                 # Dependencies and scripts
├── README.md                    # Project documentation
```

## 🖼️ Screenshots

| Terminal Interface | Projects Section |
|--------------------|------------------|
| ![Terminal](https://via.placeholder.com/400x300.png?text=Terminal) | ![Projects](https://via.placeholder.com/400x300.png?text=Projects) |

> **Note**: Replace placeholder images with actual project screenshots.

## 🤝 Contributing

Contributions are welcome! 🙌 To contribute to the project, follow these steps:
1. Fork the repository.
2. Create a branch for your feature (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push your changes (`git push origin feature/new-feature`).
5. Open a Pull Request.

Please ensure you follow the style guidelines and test your changes before submitting.

## 📧 Contact

- **Email**: hello@portfolio.dev 📩
- **GitHub**: [github.com/your-username](https://github.com/your-username) 😺
- **LinkedIn**: [linkedin.com/in/your-username](https://linkedin.com/in/your-username) 💼

If you have questions or want to collaborate, use the contact form in the app (`contact`) or send an email directly.

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

⭐ **If you like this project, please give it a star on GitHub!** ⭐
