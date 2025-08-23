# 🎬 React Movie Discovery App

A modern, responsive movie discovery application built with React.js that allows users to search for movies and track trending searches in real-time. The app features a Netflix-style trending section based on actual user search patterns.

![Movie App Demo](/public/hero-page.png)

## ✨ Features

- **🔍 Smart Search**: Debounced search functionality to find movies efficiently
- **📈 Trending Movies**: Dynamic trending section based on user search patterns
- **🎨 Modern UI**: Beautiful, responsive design with Tailwind CSS v4
- **⚡ Fast Performance**: Optimized with Vite for lightning-fast builds
- **📱 Mobile Responsive**: Seamless experience across all devices
- **🗄️ Real-time Database**: Appwrite backend for tracking search metrics
- **🎯 Clean Architecture**: Component-based React structure

## 🚀 Live Demo

[View Live Application](https://trend-engine.vercel.app)

## 🛠️ Tech Stack

- **Frontend**: React 18, JavaScript ES6+
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite
- **Backend**: Appwrite (Database & APIs)
- **External API**: The Movie Database (TMDB)
- **Hosting**: Hostinger

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v16 or higher)
- npm or yarn package manager
- TMDB API key (free registration required)
- Appwrite account and project setup

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nishant-44/Trend-Engine.git
   cd Trend-Engine
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
   VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
   VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
   ```

4. **TMDB API Setup**
   - Visit [The Movie Database](https://www.themoviedb.org/settings/api)
   - If you are living in India use a VPN to access the website
   - Create an account and generate your API key
   - Add the key to your `.env.local` file

5. **Appwrite Setup**
   - Create an account at [Appwrite](https://appwrite.io/)
   - Create a new project
   - Set up a database with a collection named "metrics"
   - Add the following attributes to your collection:
     - `search_term` (String, required, max 1000 chars)
     - `count` (Integer, default: 1)
     - `poster_url` (String, required)
     - `movie_id` (Integer, required)

6. **Start the development server**
   ```bash
   npm run dev
   ```

The application will open at `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── MovieCard.jsx      # Individual movie card component
│   ├── Search.jsx         # Search input with debouncing
│   └── Spinner.jsx        # Loading spinner component
├── appwrite.js            # Appwrite configuration and functions
├── App.jsx                # Main application component
├── main.jsx              # Application entry point
└── index.css             # Global styles and Tailwind imports
```

## 🔧 Key Features Implementation

### Debounced Search
The search functionality uses a debouncing technique to optimize API calls:
- Waits 500ms after user stops typing before making API request
- Prevents excessive API calls and improves performance
- Implements custom debouncing using the `react-use` library

### Trending Algorithm
The trending system works by:
1. Tracking all user searches in Appwrite database
2. Incrementing search count for existing movies
3. Creating new entries for first-time searches
4. Displaying top 5 most searched movies in descending order

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Adaptive grid layout (1-4 columns based on screen size)
- Optimized images with fallback for missing posters

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🔄 API Integration

### TMDB API Endpoints Used:
- **Discover Movies**: `/discover/movie` - Get popular movies
- **Search Movies**: `/search/movie` - Search for specific movies

### Appwrite Database Operations:
- **Create Document**: Store new search terms
- **Update Document**: Increment search count
- **List Documents**: Retrieve trending movies

## 🎨 Styling Approach

The project uses Tailwind CSS v4 with:
- Custom utility classes for gradients and effects
- Google Fonts integration (Franklin Gothic Medium, Arial)
- Dark theme with custom color palette
- Responsive design patterns

## 🚀 Deployment

The app is deployed using Hostinger with the following steps:
1. Run `npm run build` to create production build
2. Upload contents of `dist/` folder to web hosting
3. Configure domain and SSL certificate
4. Ensure environment variables are properly set

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API
- [Appwrite](https://appwrite.io/) for backend services
- [Tailwind CSS](https://tailwindcss.com/) for styling framework
- [React](https://reactjs.org/) team for the amazing framework

## 📞 Contact

Your Name - [Nishant](https://linkedin.com/in/nishant-developer) - business.nishant777@gmail.com

Project Link: [https://github.com/Nishant-444/TrendEngine](https://github.com/Nishant-444/TrendEngine)

---

⭐ Don't forget to give this project a star if you found it helpful!
