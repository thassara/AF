
# Country Information App

## Description
This application allows users to search for countries by name and filter countries by region and language. The data is fetched using Redux Toolkit's RTK Query from the [Rest Countries API](https://restcountries.com/). The frontend of the application is built using React and styled with Tailwind CSS.

## Features
- **Search by Country Name**: Allows users to search for countries by name.
- **Filter by Region**: Provides filtering options for countries based on regions.
- **Filter by Language**: Allows users to filter countries based on spoken languages.
- **Responsive Design**: Tailwind CSS is used for creating a responsive, user-friendly interface.

## APIs Used
- **Rest Countries API**: This API provides detailed information about countries, including country name, population, region, languages spoken, and more.
  - **Endpoint for all countries**: `v3.1/all`
  - **Endpoint for searching by country name**: `v3.1/name/{name}`
  - **Endpoint for filtering by region**: `v3.1/region/{region}`
  - **Endpoint for filtering by language**: `v3.1/lang/{language}`

## Installation

### 1. Clone the repository:
```bash
git clone https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-thassara.git
```

### 2. Navigate to the project folder:
```bash
cd af-2-thassara
```

### 3. Install the dependencies:
```bash
npm install
```

### 4. Run the project locally:
```bash
npm start
```
This will start the development server, and you can view the application at [http://localhost:3000](http://localhost:3000).

## Build Process

To build the application for production:

1. Run the following command:
   ```bash
   npm run build
   ```
2. This will create an optimized build of your app in the `build` directory. You can deploy this folder to any web server.

## Usage

The application provides the following features:
- **Search by country name**: Type the name of a country in the search bar to find matching countries.
- **Filter by region**: Select a region to filter countries by that region.
- **Filter by language**: Choose a language to filter countries where that language is spoken.

## Hosting URL

You can access the live version of the application at: [https://af-pi.vercel.app/allcountry](https://af-pi.vercel.app/allcountry)

## Challenges Faced and Solutions

### 1. Handling API Response and Caching
- **Challenge**: Managing API responses effectively, especially when handling large datasets of countries.
  - **Solution**: Using Redux Toolkit's RTK Query to handle caching and fetching, which improves performance and reduces unnecessary API calls.

### 2. Responsive Design
- **Challenge**: Making the UI responsive across different devices.
  - **Solution**: Tailwind CSS was used to ensure the design adapts well to various screen sizes and devices.

## Tests

To run tests in the project, use:
```bash
npm test
```

## Contribution

If you want to contribute, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a new pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
