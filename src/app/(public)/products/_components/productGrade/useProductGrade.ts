// src/app/(public)/products/_components/productGrade/useProductGrade.ts
"use client";

import { useEffect, useState, useRef } from "react";
import { Grade } from "@/types/product/grade";
import { Product } from "@/types/product/product";

export interface SelectedOption {
  id: string;
  name: string;
  image?: string;
}

export interface SelectedColorState {
  color: string;
  id: string;
}

export interface SelectedSizeState {
  id: string;
  size: string;
}

interface UseProductGradeProps {
  grades: Grade[];
  onColorSelect: (color?: string, image?: string, id?: string) => void;
  onSizeSelect: (size: string, id: string) => void;
  selectedColor: SelectedColorState;
  selectedSize: SelectedSizeState;
  product: Product;
}

export function useProductGrade({
  grades,
  onColorSelect,
  onSizeSelect,
  selectedColor,
  selectedSize,
  product,
}: UseProductGradeProps) {
  const [options, setOptions] = useState<Record<string, SelectedOption[]>>({});
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, SelectedOption>
  >({});
  const [filteredOptions, setFilteredOptions] = useState<
    Record<string, SelectedOption[]>
  >({});

  const scrollContainerRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const transformGradesToOptions = (grades: Grade[]) => {
    const newOptions: Record<string, SelectedOption[]> = {};
    grades.forEach((grade) => {
      const category = grade.name || "Cor";
      if (!newOptions[category]) {
        newOptions[category] = [];
      }
      newOptions[category].push({
        id: grade.id || "",
        name: grade.color || "ÚNICO",
        image: grade.image || undefined,
      });
    });
    return newOptions;
  };

  useEffect(() => {
    if (grades && grades.length > 0) {
      const initialOptions = transformGradesToOptions(grades);
      setOptions(initialOptions);
      setFilteredOptions(initialOptions);
      const firstColorGrade = grades[0];
      if (firstColorGrade) {
        setSelectedOptions({
          Cor: {
            id: firstColorGrade.id || "",
            name: firstColorGrade.color || "ÚNICO",
            image: firstColorGrade.image,
          },
        });
        onColorSelect(
          firstColorGrade.color,
          firstColorGrade.image,
          firstColorGrade.id
        );
      }
    }
  }, [grades]);

  const filterOptions = (
    currentSelectedCategory: string,
    currentSelectedOption: SelectedOption
  ) => {
    const newFilteredOptions: Record<string, SelectedOption[]> = { ...options };

    if (currentSelectedCategory === "Cor" && currentSelectedOption.id) {
      const selectedGrade = grades.find(
        (grade) => grade.id === currentSelectedOption.id
      );
      if (selectedGrade && selectedGrade.gradeSizes) {
        newFilteredOptions["Tamanho"] = selectedGrade.gradeSizes.map(
          (size) => ({
            id: size.id || "",
            name: size.size,
          })
        );
      } else {
        newFilteredOptions["Tamanho"] = [];
      }
    }
    setFilteredOptions(newFilteredOptions);
  };

  const handleOptionSelect = (category: string, option: SelectedOption) => {
    setSelectedOptions((prev) => ({ ...prev, [category]: option }));

    if (category === "Cor") {
      onColorSelect(option.name, option.image, option.id);
      onSizeSelect("", "");
    } else if (category === "Tamanho") {
      onSizeSelect(option.name, option.id);
    }

    filterOptions(category, option);
  };

  const handleMouseDown = (e: React.MouseEvent, category: string) => {
    const container = scrollContainerRefs.current[category];
    if (!container) return;
    container.dataset.isDragging = "true";
    container.dataset.startX = `${e.pageX - container.offsetLeft}`;
    container.dataset.scrollLeft = `${container.scrollLeft}`;
    container.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: React.MouseEvent, category: string) => {
    const container = scrollContainerRefs.current[category];
    if (!container || container.dataset.isDragging !== "true") return;
    e.preventDefault();
    const startX = parseFloat(container.dataset.startX || "0");
    const scrollLeft = parseFloat(container.dataset.scrollLeft || "0");
    const x = e.pageX - container.offsetLeft;
    container.scrollLeft = scrollLeft - (x - startX);
  };

  const handleMouseUpOrLeave = (category: string) => {
    const container = scrollContainerRefs.current[category];
    if (container) {
      container.dataset.isDragging = "false";
      container.style.cursor = "grab";
    }
  };

  return {
    options: filteredOptions,
    selectedOptions,
    onOptionSelect: handleOptionSelect,
    handleMouseDown,
    handleMouseMove,
    handleMouseUpOrLeave,
  };
}
