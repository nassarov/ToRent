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
  { label: "Toyota", value: "Toyota" },
  { label: "Ford", value: "Ford" },
  { label: "Honda", value: "Honda" },
  { label: "Chevrolet", value: "Chevrolet" },
  { label: "Volkswagen (VW)", value: "Volkswagen (VW)" },
  { label: "Nissan", value: "Nissan" },
  { label: "BMW", value: "BMW" },
  { label: "Mercedes-Benz", value: "Mercedes-Benz" },
  { label: "Audi", value: "Audi" },
  { label: "Hyundai", value: "Hyundai" },
  { label: "Kia", value: "Kia" },
  { label: "Subaru", value: "Subaru" },
  { label: "Tesla", value: "Tesla" },
  { label: "Lexus", value: "Lexus" },
  { label: "Porsche", value: "Porsche" },
  { label: "Ferrari", value: "Ferrari" },
  { label: "Lamborghini", value: "Lamborghini" },
  { label: "Aston Martin", value: "Aston Martin" },
  { label: "McLaren", value: "McLaren" },
  { label: "Jaguar", value: "Jaguar" }
];

const carTypes = [
  { label: "Sedan", value: "Sedan" },
  { label: "SUV (Sport Utility Vehicle)", value: "SUV" },
  { label: "Coupe", value: "Coupe" },
  { label: "Convertible", value: "Convertible" },
  { label: "Hatchback", value: "Hatchback" },
  { label: "Wagon", value: "Wagon" },
  { label: "Minivan", value: "Minivan" },
  { label: "Pickup Truck", value: "Pickup Truck" },
  { label: "Crossover", value: "Crossover" },
  { label: "Sports Car", value: "Sports Car" },
  { label: "Electric Vehicle (EV)", value: "EV" },
  { label: "Hybrid Vehicle", value: "Hybrid Vehicle" },
  { label: "Luxury Car", value: "Luxury Car" },
  { label: "Performance Car", value: "Performance Car" },
  { label: "Compact Car", value: "Compact Car" }
];

const carModels = [
  { brand: "Toyota", model: "Camry" },
  { brand: "Ford", model: "Mustang" },
  { brand: "Honda", model: "Civic" },
  { brand: "Chevrolet", model: "Silverado" },
  { brand: "Volkswagen", model: "Golf" },
  { brand: "Nissan", model: "Altima" },
  { brand: "BMW", model: "3 Series" },
  { brand: "Mercedes-Benz", model: "C-Class" },
  { brand: "Audi", model: "A4" },
  { brand: "Hyundai", model: "Sonata" },
  { brand: "Kia", model: "Optima" },
  { brand: "Subaru", model: "Outback" },
  { brand: "Tesla", model: "Model 3" },
  { brand: "Lexus", model: "RX" },
  { brand: "Porsche", model: "911" },
  { brand: "Ferrari", model: "488" },
  { brand: "Lamborghini", model: "Aventador" },
  { brand: "Aston Martin", model: "DB11" },
  { brand: "McLaren", model: "720S" },
  { brand: "Jaguar", model: "F-Pace" }
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


export {carBrands,carGears,carModels,carTypes,lebaneseCities,carColors,fuelTypes};

export const addData = async (data, collections) => {
  const db = getFirestore(app);
  try {
    data.map(async (dat) => {
      const docRef = await addDoc(collection(db, collections), dat);
    })
    console.log("Suc");

  } catch (error) {
    console.log(error.message)
  }
}