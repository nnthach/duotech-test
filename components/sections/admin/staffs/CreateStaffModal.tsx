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
import { useI18n } from "@/context/I18nContext";

export interface StaffFormState {
  fullname: string;
  email: string;
  dob: string;
  gender: "male" | "female" | "other";
}

const INITIAL_FORM: StaffFormState = {
  fullname: "",
  email: "",
  dob: "",
  gender: "male",
};

interface CreateStaffModalProps {
  onCreated?: (staff: StaffFormState) => void;
}

export default function CreateStaffModal({ onCreated }: CreateStaffModalProps) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<StaffFormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof StaffFormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const next: Partial<Record<keyof StaffFormState, string>> = {};
    if (!form.fullname.trim()) next.fullname = t("admin.staffsPage.createModal.errors.fullnameRequired");
    if (!form.email.trim()) next.email = t("admin.staffsPage.createModal.errors.emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = t("admin.staffsPage.createModal.errors.emailInvalid");
    if (!form.dob) next.dob = t("admin.staffsPage.createModal.errors.dobRequired");
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
    onCreated?.(form);
    setForm(INITIAL_FORM);
    setErrors({});
    setOpen(false);
    setIsSubmitting(false);
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
        <Button variant="accent" size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          {t("admin.staffsPage.createModal.trigger")}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("admin.staffsPage.createModal.title")}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-4 py-2">
            {/* Fullname */}
            <div className="space-y-1.5">
              <label htmlFor="fullname" className="text-sm font-medium text-foreground">
                {t("admin.staffsPage.createModal.fields.fullname")} <span className="text-destructive">*</span>
              </label>
              <input
                id="fullname"
                name="fullname"
                placeholder={t("admin.staffsPage.createModal.fields.fullnamePlaceholder")}
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
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                {t("admin.staffsPage.createModal.fields.email")} <span className="text-destructive">*</span>
              </label>
              <input
                id="email"
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
              <label htmlFor="dob" className="text-sm font-medium text-foreground">
                {t("admin.staffsPage.createModal.fields.dob")} <span className="text-destructive">*</span>
              </label>
              <input
                id="dob"
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
              <label htmlFor="gender" className="text-sm font-medium text-foreground">
                {t("admin.staffsPage.createModal.fields.gender")} <span className="text-destructive">*</span>
              </label>
              <select
                id="gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                disabled={isSubmitting}
                className="flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background"
              >
                <option value="male">{t("admin.staffsPage.createModal.genderOptions.male")}</option>
                <option value="female">{t("admin.staffsPage.createModal.genderOptions.female")}</option>
                <option value="other">{t("admin.staffsPage.createModal.genderOptions.other")}</option>
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
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : t("admin.staffsPage.createModal.submit")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
