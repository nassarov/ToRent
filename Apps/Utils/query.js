import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "../../firebaseConfig";

const carColors = [
  { label: "Red", value: "Red" },
  { label: "Blue", value: "Blue" },
  { label: "Green", value: "Green" },
  { label: "Yellow", value: "Yellow" },
  { label: "Orange", value: "Orange" },
  { label: "Purple", value: "Purple" },
  { label: "Pink", value: "Pink" },
  { label: "Black", value: "Black" },
  { label: "White", value: "White" },
  { label: "Brown", value: "Brown" },
  { label: "Gray", value: "Gray" },
  { label: "Beige", value: "Beige" },
  { label: "Turquoise", value: "Turquoise" },
  { label: "Silver", value: "Silver" },
  { label: "Gold", value: "Gold" },
  { label: "Crimson", value: "Crimson" },
  { label: "Magenta", value: "Magenta" },
  { label: "Teal", value: "Teal" },
  { label: "Navy", value: "Navy" },
  { label: "Indigo", value: "Indigo" },
  { label: "Lime", value: "Lime" },
  { label: "Cyan", value: "Cyan" },
  { label: "Maroon", value: "Maroon" },
  { label: "Olive", value: "Olive" },
  { label: "Violet", value: "Violet" },
  { label: "Aquamarine", value: "Aquamarine" },
  { label: "Fuchsia", value: "Fuchsia" },
  { label: "Salmon", value: "Salmon" },
  { label: "Plum", value: "Plum" },
  { label: "Khaki", value: "Khaki" },
];

const carGears = [
  { label: "Manual Transmission", value: "Manual Transmission" },
  { label: "Automatic Transmission", value: "Automatic Transmission" },
  { label: "Four-Wheel Drive (4WD)", value: "Four-Wheel Drive (4WD)" },
  { label: "All-Wheel Drive (AWD)", value: "All-Wheel Drive (AWD)" },
  { label: "Front-Wheel Drive (FWD)", value: "Front-Wheel Drive (FWD)" },
  { label: "Rear-Wheel Drive (RWD)", value: "Rear-Wheel Drive (RWD)" },
  { label: "Limited Slip Differential (LSD)", value: "Limited Slip Differential (LSD)" },
  { label: "Locking Differential", value: "Locking Differential" },
  { label: "Open Differential", value: "Open Differential" },
  { label: "Manual Gearbox", value: "Manual Gearbox" },
  { label: "Automatic Gearbox", value: "Automatic Gearbox" },
  { label: "Continuously Variable Transmission (CVT)", value: "Continuously Variable Transmission (CVT)" },
];

const lebaneseCities = [
  { label: "Beirut", value: "Beirut" },
  { label: "Tripoli", value: "Tripoli" },
  { label: "Sidon", value: "Sidon" },
  { label: "Tyre", value: "Tyre" },
  { label: "Jbeil", value: "Jbeil" },
  { label: "Baalbek", value: "Baalbek" },
  { label: "Nabatieh", value: "Nabatieh" },
  { label: "Jounieh", value: "Jounieh" },
  { label: "Batroun", value: "Batroun" },
  { label: "Bint Jbeil", value: "Bint Jbeil" },
  { label: "Hermel", value: "Hermel" },
  { label: "Marjayoun", value: "Marjayoun" },
  { label: "Aley", value: "Aley" },
  { label: "Chouf", value: "Chouf" },
  { label: "Bsharri", value: "Bsharri" },
  { label: "Rashaya", value: "Rashaya" },
  { label: "Zahlé", value: "Zahlé" },
  { label: "Baabda", value: "Baabda" },
  { label: "Anjar", value: "Anjar" },
  { label: "Chekka", value: "Chekka" },
  { label: "Dahr El Ahmar", value: "Dahr El Ahmar" },
  { label: "Deir el Qamar", value: "Deir el Qamar" },
  { label: "Ebel El Saqi", value: "Ebel El Saqi" },
  { label: "Ghazir", value: "Ghazir" },
  { label: "Halba", value: "Halba" },
  { label: "Hasbaya", value: "Hasbaya" },
  { label: "Jezzine", value: "Jezzine" },
  { label: "Marjeyoun", value: "Marjeyoun" },

];

const carBrands = [
  {
    label: "Toyota",
    value: "Toyota",
    image: 'https://www.carlogos.org/car-logos/toyota-logo-2020-europe-download.png',
    models: [
      "Camry",
      "Corolla",
      "Rav4",
      "Prius"
    ],
    types: [
      "Sedan",
      "SUV",
      "Coupe",
      "Convertible",
      "Hatchback",
      "Wagon"
    ]
  },
  {
    label: "Ford",
    value: "Ford",
    image: "https://www.carlogos.org/car-logos/ford-logo-2017-download.png",
    models: [
      "Mustang",
      "F-150",
      "Explorer",
      "Escape"
    ],
    types: [
      "Sedan",
      "SUV (Sport Utility Vehicle)",
      "Truck"
    ]
  },
  {
    label: "Honda",
    value: "Honda",
    image: "https://www.carlogos.org/car-logos/honda-logo-2000-full-download.png",
    models: [
      "Civic",
      "Accord",
      "CR-V",
      "Pilot"
    ],
    types: [
      "Sedan",
      "SUV (Sport Utility Vehicle)",
      "Coupe"
    ]
  },
  {
    label: "Chevrolet",
    value: "Chevrolet",
    image: "https://www.carlogos.org/logo/Chevrolet-logo-2013-2560x1440.png",
    models: [
      "Silverado",
      "Malibu",
      "Equinox",
      "Camaro"
    ],
    types: [
      "Sedan",
      "SUV (Sport Utility Vehicle)",
      "Truck",
      "Coupe"
    ]
  },
  {
    label: "Volkswagen (VW)",
    value: "Volkswagen (VW)",
    image: "https://www.carlogos.org/logo/Volkswagen-logo-2019-1500x1500.png",
    models: [
      "Golf",
      "Passat",
      "Tiguan",
      "Atlas"
    ],
    types: [
      "Sedan",
      "SUV (Sport Utility Vehicle)",
      "Coupe",
      "Hatchback"
    ]
  },
  {
    label: "Nissan",
    value: "Nissan",
    image: "https://www.carlogos.org/car-logos/nissan-logo-2020-black.png",
    models: [
      "Altima",
      "Maxima",
      "Rogue",
      "Pathfinder"
    ],
    types: [
      "Sedan",
      "SUV (Sport Utility Vehicle)",
      "Coupe",
      "Truck"
    ]
  },
  {
    label: "BMW",
    value: "BMW",
    image: "https://www.carlogos.org/car-brands/bmw-logo.html#2020",
    models: [
      "3 Series",
      "5 Series",
      "X3",
      "X5"
    ],
    types: [
      "Sedan",
      "SUV (Sport Utility Vehicle)",
      "Coupe"
    ]
  },
  {
    label: "Mercedes-Benz",
    value: "Mercedes-Benz",
    image: "https://www.carlogos.org/logo/Mercedes-Benz-logo-2011-1920x1080.png",
    models: [
      "C-Class",
      "E-Class",
      "GLC",
      "GLE"
    ],
    types: [
      "Sedan",
      "SUV (Sport Utility Vehicle)",
      "Coupe"
    ]
  },
  {
    label: "Audi",
    value: "Audi",
    image: "https://www.carlogos.org/car-logos/audi-logo-2016-download.png",
    models: [
      "A4",
      "A6",
      "Q5",
      "Q7"
    ],
    types: [
      "Sedan",
      "SUV (Sport Utility Vehicle)",
      "Coupe"
    ]
  },
  {
    label: "Hyundai",
    value: "Hyundai",
    image: "https://www.carlogos.org/car-logos/hyundai-logo-2011-download.png",
    models: [
      "Elantra",
      "Tucson",
      "Santa Fe",
      "Sonata"
    ],
    types: [
      "Sedan",
      "SUV (Sport Utility Vehicle)",
      "Coupe"
    ]
  },
  {
    label: "Kia",
    value: "Kia",
    image: "https://www.carlogos.org/logo/Kia-logo-2560x1440.png",
    models: [
      "Optima",
      "Sorento",
      "Sportage",
      "Forte"
    ],
    types: [
      "Sedan",
      "SUV (Sport Utility Vehicle)",
      "Hatchback"
    ]
  },
  {
    label: "Subaru",
    value: "Subaru",
    image: "https://www.carlogos.org/car-logos/subaru-logo-2019-download.png",
    models: [
      "Impreza",
      "Outback",
      "Forester",
      "Crosstrek"
    ],
    types: [
      "Sedan",
      "SUV (Sport Utility Vehicle)",
      "Wagon"
    ]
  },
  {
    label: "Tesla",
    value: "Tesla",
    image: "https://www.carlogos.org/car-logos/tesla-logo-2007-full-download.png",
    models: [
      "Model S",
      "Model 3",
      "Model X",
      "Model Y"
    ],
    types: [
      "Sedan",
      "SUV (Sport Utility Vehicle)",
      "Hatchback"
    ]
  },
  {
    label: "Lexus",
    value: "Lexus",
    image: "https://www.carlogos.org/logo/Lexus-logo-1988-1920x1080.png",
    models: [
      "ES",
      "RX",
      "NX",
      "IS"
    ],
    types: [
      "Sedan",
      "SUV (Sport Utility Vehicle)",
      "Coupe"
    ]
  },
  {
    label: "Porsche",
    value: "Porsche",
    image: "https://www.carlogos.org/car-logos/porsche-logo-2014-full-download.png",
    models: [
      "911",
      "Cayenne",
      "Macan",
      "Panamera"
    ],
    types: [
      "Coupe",
      "SUV (Sport Utility Vehicle)"
    ]
  },
  {
    label: "Ferrari",
    value: "Ferrari",
    image: "https://www.carlogos.org/car-logos/ferrari-logo-2002-download.png",
    models: [
      "488 GTB",
      "Portofino",
      "812 Superfast",
      "Roma"
    ],
    types: [
      "Coupe",
      "Convertible"
    ]
  },
  {
    label: "Lamborghini",
    value: "Lamborghini",
    image: "https://www.brandcrowd.com/blog/wp-content/uploads/2023/05/Lamborghini-logo-1-1024x819.jpg",
    models: [
      "Huracan",
      "Aventador",
      "Urus",
      "Sian"
    ],
    types: [
      "Coupe",
      "SUV (Sport Utility Vehicle)"
    ]
  },
  {
    label: "Aston Martin",
    value: "Aston Martin",
    image: "https://www.carlogos.org/logo/Aston-Martin-logo-2003-6000x3000.png",
    models: [
      "DB11",
      "Vantage",
      "DBX",
      "DBS Superleggera"
    ],
    types: [
      "Coupe",
      "SUV (Sport Utility Vehicle)"
    ]
  },
  {
    label: "McLaren",
    value: "McLaren",
    image: "https://www.carlogos.org/logo/McLaren-logo-2002-2560x1440.png",
    models: [
      "720S",
      "570S",
      "GT",
      "Artura"
    ],
    types: [
      "Coupe",
      "Convertible"
    ]
  },
  {
    label: "Jaguar",
    value: "Jaguar",
    image: "https://www.carlogos.org/car-logos/jaguar-logo-2021-download.png",
    models: [
      "XE",
      "F-Pace",
      "XF",
      "I-Pace"
    ],
    types: [
      "Sedan",
      "SUV (Sport Utility Vehicle)",
      "Coupe"
    ]
  }
];



const fuelTypes = [
  { label: "Gasoline/Petrol", value: "Gasoline" },
  { label: "Diesel", value: "Diesel" },
  { label: "Electric", value: "Electric" },
  { label: "Hybrid (Gasoline/Electric)", value: "Hybrid" },
  { label: "Plug-In Hybrid (PHEV)", value: "PHEV" },
  { label: "Compressed Natural Gas (CNG)", value: "CNG" },
  { label: "Liquefied Petroleum Gas (LPG)", value: "LPG" },
  { label: "Hydrogen Fuel Cell", value: "Hydrogen" },
  { label: "Ethanol (Flex-Fuel)", value: "Ethanol" },
  { label: "Biodiesel", value: "Biodiesel" }
];


export { carBrands, carGears, lebaneseCities, carColors, fuelTypes };

export const addData = async (data, collections) => {
  const db = getFirestore(app);
  try {
    data.map(async (dat) => {
      const docRef = await addDoc(collection(db, collections), dat);

    })


  } catch (error) {
    console.log(error.message)
  }
}