# SwipeFlix

SwipeFlix is a modern web app for discovering movies by swiping, inspired by Tinder. Like or dislike movies, track your preferences, and view analytics of your favorite genres.

## Features

- **Swipe Deck:** Swipe right to like, left to dislike movies.
- **Genre Analytics:** Dashboard with charts showing your favorite genres.
- **Movie Collection:** View all your liked movies with details.
- **Reset:** Clear your preferences and start over anytime.
- **Dark/Light Mode:** Toggle between dark and light themes.
- **Responsive:** Works great on desktop and mobile.

## Tech Stack

- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Chart.js](https://www.chartjs.org/) + [react-chartjs-2](https://react-chartjs-2.js.org/)
- [lucide-react](https://lucide.dev/) icons

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/swipeflix.git
   cd swipeflix
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. **Open in your browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

### Build for Production

```sh
npm run build
# or
yarn build
```

The output will be in the `dist` folder.

### Linting

```sh
npm run lint
# or
yarn lint
```

## Project Structure

```
src/
  components/    # Reusable UI components
  context/       # React context for movie state
  hooks/         # Custom React hooks
  pages/         # Page components (routes)
  types/         # TypeScript types
  utils/         # Utility functions and sample data
  index.css      # Tailwind and global styles
  App.tsx        # Main app component
```

## Customization

- **Add More Movies:** Edit `src/utils/movieData.ts` to add or modify movie data.
- **Change Theme Colors:** Edit `tailwind.config.js` for custom color palettes.

## License

MIT

---

**Enjoy discovering your next favorite movie with SwipeFlix!**
