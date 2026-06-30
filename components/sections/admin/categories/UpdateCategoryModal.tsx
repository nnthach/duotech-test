"use client";

import React, { useState } from "react";
import { Pencil, Loader2 } from "lucide-react";
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

interface FormState {
  name_vi: string;
  name_en: string;
  description_vi: string;
  description_en: string;
  slug: string;
}

interface UpdateCategoryModalProps {
  id: string;
  defaultValues: FormState;
  onUpdated?: () => void;
}

export default function UpdateCategoryModal({
  id,
  defaultValues,
  onUpdated,
}: UpdateCategoryModalProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(defaultValues);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!form.name_vi.trim()) next.name_vi = "Tên danh mục (VI) không được để trống.";
    if (!form.name_en.trim()) next.name_en = "Tên danh mục (EN) không được để trống.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      const payload = { ...form, slug: formatToSlug(form.name_vi) };

      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update category");

      setErrors({});
      setOpen(false);
      onUpdated?.();
    } catch (error) {
      console.error(error);
      alert("Không thể cập nhật danh mục.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setForm(defaultValues);
      setErrors({});
    }
    setOpen(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Pencil className="h-3.5 w-3.5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-4 py-2">
            {/* Name VI */}
            <div className="space-y-1.5">
              <label htmlFor="update-name_vi" className="text-sm font-medium text-foreground">
                Tên danh mục (VI) <span className="text-destructive">*</span>
              </label>
              <input
                id="update-name_vi"
                name="name_vi"
                placeholder="Ví dụ: Bánh mì"
                value={form.name_vi}
                onChange={handleChange}
                aria-invalid={!!errors.name_vi}
                disabled={isSubmitting}
                className="flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground"
              />
              {errors.name_vi && (
                <p className="text-xs text-destructive">{errors.name_vi}</p>
              )}
            </div>

            {/* Name EN */}
            <div className="space-y-1.5">
              <label htmlFor="update-name_en" className="text-sm font-medium text-foreground">
                Tên danh mục (EN) <span className="text-destructive">*</span>
              </label>
              <input
                id="update-name_en"
                name="name_en"
                placeholder="E.g. Bread"
                value={form.name_en}
                onChange={handleChange}
                aria-invalid={!!errors.name_en}
                disabled={isSubmitting}
                className="flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground"
              />
              {errors.name_en && (
                <p className="text-xs text-destructive">{errors.name_en}</p>
              )}
            </div>

            {/* Description VI */}
            <div className="space-y-1.5">
              <label htmlFor="update-description_vi" className="text-sm font-medium text-foreground">
                Mô tả (VI)
              </label>
              <textarea
                id="update-description_vi"
                name="description_vi"
                rows={2}
                placeholder="Mô tả ngắn về danh mục..."
                value={form.description_vi}
                onChange={handleChange}
                disabled={isSubmitting}
                className="flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground"
              />
            </div>

            {/* Description EN */}
            <div className="space-y-1.5">
              <label htmlFor="update-description_en" className="text-sm font-medium text-foreground">
                Mô tả (EN)
              </label>
              <textarea
                id="update-description_en"
                name="description_en"
                rows={2}
                placeholder="Short description about this category..."
                value={form.description_en}
                onChange={handleChange}
                disabled={isSubmitting}
                className="flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground"
              />
            </div>
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
                "Lưu thay đổi"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
