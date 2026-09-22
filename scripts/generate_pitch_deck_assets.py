import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from reportlab.lib.pagesizes import letter, landscape
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

SLIDES_DATA = [
    {
        "number": "Slide 1",
        "title": "The Dead Transit Time Trap",
        "subtitle": "The Agony of Global Airport Layovers",
        "bullets": [
            "380M international transit passengers annually spend 4 to 12 hours stuck in airports.",
            "84% of transit travelers refuse to leave terminals due to fear of missing connecting flights.",
            "4-star and 5-star airport district hotels face 40% daytime vacancy between 10 AM and 5 PM.",
            "Result: ₹15,000 Cr ($1.8B USD) in unmonetized daytime inventory across transit hubs."
        ]
    },
    {
        "number": "Slide 2",
        "title": "The Guaranteed Usable-Time Platform",
        "subtitle": "The Solution for Airport Transit Commerce",
        "bullets": [
            "Proprietary transit time engine calculates real usable dwell time after security and customs.",
            "Guaranteed on-time return to departure gate backed by flight-catch protection.",
            "1-Click curated bundles: hourly hotel micro-stay + airport transfer + left luggage guidance.",
            "Zero anxiety transit exploration booked in under 60 seconds."
        ]
    },
    {
        "number": "Slide 3",
        "title": "Market Opportunity",
        "subtitle": "$18.4 Billion Global Transit Corridor",
        "bullets": [
            "TAM: $18.4B USD global airport transit hospitality, lounges, and day-use market.",
            "SAM: $3.2B USD across key South Asia, Middle East, and APAC transit hubs.",
            "SOM: $48M USD initial 15% penetration across Mumbai (CSMIA) and Delhi (IGI).",
            "High frequency: 4.2 long-haul transit trips per traveler annually."
        ]
    },
    {
        "number": "Slide 4",
        "title": "Product Ecosystem",
        "subtitle": "Seamless Ground & Airside Integration",
        "bullets": [
            "Dynamic Dwell-Time Calculator: Accounting for CISF security and deplaning buffers.",
            "Airside & Landside Micro-Stays: 3h, 6h, and 9h slots at Niranta, ITC Maratha, JW Marriott.",
            "Airport Left-Luggage Concierge: Direct guidance to official 24/7 arrivals baggage desks.",
            "Cryptographic Boarding Voucher: SHA-256 HMAC QR vouchers for instant front-desk check-in."
        ]
    },
    {
        "number": "Slide 5",
        "title": "Business Model & Unit Economics",
        "subtitle": "High Margin B2B2C Marketplace",
        "bullets": [
            "Average Order Value (AOV): ₹3,800 INR (~$46 USD) per transit booking.",
            "Take-Rate: 20% platform commission on micro-stays, dining, and chauffeur transfers.",
            "Gross Margin: ₹760 INR ($9.20 USD) net margin per reservation.",
            "CAC: ₹320 INR (~$3.80 USD) via programmatic SEO and travel forum acquisition.",
            "LTV / CAC: 4.8x on single trips, scaling to 7.2x for frequent flyers."
        ]
    },
    {
        "number": "Slide 6",
        "title": "Early Traction & Validation",
        "subtitle": "Mumbai CSMIA Terminal 2 Pilot",
        "bullets": [
            "1,450+ verified layover calculations processed during Mumbai T2 pilot phase.",
            "45 guaranteed day-rooms allocated daily across Sahar and Andheri luxury properties.",
            "100% on-time flight catch record across all pilot journeys.",
            "Zero missed flights with 4.8 / 5.0 guest satisfaction rating."
        ]
    },
    {
        "number": "Slide 7",
        "title": "The Moat & Defensibility",
        "subtitle": "Algorithms, Telemetry & Ground Logistics",
        "bullets": [
            "Dynamic Transit Time Engine: Real-time traffic surge and weather modeling.",
            "Multi-Capacity & Atomic Slot Locking: Distributed mutexes prevent booking collisions.",
            "Curbside Logistics Network: Pre-dispatched chauffeurs at CSMIA P4 parking.",
            "B2B Hotel Exclusivity: Direct RevPAR booster contracts for daytime off-peak inventory."
        ]
    },
    {
        "number": "Slide 8",
        "title": "Go-To-Market Engine",
        "subtitle": "Zero-to-One Acquisition Strategy",
        "bullets": [
            "Programmatic SEO: Dominating high-intent queries (/layover/bom-mumbai/6-hours).",
            "High-Intent Forums: Authoritative guides on FlyerTalk, Reddit r/travel, and TripAdvisor.",
            "Airport Co-Marketing: Arrivals guidance cards and baggage tag partnerships.",
            "Airline Crew & Agent Affiliates: Long-haul crew network word-of-mouth loops."
        ]
    },
    {
        "number": "Slide 9",
        "title": "Competitive Landscape",
        "subtitle": "The OTA Blindspot",
        "bullets": [
            "OTAs (MakeMyTrip / Booking.com): Rigid 11 AM checkout / 2 PM check-in model.",
            "Airport Lounges: Long wait queues, no private beds, and strict 3-hour caps.",
            "Generic Day-Use Platforms: Lack flight delay radar, airport security, and transfer buffers.",
            "LayoverX Advantage: Built ground-up for transit flyers with guaranteed flight timing."
        ]
    },
    {
        "number": "Slide 10",
        "title": "The Ask & Growth Milestones",
        "subtitle": "Seed Round: $350,000 USD on an i-SAFE Note",
        "bullets": [
            "Raising: $350,000 USD ($3.0M Post-Money Valuation Cap).",
            "Milestone 1: Scale Mumbai CSMIA T2 to 50 daily bookings ($70,000 Monthly GMV).",
            "Milestone 2: Expand to Delhi Indira Gandhi International (DEL Terminal 3).",
            "Milestone 3: Automated GDS/PNR flight telemetry integration.",
            "Milestone 4: Reach cash-flow break-even within 14 months with 20% EBITDA."
        ]
    }
]

def generate_pptx():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    bg_color = RGBColor(15, 23, 42)      # Slate 900
    accent_blue = RGBColor(3, 105, 161)   # Sky 700
    cyan = RGBColor(56, 189, 248)         # Sky 400
    text_white = RGBColor(248, 250, 252) # Slate 50
    text_muted = RGBColor(148, 163, 184) # Slate 400

    for slide_data in SLIDES_DATA:
        slide = prs.slides.add_slide(blank_layout)
        
        # Add background shape
        bg = slide.shapes.add_shape(1, 0, 0, Inches(13.333), Inches(7.5)) # 1 is msoShapeRectangle
        bg.fill.solid()
        bg.fill.fore_color.rgb = bg_color
        bg.line.color.rgb = bg_color

        # Header box
        header_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.6), Inches(11.7), Inches(1.8))
        tf = header_box.text_frame
        tf.word_wrap = True

        p_badge = tf.paragraphs[0]
        p_badge.text = f"LAYOVERX  |  {slide_data['number'].upper()}"
        p_badge.font.size = Pt(13)
        p_badge.font.bold = True
        p_badge.font.color.rgb = cyan

        p_title = tf.add_paragraph()
        p_title.text = slide_data['title']
        p_title.font.size = Pt(32)
        p_title.font.bold = True
        p_title.font.color.rgb = text_white

        p_sub = tf.add_paragraph()
        p_sub.text = slide_data['subtitle']
        p_sub.font.size = Pt(16)
        p_sub.font.color.rgb = text_muted

        # Bullets box
        body_box = slide.shapes.add_textbox(Inches(0.8), Inches(2.6), Inches(11.7), Inches(4.2))
        bf = body_box.text_frame
        bf.word_wrap = True

        for idx, bullet in enumerate(slide_data['bullets']):
            p_bullet = bf.paragraphs[0] if idx == 0 else bf.add_paragraph()
            p_bullet.text = f"  -  {bullet}"
            p_bullet.font.size = Pt(18)
            p_bullet.font.color.rgb = text_white
            p_bullet.space_before = Pt(12)
            p_bullet.space_after = Pt(8)

    output_path = os.path.abspath('docs/layoverx_seed_pitch_deck.pptx')
    prs.save(output_path)
    print(f"Generated PPTX: {output_path}")

def generate_pdf():
    output_path = os.path.abspath('docs/layoverx_seed_pitch_deck.pdf')
    doc = SimpleDocTemplate(
        output_path,
        pagesize=landscape(letter),
        rightMargin=40,
        leftMargin=40,
        topMargin=35,
        bottomMargin=35
    )

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle('TitleStyle', parent=styles['Heading1'], fontSize=24, leading=28, textColor=colors.HexColor('#0369a1'))
    subtitle_style = ParagraphStyle('SubStyle', parent=styles['Heading2'], fontSize=14, leading=18, textColor=colors.HexColor('#475569'))
    badge_style = ParagraphStyle('BadgeStyle', parent=styles['Normal'], fontSize=10, leading=12, textColor=colors.HexColor('#0284c7'), fontName='Helvetica-Bold')
    bullet_style = ParagraphStyle('BulletStyle', parent=styles['Normal'], fontSize=12, leading=18, textColor=colors.HexColor('#1e293b'))

    story = []
    from reportlab.platypus import PageBreak

    for idx, slide in enumerate(SLIDES_DATA):
        story.append(Paragraph(f"LAYOVERX &nbsp;|&nbsp; {slide['number'].upper()}", badge_style))
        story.append(Spacer(1, 6))
        story.append(Paragraph(slide['title'], title_style))
        story.append(Paragraph(slide['subtitle'], subtitle_style))
        story.append(Spacer(1, 15))

        for bullet in slide['bullets']:
            story.append(Paragraph(f"&bull;&nbsp;&nbsp;{bullet}", bullet_style))
            story.append(Spacer(1, 8))

        if idx < len(SLIDES_DATA) - 1:
            story.append(PageBreak())

    doc.build(story)
    print(f"Generated PDF: {output_path}")

if __name__ == '__main__':
    generate_pptx()
    generate_pdf()
