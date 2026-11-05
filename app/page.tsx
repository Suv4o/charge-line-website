import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreButton } from "@/components/AppStoreButton";
import { Icon, type IconName } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { Screen } from "@/components/Screen";
import {
  faq,
  freeFeatures,
  hero,
  networks,
  premiumFeatures,
  premiumSmallPrint,
  prices,
  site,
  steps,
  type Feature,
} from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { homeGraph } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({ path: "/", description: site.description });

const freeIcons: IconName[] = ["route", "choices", "cup", "warning", "pin", "chat", "navigate", "home"];
const premiumIcons: IconName[] = ["live", "weather", "cost", "sliders", "send", "carplay", "learn", "bookmark"];

function Features({ items, icons }: { items: Feature[]; icons: IconName[] }) {
  return (
    <ul className="features">
      {items.map((feature, index) => (
        <li key={feature.title} className="feature">
          <span className="icon-tile">
            <Icon name={icons[index]} />
          </span>
          <h3>{feature.title}</h3>
          <p>{feature.body}</p>
        </li>
      ))}
    </ul>
  );
}

function Checks({ items }: { items: string[] }) {
  return (
    <ul className="checks">
      {items.map((item) => (
        <li key={item}>
          <Icon name="check" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <>
      <JsonLd data={homeGraph} />

      <section className="hero" aria-labelledby="hero-heading">
        <div className="container">
          <div className="hero-copy">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1 id="hero-heading">{hero.heading}</h1>
            <p className="lead">{hero.lead}</p>
            <div className="hero-actions">
              <AppStoreButton />
              <a className="button button-quiet" href="#how-it-works">
                See how it works
              </a>
            </div>
            <ul className="hero-points" aria-label="At a glance">
              {hero.points.map((point) => (
                <li key={point}>
                  <Icon name="check" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="hero-phones">
            <Screen screen="trip" priority sizes="(max-width: 860px) 260px, 300px" />
            <Screen screen="stops" className="second" priority sizes="260px" />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section" aria-labelledby="how-heading">
        <div className="container">
          <div className="section-head">
            <h2 id="how-heading">Three steps to your next road trip</h2>
            <p>
              No account and nothing to set up beyond your car. Charge Line does the maths on range, charging speed and
              hills, so you can just drive.
            </p>
          </div>
          <ol className="steps">
            {steps.map((step, index) => (
              <li key={step.title}>
                <span className="step-number" aria-hidden="true">
                  {index + 1}
                </span>
                <h3>
                  <span className="visually-hidden">Step {index + 1}: </span>
                  {step.title}
                </h3>
                <p>{step.body}</p>
                <Screen screen={step.screen} sizes="(max-width: 860px) 70vw, 260px" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="features" className="section" aria-labelledby="features-heading">
        <div className="container">
          <div className="section-head">
            <h2 id="features-heading">Free, as often as you drive</h2>
            <p>
              Unlimited trip planning and every safety warning cost nothing, for as long as you use the app. No account, no ads.
            </p>
          </div>
          <Features items={freeFeatures} icons={freeIcons} />

          <div className="showcase" style={{ marginTop: "clamp(64px, 9vw, 112px)" }}>
            <div className="showcase-copy">
              <h3>Know the charger before you get there</h3>
              <p>
                Chargers near you on a map, with their power and plugs. Open one for its photos, opening hours, how to pay
                and what&apos;s within a short walk, and see what other drivers found.
              </p>
              <Checks
                items={[
                  "When someone last charged there, and what they paid",
                  "Tap It worked or It didn't to help the next driver",
                  "Anonymous: no account, nothing that identifies you",
                ]}
              />
            </div>
            <div className="showcase-shots">
              <Screen screen="chargers" sizes="(max-width: 860px) 44vw, 270px" />
              <Screen screen="reports" sizes="(max-width: 860px) 44vw, 270px" />
            </div>
          </div>

          <div className="showcase">
            <div className="showcase-shots">
              <Screen screen="sentToTesla" sizes="(max-width: 860px) 44vw, 270px" />
              <Screen screen="googleMaps" sizes="(max-width: 860px) 44vw, 270px" />
            </div>
            <div className="showcase-copy">
              <h3>Drive a Tesla, or anything else</h3>
              <p>
                Plans work for any electric car sold in Australia. When it&apos;s time to go, hand the trip to the app you
                navigate with.
              </p>
              <Checks
                items={[
                  "Google Maps takes the whole trip, every stop in order",
                  "Apple Maps takes it one stop at a time",
                  "Tesla owners can send the whole trip to the car (Premium)",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="premium" className="section premium" aria-labelledby="premium-heading">
        <div className="container">
          <div className="section-head">
            <span className="pill">Premium</span>
            <h2 id="premium-heading">More for the longer drives</h2>
            <p>
              Live charger status, weather on the way and what the trip will cost, with CarPlay and your Tesla. Try it free
              for 7 days.
            </p>
          </div>
          <Features items={premiumFeatures} icons={premiumIcons} />

          <div className="showcase">
            <div className="showcase-copy">
              <h3>Weather on the way, counted in the plan</h3>
              <p>
                A headwind or a cold morning can use far more energy. Premium plans with the forecast for each part of the
                road at the time you&apos;ll drive it, and shows the weather at every stop and when you arrive.
              </p>
              <Checks
                items={[
                  "Temperature, wind and rain along the route",
                  "What each stop and the whole trip will cost",
                  "Live status, and a new plan around a charger that's down",
                ]}
              />
            </div>
            <div className="showcase-shots">
              <Screen screen="weather" sizes="(max-width: 860px) 44vw, 270px" />
              <Screen screen="cost" sizes="(max-width: 860px) 44vw, 270px" />
            </div>
          </div>

          <ul className="prices" aria-label="Premium prices">
            {prices.map((price) => (
              <li key={price.name} className={`price${price.name === "Yearly" ? " highlight" : ""}`}>
                <h3>{price.name}</h3>
                <p className="amount">
                  {price.price}
                  <span className="per">{price.per}</span>
                </p>
                <p className="note">{price.note}</p>
              </li>
            ))}
          </ul>
          <p className="small-print">
            {premiumSmallPrint} Your arrival battery, plan B and every other safety warning are free for everyone.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="duo-heading">
        <div className="container">
          <div className="section-head">
            <h2 id="duo-heading">Unfold for the whole trip</h2>
            <p>On iPhone Duo, the trip sits beside the map: every stop on one side, the route on the other.</p>
          </div>
          <div className="duo-wrap">
            <Screen screen="duoTrip" />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="networks-heading" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <h2 id="networks-heading">Every major network</h2>
            <p>
              Choose the networks you use, and plans stick to them. The charger list is rebuilt every day from OpenStreetMap
              and Open Charge Map.
            </p>
          </div>
          <ul className="chips">
            {networks.map((network) => (
              <li key={network}>{network}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="questions" className="section" aria-labelledby="questions-heading" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <h2 id="questions-heading">Questions</h2>
            <p>
              Anything else? See <Link href="/support">Support</Link> or email{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </div>
          <div className="faq">
            {faq.map(({ question, answer }) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="container" aria-labelledby="cta-heading">
        <div className="cta">
          <h2 id="cta-heading">Your next road trip, planned for your car</h2>
          <p>Charge Line is free on iPhone. Plan as often as you drive, and add Premium when the trip calls for it.</p>
          <div className="hero-actions">
            <AppStoreButton />
          </div>
        </div>
      </section>
    </>
  );
}
