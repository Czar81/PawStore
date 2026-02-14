# PawStore

Online pet products store. Web application built with React and Vite that allows you to explore and buy quality products for your pets.

## Features

- Product catalog for dogs and cats
- Product search
- Detailed product view
- Responsive design
- Performance optimized with Vite

## Prerequisites

- Node.js 16+
- npm or yarn

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/Czar81/PawStore.git
cd paw-store
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Starts development server
- `npm run build` - Builds for production
- `npm run preview` - Previews production build
- `npm run lint` - Runs linter to check code

## Project Structure

```
src/
├── components/        # Reusable components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   ├── SearchBar.jsx
│   ├── spinner.jsx
│   └── NotFound.jsx
├── pages/            # Main pages
│   ├── HomePage.jsx
│   ├── CatalogPage.jsx
│   └── ProductPage.jsx
├── data/             # Static data
│   └── products.json
├── styles/           # CSS styles
├── app.jsx
└── main.jsx
```

## Usage

- **Home Page**: Access the welcome page
- **Catalog**: Explore all available products
- **Search**: Use the search bar to filter products
- **Product**: Click on a card to view complete details

## Technologies

- React 19.2
- Vite 7.2
- CSS3
- JavaScript ES6+

## License

This project is open source and available under the MIT License.
