import { duo, phone, screens } from "@/content/site";

type Props = {
  screen: keyof typeof screens;
  /** The hero's first screenshot loads straight away; the rest load as they come into view. */
  priority?: boolean;
  /** How wide it shows, for the browser to pick 1x or 2x (CSS sizes syntax). */
  sizes?: string;
  className?: string;
};

/** An app screenshot in a phone (or iPhone Duo) frame: AVIF, with JPEG for browsers without it. */
export function Screen({ screen, priority = false, sizes, className = "" }: Props) {
  const { name, alt } = screens[screen];
  const isDuo = name.startsWith("duo-");
  const { width, height } = isDuo ? duo : phone;
  const src = (w: number, ext: string) => `/screens/${name}-${w}.${ext}`;
  const srcSet = (ext: string) => `${src(width, ext)} ${width}w, ${src(width * 2, ext)} ${width * 2}w`;
  const shownSizes = sizes ?? (isDuo ? "(max-width: 1000px) 92vw, 960px" : "(max-width: 860px) 70vw, 300px");

  return (
    <div className={`${isDuo ? "duo" : "phone"} ${className}`.trim()}>
      <picture>
        <source type="image/avif" srcSet={srcSet("avif")} sizes={shownSizes} />
        <img
          src={src(width * 2, "jpg")}
          srcSet={srcSet("jpg")}
          sizes={shownSizes}
          width={width}
          height={height}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
        />
      </picture>
    </div>
  );
}
