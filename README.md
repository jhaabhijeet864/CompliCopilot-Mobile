# CompliCopilot Mobile

A React Native mobile application for receipt capture and compliance management. This app allows users to capture receipts using their device camera, process them for data extraction, and manage their expense records.

## 🚀 Features

- **Receipt Capture**: Take photos of receipts using the device camera
- **Data Extraction**: AI-powered receipt data processing
- **User Authentication**: Secure login and signup with social options
- **Receipt Management**: View, edit, and organize processed receipts
- **Expense Tracking**: Monitor spending patterns and totals
- **Modern UI**: Clean, intuitive interface with consistent design system

## 🏗️ Project Structure

```
├── android/                 # Android native code
├── ios/                    # iOS native code
├── src/
│   ├── assets/            # Static assets (fonts, images)
│   ├── components/        # Reusable UI components
│   │   ├── common/        # Basic components (Button, Card, TextInput)
│   │   └── layout/        # Layout components (Header, ScreenWrapper)
│   ├── features/          # Feature-specific code
│   │   ├── auth/          # Authentication feature
│   │   │   ├── screens/   # Login and Signup screens
│   │   │   └── components/# Auth-specific components
│   │   └── capture/       # Receipt capture feature
│   │       ├── screens/   # Capture, Processing, Results screens
│   │       ├── components/# Camera and capture components
│   │       └── hooks/     # Custom hooks (useCameraPermission)
│   ├── navigation/        # Navigation configuration
│   ├── services/          # API and external services
│   ├── store/             # State management (Zustand)
│   ├── theme/             # Design system (colors, typography)
│   └── utils/             # Utility functions
├── .eslintrc.js           # ESLint configuration
├── package.json           # Dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## 🛠️ Tech Stack

- **React Native**: Cross-platform mobile development
- **TypeScript**: Type-safe JavaScript
- **Zustand**: Lightweight state management
- **React Navigation**: Navigation between screens
- **Axios**: HTTP client for API calls
- **ESLint**: Code quality and consistency

## 📱 Screens

### Authentication
- **Login Screen**: Email/password login with social options
- **Signup Screen**: User registration with form validation

### Receipt Management
- **Capture Screen**: Camera interface for receipt photos
- **Processing Screen**: Real-time processing status and progress
- **Results Screen**: View and manage processed receipts

## 🎨 Design System

The app uses a comprehensive design system with:

- **Color Palette**: Primary, secondary, and semantic colors
- **Typography**: Consistent font sizes, weights, and line heights
- **Components**: Reusable UI components with variants and states
- **Spacing**: Consistent margins, padding, and layout spacing

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/complicopilot-mobile.git
cd complicopilot-mobile
```

2. Install dependencies:
```bash
npm install
```

3. Install iOS dependencies (macOS only):
```bash
cd ios && pod install && cd ..
```

### Running the App

#### Android
```bash
npm run android
```

#### iOS
```bash
npm run ios
```

#### Metro Bundler
```bash
npm start
```

## 📱 Development

### Code Style

The project uses ESLint for code quality. Run the linter:

```bash
npm run lint
```

### TypeScript

TypeScript is configured for type safety. The project includes:

- Strict type checking
- React Native specific types
- Custom type definitions for components and APIs

### State Management

Zustand is used for state management with:

- User authentication state
- Receipt data management
- Persistent storage with AsyncStorage

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=https://api.complicopilot.com
```

### API Configuration

The app is configured to work with a backend API. Update the base URL in `src/services/api.ts` for your environment.

## 📦 Dependencies

### Core Dependencies
- `react`: 18.2.0
- `react-native`: 0.72.6
- `@react-navigation/native`: ^6.1.9
- `zustand`: ^4.4.1
- `axios`: ^1.5.0

### Development Dependencies
- `typescript`: 4.8.4
- `eslint`: ^8.19.0
- `@types/react`: ^18.0.24

## 🚀 Deployment

### Android

1. Build the release APK:
```bash
cd android
./gradlew assembleRelease
```

2. The APK will be generated in `android/app/build/outputs/apk/release/`

### iOS

1. Open the project in Xcode
2. Configure signing and capabilities
3. Build and archive for App Store distribution

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation

## 🔮 Roadmap

- [ ] Receipt OCR and data extraction
- [ ] Expense categorization and reporting
- [ ] Cloud sync and backup
- [ ] Multi-currency support
- [ ] Receipt sharing and collaboration
- [ ] Advanced analytics and insights

---

Built with ❤️ using React Native 