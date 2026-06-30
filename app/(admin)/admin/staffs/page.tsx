"use client";

import React, { useState } from "react";
import { Filter, Trash2, LayoutGrid } from "lucide-react";
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
import CreateStaffModal, { StaffFormState } from "@/components/sections/admin/staffs/CreateStaffModal";
import UpdateStaffModal from "@/components/sections/admin/staffs/UpdateStaffModal";
import { useI18n } from "@/context/I18nContext";

interface StaffItem {
  id: string;
  fullname: string;
  email: string;
  dob: string;
  gender: "male" | "female" | "other";
  is_active: boolean;
  created_at: string;
}

const MOCK_STAFFS: StaffItem[] = [
  {
    id: "1",
    fullname: "Nguyễn Văn An",
    email: "an.nguyen@duotech.vn",
    dob: "1995-03-15",
    gender: "male",
    is_active: true,
    created_at: "2024-01-10T08:00:00Z",
  },
  {
    id: "2",
    fullname: "Trần Thị Bình",
    email: "binh.tran@duotech.vn",
    dob: "1998-07-22",
    gender: "female",
    is_active: true,
    created_at: "2024-02-14T09:30:00Z",
  },
  {
    id: "3",
    fullname: "Lê Minh Cường",
    email: "cuong.le@duotech.vn",
    dob: "1993-11-05",
    gender: "male",
    is_active: false,
    created_at: "2024-03-20T10:00:00Z",
  },
  {
    id: "4",
    fullname: "Phạm Thị Dung",
    email: "dung.pham@duotech.vn",
    dob: "2000-01-30",
    gender: "female",
    is_active: true,
    created_at: "2024-04-05T11:00:00Z",
  },
  {
    id: "5",
    fullname: "Hoàng Văn Em",
    email: "em.hoang@duotech.vn",
    dob: "1990-09-18",
    gender: "other",
    is_active: false,
    created_at: "2024-05-12T14:00:00Z",
  },
];

interface FilterState {
  is_active: boolean | undefined;
  sort_by: "fullname" | "created_at";
  order: "asc" | "desc";
}

const DEFAULT_FILTER: FilterState = {
  is_active: undefined,
  sort_by: "created_at",
  order: "desc",
};

let nextId = MOCK_STAFFS.length + 1;

export default function AdminStaffPage() {
  const { t } = useI18n();
  const [staffs, setStaffs] = useState<StaffItem[]>(MOCK_STAFFS);
  const [appliedFilter, setAppliedFilter] = useState<FilterState>(DEFAULT_FILTER);
  const [tempFilter, setTempFilter] = useState<FilterState>(DEFAULT_FILTER);

  const STATUS_OPTIONS = [
    { label: t("admin.staffsPage.filter.statusOptions.all"), value: "" },
    { label: t("admin.staffsPage.filter.statusOptions.active"), value: "true" },
    { label: t("admin.staffsPage.filter.statusOptions.inactive"), value: "false" },
  ];

  const SORT_BY_OPTIONS = [
    { label: t("admin.staffsPage.filter.sortByOptions.createdAt"), value: "created_at" },
    { label: t("admin.staffsPage.filter.sortByOptions.fullname"), value: "fullname" },
  ];

  const ORDER_OPTIONS = [
    { label: t("admin.staffsPage.filter.orderOptions.desc"), value: "desc" },
    { label: t("admin.staffsPage.filter.orderOptions.asc"), value: "asc" },
  ];

  const applyFilter = (list: StaffItem[], filter: FilterState): StaffItem[] => {
    let result = [...list];
    if (filter.is_active !== undefined) {
      result = result.filter((s) => s.is_active === filter.is_active);
    }
    result.sort((a, b) => {
      const va = a[filter.sort_by];
      const vb = b[filter.sort_by];
      return filter.order === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
    });
    return result;
  };

  const displayedStaffs = applyFilter(staffs, appliedFilter);

  const handleApply = () => {
    setAppliedFilter(tempFilter);
  };

  const handleClearFilter = () => {
    setAppliedFilter(DEFAULT_FILTER);
    setTempFilter(DEFAULT_FILTER);
  };

  const handleCreate = (values: StaffFormState) => {
    const newStaff: StaffItem = {
      id: String(nextId++),
      ...values,
      is_active: true,
      created_at: new Date().toISOString(),
    };
    setStaffs((prev) => [newStaff, ...prev]);
  };

  const handleUpdate = (id: string, values: StaffFormState) => {
    setStaffs((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...values } : s))
    );
  };

  const handleDelete = (id: string) => {
    if (!confirm(t("admin.staffsPage.deleteConfirm"))) return;
    setStaffs((prev) => prev.filter((s) => s.id !== id));
  };

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
          {t("admin.staffsPage.headerTitle.title")}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t("admin.staffsPage.headerTitle.subtitle")}
        </p>
      </div>

      <div className="rounded-xl border bg-card shadow-sm">
        {/* Card header */}
        <div className="flex items-center justify-between border-b px-4 py-4">
          <div className="flex items-center gap-3">
            <Popover onOpenChange={(open) => open && setTempFilter(appliedFilter)}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 bg-card hover:bg-sand-100">
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
                  <div className="grid gap-2">
                    <p className="text-sm font-medium leading-none">
                      {t("admin.staffsPage.filter.statusLabel")}
                    </p>
                    <select
                      className="border rounded-md h-9 px-2 w-full text-sm"
                      value={tempFilter.is_active === undefined ? "" : String(tempFilter.is_active)}
                      onChange={(e) => {
                        const v = e.target.value;
                        setTempFilter((prev) => ({
                          ...prev,
                          is_active: v === "" ? undefined : v === "true",
                        }));
                      }}
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-2">
                    <p className="text-sm font-medium leading-none">
                      {t("admin.staffsPage.filter.sortByLabel")}
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
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-2">
                    <p className="text-sm font-medium leading-none">
                      {t("admin.staffsPage.filter.orderLabel")}
                    </p>
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
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  <PopoverClose asChild>
                    <Button variant="accent" size="sm" onClick={handleApply}>
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

          <CreateStaffModal onCreated={handleCreate} />
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12 text-center">{t("admin.table.columns.no")}</TableHead>
              <TableHead>{t("admin.staffsPage.table.columns.fullname")}</TableHead>
              <TableHead>{t("admin.staffsPage.table.columns.email")}</TableHead>
              <TableHead>{t("admin.staffsPage.table.columns.dob")}</TableHead>
              <TableHead>{t("admin.staffsPage.table.columns.gender")}</TableHead>
              <TableHead>{t("admin.table.columns.status")}</TableHead>
              <TableHead className="text-right">{t("admin.table.columns.actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedStaffs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-20 text-center text-muted-foreground">
                  <div className="flex flex-col items-center gap-3">
                    <LayoutGrid className="h-10 w-10 opacity-30" />
                    <p className="text-sm">{t("admin.staffsPage.empty")}</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              displayedStaffs.map((staff, index) => (
                <TableRow key={staff.id}>
                  <TableCell className="text-center text-muted-foreground text-xs">
                    {index + 1}
                  </TableCell>
                  <TableCell className="font-medium">{staff.fullname}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{staff.email}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(staff.dob).toLocaleDateString("vi-VN")}
                  </TableCell>
                  <TableCell className="text-sm">
                    {t(`admin.staffsPage.gender.${staff.gender}`)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={staff.is_active ? "success" : "warning"}>
                      {staff.is_active
                        ? t("admin.staffsPage.status.active")
                        : t("admin.staffsPage.status.inactive")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <UpdateStaffModal
                        defaultValues={{
                          fullname: staff.fullname,
                          email: staff.email,
                          dob: staff.dob,
                          gender: staff.gender,
                        }}
                        onUpdated={(values) => handleUpdate(staff.id, values)}
                      />
                      <Button
                        onClick={() => handleDelete(staff.id)}
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

        <div className="border-t px-6 py-3">
          <p className="text-xs text-muted-foreground">
            {t("admin.staffsPage.showing")}{" "}
            <span className="font-medium text-foreground">{displayedStaffs.length}</span>{" "}
            {t("admin.staffsPage.staff")}
          </p>
        </div>
      </div>
    </div>
  );
}
