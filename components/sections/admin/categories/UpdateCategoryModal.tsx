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
import { useI18n } from "@/context/I18nContext";
import { CategoryFormState } from "@/types/form-type";
import InputFormField from "@/components/custom/InputFormField";

interface UpdateCategoryModalProps {
  id: string;
  defaultValues: CategoryFormState;
  onUpdated?: () => void;
}

export default function UpdateCategoryModal({
  id,
  defaultValues,
  onUpdated,
}: UpdateCategoryModalProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<CategoryFormState>(defaultValues);
  const [errors, setErrors] = useState<Partial<CategoryFormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { t } = useI18n();

  const validate = (): boolean => {
    const next: Partial<CategoryFormState> = {};
    if (!form.name_vi.trim())
      next.name_vi = t(
        "admin.categoriesPage.updateModal.errors.nameViRequired",
      );
    if (!form.name_en.trim())
      next.name_en = t(
        "admin.categoriesPage.updateModal.errors.nameEnRequired",
      );
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CategoryFormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      const payload = {
        ...form,
        slug_vi: formatToSlug(form.name_vi),
        slug_en: formatToSlug(form.name_en),
      };

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
          <DialogTitle>
            {t("admin.categoriesPage.updateModal.title")}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-4 py-2">
            <InputFormField
              label={t("admin.categoriesPage.updateModal.fields.nameVi")}
              name="name_vi"
              placeholder="Ví dụ: Bánh mì"
              type="text"
              value={form.name_vi}
              onChange={handleChange}
              error={errors.name_vi}
              disabled={isSubmitting}
              required
            />

            {/* Name EN */}
            <InputFormField
              label={t("admin.categoriesPage.updateModal.fields.nameEn")}
              name="name_en"
              placeholder="E.g. Bread"
              type="text"
              value={form.name_en}
              onChange={handleChange}
              error={errors.name_en}
              disabled={isSubmitting}
              required
            />

            {/* Description VI */}
            <InputFormField
              label={t("admin.categoriesPage.updateModal.fields.descriptionVi")}
              name="description_vi"
              placeholder="Mô tả ngắn về danh mục..."
              type="textarea"
              rows={2}
              value={form.description_vi}
              onChange={handleChange}
              error={errors.description_vi}
              disabled={isSubmitting}
              required
            />

            {/* Description EN */}
            <InputFormField
              label={t("admin.categoriesPage.updateModal.fields.descriptionEn")}
              name="description_en"
              placeholder="Short description about this category..."
              type="textarea"
              rows={2}
              value={form.description_en}
              onChange={handleChange}
              error={errors.description_en}
              disabled={isSubmitting}
              required
            />
          </div>

          <DialogFooter className="mt-4 gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isSubmitting}>
                {t("admin.modal.cancel")}
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
                t("admin.categoriesPage.updateModal.submit")
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
