"use client";

import React, { useEffect, useRef, useState } from "react";
import { Pencil, Loader2, ImagePlus, X } from "lucide-react";
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
import { uploadFileToCloudinary } from "@/lib/cloudinary";
import { StoreItem } from "@/types";
import { useI18n } from "@/context/I18nContext";

interface FormState {
  name: string;
  address_vi: string;
  address_en: string;
  city: string;
  district: string;
  phone: string;
  is_active: boolean;
}

const inputCls =
  "flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground";

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

function toFormState(store: StoreItem): FormState {
  return {
    name: store.name,
    address_vi: store.address.vi,
    address_en: store.address.en,
    city: store.city ?? "",
    district: store.district ?? "",
    phone: store.phone ?? "",
    is_active: store.is_active,
  };
}

interface UpdateStoreModalProps {
  store: StoreItem;
  onUpdated?: () => void;
}

export default function UpdateStoreModal({
  store,
  onUpdated,
}: UpdateStoreModalProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(() => toFormState(store));
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [imagePreview, setImagePreview] = useState<string | null>(
    store.image_url || null,
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string>(
    store.image_url || "",
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { t } = useI18n();

  useEffect(() => {
    if (!open) return;
    setForm(toFormState(store));
    setExistingImageUrl(store.image_url || "");
    setImagePreview(store.image_url || null);
    setImageFile(null);
  }, [open, store]);

  // handle change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // image
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (imagePreview && imagePreview !== existingImageUrl) {
      URL.revokeObjectURL(imagePreview);
    }

    const preview = URL.createObjectURL(file);
    setImageFile(file);
    setImagePreview(preview);
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (imagePreview && imagePreview !== existingImageUrl) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview(null);
    setImageFile(null);
    setExistingImageUrl("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  // end image

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim())
      next.name = t("admin.storesPage.updateModal.errors.nameRequired");
    if (!form.address_vi.trim())
      next.address_vi = t(
        "admin.storesPage.updateModal.errors.addressViRequired",
      );
    if (!form.address_en.trim())
      next.address_en = t(
        "admin.storesPage.updateModal.errors.addressEnRequired",
      );
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);

      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadFileToCloudinary(imageFile);
      } else if (existingImageUrl) {
        imageUrl = existingImageUrl;
      }

      const payload = {
        ...form,
        image_url: imageUrl,
        slug: formatToSlug(form.name),
      };

      const res = await fetch(`/api/admin/stores/${store.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update store");

      setErrors({});
      setOpen(false);
      onUpdated?.();
    } catch (error) {
      console.error(error);
      alert("Không thể cập nhật cửa hàng.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setErrors({});
      if (imagePreview && imagePreview !== existingImageUrl) {
        URL.revokeObjectURL(imagePreview);
      }
      if (fileInputRef.current) fileInputRef.current.value = "";
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

      <DialogContent className="w-[700px]">
        <DialogHeader>
          <DialogTitle>{t("admin.storesPage.updateModal.title")}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} noValidate>
          <div className="max-h-[60vh] overflow-y-auto space-y-4 py-2 pr-1">
            {/* Image Upload */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                {t("admin.modal.image")}
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
                className="relative h-44 w-full cursor-pointer rounded-md border-2 border-dashed border-muted-foreground/40 bg-muted/30 flex items-center justify-center overflow-hidden transition-colors hover:border-primary/60 hover:bg-muted/50"
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
                    <span className="text-xs">
                      {t("admin.modal.pickImage")}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Name */}
            <Field
              label={t("admin.storesPage.updateModal.fields.name")}
              required
              error={errors.name}
            >
              <input
                name="name"
                placeholder="Ví dụ: Chi nhánh Quận 1"
                value={form.name}
                onChange={handleChange}
                disabled={isSubmitting}
                className={inputCls}
              />
            </Field>

            {/* Address VI / EN */}
            <div className="grid grid-cols-2 gap-3">
              <Field
                label={t("admin.storesPage.updateModal.fields.addressVi")}
                required
                error={errors.address_vi}
              >
                <textarea
                  name="address_vi"
                  rows={2}
                  placeholder="Địa chỉ..."
                  value={form.address_vi}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={inputCls}
                />
              </Field>
              <Field
                label={t("admin.storesPage.updateModal.fields.addressEn")}
                required
                error={errors.address_en}
              >
                <textarea
                  name="address_en"
                  rows={2}
                  placeholder="Address..."
                  value={form.address_en}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={inputCls}
                />
              </Field>
            </div>

            {/* City / District */}
            <div className="grid grid-cols-2 gap-3">
              <Field label={t("admin.storesPage.updateModal.fields.city")}>
                <input
                  name="city"
                  placeholder="Ví dụ: Hồ Chí Minh"
                  value={form.city}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={inputCls}
                />
              </Field>
              <Field
                label={t("admin.storesPage.updateModal.fields.district")}
              >
                <input
                  name="district"
                  placeholder="Ví dụ: Quận 1"
                  value={form.district}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={inputCls}
                />
              </Field>
            </div>

            {/* Phone */}
            <Field label={t("admin.storesPage.updateModal.fields.phone")}>
              <input
                name="phone"
                placeholder="Ví dụ: 0901234567"
                value={form.phone}
                onChange={handleChange}
                disabled={isSubmitting}
                className={inputCls}
              />
            </Field>

            {/* Status */}
            <Field label={t("admin.storesPage.updateModal.fields.status")}>
              <select
                name="is_active"
                value={form.is_active ? "true" : "false"}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    is_active: e.target.value === "true",
                  }))
                }
                disabled={isSubmitting}
                className={inputCls}
              >
                <option value="true">
                  {t("admin.storesPage.updateModal.fields.statusActive")}
                </option>
                <option value="false">
                  {t("admin.storesPage.updateModal.fields.statusInactive")}
                </option>
              </select>
            </Field>
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
                t("admin.storesPage.updateModal.submit")
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
