"use client";

import React, { useEffect, useRef, useState } from "react";
import { Plus, Loader2, ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { formatToSlug } from "@/lib/utils";
import { CategoryItem, IngredientItem } from "@/types";
import { uploadFileToCloudinary } from "@/lib/cloudinary";
import { useI18n } from "@/context/I18nContext";

interface FormState {
  name_vi: string;
  description_vi: string;
  name_en: string;
  description_en: string;
  slug_vi: string;
  slug_en: string;
  price: number;
  category_id: string;
  ingredient_ids: string[];
  image_url: string[];
}

const INITIAL_FORM: FormState = {
  name_vi: "",
  description_vi: "",
  name_en: "",
  description_en: "",
  slug_vi: "",
  slug_en: "",
  price: 0,
  category_id: "",
  ingredient_ids: [],
  image_url: [],
};

const inputCls =
  "flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-ring";

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

interface CreateProductModalProps {
  onCreated?: () => void;
}

export default function CreateProductModal({
  onCreated,
}: CreateProductModalProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // fetch category & ingredient
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [ingredients, setIngredients] = useState<IngredientItem[]>([]);
  const [loadingMeta, setLoadingMeta] = useState(false);

  const { locale } = useI18n();

  useEffect(() => {
    if (!open) return;
    const fetchMeta = async () => {
      setLoadingMeta(true);
      try {
        const [catRes, ingRes] = await Promise.all([
          fetch("/api/admin/categories?is_active=true&sort_by=name&order=asc"),
          fetch("/api/admin/ingredients?is_active=true&sort_by=name&order=asc"),
        ]);
        const catJson = await catRes.json();
        const ingJson = await ingRes.json();
        if (catJson.success) setCategories(catJson.data);
        if (ingJson.success) setIngredients(ingJson.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingMeta(false);
      }
    };
    fetchMeta();
  }, [open]);
  // end fetch category & ingredient

  // handle change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = {
        ...prev,
        [name]: name === "price" ? Number(value) : value,
      };
      return next;
    });
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // choose ingredient
  const toggleIngredient = (id: string) => {
    setForm((prev) => ({
      ...prev,
      ingredient_ids: prev.ingredient_ids.includes(id)
        ? prev.ingredient_ids.filter((i) => i !== id)
        : [...prev.ingredient_ids, id],
    }));
  };

  // image
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (imagePreview) URL.revokeObjectURL(imagePreview);

    const preview = URL.createObjectURL(file);

    setImageFile(file);
    setImagePreview(preview);

    // Chỉ để hiển thị preview
    setForm((prev) => ({
      ...prev,
      image_url: [preview],
    }));
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (imagePreview) URL.revokeObjectURL(imagePreview);

    setImagePreview(null);
    setImageFile(null);

    setForm((prev) => ({
      ...prev,
      image_url: [],
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  // end image

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name_vi.trim())
      next.name_vi = "Tên tiếng Việt không được để trống.";
    if (!form.price || form.price <= 0) next.price = "Giá phải lớn hơn 0.";
    if (!form.category_id) next.category_id = "Vui lòng chọn danh mục.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);

      // upload image
      let imageUrls: string[] = [];

      if (imageFile) {
        const imageUrl = await uploadFileToCloudinary(imageFile);
        imageUrls = [imageUrl];
      }

      // payload
      const payload = {
        ...form,
        image_url: imageUrls,
        slug_vi: formatToSlug(form.name_vi),
        slug_en: formatToSlug(form.name_en),
      };

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create product");
      resetForm();
      setOpen(false);
      onCreated?.();
    } catch (error) {
      console.error(error);
      alert("Không thể tạo sản phẩm.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) resetForm();
    setOpen(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant={"accent"} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Tạo sản phẩm
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[800px]">
        <DialogHeader>
          <DialogTitle>Tạo sản phẩm mới</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} noValidate>
          <div className="max-h-[60vh] overflow-y-auto space-y-4 py-2 pr-1">
            {/* Image Upload */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Hình ảnh
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <div
                onClick={handleImageClick}
                className="relative h-28 w-28 cursor-pointer rounded-md border-2 border-dashed border-muted-foreground/40 bg-muted/30 flex items-center justify-center overflow-hidden transition-colors hover:border-primary/60 hover:bg-muted/50"
              >
                {imagePreview ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreview}
                      alt="preview"
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-1 right-1 rounded-full bg-background/80 p-0.5 hover:bg-background"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-1 text-muted-foreground">
                    <ImagePlus className="h-6 w-6" />
                    <span className="text-xs">Chọn ảnh</span>
                  </div>
                )}
              </div>
            </div>

            {/* Name VI / EN */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Tên (Tiếng Việt)" required error={errors.name_vi}>
                <input
                  name="name_vi"
                  placeholder="Ví dụ: Bánh mì"
                  value={form.name_vi}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={inputCls}
                />
              </Field>
              <Field label="Tên (English)" required error={errors.name_en}>
                <input
                  name="name_en"
                  placeholder="E.g: Bread"
                  value={form.name_en}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={inputCls}
                />
              </Field>
            </div>

            {/* Price */}
            <Field label="Giá (VND)" required error={errors.price}>
              <input
                name="price"
                type="number"
                min={0}
                placeholder="0"
                value={form.price || ""}
                onChange={handleChange}
                disabled={isSubmitting}
                className={inputCls}
              />
            </Field>

            {/* Description VI / EN */}
            <Field label="Mô tả (Tiếng Việt)">
              <textarea
                name="description_vi"
                rows={3}
                placeholder="Mô tả..."
                value={form.description_vi}
                onChange={handleChange}
                disabled={isSubmitting}
                className={inputCls}
              />
            </Field>
            <Field label="Mô tả (English)">
              <textarea
                name="description_en"
                rows={3}
                placeholder="Mô tả..."
                value={form.description_en}
                onChange={handleChange}
                disabled={isSubmitting}
                className={inputCls}
              />
            </Field>

            {/* Category */}
            <Field label="Danh mục" required error={errors.category_id}>
              {loadingMeta ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Đang tải...
                </div>
              ) : (
                <select
                  name="category_id"
                  value={form.category_id}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={inputCls}
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name[locale]}
                    </option>
                  ))}
                </select>
              )}
            </Field>

            {/* Ingredients */}
            <Field label="Nguyên liệu" required>
              {loadingMeta ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Đang tải...
                </div>
              ) : ingredients.length === 0 ? (
                <p className="text-sm text-muted-foreground py-1">
                  Không có nguyên liệu.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {ingredients.map((ing) => {
                    const selected = form.ingredient_ids.includes(ing.id);
                    return (
                      <button
                        key={ing.id}
                        type="button"
                        onClick={() => toggleIngredient(ing.id)}
                        disabled={isSubmitting}
                        className={`rounded-full border px-3 py-1 text-sm font-medium transition-colors disabled:opacity-50 ${
                          selected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-foreground hover:bg-muted"
                        }`}
                      >
                        {selected && <span className="mr-1">✓</span>}
                        {ing.name[locale]}
                      </button>
                    );
                  })}
                </div>
              )}
              {form.ingredient_ids.length > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  Đã chọn: {form.ingredient_ids.length} nguyên liệu
                </p>
              )}
            </Field>
          </div>

          <DialogFooter className="mt-4 gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isSubmitting}>
                Huỷ
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant={"accent"}
              disabled={isSubmitting}
              className="min-w-24"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Tạo sản phẩm"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
