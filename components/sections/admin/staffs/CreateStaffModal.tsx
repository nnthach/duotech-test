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
import InputFormField from "@/components/custom/InputFormField";

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

  const storeOptions = [
    {
      value: "",
      label: isLoadingStores
        ? t("admin.staffsPage.createModal.fields.storeLoading")
        : t("admin.staffsPage.createModal.fields.storePlaceholder"),
    },
    ...stores.map((store) => ({
      value: store.id,
      label: store.name,
    })),
  ];

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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
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
            <InputFormField
              label={t("admin.staffsPage.createModal.fields.fullname")}
              name="fullname"
              placeholder={t(
                "admin.staffsPage.createModal.fields.fullnamePlaceholder",
              )}
              type="text"
              value={form.fullname}
              onChange={handleChange}
              error={errors.fullname}
              disabled={isSubmitting}
              required
            />

            {/* Email */}
            <InputFormField
              label={t("admin.staffsPage.createModal.fields.email")}
              name="email"
              placeholder="example@email.com"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              disabled={isSubmitting}
              required
            />

            {/* Date of birth */}
            <InputFormField
              label={t("admin.staffsPage.createModal.fields.dob")}
              name="dob"
              placeholder="YYYY-MM-DD"
              type="date"
              value={form.dob}
              onChange={handleChange}
              error={errors.dob}
              disabled={isSubmitting}
              required
            />

            {/* Gender */}
            <InputFormField
              label={t("admin.staffsPage.createModal.fields.gender")}
              name="gender"
              type="select"
              selectData={[
                {
                  value: "male",
                  label: locale === "vi" ? "Nam" : "Male",
                },
                {
                  value: "female",
                  label: locale === "vi" ? "Nữ" : "Female",
                },
                {
                  value: "other",
                  label: locale === "vi" ? "Khác" : "Other",
                },
              ]}
              value={form.gender}
              onChange={handleChange}
              error={errors.gender}
              disabled={isSubmitting}
              required
            />

            {/* Store */}
            <InputFormField
              label={t("admin.staffsPage.createModal.fields.store")}
              name="store_id"
              type="select"
              selectData={storeOptions}
              value={form.store_id}
              onChange={handleChange}
              error={errors.store_id}
              disabled={isSubmitting || isLoadingStores}
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
