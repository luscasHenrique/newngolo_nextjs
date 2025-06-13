"use client";
import { Button } from "@/components/ui/button";

export function Pagination({ currentPage, setCurrentPage, totalPages }: any) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-center mt-3 gap-2">
      {Array.from({ length: totalPages }).map((_, i) => (
        <Button
          key={i}
          size="sm"
          variant={currentPage === i + 1 ? "default" : "outline"}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </Button>
      ))}
    </div>
  );
}
