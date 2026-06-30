"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Filter, Trash2, LayoutGrid, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductItem } from "@/types";
import { useI18n } from "@/context/I18nContext";
import CreateProductModal from "@/components/sections/admin/products/CreateProductModal";
import UpdateProductModal from "@/components/sections/admin/products/UpdateProductModal";
import Image from "next/image";

const STATUS_OPTIONS = [
  { label: "Tất cả", value: "" },
  { label: "Đang hoạt động", value: "true" },
  { label: "Không hoạt động", value: "false" },
];

const SORT_BY_OPTIONS = [
  { label: "Ngày tạo", value: "created_at" },
  { label: "Tên", value: "name" },
];

const ORDER_OPTIONS = [
  { label: "Giảm dần", value: "desc" },
  { label: "Tăng dần", value: "asc" },
];

interface FilterState {
  is_active: boolean | undefined;
  sort_by: "name" | "created_at";
  order: "asc" | "desc";
}

const DEFAULT_FILTER: FilterState = {
  is_active: undefined,
  sort_by: "created_at",
  order: "desc",
};

export default function AdminProductPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [appliedFilter, setAppliedFilter] =
    useState<FilterState>(DEFAULT_FILTER);
  const [tempFilter, setTempFilter] = useState<FilterState>(DEFAULT_FILTER);

  const { locale, t } = useI18n();

  const fetchProducts = useCallback(
    async (filter: FilterState = appliedFilter) => {
      try {
        setIsLoading(true);

        const params = new URLSearchParams();
        if (filter.is_active !== undefined) {
          params.set("is_active", String(filter.is_active));
        }
        params.set("sort_by", filter.sort_by);
        params.set("order", filter.order);
        params.set("locale", locale);

        const res = await fetch(`/api/admin/products?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();

        if (data.success && data.data) {
          setProducts(data.data);
        }

        console.log("dâta", data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [appliedFilter, locale],
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // delete
  const deleteProduct = async (id: string) => {
    try {
      await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      fetchProducts(appliedFilter);
    } catch (error) {
      console.error(error);
      alert("Failed to delete");
    }
  };

  // apply filter
  const handleApply = () => {
    setAppliedFilter(tempFilter);
    fetchProducts(tempFilter);
  };

  // clear filter
  const handleClearFilter = () => {
    setAppliedFilter(DEFAULT_FILTER);
    setTempFilter(DEFAULT_FILTER);
    fetchProducts(DEFAULT_FILTER);
  };

  //check filter
  const isFilterActive =
    appliedFilter.is_active !== undefined ||
    appliedFilter.sort_by !== DEFAULT_FILTER.sort_by ||
    appliedFilter.order !== DEFAULT_FILTER.order;

  const activeFilterCount =
    (appliedFilter.is_active !== undefined ? 1 : 0) +
    (appliedFilter.sort_by !== DEFAULT_FILTER.sort_by ||
    appliedFilter.order !== DEFAULT_FILTER.order
      ? 1
      : 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          {t("admin.productsPage.headerTitle.title")}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t("admin.productsPage.headerTitle.subtitle")}
        </p>
      </div>

      {/* Main card */}
      <div className="rounded-xl border bg-card shadow-sm">
        {/* Card header */}
        <div className="flex items-center justify-between border-b px-4 py-4">
          <div className="flex items-center gap-3">
            <Popover
              onOpenChange={(open) => open && setTempFilter(appliedFilter)}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-card hover:bg-sand-100"
                >
                  <Filter className="h-4 w-4" />
                  {t("button.filter")}
                  {activeFilterCount > 0 && (
                    <span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground leading-none">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-64">
                <div className="grid gap-4">
                  {/* Status filter */}
                  <div className="grid gap-2">
                    <p className="text-sm font-medium leading-none">
                      Trạng thái
                    </p>
                    <select
                      className="border rounded-md h-9 px-2 w-full text-sm"
                      value={
                        tempFilter.is_active === undefined
                          ? ""
                          : String(tempFilter.is_active)
                      }
                      onChange={(e) => {
                        const v = e.target.value;
                        setTempFilter((prev) => ({
                          ...prev,
                          is_active: v === "" ? undefined : v === "true",
                        }));
                      }}
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort by */}
                  <div className="grid gap-2">
                    <p className="text-sm font-medium leading-none">
                      Sắp xếp theo
                    </p>
                    <select
                      className="border rounded-md h-9 px-2 w-full text-sm"
                      value={tempFilter.sort_by}
                      onChange={(e) =>
                        setTempFilter((prev) => ({
                          ...prev,
                          sort_by: e.target.value as FilterState["sort_by"],
                        }))
                      }
                    >
                      {SORT_BY_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Order */}
                  <div className="grid gap-2">
                    <p className="text-sm font-medium leading-none">Thứ tự</p>
                    <select
                      className="border rounded-md h-9 px-2 w-full text-sm"
                      value={tempFilter.order}
                      onChange={(e) =>
                        setTempFilter((prev) => ({
                          ...prev,
                          order: e.target.value as FilterState["order"],
                        }))
                      }
                    >
                      {ORDER_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <PopoverClose asChild>
                    <Button variant={"accent"} size="sm" onClick={handleApply}>
                      {t("button.apply")}
                    </Button>
                  </PopoverClose>
                </div>
              </PopoverContent>
            </Popover>

            {isFilterActive && (
              <button
                onClick={handleClearFilter}
                className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
              >
                {t("button.clearFilter")}
              </button>
            )}
          </div>

          <CreateProductModal onCreated={() => fetchProducts(appliedFilter)} />
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12 text-center">
                {t("admin.table.columns.no")}
              </TableHead>
              <TableHead>
                {t("admin.productsPage.table.columns.image")}
              </TableHead>
              <TableHead>
                {t("admin.productsPage.table.columns.name")}
              </TableHead>
              <TableHead>
                {t("admin.productsPage.table.columns.price")}
              </TableHead>
              <TableHead>
                {t("admin.productsPage.table.columns.category")}
              </TableHead>
              <TableHead>{t("admin.table.columns.status")}</TableHead>
              <TableHead>{t("admin.table.columns.createdAt")}</TableHead>
              <TableHead className="text-right">
                {t("admin.table.columns.actions")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="py-20 text-center text-muted-foreground"
                >
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="py-20 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-3">
                    <LayoutGrid className="h-10 w-10 opacity-30" />
                    <p className="text-sm">Không tìm thấy sản phẩm nào</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              products.map((product, index) => (
                <TableRow key={product.id}>
                  <TableCell className="text-center text-muted-foreground text-xs">
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <div className="relative w-12 h-12 overflow-hidden rounded-md">
                      <Image
                        src={product.image_url[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="">
                    {product.price.toLocaleString()} VND
                  </TableCell>
                  <TableCell className="">
                    {product.category.name[locale]}
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.is_active ? "success" : "warning"}>
                      {product.is_active
                        ? locale === "vi"
                          ? "Hoạt động"
                          : "Active"
                        : locale === "vi"
                          ? "Không hoạt động"
                          : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(product.created_at).toLocaleDateString("vi-VN")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <UpdateProductModal
                        product={product}
                        onUpdated={() => fetchProducts(appliedFilter)}
                      />
                      <Button
                        onClick={() => deleteProduct(product.id)}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Footer count */}
        <div className="border-t px-6 py-3">
          <p className="text-xs text-muted-foreground">
            {locale == "en" ? "show" : "Hiển thị"}{" "}
            <span className="font-medium text-foreground">
              {products.length}
            </span>{" "}
            {locale == "en" ? "products" : "sản phẩm"}
          </p>
        </div>
      </div>
    </div>
  );
}
