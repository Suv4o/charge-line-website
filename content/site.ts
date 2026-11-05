// Everything the site says about Charge Line, in one place: the pages, the structured data (JSON-LD) and
// the files for AI agents (llms.txt) all read from here, so they can't drift apart. Facts match the App
// Store listing (app/AppStore/listing.md).

export const site = {
  name: "Charge Line",
  url: "https://chargeline.au",
  tagline: "EV road trips across Australia",
  title: "Charge Line: EV road trips across Australia, planned for your car",
  /** For search results and link previews: under 160 characters. */
  description:
    "Plan EV road trips across Australia: where to charge, how long for, and the battery you'll arrive with. Free on iPhone; Premium adds live status and weather.",
  /** The longer summary, for agents (llms.txt) and structured data. */
  summary:
    "Charge Line plans electric-vehicle road trips across Australia: where to charge, how long for, and the battery you'll arrive with. Free on iPhone, with Premium for live charger status, weather on the way and CarPlay.",
  email: "chargeline.app@gmail.com",
  /** The App Store page, once the app is live. Until then the site says "Coming soon". */
  appStoreUrl: null as string | null,
  /** Charge Line's public list of Australia's chargers (ODbL). */
  chargerDataUrl: "https://charge-line-server.fly.dev/v1/chargers/au",
  /** When the site's content last changed (sitemap, structured data). */
  updated: "2026-11-05",
  locale: "en-AU",
  requires: "iOS 26 or later",
  carModels: 226,
  carBrands: 47,
} as const;

/** The app's screens on the site, sized by scripts/images.sh (1320 × 2868 phone, 2853 × 2007 Duo). */
export const screens = {
  trip: {
    name: "trip",
    alt: "A Melbourne to Sydney Opera House trip in Charge Line: the route on a map with three charging stops, a choice of Fastest, Fewest stops or Most reliable, and the totals: 9 h 47 min, 30 min of it charging, arriving at 5:47 pm.",
  },
  stops: {
    name: "stops",
    alt: "The trip's three charging stops, RACV in Euroa, Tarcutta Roadhouse and Sally's Corner, each with the battery on arrival and when leaving, the charging time, the weather and how many stalls are free.",
  },
  weather: {
    name: "weather",
    alt: "The trip's totals and charging cost, about $57, then the weather on the way: 19 degrees and mostly clear at the Sydney Opera House on arrival, 10 to 20 degrees on the way and a headwind up to 20 km/h.",
  },
  chargers: {
    name: "chargers",
    alt: "Chargers near you in Melbourne on a map, showing only those free right now, such as Chargefox South Wharf with 3 of 3 stalls free.",
  },
  chooseCar: {
    name: "choose-car",
    alt: "Choosing your car from the models sold in Australia: a Tesla Model 3 Premium Long Range RWD with a 79 kWh battery and 750 km rated range is selected.",
  },
  sentToTesla: {
    name: "sent-to-tesla",
    alt: "Sent to your Tesla: the route is in the car's navigation, with its charging stops in order.",
  },
  googleMaps: {
    name: "google-maps",
    alt: "A trip for a Hyundai IONIQ 5 with its three charging stops, and a button to navigate the whole trip with Google Maps.",
  },
  cost: {
    name: "cost",
    alt: "The trip's charging cost: about $57 for 85 kWh at three charging stops, with each stop's energy, price and cost.",
  },
  reports: {
    name: "reports",
    alt: "A charger's details: how to pay, a Charged here? question with It worked and It didn't buttons, its typical price per kWh, and the toilets and food nearby.",
  },
  duoTrip: {
    name: "duo-trip",
    alt: "Charge Line on iPhone Duo, unfolded: the whole Melbourne to Sydney trip in a panel beside the map of the route.",
  },
} as const;

export const phone = { width: 400, height: 869 };
export const duo = { width: 960, height: 675 };

export type Feature = { title: string; body: string };

export const hero = {
  eyebrow: "The EV trip planner for Australia",
  heading: "Plan any EV road trip across Australia",
  lead: "Choose your car and where you're going. Charge Line picks where to charge, how long to charge for, and the battery you'll arrive with at every stop.",
  points: ["Free, unlimited planning", "226 car models", "Every major network"],
};

export const steps: (Feature & { screen: keyof typeof screens })[] = [
  {
    title: "Choose your car",
    body: "Pick from 226 models sold in Australia. Its battery, plugs and charging speed shape every plan, and you can set how healthy your battery is today.",
    screen: "chooseCar",
  },
  {
    title: "Say where you're going",
    body: "Charge Line plans the route and the stops, counting hills and highway speeds. Compare Fastest, Fewest stops and Most reliable side by side.",
    screen: "trip",
  },
  {
    title: "Drive it, stop by stop",
    body: "Every stop shows the battery you'll arrive and leave with, how long to charge, and the cafés, food and toilets within a short walk.",
    screen: "stops",
  },
];

export const freeFeatures: Feature[] = [
  {
    title: "Unlimited trip planning",
    body: "Charging stops chosen for your car's battery, plugs and range, counting hills and highway speeds. Plan as often as you drive.",
  },
  {
    title: "Fastest, Fewest stops or Most reliable",
    body: "See all three side by side. Most reliable keeps the next charger along in reach at every stop, in case one isn't working.",
  },
  {
    title: "Somewhere to stop",
    body: "Cafés, food, toilets and playgrounds within a short walk of each charging stop.",
  },
  {
    title: "Warnings that matter",
    body: "Told when a stop has no backup charger in reach, or when you'd arrive below your target. Safety warnings are always free.",
  },
  {
    title: "Chargers near you",
    body: "A map of chargers around you, with their power, plugs and what's nearby. Photos, opening hours and how to pay at each one.",
  },
  {
    title: "Other drivers' reports",
    body: "When someone last charged there, and what they paid. Tap It worked or It didn't to help the next driver: anonymous, no account.",
  },
  {
    title: "Navigate in one tap",
    body: "Send the whole trip to Google Maps, every stop in order, or each stop to Apple Maps. Tesla owners can send their destination to the car.",
  },
  {
    title: "Your places",
    body: "Home and Work shortcuts and your recent searches, kept on your iPhone.",
  },
];

export const premiumFeatures: Feature[] = [
  {
    title: "Live charger status",
    body: "Free, in use or out of service at your charging stops, and a new plan around any charger that's down.",
  },
  {
    title: "Weather on the way",
    body: "The forecast at each stop and when you arrive, and plans that count headwinds, cold and rain.",
  },
  {
    title: "What it will cost",
    body: "What each stop and the whole trip will cost to charge, at each network's typical price or your own.",
  },
  {
    title: "Your trip, your way",
    body: "Add your own stops on the way, swap or remove charging stops, and set how much to charge.",
  },
  {
    title: "Send it to your Tesla",
    body: "The whole trip, every charging stop, straight into the car's navigation, and its battery read from the car.",
  },
  {
    title: "CarPlay",
    body: "The trip's charging stops and the chargers near you on your car's screen.",
  },
  {
    title: "Plans that learn",
    body: "Record how a trip went, and plans adjust to how your car really drives.",
  },
  {
    title: "Unlimited saved trips",
    body: "Free plans keep three saved trips. Premium keeps them all.",
  },
];

export const prices = [
  { name: "Monthly", price: "A$6.99", per: "a month", note: "7-day free trial for new subscribers" },
  { name: "Yearly", price: "A$59.99", per: "a year", note: "7-day free trial for new subscribers. About 28% less than monthly." },
  { name: "Road Trip Pass", price: "A$4.99", per: "for 7 days", note: "7 days of Premium for one trip. Doesn't renew." },
];

export const premiumSmallPrint =
  "Subscriptions are charged to your Apple Account and renew automatically unless cancelled at least 24 hours before the end of the current period. A free trial becomes a paid subscription at its end unless you cancel. Manage or cancel in your Apple Account settings.";

export const networks = ["Tesla Supercharger", "Evie", "Chargefox", "Ampol AmpCharge", "BP Pulse", "NRMA", "Jolt"];

export const faq: { question: string; answer: string }[] = [
  {
    question: "Is Charge Line free?",
    answer:
      "Yes. Planning trips is free and unlimited, with every safety warning. Free plans keep three saved trips. Premium adds live charger status, weather on the way, charging costs, your own stops, sending trips to a Tesla and CarPlay, for A$6.99 a month or A$59.99 a year (each with a 7-day free trial for new subscribers), or a 7-day Road Trip Pass for A$4.99.",
  },
  {
    question: "Which cars does it work with?",
    answer:
      "Any electric car sold in Australia. Choose yours from 226 models across 47 brands, including Tesla, BYD, Kia, Hyundai, MG, BMW, Polestar and Volvo. Its battery, plugs and charging speed shape the plan, and you can set your battery's health.",
  },
  {
    question: "Do I need a Tesla?",
    answer:
      "No. Charge Line plans trips for any EV, and hands the whole trip to Google Maps, or each stop to Apple Maps. Tesla owners can also send the whole trip to the car's navigation with Premium.",
  },
  {
    question: "Which charging networks does it use?",
    answer:
      "Tesla Superchargers, Evie, Chargefox, Ampol AmpCharge, BP Pulse, NRMA and Jolt, and other chargers on the map. Choose the networks you use, and plans stick to them.",
  },
  {
    question: "Where does the charger information come from?",
    answer:
      "Charge Line's list of Australia's chargers is built every day from OpenStreetMap and Open Charge Map, with photos, opening hours and ways to pay. Drivers' reports add when someone last charged and what they paid. With Premium, live status comes from Google Maps for networks that share it.",
  },
  {
    question: "Do I need an account? What happens to my data?",
    answer:
      "No account. No ads and no analytics. Your car, trips and searches stay on your iPhone. The privacy policy explains what's sent to other services to plan a trip, and why.",
  },
  {
    question: "Is it on Android, or outside Australia?",
    answer: "Charge Line is for iPhone (iOS 26 or later) and CarPlay, and plans trips in Australia only.",
  },
  {
    question: "When can I get it?",
    answer: "Charge Line is coming soon to the App Store. Email chargeline.app@gmail.com with any questions.",
  },
];
