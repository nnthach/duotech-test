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
import { IngredientFormState } from "@/types/form-type";

interface UpdateIngredientModalProps {
  id: string;
  defaultValues: IngredientFormState;
  onUpdated?: () => void;
}

export default function UpdateIngredientModal({
  id,
  defaultValues,
  onUpdated,
}: UpdateIngredientModalProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<IngredientFormState>(defaultValues);
  const [errors, setErrors] = useState<Partial<IngredientFormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { t, locale } = useI18n();

  const validate = (): boolean => {
    const next: Partial<IngredientFormState> = {};
    if (!form.name_vi.trim())
      next.name_vi = t(
        "admin.ingredientsPage.updateModal.errors.nameViRequired",
      );
    if (!form.name_en.trim())
      next.name_en = t(
        "admin.ingredientsPage.updateModal.errors.nameEnRequired",
      );
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof IngredientFormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      const payload = { ...form, slug: formatToSlug(form.name_vi) };

      const res = await fetch(`/api/admin/ingredients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update ingredient");

      setErrors({});
      setOpen(false);
      onUpdated?.();
    } catch (error) {
      console.error(error);
      alert("Không thể cập nhật nguyên liệu.");
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

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {t("admin.ingredientsPage.updateModal.title")}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-4 py-2">
            {/* Name VI */}
            <div className="space-y-1.5">
              <label
                htmlFor="update-name_vi"
                className="text-sm font-medium text-foreground"
              >
                {t("admin.ingredientsPage.updateModal.fields.nameVi")}{" "}
                <span className="text-destructive">*</span>
              </label>
              <input
                id="update-name_vi"
                name="name_vi"
                placeholder={locale === "vi" ? "Ví dụ: Bột mì" : "E.g. Flour"}
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
              <label
                htmlFor="update-name_en"
                className="text-sm font-medium text-foreground"
              >
                {t("admin.ingredientsPage.updateModal.fields.nameEn")}{" "}
                <span className="text-destructive">*</span>
              </label>
              <input
                id="update-name_en"
                name="name_en"
                placeholder={locale === "vi" ? "Ví dụ: Bột mì" : "E.g. Flour"}
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
                t("admin.ingredientsPage.updateModal.submit")
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
