import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { ProductIngredientRow, RawProduct } from "@/types";
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
    const category_id = params.get("category_id");
    const sort_by = params.get("sort_by") ?? "created_at";
    const order = params.get("order") ?? "desc";
    const locale = params.get("locale") ?? "vi";

    const validSortBy = ["name", "created_at"].includes(sort_by)
      ? sort_by
      : "created_at";
    const ascending = order === "asc";

    let query = supabase
      .from("products")
      .select(
        `
        *,
        categories(id, name),
        product_translations!inner(locale, name, description, slug),
        product_ingredients(
          ingredients(id, name)
        )
      `,
      )
      .eq("product_translations.locale", locale)
      .order(validSortBy, { ascending });

    if (is_active !== null && is_active !== "") {
      query = query.eq("is_active", is_active === "true");
    }

    if (category_id !== null && category_id !== "") {
      query = query.eq("category_id", category_id);
    }

    const { data, error } = await query;
    if (error) throw error;

    // product format
    const formatted = data.map((product: RawProduct) => {
      const translation = product.product_translations?.[0] ?? {};

      return {
        id: product.id,
        price: product.price,
        image_url: product.image_url,
        is_active: product.is_active,
        created_at: product.created_at,
        updated_at: product.updated_at,
        category: product.categories,
        name: translation.name ?? null,
        description: translation.description ?? null,
        slug: translation.slug ?? null,
        ingredients: (product.product_ingredients ?? []).map(
          (pi: ProductIngredientRow) => pi.ingredients,
        ),
      };
    });

    return NextResponse.json(
      { success: true, data: formatted },
      { status: 200 },
    );
  } catch (error) {
    console.error("Fetch products error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
