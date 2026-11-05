# Privacy policy

Charge Line · last updated 5 November 2026

Charge Line is an iPhone app, with CarPlay, that plans electric-vehicle road trips in Australia and can send them to the driver's own Tesla. It has no accounts, no advertising and no analytics, and it doesn't sell or share your data.

## What stays on your iPhone

Your car and battery profile, preferences, saved trips, Home and Work, recent searches and the trip records used to learn how your car drives are stored only on your iPhone. A recent search is only the text you typed. For Home or Work chosen from Google, only Google's place ID is kept, with its location for at most 30 days. The counts of how much of the free plan you've used this month and today are also kept only on your iPhone, in its Keychain, so that reinstalling the app doesn't reset them. The app also remembers, for 30 days, which chargers you sent a report about and when, so it can show it.

## What is sent to other services

To plan trips and find chargers, the app sends only what each request needs, when you use it:

- **Your location**, with your permission, to start a trip from where you are and to show chargers near you on the iPhone or in CarPlay. Chargers are found on the iPhone, in Charge Line's charger list; your location is sent only with the requests below, and isn't stored by Charge Line.
- **Charge Line's charger list**: once a day the app downloads Australia's chargers and the places near them (from OpenStreetMap and Open Charge Map) from Charge Line's server. The download carries no location. When you look at a charger, its photos are loaded from Open Charge Map's servers, and the latest summary of drivers' reports from Charge Line's server.
- **Your reports about a charger**: when you tap "It worked" or "It didn't" on a charger, the app sends Charge Line's server which charger it was, whether charging worked and anything you add: the price per kWh you paid, how you paid, or what went wrong. A report has no account, name or device ID, and no location other than the charger's. Other drivers see only a summary for each charger: when someone last charged there, how many reports there were in the last 30 days, the middle price reported and how drivers paid.
- **Google Maps Platform** (Routes API, Places API and the Maps SDK) receives your start, destination and stops to plan the route, and the text you type when searching for a place. With Premium, it receives the location of your charging stops, or of a charger you open, to check its live availability. If a trip can't be planned with Charge Line's charger list, or before the app has downloaded it, Google also receives the route or your location to find chargers. When you tap Photos on Google Maps, Google receives the charger's location and network name to find its place, then Google Maps opens on it. Google's handling is described in the [Google Privacy Policy](https://policies.google.com/privacy).
- **Open Charge Map** receives the route line or your location, through Charge Line's server, only before the app has downloaded its charger list.
- **Weather on the way** (Premium): when you plan a trip, the app sends Charge Line's server points along the route, about every 50 km, and the hours you'll be driving. The server asks MET Norway (the Norwegian Meteorological Institute) for the forecast at each point, rounded to about 10 km. MET Norway sees only Charge Line's server, never your iPhone.
- **Amazon Web Services** serves the public elevation data the app downloads for the area of your route, to estimate the energy used on hills.
- When you tap Navigate or Directions, the stop is handed to Google Maps or Apple Maps on your iPhone.

## Tesla

Connecting a Tesla is optional. When you sign in with your Tesla account and approve it, Charge Line receives OAuth tokens with the scopes `openid`, `offline_access`, `vehicle_device_data` and `vehicle_cmds`. It uses them only to:

- list the vehicles on your account;
- check whether the vehicle has approved Charge Line's key and which command protocol it uses;
- read the battery level and charge limit, and the live stall counts of nearby Superchargers;
- wake the vehicle, when you ask; and
- send a trip you planned (destination and charging stops) to the vehicle's navigation.

Your Tesla tokens are stored only on your iPhone, in its Keychain.

## Charge Line's server

Requests to Tesla and Open Charge Map pass through Charge Line's server, hosted on Fly.io in Sydney, which adds the app's credentials and signs Tesla commands with Charge Line's key. The server also builds the charger list each day from OpenStreetMap and Open Charge Map, and asks MET Norway for the weather on the way. It keeps each forecast in memory for about half an hour, by place rounded to about 10 km, so drivers on the same road share it; it isn't linked to anyone. The server stores no tokens, locations, vehicle data or trips; its logs record only the kind of request, its result and how long it took, plus an error message when a request fails. It keeps drivers' reports (above) for 180 days. With each report it keeps a one-way code made from the internet address the report came from, so that abuse, such as a flood of made-up reports, can be stopped; the address itself isn't kept.

## Purchases

Charge Line Premium is bought through Apple's In-App Purchase. Apple handles the payment, and Charge Line never sees your payment details or Apple Account. The app receives from Apple only what it needs to unlock Premium: which plan you bought, when it started and ends, and whether it was refunded. Apple's handling is described in the [Apple Privacy Policy](https://www.apple.com/legal/privacy/).

## Removing your data

- Deleting the app removes the data it stores on your iPhone, except Keychain items. Sign out of Tesla in the app's Settings first to delete your Tesla tokens.
- Remove Charge Line's key from the vehicle's **Locks** screen, and revoke its access in your Tesla account's security settings.
- Cancel a subscription in Settings › Manage subscription or in your Apple Account settings.
- Reports about chargers aren't linked to you. To have one removed, email us with the charger and when you sent it.

## This website

This website uses no cookies and no analytics. If you choose light or dark appearance, your browser remembers the choice; it isn't sent anywhere. The site is hosted on Vercel, which keeps logs of visits, such as the internet address, browser and page, to run and protect its service, as described in [Vercel's privacy policy](https://vercel.com/legal/privacy-policy).

## Contact

Email [chargeline.app@gmail.com](mailto:chargeline.app@gmail.com), or see [Support](/support).
