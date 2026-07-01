"use client";

import React, { useRef, useState } from "react";
import { Plus, Loader2, ImagePlus, X } from "lucide-react";
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
import { useI18n } from "@/context/I18nContext";

interface FormState {
  name: string;
  address_vi: string;
  address_en: string;
  city: string;
  district: string;
  phone: string;
}

const INITIAL_FORM: FormState = {
  name: "",
  address_vi: "",
  address_en: "",
  city: "",
  district: "",
  phone: "",
};

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

interface CreateStoreModalProps {
  onCreated?: () => void;
}

export default function CreateStoreModal({ onCreated }: CreateStoreModalProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { locale, t } = useI18n();

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

    if (imagePreview) URL.revokeObjectURL(imagePreview);

    const preview = URL.createObjectURL(file);

    setImageFile(file);
    setImagePreview(preview);
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (imagePreview) URL.revokeObjectURL(imagePreview);

    setImagePreview(null);
    setImageFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  // end image

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim())
      next.name = t("admin.storesPage.createModal.errors.nameRequired");
    if (!form.address_vi.trim())
      next.address_vi = t(
        "admin.storesPage.createModal.errors.addressViRequired",
      );
    if (!form.address_en.trim())
      next.address_en = t(
        "admin.storesPage.createModal.errors.addressEnRequired",
      );
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);

      // upload image
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadFileToCloudinary(imageFile);
      }

      // payload
      const payload = {
        ...form,
        image_url: imageUrl,
        slug: formatToSlug(form.name),
      };

      const res = await fetch("/api/admin/stores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create store");
      resetForm();
      setOpen(false);
      onCreated?.();
    } catch (error) {
      console.error(error);
      alert("Không thể tạo cửa hàng.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) resetForm();
    setOpen(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant={"accent"} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          {t("admin.storesPage.createModal.trigger")}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[700px]">
        <DialogHeader>
          <DialogTitle>{t("admin.storesPage.createModal.title")}</DialogTitle>
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
              label={t("admin.storesPage.createModal.fields.name")}
              required
              error={errors.name}
            >
              <input
                name="name"
                placeholder={
                  locale == "vi" ? "Ví dụ: Cửa hàng A" : "E.g. Store A"
                }
                value={form.name}
                onChange={handleChange}
                disabled={isSubmitting}
                className={inputCls}
              />
            </Field>

            {/* Address VI / EN */}
            <Field
              label={t("admin.storesPage.createModal.fields.addressVi")}
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
              label={t("admin.storesPage.createModal.fields.addressEn")}
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

            {/* City / District */}
            <div className="grid grid-cols-2 gap-3">
              <Field label={t("admin.storesPage.createModal.fields.city")}>
                <input
                  name="city"
                  placeholder="Ví dụ: Hồ Chí Minh"
                  value={form.city}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={inputCls}
                />
              </Field>
              <Field label={t("admin.storesPage.createModal.fields.district")}>
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
            <Field label={t("admin.storesPage.createModal.fields.phone")}>
              <input
                name="phone"
                placeholder="Ví dụ: 0901234567"
                value={form.phone}
                onChange={handleChange}
                disabled={isSubmitting}
                className={inputCls}
              />
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
                t("admin.storesPage.createModal.submit")
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
