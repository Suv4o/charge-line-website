#!/bin/zsh
# Makes the site's images with macOS's own sips (no image packages):
#   - app screenshots, as AVIF with a JPEG fallback, at 1x and 2x widths (public/screens/)
#   - the favicons and app icons from the logo (app/, public/icons/)
#   - the social preview image (public/opengraph-image.png, via scripts/og.swift)
#
# Usage: npm run images -- "<App Store screenshots folder>"
# The folder is the one with 01-trip.png … (Desktop/Charge Line App Store): the raw screenshots, not the
# captioned ones. They stay outside the repo; only the sized copies here are committed.
set -euo pipefail
SRC=${1:?"the App Store screenshots folder"}
HERE=${0:A:h}/..
LOGO=$HERE/../design-system/assets/logo.svg
APPICON=$HERE/../app/ChargeLine/Resources/Assets.xcassets/AppIcon.appiconset/AppIcon.png
mkdir -p $HERE/public/screens $HERE/public/icons

# name on the site <- file in the screenshots folder, then the 1x width
shots=(
  trip            01-trip.png                   400
  weather         02-weather.png                400
  stops           03-stops.png                  400
  chargers        05-chargers-nearby.png        400
  choose-car      07-choose-car.png             400
  sent-to-tesla   09-sent-to-tesla.png          400
  google-maps     10-google-maps.png            400
  cost            Spares/11-cost.png            400
  reports         Spares/13-reports.png         400
  duo-trip        "iPhone Duo (open)/duo-1-trip.png" 960
)
for name file width in $shots; do
  for scale in 1 2; do
    w=$(( width * scale ))
    sips --resampleWidth $w -s format avif -s formatOptions 70 "$SRC/$file" --out $HERE/public/screens/$name-$w.avif >/dev/null
    sips --resampleWidth $w -s format jpeg -s formatOptions 78 "$SRC/$file" --out $HERE/public/screens/$name-$w.jpg >/dev/null
  done
  echo "$name"
done

# Icons: the logo (rounded, transparent) for browsers; the App Store icon (square: iOS rounds it) for Apple
cp $LOGO $HERE/app/icon.svg
for size in 16 32 48 192 512; do
  sips -s format png -z $size $size $LOGO --out $HERE/public/icons/icon-$size.png >/dev/null
done
sips -s format png -z 180 180 $APPICON --out $HERE/app/apple-icon.png >/dev/null
node $HERE/scripts/favicon.mjs $HERE/public/icons/icon-16.png $HERE/public/icons/icon-32.png $HERE/public/icons/icon-48.png $HERE/app/favicon.ico
rm $HERE/public/icons/icon-16.png $HERE/public/icons/icon-48.png
echo icons

swift $HERE/scripts/og.swift "$SRC/01-trip.png" $LOGO $HERE/public/opengraph-image.png
echo "social image"
