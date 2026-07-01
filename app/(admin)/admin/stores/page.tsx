"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Filter, Trash2, LayoutGrid, Loader2, Ban, RotateCcw } from "lucide-react";
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
import { StoreItem } from "@/types";
import { useI18n } from "@/context/I18nContext";
import CreateStoreModal from "@/components/sections/admin/stores/CreateStoreModal";
import UpdateStoreModal from "@/components/sections/admin/stores/UpdateStoreModal";
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

export default function AdminStorePage() {
  const [stores, setStores] = useState<StoreItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [appliedFilter, setAppliedFilter] =
    useState<FilterState>(DEFAULT_FILTER);
  const [tempFilter, setTempFilter] = useState<FilterState>(DEFAULT_FILTER);

  const { t, locale } = useI18n();

  const fetchStores = useCallback(
    async (filter: FilterState = appliedFilter) => {
      try {
        setIsLoading(true);

        // get param
        const params = new URLSearchParams();
        if (filter.is_active !== undefined) {
          params.set("is_active", String(filter.is_active));
        }
        params.set("sort_by", filter.sort_by);
        params.set("order", filter.order);

        // call api
        const res = await fetch(`/api/admin/stores?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch stores");
        const data = await res.json();

        // check
        if (data.success && data.data) {
          setStores(data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [appliedFilter],
  );

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  // disable (soft delete)
  const disableStore = async (id: string) => {
    try {
      await fetch(`/api/admin/stores/${id}/disable`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      fetchStores(appliedFilter);
    } catch (error) {
      console.error(error);
      alert("Failed to disable");
    }
  };

  // restore
  const restoreStore = async (id: string) => {
    try {
      await fetch(`/api/admin/stores/${id}/restore`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      fetchStores(appliedFilter);
    } catch (error) {
      console.error(error);
      alert("Failed to restore");
    }
  };

  // delete (only allowed once already disabled)
  const deleteStore = async (id: string) => {
    const confirmMessage =
      locale === "vi"
        ? "Bạn có chắc muốn xóa vĩnh viễn cửa hàng này?"
        : "Are you sure you want to permanently delete this store?";
    if (!window.confirm(confirmMessage)) return;

    try {
      await fetch(`/api/admin/stores/${id}`, { method: "DELETE" });
      fetchStores(appliedFilter);
    } catch (error) {
      console.error(error);
      alert("Failed to delete");
    }
  };

  // apply filter
  const handleApply = () => {
    setAppliedFilter(tempFilter);
    fetchStores(tempFilter);
  };

  // clear filter
  const handleClearFilter = () => {
    setAppliedFilter(DEFAULT_FILTER);
    setTempFilter(DEFAULT_FILTER);
    fetchStores(DEFAULT_FILTER);
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
          {t("admin.storesPage.headerTitle.title")}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t("admin.storesPage.headerTitle.subtitle")}
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

          <CreateStoreModal onCreated={() => fetchStores(appliedFilter)} />
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12 text-center">
                {t("admin.table.columns.no")}
              </TableHead>
              <TableHead>{t("admin.storesPage.table.columns.image")}</TableHead>
              <TableHead>{t("admin.storesPage.table.columns.name")}</TableHead>
              <TableHead>
                {t("admin.storesPage.table.columns.address")}
              </TableHead>
              <TableHead>{t("admin.storesPage.table.columns.phone")}</TableHead>
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
            ) : stores.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="py-20 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-3">
                    <LayoutGrid className="h-10 w-10 opacity-30" />
                    <p className="text-sm">
                      {locale == "vi"
                        ? "Không tìm thấy cửa hàng nào"
                        : "No stores found"}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              stores.map((store, index) => (
                <TableRow key={store.id}>
                  <TableCell className="text-center text-muted-foreground text-xs">
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <div className="relative w-12 h-12 overflow-hidden rounded-md">
                      <Image
                        src={store.image_url}
                        alt={store.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{store.name}</TableCell>
                  <TableCell className="font-medium">
                    {store.address[locale]}
                  </TableCell>
                  <TableCell className="font-medium">{store.phone}</TableCell>
                  <TableCell>
                    {store.deleted_at ? (
                      <Badge variant="destructive">
                        {locale === "vi" ? "Đã vô hiệu hóa" : "Disabled"}
                      </Badge>
                    ) : (
                      <Badge variant={store.is_active ? "success" : "warning"}>
                        {store.is_active
                          ? locale === "vi"
                            ? "Hoạt động"
                            : "Active"
                          : locale === "vi"
                            ? "Không hoạt động"
                            : "Inactive"}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(store.created_at).toLocaleDateString("vi-VN")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      {store.deleted_at ? (
                        <>
                          <Button
                            onClick={() => restoreStore(store.id)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-emerald-600 hover:text-emerald-600 hover:bg-emerald-500/10"
                          >
                            <RotateCcw className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            onClick={() => deleteStore(store.id)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <UpdateStoreModal
                            store={store}
                            onUpdated={() => fetchStores(appliedFilter)}
                          />
                          <Button
                            onClick={() => disableStore(store.id)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Ban className="h-3.5 w-3.5" />
                          </Button>
                        </>
                      )}
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
            {locale == "vi" ? "Hiển thị" : "Showing"}{" "}
            <span className="font-medium text-foreground">{stores.length}</span>{" "}
            {locale == "vi" ? "cửa hàng" : "stores"}
          </p>
        </div>
      </div>
    </div>
  );
}
