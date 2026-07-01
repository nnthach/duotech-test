import { isSupabaseConfigured, supabaseAdmin } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    if (!isSupabaseConfigured) {
      return NextResponse.json(
        { success: false, error: "Database not configured" },
        { status: 500 },
      );
    }

    const params = req.nextUrl.searchParams;
    const is_active = params.get("is_active");
    const city = params.get("city");
    const district = params.get("district");
    const sort_by = params.get("sort_by") ?? "created_at";
    const order = params.get("order") ?? "desc";

    const validSortBy = ["name", "created_at"].includes(sort_by)
      ? sort_by
      : "created_at";
    const ascending = order === "asc";

    let query = supabaseAdmin
      .from("stores")
      .select("*")
      .order(validSortBy, { ascending });

    if (is_active !== null && is_active !== "") {
      query = query.eq("is_active", is_active === "true");
    }
    if (city) {
      query = query.eq("city", city);
    }
    if (district) {
      query = query.eq("district", district);
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Fetch stores error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!isSupabaseConfigured) {
      return NextResponse.json(
        { success: false, error: "Database not configured" },
        { status: 500 },
      );
    }

    const body = await req.json();
    const {
      name,
      address_vi,
      address_en,
      city,
      district,
      slug,
      image_url,
      phone,
    } = body;

    if (!name || !address_vi || !address_en) {
      return NextResponse.json(
        { success: false, error: "Name and address are required" },
        { status: 400 },
      );
    }

    const { data, error } = await supabaseAdmin
      .from("stores")
      .insert({
        name,
        address: { vi: address_vi, en: address_en },
        city,
        district,
        slug,
        image_url,
        phone,
      })
      .select()
      .single();
    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error("Create store error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
