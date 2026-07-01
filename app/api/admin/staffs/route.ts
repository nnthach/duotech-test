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
    const store_id = params.get("store_id");
    const sort_by = params.get("sort_by") ?? "created_at";
    const order = params.get("order") ?? "desc";

    const validSortBy = ["full_name", "created_at"].includes(sort_by)
      ? sort_by
      : "created_at";
    const ascending = order === "asc";

    let query = supabaseAdmin
      .from("staffs")
      .select(
        `
        *,
        users(id, full_name, role, status),
        stores(id, name, city, district)
      `,
      )
      .order(validSortBy, { ascending });

    if (is_active !== null && is_active !== "") {
      query = query.eq("is_active", is_active === "true");
    }
    if (store_id) {
      query = query.eq("store_id", store_id);
    }

    const { data, error } = await query;
    if (error) throw error;

    // email không lưu ở bảng users nên phải lấy từ supabase auth
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
    if (authError) throw authError;

    const emailByUserId = new Map(authData.users.map((u) => [u.id, u.email]));

    const formatted = data.map((staff) => ({
      ...staff,
      email: emailByUserId.get(staff.user_id) ?? null,
    }));

    return NextResponse.json(
      { success: true, data: formatted },
      { status: 200 },
    );
  } catch (error) {
    console.error("Fetch staffs error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password, fullname, store_id, dob, gender } = body;

  if (!password || password.length < 6) {
    return NextResponse.json(
      { success: false, error: "Password must be at least 6 characters" },
      { status: 400 },
    );
  }

  // step 1: create account in supabase auth
  const { data: authUser, error: authError } =
    await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // auto confirm, không cần verify email
    });
  if (authError) throw authError;

  // step 2: create row in users table
  const { error: userError } = await supabaseAdmin.from("users").insert({
    id: authUser.user.id, // use id với auth.users
    full_name: fullname,
    role: "staff",
    status: "active", // auto active
  });

  if (userError) {
    // rollback => delete auth user if create users failed
    await supabaseAdmin.auth.admin.deleteUser(authUser.user.id);
    throw userError;
  }

  // step 3: create row in staffs table
  const { error: staffError } = await supabaseAdmin.from("staffs").insert({
    user_id: authUser.user.id,
    store_id,
    dob,
    gender,
  });

  if (staffError) {
    // rollback => delete auth user if create staffs failed
    await supabaseAdmin.auth.admin.deleteUser(authUser.user.id);
    throw staffError;
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
