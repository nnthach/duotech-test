"use client";

import React, { useEffect, useState } from "react";
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
import { StoreItem } from "@/types";
import { StaffFormState } from "@/types/form-type";

const INITIAL_FORM: StaffFormState = {
  fullname: "",
  email: "",
  dob: "",
  gender: "male",
  store_id: "",
};

interface CreateStaffModalProps {
  onCreated?: () => void;
}

export default function CreateStaffModal({ onCreated }: CreateStaffModalProps) {
  const { t, locale } = useI18n();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<StaffFormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof StaffFormState, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stores, setStores] = useState<StoreItem[]>([]);
  const [isLoadingStores, setIsLoadingStores] = useState(false);

  // fetch stores for the select when modal opens
  useEffect(() => {
    if (!open) return;

    const fetchStores = async () => {
      try {
        setIsLoadingStores(true);
        const res = await fetch("/api/admin/stores?is_active=true");
        if (!res.ok) throw new Error("Failed to fetch stores");
        const data = await res.json();
        if (data.success && data.data) {
          setStores(data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingStores(false);
      }
    };

    fetchStores();
  }, [open]);

  const validate = (): boolean => {
    const next: Partial<Record<keyof StaffFormState, string>> = {};
    if (!form.fullname.trim())
      next.fullname = t("admin.staffsPage.createModal.errors.fullnameRequired");
    if (!form.email.trim())
      next.email = t("admin.staffsPage.createModal.errors.emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = t("admin.staffsPage.createModal.errors.emailInvalid");
    if (!form.dob)
      next.dob = t("admin.staffsPage.createModal.errors.dobRequired");
    if (!form.store_id)
      next.store_id = t("admin.staffsPage.createModal.errors.storeRequired");
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof StaffFormState]) {
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
        password: process.env.NEXT_PUBLIC_DEFAULT_STAFF_PASSWORD || "123456",
      };
      console.log("Creating staff with payload:", payload);
      const res = await fetch("/api/admin/staffs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create staff");

      setForm(INITIAL_FORM);
      setErrors({});
      setOpen(false);
      onCreated?.();
    } catch (error) {
      console.error(error);
      alert(
        locale === "vi" ? "Tạo nhân viên thất bại" : "Failed to create staff",
      );
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
              <label
                htmlFor="fullname"
                className="text-sm font-medium text-foreground"
              >
                {t("admin.staffsPage.createModal.fields.fullname")}{" "}
                <span className="text-destructive">*</span>
              </label>
              <input
                id="fullname"
                name="fullname"
                placeholder={t(
                  "admin.staffsPage.createModal.fields.fullnamePlaceholder",
                )}
                value={form.fullname}
                onChange={handleChange}
                aria-invalid={!!errors.fullname}
                disabled={isSubmitting}
                className="flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground"
              />
              {errors.fullname && (
                <p className="text-xs text-destructive">{errors.fullname}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                {t("admin.staffsPage.createModal.fields.email")}{" "}
                <span className="text-destructive">*</span>
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
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            {/* Date of birth */}
            <div className="space-y-1.5">
              <label
                htmlFor="dob"
                className="text-sm font-medium text-foreground"
              >
                {t("admin.staffsPage.createModal.fields.dob")}{" "}
                <span className="text-destructive">*</span>
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
              {errors.dob && (
                <p className="text-xs text-destructive">{errors.dob}</p>
              )}
            </div>

            {/* Gender */}
            <div className="space-y-1.5">
              <label
                htmlFor="gender"
                className="text-sm font-medium text-foreground"
              >
                {t("admin.staffsPage.createModal.fields.gender")}{" "}
                <span className="text-destructive">*</span>
              </label>
              <select
                id="gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                disabled={isSubmitting}
                className="flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background"
              >
                <option value="male">
                  {t("admin.staffsPage.createModal.genderOptions.male")}
                </option>
                <option value="female">
                  {t("admin.staffsPage.createModal.genderOptions.female")}
                </option>
                <option value="other">
                  {t("admin.staffsPage.createModal.genderOptions.other")}
                </option>
              </select>
            </div>

            {/* Store */}
            <div className="space-y-1.5">
              <label
                htmlFor="store_id"
                className="text-sm font-medium text-foreground"
              >
                {t("admin.staffsPage.createModal.fields.store")}{" "}
                <span className="text-destructive">*</span>
              </label>
              <select
                id="store_id"
                name="store_id"
                value={form.store_id}
                onChange={handleChange}
                aria-invalid={!!errors.store_id}
                disabled={isSubmitting || isLoadingStores}
                className="flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background"
              >
                <option value="">
                  {isLoadingStores
                    ? t("admin.staffsPage.createModal.fields.storeLoading")
                    : t("admin.staffsPage.createModal.fields.storePlaceholder")}
                </option>
                {stores.map((store) => (
                  <option key={store.id} value={store.id}>
                    {store.name}
                  </option>
                ))}
              </select>
              {errors.store_id && (
                <p className="text-xs text-destructive">{errors.store_id}</p>
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
              variant="accent"
              disabled={isSubmitting}
              className="min-w-24"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                t("admin.staffsPage.createModal.submit")
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
