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
import { StaffFormState } from "./CreateStaffModal";
import { useI18n } from "@/context/I18nContext";

interface UpdateStaffModalProps {
  defaultValues: StaffFormState;
  onUpdated?: (values: StaffFormState) => void;
}

export default function UpdateStaffModal({ defaultValues, onUpdated }: UpdateStaffModalProps) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<StaffFormState>(defaultValues);
  const [errors, setErrors] = useState<Partial<Record<keyof StaffFormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const next: Partial<Record<keyof StaffFormState, string>> = {};
    if (!form.fullname.trim()) next.fullname = t("admin.staffsPage.updateModal.errors.fullnameRequired");
    if (!form.email.trim()) next.email = t("admin.staffsPage.updateModal.errors.emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = t("admin.staffsPage.updateModal.errors.emailInvalid");
    if (!form.dob) next.dob = t("admin.staffsPage.updateModal.errors.dobRequired");
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof StaffFormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));
    onUpdated?.(form);
    setErrors({});
    setOpen(false);
    setIsSubmitting(false);
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
          <DialogTitle>{t("admin.staffsPage.updateModal.title")}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-4 py-2">
            {/* Fullname */}
            <div className="space-y-1.5">
              <label htmlFor="update-fullname" className="text-sm font-medium text-foreground">
                {t("admin.staffsPage.updateModal.fields.fullname")} <span className="text-destructive">*</span>
              </label>
              <input
                id="update-fullname"
                name="fullname"
                placeholder={t("admin.staffsPage.updateModal.fields.fullnamePlaceholder")}
                value={form.fullname}
                onChange={handleChange}
                aria-invalid={!!errors.fullname}
                disabled={isSubmitting}
                className="flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground"
              />
              {errors.fullname && <p className="text-xs text-destructive">{errors.fullname}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="update-email" className="text-sm font-medium text-foreground">
                {t("admin.staffsPage.updateModal.fields.email")} <span className="text-destructive">*</span>
              </label>
              <input
                id="update-email"
                name="email"
                type="email"
                placeholder="example@email.com"
                value={form.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
                disabled={isSubmitting}
                className="flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground"
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>

            {/* Date of birth */}
            <div className="space-y-1.5">
              <label htmlFor="update-dob" className="text-sm font-medium text-foreground">
                {t("admin.staffsPage.updateModal.fields.dob")} <span className="text-destructive">*</span>
              </label>
              <input
                id="update-dob"
                name="dob"
                type="date"
                value={form.dob}
                onChange={handleChange}
                aria-invalid={!!errors.dob}
                disabled={isSubmitting}
                className="flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground"
              />
              {errors.dob && <p className="text-xs text-destructive">{errors.dob}</p>}
            </div>

            {/* Gender */}
            <div className="space-y-1.5">
              <label htmlFor="update-gender" className="text-sm font-medium text-foreground">
                {t("admin.staffsPage.updateModal.fields.gender")} <span className="text-destructive">*</span>
              </label>
              <select
                id="update-gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                disabled={isSubmitting}
                className="flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background"
              >
                <option value="male">{t("admin.staffsPage.updateModal.genderOptions.male")}</option>
                <option value="female">{t("admin.staffsPage.updateModal.genderOptions.female")}</option>
                <option value="other">{t("admin.staffsPage.updateModal.genderOptions.other")}</option>
              </select>
            </div>
          </div>

          <DialogFooter className="mt-4 gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isSubmitting}>
                {t("admin.modal.cancel")}
              </Button>
            </DialogClose>
            <Button type="submit" variant="accent" disabled={isSubmitting} className="min-w-24">
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : t("admin.staffsPage.updateModal.submit")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
