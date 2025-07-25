"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddStudentDialog } from "./add-student-dialog";

interface FilterBarProps {
  onSearchChange?: (value: string) => void;
  onClassFilterChange?: (value: string) => void;
  onHealthStatusChange?: (value: string) => void;
}

export function FilterBar({
  onSearchChange,
  onClassFilterChange,
  onHealthStatusChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-sky-500" />
        <Input
          type="search"
          placeholder="Tìm kiếm theo tên, mã học sinh..."
          className="pl-8 border-sky-200 focus:border-sky-500"
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>
      <Select onValueChange={onClassFilterChange}>
        <SelectTrigger className="w-[180px] border-sky-200">
          <SelectValue placeholder="Chọn lớp" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả lớp</SelectItem>
          <SelectItem value="1A">Lớp 1A</SelectItem>
          <SelectItem value="1B">Lớp 1B</SelectItem>
          <SelectItem value="2A">Lớp 2A</SelectItem>
          <SelectItem value="2B">Lớp 2B</SelectItem>
          <SelectItem value="3A">Lớp 3A</SelectItem>
          <SelectItem value="3B">Lớp 3B</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={onHealthStatusChange}>
        <SelectTrigger className="w-[180px] border-sky-200">
          <SelectValue placeholder="Tình trạng sức khỏe" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả</SelectItem>
          <SelectItem value="good">Sức khỏe tốt</SelectItem>
          <SelectItem value="monitor">Cần theo dõi</SelectItem>
          <SelectItem value="urgent">Khẩn cấp</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
