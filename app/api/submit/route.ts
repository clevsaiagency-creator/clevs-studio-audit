import { NextResponse, type NextRequest } from "next/server";
import { getServiceClient } from "@/lib/supabase";

interface SubmitPayload {
  serviceType: "website" | "motion";
  domeniu: string;
  // Website
  areWebsite: boolean | null;
  websiteLink: string | null;
  scopuri: string[];
  stilWebsite: string | null;
  buget: string | null;
  // Motion
  scopVideo: string[];
  altcevaScop: string | null;
  footageExistent: string | null;
  footageLink: string | null;
  vibe: string | null;
  areCulori: string | null;
  culoriText: string | null;
  // Contact
  numeAfacere: string;
  nume: string;
  email: string | null;
  whatsapp: string | null;
}

function validate(p: Partial<SubmitPayload>): string | null {
  if (p.serviceType !== "website" && p.serviceType !== "motion") return "Serviciu invalid";
  if (!p.domeniu || p.domeniu.trim().length < 2) return "Domeniu invalid";
  if (!p.numeAfacere || p.numeAfacere.trim().length < 2) return "Nume afacere invalid";
  if (!p.nume || p.nume.trim().length < 2) return "Prenume invalid";
  if (!p.email && !p.whatsapp) return "Email sau WhatsApp obligatoriu";
  return null;
}

export async function POST(request: NextRequest) {
  let payload: Partial<SubmitPayload>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Payload invalid" }, { status: 400 });
  }

  const err = validate(payload);
  if (err) return NextResponse.json({ error: err }, { status: 400 });

  const data = payload as SubmitPayload;

  try {
    const supabase = getServiceClient();
    const { error } = await supabase.from("studio_leads").insert({
      service_type: data.serviceType,
      domeniu: data.domeniu,
      // Website
      are_website: data.serviceType === "website" ? data.areWebsite : null,
      website_link: data.serviceType === "website" ? (data.websiteLink || null) : null,
      scopuri: data.serviceType === "website" ? (data.scopuri?.length ? data.scopuri : null) : null,
      stil: data.serviceType === "website" ? (data.stilWebsite || null) : null,
      buget: data.serviceType === "website" ? (data.buget || null) : null,
      // Motion
      scop_video: data.serviceType === "motion" ? (data.scopVideo?.length ? data.scopVideo : null) : null,
      footage_existent: data.serviceType === "motion" ? (data.footageExistent || null) : null,
      footage_link: data.serviceType === "motion" ? (data.footageLink || null) : null,
      vibe: data.serviceType === "motion" ? (data.vibe || null) : null,
      culori_brand: data.serviceType === "motion" && data.areCulori === "da" ? (data.culoriText || null) : null,
      // Contact
      nume_afacere: data.numeAfacere,
      nume: data.nume,
      email: data.email || null,
      whatsapp: data.whatsapp || null,
      status: "new",
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Nu am putut salva. Încearcă din nou." }, { status: 500 });
    }
  } catch (e) {
    console.error("Supabase client error:", e);
    return NextResponse.json({ error: "Eroare server. Încearcă din nou." }, { status: 500 });
  }

  // Make webhook (fire-and-forget — leadul e deja salvat în Supabase)
  const makeUrl = process.env.MAKE_WEBHOOK_URL;
  if (makeUrl) {
    try {
      const webhookRes = await fetch(makeUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_type: data.serviceType,
          domeniu: data.domeniu,
          nume_afacere: data.numeAfacere,
          nume: data.nume,
          email: data.email || null,
          whatsapp: data.whatsapp || null,
          // Website
          are_website: data.serviceType === "website" ? data.areWebsite : null,
          website_link: data.serviceType === "website" ? (data.websiteLink || null) : null,
          scopuri: data.serviceType === "website" ? (data.scopuri || []) : [],
          stil: data.serviceType === "website" ? (data.stilWebsite || null) : null,
          buget: data.serviceType === "website" ? (data.buget || null) : null,
          // Motion
          scop_video: data.serviceType === "motion" ? (data.scopVideo || []) : [],
          altceva_scop: data.serviceType === "motion" ? (data.altcevaScop || null) : null,
          footage_existent: data.serviceType === "motion" ? (data.footageExistent || null) : null,
          footage_link: data.serviceType === "motion" ? (data.footageLink || null) : null,
          vibe: data.serviceType === "motion" ? (data.vibe || null) : null,
          culori_brand: data.serviceType === "motion" && data.areCulori === "da" ? (data.culoriText || null) : null,
        }),
      });
      if (!webhookRes.ok) console.error("Make webhook non-OK:", webhookRes.status);
    } catch (e) {
      console.error("Make webhook failed:", e);
    }
  } else {
    console.warn("MAKE_WEBHOOK_URL not configured — lead saved but no email will be sent");
  }

  return NextResponse.json({ ok: true });
}
