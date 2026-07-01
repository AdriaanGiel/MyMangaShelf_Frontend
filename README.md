# MyMangaShelf Frontend

A cross-platform mobile application built with React Native and Expo for discovering, organizing, and tracking manga collections. MyMangaShelf allows users to browse manga, manage personal libraries, track reading progress, and save favorite reading locations.

## Features

### 📚 Personal Manga Library

* Create and manage a personalized manga collection
* Organize manga into folders and categories
* Filter collections by custom folders
* Search within your library

### 🔍 Manga Discovery

* Browse available manga titles
* Search manga catalog
* Paginated manga browsing
* Detailed manga information pages

### 📖 Reading Progress Tracking

* Track chapter progression
* Monitor reading status
* View chapter lists and details
* Resume reading from saved progress

### 👤 User Authentication

* User registration
* Secure login/logout
* Persistent authentication using secure storage
* Password recovery functionality

### 📍 Reading Spots

* Save favorite reading locations
* Manage reading spots
* Location-based features using Expo Location and Maps
* Reading marker support

### 🎨 User Experience

* Light and dark theme support
* Responsive mobile interface
* Drawer navigation
* Bottom tab navigation
* Offline storage capabilities

---

## Tech Stack

### Framework

* React Native 0.81
* Expo SDK 54
* React 19

### Navigation

* React Navigation

  * Stack Navigator
  * Drawer Navigator
  * Bottom Tabs

### State Management

* React Context API
* Custom Providers

### Styling

* NativeWind
* Tailwind CSS
* Custom theme system

### Networking

* Axios

### Storage

* Expo Secure Store
* Async Storage

### Additional Libraries

* Expo Maps
* Expo Location
* Expo Camera
* Expo Media Library
* Lucide React Native Icons

---

## Project Structure

```text
MyMangaShelf_Frontend/
│
├── components/
│   ├── AddProviderScreen/
│   ├── DetailScreen/
│   ├── HomeScreen/
│   ├── ReadingSpot/
│   └── global/
│
├── context/
│   ├── AuthProvider.js
│   ├── MediaContext.js
│   └── UserMediaListProvider.js
│
├── helpers/
│   ├── AxiosInstance.js
│   ├── Storage.js
│   └── getColors.js
│
├── resources/
│   ├── MediaResource.js
│   ├── MediaListResource.js
│   └── StandardData.js
│
├── screens/
│   ├── HomeScreen.js
│   ├── ExploreScreen.js
│   ├── DetailScreen.js
│   ├── LoginScreen.js
│   ├── RegisterScreen.js
│   └── Stacks/
│
├── assets/
├── Validators/
├── unit_tests/
│
├── App.js
├── Root.js
└── package.json
```

---

## Application Architecture

### Authentication Flow

The application uses a dedicated authentication provider that:

1. Authenticates users through API endpoints
2. Stores authentication data securely using Expo Secure Store
3. Persists login sessions between app launches
4. Provides global authentication state through React Context

### Data Layer

Resources are separated into dedicated service classes:

* `MediaResource` – Manga catalog operations
* `MediaListResource` – User library management
* `StandardData` – Initial application data

### State Management

Global application state is managed through:

* `AuthContext`
* `ThemeContext`
* `UserMediaProvider`

---

## Getting Started

### Prerequisites

* Node.js 18+
* npm or Bun
* Expo CLI
* Android Studio (Android development)
* Xcode (iOS development on macOS)

### Installation

Clone the repository:

```bash
git clone https://github.com/AdriaanGiel/MyMangaShelf_Frontend.git
cd MyMangaShelf_Frontend
```

Install dependencies:

```bash
npm install
```

or

```bash
bun install
```

---

## Environment Configuration

Create a `.env` file in the root directory and configure the required API values:

```env
API_URL=your_backend_url
```

Update the Axios configuration in:

```text
helpers/AxiosInstance.js
```

to match your backend environment.

---

## Running the Application

Start Expo:

```bash
npm start
```

or

```bash
expo start
```

### Android

```bash
npm run android
```

### iOS

```bash
npm run ios
```

### Web

```bash
npm run web
```

---

## Available Scripts

| Script            | Description                   |
| ----------------- | ----------------------------- |
| `npm start`       | Start Expo development server |
| `npm run android` | Run Android build             |
| `npm run ios`     | Run iOS build                 |
| `npm run web`     | Run web version               |
| `npm test`        | Run tests                     |

---

## Core Screens

### Home

Displays the user's manga collection with filtering and search capabilities.

### Explore

Browse and discover manga available through the API.

### Detail

View manga information, chapters, synopsis, and progression data.

### Reading Spots

Manage saved reading locations and markers.

### Authentication

Login, registration, password recovery, and logout functionality.

---

## Storage Strategy

### Secure Storage

Used for:

* Authentication tokens
* User session information

### Local Storage

Used for:

* Theme preferences
* Folder configuration
* Offline manga list data

---

## Theme Support

The application supports:

* Light mode
* Dark mode
* Automatic system theme detection
* Persistent theme preferences

---

## Testing

Run unit tests:

```bash
npm test
```

Tests are located in:

```text
unit_tests/
```

---

## Future Improvements

* Push notifications
* Manga recommendations
* Social features
* Cloud synchronization
* Enhanced offline support
* Advanced reading analytics

---

## License

This project is licensed under the MIT License unless stated otherwise.

---

## Author

Developed by Adriaan Giel.

If you use or contribute to this project, consider starring the repository and submitting improvements through pull requests.
