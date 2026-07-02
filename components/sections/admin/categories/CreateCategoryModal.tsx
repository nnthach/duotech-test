"use client";

import React, { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
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
import InputFormField from "@/components/custom/InputFormField";
import { CategoryFormState } from "@/types/form-type";

const INITIAL_FORM: CategoryFormState = {
  name_vi: "",
  name_en: "",
  description_vi: "",
  description_en: "",
  slug_vi: "",
  slug_en: "",
};

interface CreateCategoryModalProps {
  onCreated?: () => void;
}

export default function CreateCategoryModal({
  onCreated,
}: CreateCategoryModalProps) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<CategoryFormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<CategoryFormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const next: Partial<CategoryFormState> = {};
    if (!form.name_vi.trim())
      next.name_vi = t(
        "admin.categoriesPage.createModal.errors.nameViRequired",
      );
    if (!form.name_en.trim())
      next.name_en = t(
        "admin.categoriesPage.createModal.errors.nameEnRequired",
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

      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create category");

      setForm(INITIAL_FORM);
      setErrors({});
      setOpen(false);
      onCreated?.();
    } catch (error) {
      console.error(error);
      alert("Không thể tạo danh mục.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setForm(INITIAL_FORM);
      setErrors({});
    }
    setOpen(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant={"accent"} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          {t("admin.categoriesPage.createModal.trigger")}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {t("admin.categoriesPage.createModal.title")}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-4 py-2">
            {/* Name VI */}
            <InputFormField
              label={t("admin.categoriesPage.createModal.fields.nameVi")}
              name="name_vi"
              placeholder="Ví dụ: Bánh mì"
              type="text"
              value={form.name_vi}
              onChange={handleChange}
              error={errors.name_vi}
              disabled={isSubmitting}
              required
            />

            <InputFormField
              label={t("admin.categoriesPage.createModal.fields.nameEn")}
              name="name_en"
              placeholder="E.g. Bread"
              type="text"
              value={form.name_en}
              onChange={handleChange}
              error={errors.name_en}
              disabled={isSubmitting}
              required
            />

            <InputFormField
              label={t("admin.categoriesPage.createModal.fields.descriptionVi")}
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
              label={t("admin.categoriesPage.createModal.fields.descriptionEn")}
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
                t("admin.categoriesPage.createModal.submit")
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
