# large-grid-vite-react

This project renders a React grid displaying name and age for multiple random users generated with @FakerJS as defined in environment variables. The implementation includes filtering capabilities by name or age.

## Styling Technique Highlights

This project demonstrates advanced styling techniques beyond Tailwind CSS with:

- **Dynamic HSL color generation** - Each cell receives a dark background color based on the user's age, ensuring optimal contrast with light text.
- **Responsive height calculation** - The grid automatically adjusts its maximum height based on viewport dimensions.

## Key improvements in this version:

- Migration to Vite as build tool.
- Creation of a custom Stepper button on the numeric input element to increase/decrease the age of filtered users.
- Complete architecture refactor using React Hooks useContext, useCallback, useMemo, useState, useEffect and useRef.
- Enhanced responsive layout.
- Integrated dark/light theme system.
- Integration with Vercel Analytics
- Improved accessibility

## Technologies used:

- **Rendering:** React + Vite
- **Styling:** Tailwind CSS + Random HSL color generation + Responsive height calculation
- **State management:** Custom hooks
- **Analytics:** Vercel Analytics

## Live demo:

The project is available at https://large-grid-react.vercel.app/.

## Installation

To run the project locally, follow these steps:

1. Clone the repository: `git clone  Installation`
2. Install dependencies: `npm install`
3. Adjust the environment variables in the .env file.
4. Start the development server: `npm run dev`
5. Open your browser and navigate to URL provided by Vite.

## Contributing

Contributions are welcome! Please open an issue if you encounter any problems or have suggestions for improvement.
