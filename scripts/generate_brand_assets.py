"""Generate brand assets (favicon + Open Graph card) for the portfolio.

Usage:  python scripts/generate_brand_assets.py
Outputs: public/favicon.png, public/og-image.png
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"

INK = (17, 24, 39, 255)
GRAY = (107, 114, 128, 255)
LIGHT = (229, 231, 235, 255)

FONT_CANDIDATES = {
    "bold": ["segoeuib.ttf", "arialbd.ttf", "calibrib.ttf"],
    "semi": ["seguisb.ttf", "arial.ttf", "calibri.ttf"],
    "regular": ["segoeui.ttf", "arial.ttf", "calibri.ttf"],
}


def load_font(weight: str, size: int) -> ImageFont.FreeTypeFont:
    for name in FONT_CANDIDATES[weight]:
        path = Path("C:/Windows/Fonts") / name
        if path.exists():
            return ImageFont.truetype(str(path), size)
    raise RuntimeError(f"No usable font found for {weight}")


def draw_centered(draw, box, text, font, fill):
    left, top, right, bottom = box
    l, t, r, b = draw.textbbox((0, 0), text, font=font)
    x = left + (right - left - (r - l)) / 2 - l
    y = top + (bottom - top - (b - t)) / 2 - t
    draw.text((x, y), text, font=font, fill=fill)


def build_favicon() -> None:
    scale = 4
    size = 256
    img = Image.new("RGBA", (size * scale, size * scale), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    radius = int(size * scale * 0.22)
    draw.rounded_rectangle(
        (0, 0, size * scale - 1, size * scale - 1), radius=radius, fill=INK
    )
    font = load_font("bold", int(size * scale * 0.44))
    draw_centered(draw, (0, 0, size * scale, size * scale), "AK", font, (255, 255, 255, 255))
    img = img.resize((size, size), Image.LANCZOS)
    img.save(PUBLIC / "favicon.png")
    print("wrote public/favicon.png", img.size)


def build_og_image() -> None:
    w, h = 1200, 630
    img = Image.new("RGB", (w, h), (255, 255, 255))
    draw = ImageDraw.Draw(img)

    # top rule + monogram
    draw.rectangle((0, 0, w, 10), fill=INK)
    draw.rounded_rectangle((80, 78, 154, 152), radius=16, fill=INK)
    draw_centered(draw, (80, 78, 154, 152), "AK", load_font("bold", 40), (255, 255, 255))

    draw.text((178, 95), "PORTFOLIO", font=load_font("semi", 22), fill=GRAY)

    draw.text((80, 210), "Ali Khan", font=load_font("bold", 92), fill=INK)
    draw.text(
        (80, 330),
        "Junior Software Engineer",
        font=load_font("regular", 44),
        fill=(55, 65, 81),
    )

    draw.rectangle((80, 418, 1120, 419), fill=LIGHT)

    draw.text(
        (80, 460),
        "Co-Founder at Webistic Marketing Solutions",
        font=load_font("semi", 28),
        fill=GRAY,
    )
    draw.text(
        (80, 510),
        "Web development  ·  AI automation  ·  Google Ads",
        font=load_font("regular", 26),
        fill=GRAY,
    )

    img.save(PUBLIC / "og-image.png")
    print("wrote public/og-image.png", img.size)


if __name__ == "__main__":
    build_favicon()
    build_og_image()
