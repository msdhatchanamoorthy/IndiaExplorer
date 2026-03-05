import mongoose from "mongoose";
import dotenv from "dotenv";
import Package from "./Models/packageModel.js";
import Hotel from "./Models/hotelModel.js";
import Room from "./Models/roomModel.js";

dotenv.config();

const indianPackages = [
    {
        name: "Golden Triangle: Delhi, Agra & Jaipur",
        location: "Agra",
        duration: "6 Days, 5 Nights",
        pricePerAdult: 45000,
        type: "HistoricalPlace",
        to_do_type: "Heritage Tour",
        image: [
            "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1548013146-72479768b921?q=80&w=800&auto=format&fit=crop"
        ],
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
        image: [
            "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=800&auto=format&fit=crop"
        ],
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
        image: [
            "/packages/ladakh.png",
            "https://images.unsplash.com/photo-1544735230-c12844578af3?q=80&w=800&auto=format&fit=crop"
        ],
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
        image: [
            "/packages/varanasi.png",
            "https://images.unsplash.com/photo-1571536802807-30451e3955d8?q=80&w=800&auto=format&fit=crop"
        ],
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
        image: [
            "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1540202404-a2f29016bb5d?q=80&w=800&auto=format&fit=crop"
        ],
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
        image: [
            "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1544735230-c12844578af3?q=80&w=800&auto=format&fit=crop"
        ],
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
        image: [
            "/packages/ooty.png",
            "https://images.unsplash.com/photo-1590483734724-383b853b317d?q=80&w=800&auto=format&fit=crop"
        ],
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
        image: [
            "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1615801905648-523c91350647?q=80&w=800&auto=format&fit=crop"
        ],
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
    }
];

const indianHotels = [
    { name: "Taj View Agra", location: "Agra", description: "World-class luxury with direct Taj visibility.", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800" },
    { name: "The Goa Sands Resort", location: "Goa", description: "Breathtaking beach access and premium spa.", image: "https://images.unsplash.com/photo-1540202404-a2f29016bb5d?w=800" },
    { name: "Kerala Heritage Palms", location: "Kerala", description: "Authentic Kerala architecture and wellness center.", image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800" },
    { name: "The Grand Dragon Ladakh", location: "Ladakh", description: "Oxygen-enriched rooms with mountain views.", image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800" },
    { name: "BrijRama Palace Varanasi", location: "Varanasi", description: "A heritage hotel right on the Ghats of Ganga.", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800" },
    { name: "Meenakshi Heritage Stay", location: "Tamil Nadu", description: "Traditional stay near the temple with modern comfort.", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800" },
    { name: "Ooty Misty Peaks", location: "Tamil Nadu", description: "Cozy cottage style resort with valley views.", image: "https://images.unsplash.com/photo-1590483734724-383b853b317d?w=800" },
    { name: "The Oberoi Udaivilas", location: "Rajasthan", description: "Grand palace style resort on the banks of Lake Pichola.", image: "https://images.unsplash.com/photo-1615801905648-523c91350647?w=800" }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODBURL);
        console.log("Seeding with comprehensive Indian tour packages...");

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

        // 3) Create Rooms and Link Hotels to Packages
        for (const hotel of hotels) {
            // Add variety of rooms for each hotel
            const roomTypes = [
                { type: "Standard Classic", price: 3500, img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800" },
                { type: "Premium Heritage", price: 6500, img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800" },
                { type: "Executive Suite", price: 9500, img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800" }
            ];

            for (let i = 0; i < roomTypes.length; i++) {
                await Room.create({
                    hotel: hotel._id,
                    roomNumber: 201 + i,
                    type: roomTypes[i].type,
                    price: roomTypes[i].price,
                    images: [roomTypes[i].img],
                    description: `A beautiful ${roomTypes[i].type} offering comfort and luxury in ${hotel.location}.`,
                    taken: false
                });
            }

            // Link this hotel to a package with matching location
            const matchedPkg = packages.find(p => p.location.includes(hotel.location) || hotel.location.includes(p.location));
            if (matchedPkg) {
                // If the package model supports it, we could update it, 
                // but the fetch uses package ID to find hotels by location often.
                // Let's ensure locations match exactly for the fetch logic to work.
            }
        }

        console.log("Seeding complete. Added 8 major Indian destinations with varied rooms.");
        process.exit();
    } catch (e) {
        console.error("Seed Error:", e);
        process.exit(1);
    }
};

seedDB();
