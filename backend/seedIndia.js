import mongoose from "mongoose";
import dotenv from "dotenv";
import Package from "./Models/packageModel.js";
import Hotel from "./Models/hotelModel.js";
import Room from "./Models/roomModel.js";

dotenv.config();

const unsplash = (id) => `https://images.unsplash.com/photo-${id}?q=80&w=800&auto=format&fit=crop`;

const indianPackages = [
    {
        name: "Golden Triangle: Delhi, Agra & Jaipur",
        location: "Agra",
        duration: "6 Days, 5 Nights",
        pricePerAdult: 45000,
        type: "HistoricalPlace",
        to_do_type: "Heritage Tour",
        image: [unsplash("1564507592333-c60657eea523"), unsplash("1548013146-72479768b921")],
        description: [{
            main: ["Experience the majestic Golden Triangle of India, covering the political capital Delhi, the city of Taj Agra, and the pink city Jaipur."],
            included: ["Luxury Accommodation", "Daily Breakfast", "Private AC Transport", "English Speaking Guide", "Monument Entry Fees"],
            notIncluded: ["International Airfare", "Personal Expenses", "Tips", "Travel Insurance"],
            expect: [["Day 1: Arrival in Delhi", "Day 2: Delhi Sightseeing", "Day 3: Agra Transfer & Taj Mahal", "Day 4: Fatehpur Sikri & Jaipur", "Day 5: Amber Fort & Jaipur City", "Day 6: Return to Delhi"]],
            additionalInfo: ["Confirmation will be received at time of booking", "Not wheelchair accessible", "Most travelers can participate"],
            policy: ["Cancel up to 7 days in advance for a full refund."]
        }],
        rating: 4.8,
        totalRatings: 120,
        priceRange: "morethan15000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14216.5414321285!2d78.0399!3d27.1751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39747121d702ffef%3A0x68d0224866311d68!2sTaj%20Mahal!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Kerala Backwaters & Hill Stations",
        location: "Kerala",
        duration: "5 Days, 4 Nights",
        pricePerAdult: 32000,
        type: "Adventure",
        to_do_type: "Nature & Leisure",
        image: [unsplash("1602216056096-3b40cc0c9944"), unsplash("1593693397690-362cb9666fc2")],
        description: [{
            main: ["Discover 'God's Own Country' with its serene backwaters, sprawling tea plantations, and pristine beaches."],
            included: ["Premium Houseboat stay", "Munnar Tea Garden Tour", "All Meals in Houseboat", "Airport Transfers"],
            notIncluded: ["Laundry", "Telephone bills", "Anything not mentioned in inclusions"],
            expect: [["Day 1: Cochin to Munnar", "Day 2: Munnar Sightseeing", "Day 3: Munnar to Alleppey Houseboat", "Day 4: Alleppey to Cochin", "Day 5: Departure"]],
            additionalInfo: ["Carry light cotton clothes", "Umbrellas recommended", "Enjoy local Kerala cuisine"],
            policy: ["Full refund for cancellations made at least 10 days before departure."]
        }],
        rating: 4.9,
        totalRatings: 85,
        priceRange: "morethan15000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.5678!2d76.32!3d9.49!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0884f3c75c8247%3A0x35661d4b6848034a!2sAlappuzha%2C%20Kerala!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Leh Ladakh: The Land of High Passes",
        location: "Ladakh",
        duration: "7 Days, 6 Nights",
        pricePerAdult: 55000,
        type: "Adventure",
        to_do_type: "High Altitude Trek",
        image: [unsplash("1544735230-c12844578af3"), unsplash("1584132967334-10e028bd69f7")],
        description: [{
            main: ["Journey to the roof of the world. Experience the stark beauty of Ladakh, from turquoise lakes to ancient Buddhist monasteries."],
            included: ["Boutique Hotels & Camps", "Inner Line Permits", "Oxygen Cylinder in Vehicle", "Expert Mountain Guide"],
            notIncluded: ["Camel Safari Fees", "Monastery Donations", "Tips"],
            expect: [["Day 1: Leh Arrival & Rest", "Day 2: Leh Local", "Day 3: Leh to Nubra Valley", "Day 4: Nubra to Pangong Lake", "Day 5: Pangong back to Leh", "Day 6: Monastery Tour", "Day 7: Departure"]],
            additionalInfo: ["Acclimatization is mandatory", "BSNL/Airtel Postpaid works best", "Travel between June-Sept"],
            policy: ["Cancellations made 15 days before are eligible for 50% refund."]
        }],
        rating: 4.9,
        totalRatings: 156,
        priceRange: "morethan15000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105958.412!2d77.5!3d34.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38fdeb21445fed85%3A0xd154bb38580c448b!2sLeh!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Varanasi: The Spiritual Soul of India",
        location: "Varanasi",
        duration: "3 Days, 2 Nights",
        pricePerAdult: 12000,
        type: "Group",
        to_do_type: "Spiritual Experience",
        image: [unsplash("1571536802807-30451e3955d8"), unsplash("1542314831-068cd1dbfeeb")],
        description: [{
            main: ["Visit one of the oldest living cities in the world. Witness the mesmerizing Ganga Aarti and explore the narrow spiritual lanes of Kashi."],
            included: ["Ganga Aarti Boat Ride", "Sarnath Excursion", "Ghat Walking Tour", "Daily Breakfast"],
            notIncluded: ["Temple Pooja Charges", "Lunch & Dinner", "Personal Shopping"],
            expect: [["Day 1: Arrival & Evening Ganga Aarti", "Day 2: Sunrise Boat Tour & Kashi Vishwanath Temple", "Day 3: Sarnath & Departure"]],
            additionalInfo: ["Wear respectful clothing", "Be wary of street food", "Keep small change for donations"],
            policy: ["Full refund if cancelled 72 hours before arrival."]
        }],
        rating: 4.7,
        totalRatings: 340,
        priceRange: "10000-15000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57683.4!2d82.9!3d25.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2db7607b03e9%3A0xad1bc921ff915f7d!2sVaranasi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Goa: Sun, Sand & Serenity",
        location: "Goa",
        duration: "4 Days, 3 Nights",
        pricePerAdult: 18000,
        type: "Adventure",
        to_do_type: "Beach Vacation",
        image: [unsplash("1512343879784-a960bf40e7f2"), unsplash("1540202404-a2f29016bb5d")],
        description: [{
            main: ["Explore the vibrating beaches of North Goa and the tranquil shores of South Goa. Perfect for party lovers and peace seekers alike."],
            included: ["Beach Resort Stay", "Scuba Diving session", "Scooter Rental for 2 Days", "Airport Transfers"],
            notIncluded: ["Casino Entry Fees", "Personal Alcohol Charges", "Tips"],
            expect: [["Day 1: North Goa Arrival", "Day 2: Beach Hopping & Water Sports", "Day 3: South Goa Heritage & Quiet Beaches", "Day 4: Departure"]],
            additionalInfo: ["Sunscreen is a must", "Respect local laws", "Try local Feni"],
            policy: ["5 days cancellation for full refund."]
        }],
        rating: 4.8,
        totalRatings: 450,
        priceRange: "morethan15000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3848.4!2d73.8!3d15.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbbef631f471db5%3A0xe30605d900388d5e!2sGoa!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Madurai: The Temple City",
        location: "Tamil Nadu",
        duration: "3 Days, 2 Nights",
        pricePerAdult: 8500,
        type: "HistoricalPlace",
        to_do_type: "Heritage & Culture",
        image: [unsplash("1582510003544-4d00b7f74220"), unsplash("1544735230-c12844578af3")],
        description: [{
            main: ["Home to the legendary Meenakshi Amman Temple. Madurai is one of India's oldest continuously inhabited cities."],
            included: ["Temple Guided Tour", "Tirumalai Nayakkar Palace Entry", "Local Food Tasting", "AC Accommodation"],
            notIncluded: ["Camera Fees", "Special Pooja Charges", "Dinner"],
            expect: [["Day 1: Meenakshi Temple Visit", "Day 2: Palace & Local Markets", "Day 3: Departure"]],
            additionalInfo: ["Modest clothing required", "Famous for Jigarthanda", "Very hot in summer"],
            policy: ["72h cancellation for 100% refund."]
        }],
        rating: 4.9,
        totalRatings: 210,
        priceRange: "5000-10000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.9!2d78.1!3d9.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c582b1189633%3A0xdc955b729f939746!2sMadurai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Ooty: Queen of Hill Stations",
        location: "Tamil Nadu",
        duration: "4 Days, 3 Nights",
        pricePerAdult: 15600,
        type: "Adventure",
        to_do_type: "Nature & Mist",
        image: [unsplash("1544735230-c12844578af3"), unsplash("1544735230-c12844578af3")],
        description: [{
            main: ["Nestled in the Nilgiri Hills. Experience the famous Toy Train, lush tea gardens, and the chilly weather of Ooty."],
            included: ["Toy Train Tickets", "Tea Factory Visit", "Botanical Garden Entry", "Premium Cottage Stay"],
            notIncluded: ["Boating Fees", "Personal Jackets", "Extra Meals"],
            expect: [["Day 1: Toy Train Arrival", "Day 2: Doddabetta Peak & Tea Gardens", "Day 3: Pykara Lake & Falls", "Day 4: Departure"]],
            additionalInfo: ["Carry warm clothes", "Plastic is strictly banned", "Best time Oct-June"],
            policy: ["10 days cancellation for full refund."]
        }],
        rating: 4.7,
        totalRatings: 560,
        priceRange: "morethan15000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15655.4!2d76.7!3d11.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8bd84b57f7da1%3A0xdd24ed77318ba457!2sOoty%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Udaipur: The City of Lakes",
        location: "Rajasthan",
        duration: "5 Days, 4 Nights",
        pricePerAdult: 35000,
        type: "HistoricalPlace",
        to_do_type: "Royal Royalty",
        image: [unsplash("1515488764276-beab7607c1e6"), unsplash("1615801905648-523c91350647")],
        description: [{
            main: ["The most romantic city in India. Stay in heritage havelis, cruise on Lake Pichola, and explore the grand City Palace."],
            included: ["Lake Pichola Boat Ride", "Palace Tours", "Heritage Hotel Stay", "Private Car"],
            notIncluded: ["Folk Dance Show Tickets", "Camel Ride", "Tips"],
            expect: [["Day 1: Arrival & Lake Cruise", "Day 2: City Palace & Museum", "Day 3: Saheliyon-ki-Bari & local markets", "Day 4: Kumbhalgarh Excursion", "Day 5: Departure"]],
            additionalInfo: ["Great for photography", "Visit during winter", "Explore the narrow lanes on foot"],
            policy: ["7 days cancellation for full refund."]
        }],
        rating: 4.9,
        totalRatings: 280,
        priceRange: "morethan15000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14500.0!2d73.7!3d24.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e56550a14411%3A0xdbd8c284587c7fa1!2sUdaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Historical Heritage: Hampi & Badami",
        location: "Karnataka",
        duration: "5 Days, 4 Nights",
        pricePerAdult: 22000,
        type: "HistoricalPlace",
        to_do_type: "Archeological Tour",
        image: [unsplash("1581012733671-912f36ef33bc"), unsplash("1600100397990-bc4fa3779496")],
        description: [{
            main: ["Step back into the 14th century. Explore the ruins of the Vijayanagara Empire in Hampi and the rock-cut cave temples of Badami."],
            included: ["Guide for Cave Temples", "AC Transport", "Breakfast & Dinner", "Monastery Entry Fees"],
            notIncluded: ["Coracle Ride Fees", "Lunch", "Personal Expenses"],
            expect: [["Day 1: Arrival in Hampi", "Day 2: Hampi Ruins Exploration", "Day 3: Hampi to Badami", "Day 4: Badami, Aihole & Pattadakal", "Day 5: Departure"]],
            additionalInfo: ["Wear comfortable walking shoes", "Photography allowed at most sites", "Sunscreen recommended"],
            policy: ["7 days cancellation for full refund."]
        }],
        rating: 4.8,
        totalRatings: 92,
        priceRange: "morethan15000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15386.1!2d76.4!3d15.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb71324543789bf%3A0x6002f5db3e84120!2sHampi!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Royal Rajasthan: Jaisalmer & Jodhpur",
        location: "Rajasthan",
        duration: "5 Days, 4 Nights",
        pricePerAdult: 28000,
        type: "Adventure",
        to_do_type: "Desert Safari",
        image: [unsplash("1594411130541-01684c98e29a"), unsplash("1544735230-c12844578af3")],
        description: [{
            main: ["Experience the magic of the Golden City (Jaisalmer) and the Blue City (Jodhpur). Stay in desert camps and ride camels under the stars."],
            included: ["Sam Sand Dunes Camp", "Camel Safari", "Rajasthani Folk Dance", "Jodhpur Fort Entry"],
            notIncluded: ["Jeep Safari (Optional)", "Lunch", "Flights"],
            expect: [["Day 1: Arrival in Jodhpur", "Day 2: Mehrangarh Fort & Ummaid Bhawan", "Day 3: Jodhpur to Jaisalmer", "Day 4: Desert Camp & Safari", "Day 5: Jaisalmer City & Departure"]],
            additionalInfo: ["Best between Nov-Feb", "Pack warm clothes for desert nights", "Try Pyaaz Kachori"],
            policy: ["Refundable up to 10 days before tour."]
        }],
        rating: 4.9,
        totalRatings: 180,
        priceRange: "morethan15000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14300.0!2d70.9!3d26.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3947bc26e63283f7%3A0xc6651811e5aa9a78!2sJaisalmer!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Shimla & Manali: The Himalayan Retreat",
        location: "Himachal",
        duration: "6 Days, 5 Nights",
        pricePerAdult: 31000,
        type: "Adventure",
        to_do_type: "Snow & Mountains",
        image: [unsplash("1626621341517-bbf3d9990a23"), unsplash("1599661046289-e31897846e41")],
        description: [{
            main: ["The perfect escape to the Himalayas. Visit the colonial charm of Shimla and the adventurous landscapes of Manali and Solang Valley."],
            included: ["Luxury AC Volvo", "Snow Gear Rental", "Breakfast & Dinner", "Rohtang Pass Permit"],
            notIncluded: ["Para-gliding fees", "River Rafting", "Tips"],
            expect: [["Day 1: Delhi to Shimla", "Day 2: Shimla & Kufri Sightseeing", "Day 3: Shimla to Manali", "Day 4: Manali Local Tour", "Day 5: Solang Valley / Rohtang Pass", "Day 6: Manali to Delhi Return"]],
            additionalInfo: ["Heavy woolens needed in winter", "Mall road is vehicle-free", "Best time to visit: Year-round"],
            policy: ["Cancellation 15 days before for full refund."]
        }],
        rating: 4.8,
        totalRatings: 620,
        priceRange: "morethan15000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13600!2d77.2!3d32.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3904870850ac7e23%3A0xe13554b9f29884e9!2sManali!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Spiritual Amritsar: Golden Temple Tour",
        location: "Punjab",
        duration: "3 Days, 2 Nights",
        pricePerAdult: 8500,
        type: "Group",
        to_do_type: "Spiritual & Borders",
        image: [unsplash("1615806678716-6ee9773347fe"), unsplash("1600100397990-bc4fa3779496")],
        description: [{
            main: ["Visit the holiest shrine of Sikhs, the Golden Temple. Witness the intense Wagah Border ceremony and a poignant visit to Jallianwala Bagh."],
            included: ["Luxury Hotel Stay", "Golden Temple Guided Visit", "Wagah Border AC Transport", "Punjabi Dhaba Experience"],
            notIncluded: ["Personal Donation", "Extra Shopping", "Laundry"],
            expect: [["Day 1: Arrival & Golden Temple Night View", "Day 2: Jallianwala Bagh & Wagah Border Ceremony", "Day 3: Local Markets & Departure"]],
            additionalInfo: ["Cover your head in temple", "Remove shoes", "Best time: Oct-March"],
            policy: ["72h cancellation for 100% refund."]
        }],
        rating: 4.9,
        totalRatings: 840,
        priceRange: "5000-10000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13500.0!2d74.8!3d31.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391964aa569e7355%3A0x8fbd26e054a3a2f!2sGolden%20Temple!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Mysore: The City of Palaces",
        location: "Karnataka",
        duration: "3 Days, 2 Nights",
        pricePerAdult: 7800,
        type: "HistoricalPlace",
        to_do_type: "Royal Heritage",
        image: [unsplash("1581012733671-912f36ef33bc"), unsplash("1600100397990-bc4fa3779496")],
        description: [{
            main: ["Explore the grandeur of the Mysore Palace, the beautiful Brindavan Gardens, and the spiritual Chamundi Hills."],
            included: ["Palace Entry Tickets", "Garden Musical Fountain Show", "AC Local Transport", "Breakfast"],
            notIncluded: ["Dinner", "Personal Tips", "Camera Fees"],
            expect: [["Day 1: Mysore Palace & Local Arts", "Day 2: Chamundi Hill & Brindavan Gardens", "Day 3: Srirangapatna Excursion & Departure"]],
            additionalInfo: ["Palace is lit up on Sundays", "Try Mysore Pak", "Great for sandalwood shopping"],
            policy: ["48h cancellation for full refund."]
        }],
        rating: 4.8,
        totalRatings: 320,
        priceRange: "5000-10000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15500.0!2d76.6!3d12.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba650bb4a64d1f1%3A0x5a31f3d8a1e263!2sMysuru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Spiti Valley: The Middle Land",
        location: "Himachal",
        duration: "8 Days, 7 Nights",
        pricePerAdult: 42000,
        type: "Adventure",
        to_do_type: "Extreme Landscape",
        image: [unsplash("1581793746473-04bfc782328c"), unsplash("1544735230-c12844578af3")],
        description: [{
            main: ["A desert mountain valley in the Himalayas. Visit the world's highest post office and ancient monasteries like Key and Dhankar."],
            included: ["4x4 SUV Transport", "Homestay Experience", "Inner Line Permits", "Oxygen Backup"],
            notIncluded: ["Airfare to Chandigarh", "Extreme cold gear", "Tips"],
            expect: [["Day 1: Shimla to Kalpa", "Day 2: Kalpa to Kaza", "Day 3: Key Monastery & Kibber", "Day 4: Hikkim (Highest PO) & Langza", "Day 5: Pin Valley", "Day 6: Dhankar & Tabo", "Day 7: Chandra Taal Lake", "Day 8: Departure via Rohtang"]],
            additionalInfo: ["Acclimatization is key", "Limited network", "Best between June-Sept"],
            policy: ["15 days cancellation for 50% refund."]
        }],
        rating: 4.9,
        totalRatings: 186,
        priceRange: "morethan15000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13600.0!2d78.0!3d32.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3906a213e478107e%3A0x107e3906a213e478!2sKaza%2C%20Himachal%20Pradesh!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Gangtok & Darjeeling: Tea Garden Trails",
        location: "Sikkim",
        duration: "6 Days, 5 Nights",
        pricePerAdult: 26500,
        type: "Group",
        to_do_type: "Nature & Mist",
        image: [unsplash("1544735230-c12844578af3"), unsplash("1590483734724-383b853b317d")],
        description: [{
            main: ["Wake up to the Kanchenjunga view. Experience the toy train in Darjeeling and the vibrant Buddhist culture of Gangtok."],
            included: ["Premium Tea Resort Stay", "Tsomgo Lake Excursion", "Tiger Hill Sunrise", "Daily Breakfast"],
            notIncluded: ["Paragliding in Gangtok", "Personal shopping", "Tips"],
            expect: [["Day 1: Bagdogra to Gangtok", "Day 2: Gangtok Local & Nathu La", "Day 3: Tsomgo Lake & Baba Mandir", "Day 4: Gangtok to Darjeeling", "Day 5: Darjeeling 7-point Tour", "Day 6: Departure"]],
            additionalInfo: ["Carry ID for Nathu La permit", "Nights are chilly", "Try local Momos"],
            policy: ["10 days cancellation for full refund."]
        }],
        rating: 4.8,
        totalRatings: 510,
        priceRange: "morethan15000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14300.0!2d88.6!3d27.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e6a56cd9e84705%3A0x181a95a8286a0!2sGangtok!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Lakshadweep: The Coral Paradise",
        location: "Lakshadweep",
        duration: "5 Days, 4 Nights",
        pricePerAdult: 48000,
        type: "Adventure",
        to_do_type: "Water Sports",
        image: [unsplash("1589308078059-be1415eab4c3"), unsplash("1544735230-c12844578af3")],
        description: [{
            main: ["Dive into the crystal clear lagoons of Agatti and Bangaram. A serene getaway with white sands and vibrant coral life."],
            included: ["Island Entry Permits", "Scuba Diving session", "Inter-island Ferry", "All Meals"],
            notIncluded: ["Flight to Agatti", "Alcohol (Strictly banned)", "Private Yacht Rental"],
            expect: [["Day 1: Arrival at Agatti", "Day 2: Bangaram Island Boat Trip", "Day 3: Water Sports & Snorkeling", "Day 4: Thinnakara Excursion", "Day 5: Departure"]],
            additionalInfo: ["BSNL is the only reliable network", "Alcohol is prohibited", "Restricted entry"],
            policy: ["30 days cancellation for full refund."]
        }],
        rating: 4.9,
        totalRatings: 115,
        priceRange: "morethan15000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31000.0!2d72.2!3d10.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c582b1189633%3A0x6e903bc10257e10e!2sAgatti%20Island!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Khajuraho: The Art of Love",
        location: "Madhya Pradesh",
        duration: "3 Days, 2 Nights",
        pricePerAdult: 13500,
        type: "HistoricalPlace",
        to_do_type: "Archeological Marvel",
        image: [unsplash("1544735230-c12844578af3"), unsplash("1600100397990-bc4fa3779496")],
        description: [{
            main: ["A UNESCO site famous for its nagara-style architecture and erotic sculptures. A masterpiece of Indian architecture."],
            included: ["Guided Temple Tour", "Light & Sound Show", "AC Stay", "Breakfast & Dinner"],
            notIncluded: ["Entry Fees", "Lunch", "Personal expenses"],
            expect: [["Day 1: Western Group of Temples", "Day 2: Eastern & Southern Group", "Day 3: Panna National Park Excursion & Departure"]],
            additionalInfo: ["Best time: Oct-Feb", "Hire an official ASI guide", "Photography is recommended"],
            policy: ["5 days cancellation for 100% refund."]
        }],
        rating: 4.7,
        totalRatings: 280,
        priceRange: "10000-15000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14400.0!2d79.9!3d24.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3982e56550a14411%3A0xdbd8c284587c7fa1!2sKhajuraho!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Konark & Puri: Odisha Heritage",
        location: "Odisha",
        duration: "4 Days, 3 Nights",
        pricePerAdult: 12500,
        type: "HistoricalPlace",
        to_do_type: "Culture & Beach",
        image: [unsplash("1582298538104-fe2e74c27f59"), unsplash("1571536802807-30451e3955d8")],
        description: [{
            main: ["Visit the Sun Temple of Konark and the Jagannath Temple of Puri. Enjoy the pristine beaches and the unique art of Pipili."],
            included: ["Puri Beach Resort Stay", "Jagannath Temple Guided Visit", "Konark Sun Temple Entry", "Chilika Lake Excursion"],
            notIncluded: ["Temple Prasad Fees", "Lunch", "Tips"],
            expect: [["Day 1: Puri Arrival & Beach", "Day 2: Jagannath Temple & Konark Sun Temple", "Day 3: Chilika Lake (Dolphin Spotting)", "Day 4: Departure via Bhubaneswar"]],
            additionalInfo: ["Respect temple dress code", "Try local seafood", "Great for appliqué work"],
            policy: ["7 days cancellation for full refund."]
        }],
        rating: 4.8,
        totalRatings: 420,
        priceRange: "10000-15000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15000.0!2d85.8!3d19.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1961ab8e495115%3A0xd14694466236fa78!2sKonark%20Sun%20Temple!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Ajanta & Ellora: The Rock Cut Caves",
        location: "Maharashtra",
        duration: "3 Days, 2 Nights",
        pricePerAdult: 11000,
        type: "HistoricalPlace",
        to_do_type: "History & Art",
        image: [unsplash("1600100397990-bc4fa3779496"), unsplash("1581012733671-912f36ef33bc")],
        description: [{
            main: ["A journey into ancient rock-cut architecture. Ellora Caves with its Kailasa Temple and the Buddhist painting hub of Ajanta."],
            included: ["Aurangabad stay", "Guide for Caves", "AC Car Rental", "Breakfast"],
            notIncluded: ["Entry Fees", "Laundry", "Tips"],
            expect: [["Day 1: Arrival & Ellora Caves", "Day 2: Full Day Ajanta Caves", "Day 3: Bibi ka Maqbara & Departure"]],
            additionalInfo: ["Ajanta closed on Mondays", "Ellora closed on Tuesdays", "Carry water and caps"],
            policy: ["72h cancellation for 100% refund."]
        }],
        rating: 4.9,
        totalRatings: 380,
        priceRange: "10000-15000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d37500.0!2d75.3!3d20.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd961ab8e495115%3A0xd14694466236fa78!2sAjanta%20Caves!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Mahabalipuram: The Shore Temples",
        location: "Tamil Nadu",
        duration: "2 Days, 1 Night",
        pricePerAdult: 6500,
        type: "City",
        to_do_type: "Coastal Heritage",
        image: [unsplash("1582298538104-fe2e74c27f59"), unsplash("1542314831-068cd1dbfeeb")],
        description: [{
            main: ["Witness the monolithic cave temples and the iconic Shore Temple of the Pallava dynasty."],
            included: ["Beach Resort Stay", "UNESCO Site Tour", "Chennai Transfers", "Breakfast"],
            notIncluded: ["Personal Lunch", "Entry Fees", "Water sports"],
            expect: [["Day 1: Five Rathas & Shore Temple", "Day 2: Krishna's Butter Ball & Departure"]],
            additionalInfo: ["Great for stone carvings", "Very humid", "Visit during Margazhi Festival"],
            policy: ["48h cancellation for 100% refund."]
        }],
        rating: 4.8,
        totalRatings: 180,
        priceRange: "5000-10000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15600.0!2d80.2!3d12.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5361ab8e495115%3A0xd14694466236fa78!2sMahabalipuram!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Gokarna: The Quiet Beach Escape",
        location: "Karnataka",
        duration: "4 Days, 3 Nights",
        pricePerAdult: 14000,
        type: "Adventure",
        to_do_type: "Beach Trek",
        image: [unsplash("1623192534571-08f658097b6a"), unsplash("1512343879784-a960bf40e7f2")],
        description: [{
            main: ["A spiritual town with pristine beaches. Hike between Om Beach, Half Moon Beach, and Paradise Beach for a soul-stirring experience."],
            included: ["Beach Shack Homestay", "Local Boat Rides", "Murudeshwar Temple Excursion", "Breakfast"],
            notIncluded: ["Extreme Water sports", "Alcohol", "Tips"],
            expect: [["Day 1: Arrival & Mahabaleshwar Temple", "Day 2: Om Beach to Paradise Beach Trek", "Day 3: Murudeshwar Gigantic Shiva Trip", "Day 4: Departure"]],
            additionalInfo: ["Respect temple traditions", "Pack light for treks", "Carry mosquito repellent"],
            policy: ["5 days cancellation for full refund."]
        }],
        rating: 4.8,
        totalRatings: 260,
        priceRange: "10000-15000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15500.0!2d74.3!3d14.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbc884b57f7da1%3A0xd14694466236fa78!2sGokarna!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Gir National Park: Home of Asiatic Lions",
        location: "Gujarat",
        duration: "3 Days, 2 Nights",
        pricePerAdult: 17500,
        type: "Adventure",
        to_do_type: "Wildlife Safari",
        image: [unsplash("1559132207-6bcf7564d6e9"), unsplash("1590483734724-383b853b317d")],
        description: [{
            main: ["The only place in the world where Asiatic Lions roam free. Experience the wildlife of Saurashtra."],
            included: ["Jeep Safari Permits", "Forest Lodge Stay", "Somnath Temple Visit", "All Meals"],
            notIncluded: ["Camcorder Fees", "Extra Safari", "Personal Tips"],
            expect: [["Day 1: Arrival & Evening Safari", "Day 2: Morning Safari & Somnath Trip", "Day 3: Interaction with local guides & Departure"]],
            additionalInfo: ["Park closed during Monsoon", "Advance safari booking is must", "Wear camouflage colors"],
            policy: ["10 days cancellation for full refund."]
        }],
        rating: 4.8,
        totalRatings: 185,
        priceRange: "morethan15000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14800.0!2d70.6!3d21.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395a16747209351f%3A0xbb16315542247c40!2sGir%20National%20Park!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Tanjore & Kumbakonam: Chola Temples",
        location: "Tamil Nadu",
        duration: "4 Days, 3 Nights",
        pricePerAdult: 12000,
        type: "HistoricalPlace",
        to_do_type: "Temple Tour",
        image: [unsplash("1582510003544-4d00b7f74220"), unsplash("1544735230-c12844578af3")],
        description: [{
            main: ["Visit the Big Temple (Brihadeeswara) and the bronze art hub of Kumbakonam. Explore the Chola dynasty's legacy."],
            included: ["Heritage Hotel Stay", "Art Gallery Visit", "Guided Temple Tour", "Breakfast"],
            notIncluded: ["Temple Offerings", "Lunch & Dinner", "Tips"],
            expect: [["Day 1: Tanjore Big Temple", "Day 2: Saraswathi Mahal Library & Palace", "Day 3: Kumbakonam Airavateswara Temple", "Day 4: Departure"]],
            additionalInfo: ["Modest clothing is must", "Great for Tanjore paintings", "Visit the weaving center"],
            policy: ["5 days cancellation for 100% refund."]
        }],
        rating: 4.8,
        totalRatings: 215,
        priceRange: "10000-15000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.0!2d79.1!3d10.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba0c582b1189633%3A0xe30605d900388d5e!2sThanjavur!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Lonavala & Khandala: Mist in the Ghats",
        location: "Maharashtra",
        duration: "3 Days, 2 Nights",
        pricePerAdult: 9500,
        type: "City",
        to_do_type: "Monsoon Special",
        image: [unsplash("1626621341517-bbf3d9990a23"), unsplash("1599661046289-e31897846e41")],
        description: [{
            main: ["The perfect getaway from Mumbai. Visit Tiger Point, Karla Caves, and the beautiful Bushi Dam."],
            included: ["Resort Stay", "Local Sightseeing AC Cab", "Lonavala Chikki Tasting", "Breakfast"],
            notIncluded: ["Theme park entry", "Personal Laundry", "Extra Meals"],
            expect: [["Day 1: Rajmachi Point & Karla Caves", "Day 2: Bushi Dam & Tiger Point", "Day 3: Wax Museum & Departure"]],
            additionalInfo: ["Best during Monsoon", "Try Chikki", "Beware of monkeys"],
            policy: ["72h cancellation for 100% refund."]
        }],
        rating: 4.7,
        totalRatings: 680,
        priceRange: "5000-10000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d37800.0!2d73.4!3d18.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be8bd84b57f7da1%3A0xdd24ed77318ba457!2sLonavala!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Kanyakumari: Land's End",
        location: "Tamil Nadu",
        duration: "3 Days, 2 Nights",
        pricePerAdult: 8500,
        type: "Group",
        to_do_type: "Sunrise & Sunset",
        image: [unsplash("1589308078059-be1415eab4c3"), unsplash("1571536802807-30451e3955d8")],
        description: [{
            main: ["The southernmost tip of India. Witness the confluence of three oceans and the Vivekananda Rock Memorial."],
            included: ["Sea View Hotel", "Ferry to Vivekananda Rock", "Kanyakumari Temple Guided Visit", "Breakfast"],
            notIncluded: ["Lunch & Dinner", "Personal Shopping", "Tips"],
            expect: [["Day 1: Sunset at the Tip", "Day 2: Sunrise & Vivekananda Rock Memorial", "Day 3: Padmanabhapuram Palace & Departure"]],
            additionalInfo: ["Sunset view is weather dependent", "Ferry can be crowded", "Great for shell items"],
            policy: ["72h cancellation for 100% refund."]
        }],
        rating: 4.8,
        totalRatings: 345,
        priceRange: "5000-10000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.0!2d77.5!3d8.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0416972607b03e9%3A0xad1bc921ff915f7d!2sKanyakumari!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Spiritual Ayodhya & Sarnath",
        location: "Uttar Pradesh",
        duration: "4 Days, 3 Nights",
        pricePerAdult: 11500,
        type: "Group",
        to_do_type: "Pilgrimage",
        image: [unsplash("1571536802807-30451e3955d8"), unsplash("1542314831-068cd1dbfeeb")],
        description: [{
            main: ["Journey to the birthplace of Lord Rama and the place where Buddha gave his first sermon."],
            included: ["Ram Janmabhoomi Darshan", "Sarnath Guided Tour", "AC Hotel Stay", "Breakfast & Dinner"],
            notIncluded: ["Personal Offerings", "Lunch", "Airport Pickup"],
            expect: [["Day 1: Arrival in Ayodhya", "Day 2: Ayodhya Temples & Sarayu River", "Day 3: Transfer to Sarnath/Varanasi", "Day 4: Sarnath Archeological Site & Departure"]],
            additionalInfo: ["Security check at Ram Mandir", "Modest clothing", "Limited non-veg options"],
            policy: ["5 days cancellation for 100% refund."]
        }],
        rating: 4.9,
        totalRatings: 920,
        priceRange: "10000-15000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14300.0!2d82.2!3d26.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3990fc26e63283f7%3A0xc6651811e5aa9a78!2sAyodhya!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Mahabaleshwar: Strawberry Land",
        location: "Maharashtra",
        duration: "3 Days, 2 Nights",
        pricePerAdult: 10500,
        type: "City",
        to_do_type: "Eco Retreat",
        image: [unsplash("1590483734724-383b853b317d"), unsplash("1626621341517-bbf3d9990a23")],
        description: [{
            main: ["The highest hill station in the Sahyadri range. Enjoy the strawberries of Mapro Garden and the scenic Venna Lake."],
            included: ["Hill View Resort", "Strawberry Farm Visit", "Sunset at Arthur's Seat", "Daily Breakfast"],
            notIncluded: ["Venna Lake Boating Fees", "Panchgani Entry", "Tips"],
            expect: [["Day 1: Arrival & Venna Lake", "Day 2: Mapro Garden & Arthur's Seat", "Day 3: Panchgani Table Land & Departure"]],
            additionalInfo: ["Best time: Nov-March", "Try fresh strawberry with cream", "Carry warm layer"],
            policy: ["72h cancellation for full refund."]
        }],
        rating: 4.7,
        totalRatings: 420,
        priceRange: "10000-15000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d37800.0!2d73.6!3d17.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7bd84b57f7da1%3A0xdd24ed77318ba457!2sMahabaleshwar!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Pondicherry: French Quarter Walk",
        location: "Pondicherry",
        duration: "3 Days, 2 Nights",
        pricePerAdult: 8900,
        type: "City",
        to_do_type: "Heritage Walk",
        image: [unsplash("1542314831-068cd1dbfeeb"), unsplash("1593693397690-362cb9666fc2")],
        description: [{
            main: ["Stroll through the colonial French Quarter and the spiritual Auroville."],
            included: ["Auroville Visit", "French Town Cycle Tour", "Breakfast"],
            notIncluded: ["Lunch", "Cycle rental security"],
            expect: [["Day 1: White Town Walk", "Day 2: Auroville", "Day 3: Departure"]],
            additionalInfo: ["Cycles are the best way to explore", "Try bakeries"],
            policy: ["Refundable up to 2 days prior."]
        }],
        rating: 4.7,
        totalRatings: 440,
        priceRange: "5000-10000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15600.0!2d79.8!3d11.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5361ab8e495115%3A0xd14694466236fa78!2sPuducherry!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Coorg: Misty Coffee Estates",
        location: "Karnataka",
        duration: "3 Days, 2 Nights",
        pricePerAdult: 11000,
        type: "Group",
        to_do_type: "Nature & Coffee",
        image: [unsplash("1559827291-72ee739d0d9a"), unsplash("1544735230-c12844578af3")],
        description: [{
            main: ["Explore the misty coffee estates and the Golden Temple in Madikeri."],
            included: ["Estate Homestay", "Plantation Tour", "Daily Breakfast"],
            notIncluded: ["Rafting fees", "Extra meals"],
            expect: [["Day 1: Abbey Falls", "Day 2: Talakaveri", "Day 3: Monastery"]],
            additionalInfo: ["Famous for spices", "Oct-March is best"],
            policy: ["72h cancellation."]
        }],
        rating: 4.8,
        totalRatings: 285,
        priceRange: "10000-15000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15600.0!2d75.7!3d12.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba5019d36e84d77%3A0x1cbad79901416bb7!2sMadikeri!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Sundarbans: Jungle Boat Safari",
        location: "West Bengal",
        duration: "3 Days, 2 Nights",
        pricePerAdult: 9800,
        type: "Adventure",
        to_do_type: "Wildlife Cruise",
        image: [unsplash("1589308078059-be1415eab4c3"), unsplash("1544735230-c12844578af3")],
        description: [{
            main: ["Spot the Royal Bengal Tiger in the world's largest mangrove forest."],
            included: ["Boat Safari", "Jungle Resort", "All Meals"],
            notIncluded: ["Camera Fees", "Tips"],
            expect: [["Day 1: Arrival", "Day 2: Safari", "Day 3: Village Walk"]],
            additionalInfo: ["Tiger spotting is rare", "Carry mosquito repellent"],
            policy: ["Non-refundable within 48h."]
        }],
        rating: 4.6,
        totalRatings: 210,
        priceRange: "5000-10000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14800.0!2d88.8!3d21.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0166649ea5b3a3%3A0x6b77f525501869e5!2sSundarbans!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Kaziranga: Rhino Heartland",
        location: "Assam",
        duration: "4 Days, 3 Nights",
        pricePerAdult: 19500,
        type: "Adventure",
        to_do_type: "Wildlife Safari",
        image: [unsplash("1591921312061-0b5c13b29013"), unsplash("1581452441999-56338b5840d2")],
        description: [{
            main: ["Spot the Great Indian One-horned Rhinoceros in the wild."],
            included: ["Jeep Safari", "Elephant Safari", "Guwahati Transfers"],
            notIncluded: ["Camera Fees", "Binocular Rental"],
            expect: [["Day 1: Arrival", "Day 2: Safari", "Day 3: Tea Discovery", "Day 4: Departure"]],
            additionalInfo: ["Closed in Monsoon", "Wear earthy colors"],
            policy: ["10 days cancellation."]
        }],
        rating: 4.7,
        totalRatings: 145,
        priceRange: "morethan15000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14300.0!2d93.3!3d26.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3744637e6fbe6595%3A0x6e903bc10257e10e!2sKaziranga!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Meghalaya: Clouds & Root Bridges",
        location: "Meghalaya",
        duration: "5 Days, 4 Nights",
        pricePerAdult: 24500,
        type: "Adventure",
        to_do_type: "Nature Trek",
        image: [unsplash("1544735230-c12844578af3"), unsplash("1621264426572-c51d95ec6be1")],
        description: [{
            main: ["Experience the Living Root Bridges and the wettest place on earth."],
            included: ["Root Bridge Trek", "Dawki Boating", "Homestay"],
            notIncluded: ["Lunch", "Airfare"],
            expect: [["Day 1: Shillong", "Day 2: Cherrapunji", "Day 3: Trek", "Day 4: Dawki", "Day 5: Return"]],
            additionalInfo: ["Carry rain gear", "Good shoes needed"],
            policy: ["7 days cancellation."]
        }],
        rating: 4.9,
        totalRatings: 112,
        priceRange: "morethan15000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14400.0!2d91.7!3d25.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375054d2d40e185d%3A0x107e3906a213e478!2sShillong!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Alleppey: Backwater Bliss",
        location: "Kerala",
        duration: "2 Days, 1 Night",
        pricePerAdult: 12000,
        type: "Adventure",
        to_do_type: "Houseboat Stay",
        image: [unsplash("1602216056096-3b40cc0c9944"), unsplash("1593693397690-362cb9666fc2")],
        description: [{
            main: ["Spend a night floating on the tranquil backwaters of Alleppey."],
            included: ["Private Houseboat", "All Meals", "Sunset Cruise"],
            notIncluded: ["Alcohol", "Personal Shopping"],
            expect: [["Day 1: Boarding & Cruise", "Day 2: Village tour & Morning Breakfast"]],
            additionalInfo: ["Enjoy traditional Kerala Karimeen Fry", "Best for couples"],
            policy: ["Full refund if cancelled 10 days before."]
        }],
        rating: 4.9,
        totalRatings: 320,
        priceRange: "10000-15000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.5!2d76.3!3d9.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0884f3c75c8247%3A0x35661d4b6848034a!2sAlappuzha!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Spiritual Badrinath & Kedarnath",
        location: "Uttarakhand",
        duration: "10 Days, 9 Nights",
        pricePerAdult: 48000,
        type: "Group",
        to_do_type: "Chardham Yatra",
        image: [unsplash("1545105526-4bcc4250f199"), unsplash("1593693397690-362cb9666fc2")],
        description: [{
            main: ["The ultimate pilgrimage to the Himalayan shrines of Lord Vishnu and Shiva."],
            included: ["Accommodation", "Langar Meals", "Guided Trekking", "AC Transport"],
            notIncluded: ["Pony/Doli Charges", "Helicopter Tickets", "Personal Tips"],
            expect: [["Day 1: Haridwar", "Day 2: Rishikesh", "Day 3: Kedarnath Trek", "Day 4: Kedarnath Darshan", "Day 5: Badrinath Transfer", "Day 6: Badrinath", "Day 7-10: Return"]],
            additionalInfo: ["Physical fitness needed", "Medical cert required", "Carry warm clothes"],
            policy: ["20 days cancellation for full refund."]
        }],
        rating: 4.9,
        totalRatings: 1560,
        priceRange: "morethan15000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13800.0!2d79.3!3d30.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3909d6373b5ae657%3A0x1aa05c1044458f27!2sBadrinath!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Hyderabad: City of Pearls",
        location: "Telangana",
        duration: "3 Days, 2 Nights",
        pricePerAdult: 11000,
        type: "City",
        to_do_type: "Heritage & Food",
        image: [unsplash("1582298538104-fe2e74c27f59"), unsplash("1542314831-068cd1dbfeeb")],
        description: [{
            main: ["Visit the Charminar, Golconda Fort and enjoy the world-famous Hyderabad Biryani."],
            included: ["Ramoji Film City Entry", "Charminar Walking Tour", "Luxury Hotel", "Breakfast"],
            notIncluded: ["Golconda Light & Sound Show", "Lunch in city"],
            expect: [["Day 1: Charminar & Salar Jung Museum", "Day 2: Ramoji Film City Full Day", "Day 3: Golconda Fort & Departure"]],
            additionalInfo: ["Try Karachi Bakery biscuits", "Best time: Oct-March"],
            policy: ["48h cancellation."]
        }],
        rating: 4.8,
        totalRatings: 340,
        priceRange: "10000-15000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15200.0!2d78.4!3d17.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaeeaeea%3A0xad1bc921ff915f7d!2sHyderabad!5e0!3m2!1sen!2sin!4v1680000000000"
    },
    {
        name: "Valley of Flowers: Alpine Meadows",
        location: "Uttarakhand",
        duration: "7 Days, 6 Nights",
        pricePerAdult: 26000,
        type: "Adventure",
        to_do_type: "Himalayan Trek",
        image: [unsplash("1621264426572-c51d95ec6be1"), unsplash("1590483734724-383b853b317d")],
        description: [{
            main: ["A UNESCO trek through blooming alpine flowers and meadows."],
            included: ["Trek Leaders", "Peak Permits", "Camping Gear", "All Meals"],
            notIncluded: ["Backpack offloading", "Personal gear"],
            expect: [["Day 1: Haridwar", "Day 2: Govindghat", "Day 3-5: Trekking Valley", "Day 6: Hemkund Sahib", "Day 7: Haridwar"]],
            additionalInfo: ["Open July-Sept only", "Raincoat mandatory"],
            policy: ["15 days cancellation."]
        }],
        rating: 4.9,
        totalRatings: 98,
        priceRange: "morethan15000",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13700.0!2d79.6!3d30.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39097746141c306d%3A0xe6796fd266399c9c!2sValley%20of%20Flowers!5e0!3m2!1sen!2sin!4v1680000000000"
    }
];

const indianHotels = [
    { name: "Taj View Agra", location: "Agra", description: "World-class luxury with direct Taj visibility.", image: unsplash("1566073771259-6a8506099945") },
    { name: "The Goa Sands Resort", location: "Goa", description: "Breathtaking beach access and premium spa.", image: unsplash("1540202404-a2f29016bb5d") },
    { name: "Kerala Heritage Palms", location: "Kerala", description: "Authentic Kerala architecture and wellness center.", image: unsplash("1589308078059-be1415eab4c3") },
    { name: "The Grand Dragon Ladakh", location: "Ladakh", description: "Oxygen-enriched rooms with mountain views.", image: unsplash("1584132967334-10e028bd69f7") },
    { name: "BrijRama Palace Varanasi", location: "Varanasi", description: "A heritage hotel right on the Ghats of Ganga.", image: unsplash("1542314831-068cd1dbfeeb") },
    { name: "Meenakshi Heritage Stay", location: "Tamil Nadu", description: "Traditional stay near the temple with modern comfort.", image: unsplash("1582719478250-c89cae4dc85b") },
    { name: "Ooty Misty Peaks", location: "Tamil Nadu", description: "Cozy cottage style resort with valley views.", image: unsplash("1544735230-c12844578af3") },
    { name: "The Oberoi Udaivilas", location: "Rajasthan", description: "Grand palace style resort on the banks of Lake Pichola.", image: unsplash("1615801905648-523c91350647") }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODBURL);
        console.log("Seeding with a MASSIVE collection of Indian tour packages...");

        await Package.deleteMany({});
        await Hotel.deleteMany({});
        await Room.deleteMany({});

        for (const p of indianPackages) {
            await Package.create(p);
        }

        for (const h of indianHotels) {
            await Hotel.create(h);
        }

        const hotels = await Hotel.find();
        const packages = await Package.find();

        for (const hotel of hotels) {
            const roomTypes = [
                { type: "Standard Classic", price: 3500, img: unsplash("1566665797739-1674de7a421a") },
                { type: "Premium Heritage", price: 6500, img: unsplash("1631049307264-da0ec9d70304") },
                { type: "Executive Suite", price: 9500, img: unsplash("1582719478250-c89cae4dc85b") }
            ];

            for (let i = 0; i < roomTypes.length; i++) {
                await Room.create({
                    hotel: hotel._id,
                    roomNumber: 201 + i,
                    type: roomTypes[i].type,
                    price: roomTypes[i].price,
                    images: [roomTypes[i].img],
                    description: `A beautiful ${roomTypes[i].type} offering comfort and luxury.`,
                    taken: false
                });
            }
        }

        console.log(`MASSIVE Seeding complete. Added ${packages.length} diverse Indian destinations with varied rooms.`);
        process.exit();
    } catch (e) {
        console.error("Seed Error:", e);
        process.exit(1);
    }
};

seedDB();
