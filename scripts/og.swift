// The social preview image (Open Graph / X): 1200 × 630, Charge Line's navy, the logo, a headline and
// the trip screenshot. Usage: swift og.swift <trip screenshot.png> <logo.svg> <out.png>
import AppKit

let args = CommandLine.arguments
let shot = NSImage(contentsOfFile: args[1])!, logo = NSImage(contentsOfFile: args[2])!
let out = URL(fileURLWithPath: args[3])

func color(_ hex: Int, _ alpha: CGFloat = 1) -> NSColor {
    NSColor(srgbRed: CGFloat((hex >> 16) & 0xFF) / 255, green: CGFloat((hex >> 8) & 0xFF) / 255, blue: CGFloat(hex & 0xFF) / 255, alpha: alpha)
}
let navy = color(0x173353), navyLight = color(0x37506E), navyDeep = color(0x0D1F33), paper = color(0xFFFCF8)
let mist = color(0xA6B6C7), coral = color(0xEE5F53)

let width = 1200, height = 630
let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: width, pixelsHigh: height, bitsPerSample: 8, samplesPerPixel: 4,
                           hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
NSGraphicsContext.saveGraphicsState()
let cg = NSGraphicsContext(bitmapImageRep: rep)!.cgContext
cg.translateBy(x: 0, y: CGFloat(height))
cg.scaleBy(x: 1, y: -1)
NSGraphicsContext.current = NSGraphicsContext(cgContext: cg, flipped: true)

// Background: the hero gradient, lighter towards the top right
navyDeep.setFill()
NSRect(x: 0, y: 0, width: width, height: height).fill()
NSGradient(colors: [navyLight, navy, navyDeep], atLocations: [0, 0.45, 1], colorSpace: .sRGB)!
    .draw(fromCenter: NSPoint(x: 1020, y: 0), radius: 0, toCenter: NSPoint(x: 1020, y: 0), radius: 1100, options: [])

// Logo and name
logo.draw(in: NSRect(x: 80, y: 84, width: 76, height: 76), from: .zero, operation: .sourceOver, fraction: 1, respectFlipped: true, hints: nil)
NSAttributedString(string: "Charge Line", attributes: [.font: NSFont.systemFont(ofSize: 44, weight: .bold), .foregroundColor: paper])
    .draw(at: NSPoint(x: 176, y: 94))

// Headline and line under it
let style = NSMutableParagraphStyle()
style.lineHeightMultiple = 0.95
NSAttributedString(string: "EV road trips across Australia, planned for your car", attributes: [
    .font: NSFont.systemFont(ofSize: 62, weight: .heavy), .foregroundColor: paper, .paragraphStyle: style])
    .draw(with: NSRect(x: 80, y: 206, width: 640, height: 240), options: [.usesLineFragmentOrigin, .usesFontLeading])
NSAttributedString(string: "Where to charge, and for how long. Free on iPhone.", attributes: [
    .font: NSFont.systemFont(ofSize: 27, weight: .medium), .foregroundColor: mist])
    .draw(with: NSRect(x: 80, y: 470, width: 640, height: 80), options: [.usesLineFragmentOrigin])
coral.setFill()
NSBezierPath(roundedRect: NSRect(x: 80, y: 570, width: 96, height: 8), xRadius: 4, yRadius: 4).fill()

// The trip, in a phone-shaped frame running off the bottom
let shotWidth: CGFloat = 330
let frame = NSRect(x: 800, y: 56, width: shotWidth, height: shotWidth * shot.size.height / shot.size.width)
let radius: CGFloat = 44
NSGraphicsContext.saveGraphicsState()
let shadow = NSShadow()
shadow.shadowColor = NSColor.black.withAlphaComponent(0.5)
shadow.shadowBlurRadius = 40
shadow.shadowOffset = NSSize(width: 0, height: -12)
shadow.set()
navyDeep.setFill()
NSBezierPath(roundedRect: frame, xRadius: radius, yRadius: radius).fill()
NSGraphicsContext.restoreGraphicsState()
NSGraphicsContext.saveGraphicsState()
NSBezierPath(roundedRect: frame, xRadius: radius, yRadius: radius).addClip()
shot.draw(in: frame, from: .zero, operation: .sourceOver, fraction: 1, respectFlipped: true, hints: nil)
NSGraphicsContext.restoreGraphicsState()
NSColor.white.withAlphaComponent(0.2).setStroke()
let border = NSBezierPath(roundedRect: frame, xRadius: radius, yRadius: radius)
border.lineWidth = 3
border.stroke()

NSGraphicsContext.restoreGraphicsState()
try rep.representation(using: .png, properties: [:])!.write(to: out)
