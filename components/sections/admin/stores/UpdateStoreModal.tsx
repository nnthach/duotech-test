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
import InputFormField from "@/components/custom/InputFormField";
import { StoreFormState } from "@/types/form-type";

function toFormState(store: StoreItem): StoreFormState {
  return {
    name: store.name,
    address_vi: store.address.vi,
    address_en: store.address.en,
    city: store.city ?? "",
    district: store.district ?? "",
    phone: store.phone ?? "",
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
  const [form, setForm] = useState<StoreFormState>(() => toFormState(store));
  const [errors, setErrors] = useState<
    Partial<Record<keyof StoreFormState, string>>
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

  const { t, locale } = useI18n();

  useEffect(() => {
    if (!open) return;
    setForm(toFormState(store));
    setExistingImageUrl(store.image_url || "");
    setImagePreview(store.image_url || null);
    setImageFile(null);
  }, [open, store]);

  // handle change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof StoreFormState]) {
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
    const next: Partial<Record<keyof StoreFormState, string>> = {};
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
                className="relative h-44 w-full cursor-pointer rounded-md border-2 border-dashed border-muted-foreground/40 bg-muted/30 flex items-center justify-center overflow-hidden transition-colors"
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
            <InputFormField
              label={t("admin.storesPage.updateModal.fields.name")}
              name="name"
              type="text"
              placeholder={
                locale === "vi" ? "Ví dụ: Cửa hàng A" : "E.g. Store A"
              }
              value={form.name}
              onChange={handleChange}
              error={errors.name}
              disabled={isSubmitting}
              required
            />

            {/* Address VI / EN */}
            <div className="grid grid-cols-2 gap-3">
              <InputFormField
                label={t("admin.storesPage.updateModal.fields.addressVi")}
                name="address_vi"
                type="textarea"
                rows={2}
                placeholder="Địa chỉ..."
                value={form.address_vi}
                onChange={handleChange}
                error={errors.address_vi}
                disabled={isSubmitting}
                required
              />
              <InputFormField
                label={t("admin.storesPage.updateModal.fields.addressEn")}
                name="address_en"
                type="textarea"
                rows={2}
                placeholder="Address..."
                value={form.address_en}
                onChange={handleChange}
                error={errors.address_en}
                disabled={isSubmitting}
                required
              />
            </div>

            {/* City / District */}
            <div className="grid grid-cols-2 gap-3">
              <InputFormField
                label={t("admin.storesPage.updateModal.fields.city")}
                name="city"
                type="text"
                placeholder="Ví dụ: Hồ Chí Minh"
                value={form.city}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              <InputFormField
                label={t("admin.storesPage.updateModal.fields.district")}
                name="district"
                type="text"
                placeholder="Ví dụ: Quận 1"
                value={form.district}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>

            {/* Phone */}
            <InputFormField
              label={t("admin.storesPage.updateModal.fields.phone")}
              name="phone"
              type="text"
              placeholder="Ví dụ: 0901234567"
              value={form.phone}
              onChange={handleChange}
              disabled={isSubmitting}
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
                t("admin.storesPage.updateModal.submit")
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
