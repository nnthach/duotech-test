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
import { IngredientFormState } from "@/types/form-type";
import InputFormField from "@/components/custom/InputFormField";

const INITIAL_FORM: IngredientFormState = {
  name_vi: "",
  name_en: "",
  slug_vi: "",
  slug_en: "",
};

interface CreateIngredientModalProps {
  onCreated?: () => void;
}

export default function CreateIngredientModal({
  onCreated,
}: CreateIngredientModalProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<IngredientFormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<IngredientFormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { t } = useI18n();

  const validate = (): boolean => {
    const next: Partial<IngredientFormState> = {};
    if (!form.name_vi.trim())
      next.name_vi = t(
        "admin.ingredientsPage.createModal.errors.nameViRequired",
      );
    if (!form.name_en.trim())
      next.name_en = t(
        "admin.ingredientsPage.createModal.errors.nameEnRequired",
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
    if (errors[name as keyof IngredientFormState]) {
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

      const res = await fetch("/api/admin/ingredients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create ingredient");

      setForm(INITIAL_FORM);
      setErrors({});
      setOpen(false);
      onCreated?.();
    } catch (error) {
      console.error(error);
      alert("Không thể tạo nguyên liệu.");
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
          {t("admin.ingredientsPage.createModal.trigger")}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {t("admin.ingredientsPage.createModal.title")}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-4 py-2">
            {/* Name VI */}
            <InputFormField
              label={t("admin.ingredientsPage.createModal.fields.nameVi")}
              name="name_vi"
              placeholder="Ví dụ: Bột mì"
              type="text"
              value={form.name_vi}
              onChange={handleChange}
              error={errors.name_vi}
              disabled={isSubmitting}
              required
            />

            {/* Name EN */}
            <InputFormField
              label={t("admin.ingredientsPage.createModal.fields.nameEn")}
              name="name_en"
              placeholder="E.g. Flour"
              type="text"
              value={form.name_en}
              onChange={handleChange}
              error={errors.name_en}
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
                t("admin.ingredientsPage.createModal.submit")
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
