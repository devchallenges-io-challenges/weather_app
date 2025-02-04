import { useState, useEffect } from "react";
import "../CSS/OtherCities.css";

export default function OtherCities({ unit, getWeatherIcon }) {
    const [cities] = useState(["Copenhagen", "Los Angeles", "Paris"]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [weatherData, setWeatherData] = useState({});

    const apiKey = "d364742c2d8b7f2f0c576a34aeaca478";

    const capitalizeFirstLetter = (text) => {
        if (!text) return ""; // Handle empty or undefined text
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    const getCountryName = (code) => {
        const countryNames = {
            US: "United States",
            CA: "Canada",
            GB: "United Kingdom",
            FR: "France",
            DE: "Germany",
            ES: "Spain",
            IT: "Italy",
            AU: "Australia",
            IN: "India",
            CN: "China",
            JP: "Japan",
            BR: "Brazil",
            RU: "Russia",
            MX: "Mexico",
            ZA: "South Africa",
            KR: "South Korea",
            AR: "Argentina",
            CL: "Chile",
            CO: "Colombia",
            NL: "Netherlands",
            BE: "Belgium",
            CH: "Switzerland",
            SE: "Sweden",
            NO: "Norway",
            DK: "Denmark",
            FI: "Finland",
            PL: "Poland",
            CZ: "Czech Republic",
            AT: "Austria",
            PT: "Portugal",
            GR: "Greece",
            TR: "Turkey",
            AE: "United Arab Emirates",
            SA: "Saudi Arabia",
            EG: "Egypt",
            NG: "Nigeria",
            KE: "Kenya",
            ID: "Indonesia",
            TH: "Thailand",
            PH: "Philippines",
            VN: "Vietnam",
            MY: "Malaysia",
            SG: "Singapore",
            NZ: "New Zealand",
            PK: "Pakistan",
            BD: "Bangladesh",
            UA: "Ukraine",
            IL: "Israel",
            IR: "Iran",
            IQ: "Iraq",
            SY: "Syria",
            JO: "Jordan",
            LB: "Lebanon",
            MA: "Morocco",
            TN: "Tunisia",
            DZ: "Algeria",
            PE: "Peru",
            VE: "Venezuela",
            EC: "Ecuador",
            BO: "Bolivia",
            PY: "Paraguay",
            UY: "Uruguay",
            CU: "Cuba",
            DO: "Dominican Republic",
            GT: "Guatemala",
            CR: "Costa Rica",
            PA: "Panama",
            HN: "Honduras",
            SV: "El Salvador",
            NI: "Nicaragua",
            PR: "Puerto Rico",
            IS: "Iceland",
            LT: "Lithuania",
            LV: "Latvia",
            EE: "Estonia",
            SK: "Slovakia",
            SI: "Slovenia",
            HR: "Croatia",
            BG: "Bulgaria",
            RO: "Romania",
            HU: "Hungary",
            BY: "Belarus",
            RS: "Serbia",
            BA: "Bosnia and Herzegovina",
            ME: "Montenegro",
            MK: "North Macedonia",
            AL: "Albania",
            MD: "Moldova",
            AM: "Armenia",
            GE: "Georgia",
            AZ: "Azerbaijan",
            KZ: "Kazakhstan",
            UZ: "Uzbekistan",
            KG: "Kyrgyzstan",
            TM: "Turkmenistan",
            AF: "Afghanistan",
            LK: "Sri Lanka",
            MM: "Myanmar",
            NP: "Nepal",
            BT: "Bhutan",
            KH: "Cambodia",
            LA: "Laos",
            MN: "Mongolia",
            MO: "Macau",
            HK: "Hong Kong",
            TW: "Taiwan",
            FJ: "Fiji",
            PG: "Papua New Guinea",
            SB: "Solomon Islands",
            VU: "Vanuatu",
            TO: "Tonga",
            WS: "Samoa",
            KI: "Kiribati",
            NR: "Nauru",
            TV: "Tuvalu",
            MG: "Madagascar",
            ZW: "Zimbabwe",
            ZM: "Zambia",
            AO: "Angola",
            MZ: "Mozambique",
            CM: "Cameroon",
            ET: "Ethiopia",
            SD: "Sudan",
            SS: "South Sudan",
            GH: "Ghana",
            CI: "Ivory Coast",
            SN: "Senegal",
            UG: "Uganda",
            CD: "Democratic Republic of the Congo",
            CG: "Republic of the Congo",
            TG: "Togo",
            BJ: "Benin",
            BF: "Burkina Faso",
            ML: "Mali",
            NE: "Niger",
            RW: "Rwanda",
            SO: "Somalia",
            YE: "Yemen",
            OM: "Oman",
            QA: "Qatar",
            KW: "Kuwait",
            BH: "Bahrain",
            CY: "Cyprus",
            LU: "Luxembourg",
            LI: "Liechtenstein",
            AD: "Andorra",
            MC: "Monaco",
            SM: "San Marino",
            VA: "Vatican City",
            ST: "São Tomé and Príncipe",
            SC: "Seychelles",
            KM: "Comoros",
            CV: "Cape Verde",
            GQ: "Equatorial Guinea",
            GA: "Gabon",
            BW: "Botswana",
            LS: "Lesotho",
            SZ: "Eswatini (Swaziland)",
            NA: "Namibia",
            GM: "Gambia",
        };

        return countryNames[code] || code; // Return full name if available, otherwise return abbreviation
    };

    useEffect(() => {
        const fetchWeather = async () => {
            setLoading(true);
            setError(null);

            try {
                const responses = await Promise.all(
                    cities.map(city =>
                        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`)
                    )
                );

                const data = await Promise.all(responses.map(res => {
                    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                    return res.json();
                }));

                const formattedData = data.reduce((acc, cityData, index) => {
                    const requestedCity = cities[index]; // Using requested city name instead of city name that is returned
                    acc[cityData.name] = {
                        cityName: requestedCity,
                        temp: cityData.main.temp,
                        country: getCountryName(cityData.sys.country),
                        description: capitalizeFirstLetter(cityData.weather[0].description),
                        icon: cityData.weather[0].icon,
                        main: cityData.weather[0].main
                    };
                    return acc;
                }, {});

                setWeatherData(formattedData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [unit, cities]);

    return (
        <>
            <div className="other-cities-header">Other Cities</div>
            <section className='other-cities-container'>
                {loading ? (
                    <div className='loading'>Loading...</div>
                ) : error ? (
                    <div className='error'>{error}</div>
                ) : (
                    cities.map((city, index) => {
                        const cityData = weatherData[city];
                        // if (!cityData) return null; // Ensure city data exists before rendering

                        return (
                            <div key={index} className='city-card'>
                                <div className="city-data-container">
                                    <div className='city-country'>{cityData.country}</div>
                                    <div className='city-name'>{cityData.cityName}</div>
                                    <div className='city-description'>{cityData.description}</div>
                                </div>

                                <div className="temp-container">
                                    <img
                                        // src={`https://openweathermap.org/img/wn/${cityData.icon}@2x.png`}
                                        src={getWeatherIcon({ weather: [{ main: cityData.main, icon: cityData.icon }] })}
                                        alt="Weather icon"
                                        className="city-icon"
                                    />
                                    <div className='city-temp'>{Math.round(cityData.temp)}°</div>
                                </div>
                            </div>
                        );
                    })
                )}
            </section>
        </>
    )
}