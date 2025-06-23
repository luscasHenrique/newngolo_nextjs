// src/app/(public)/products/_components/productGrade/useProductGrade.ts
"use client";

import { useEffect, useState, useRef, useCallback } from "react"; // Adicionado useCallback
import { Grade } from "@/types/product/grade";
import { Product } from "@/types/product/product"; // Mantido se Product for usado para extrair grades ou algo assim

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
  // Essas funções serão callbacks do useProductPage para atualizar o estado central
  onColorSelect: (color?: string, image?: string, id?: string) => void;
  onSizeSelect: (size: string, id: string) => void;
  // Apenas para inicialização e filtros, o estado real de seleção vem do useProductPage
  selectedColorFromParent: SelectedColorState;
  selectedSizeFromParent: SelectedSizeState;
  // 'product' pode ser opcional ou não ser necessário aqui se apenas 'grades' for o suficiente
  product?: Product; // Tornando opcional, pois talvez não seja diretamente usado para a lógica de grade em si
}

export function useProductGrade({
  grades,
  onColorSelect,
  onSizeSelect,
  selectedColorFromParent,
  selectedSizeFromParent,
  product, // Mantido apenas para compatibilidade, se não for usado, pode remover
}: UseProductGradeProps) {
  const [options, setOptions] = useState<Record<string, SelectedOption[]>>({});
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, SelectedOption>
  >({});
  const [filteredOptions, setFilteredOptions] = useState<
    Record<string, SelectedOption[]>
  >({});

  // AGORA, a ref e os handlers de mouse/scroll SÓ EXISTEM AQUI
  const scrollContainerRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const transformGradesToOptions = useCallback((gradesArray: Grade[]) => {
    const newOptions: Record<string, SelectedOption[]> = {};
    gradesArray.forEach((grade) => {
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
  }, []);

  // UseEffect para inicializar as opções e a seleção inicial da cor
  useEffect(() => {
    if (grades && grades.length > 0) {
      const initialOptions = transformGradesToOptions(grades);
      setOptions(initialOptions);
      setFilteredOptions(initialOptions);

      // Sincroniza a seleção interna do hook com a prop recebida do pai
      if (selectedColorFromParent && selectedColorFromParent.id) {
        const initialSelectedColorOption = initialOptions["Cor"]?.find(
          (opt) => opt.id === selectedColorFromParent.id
        );
        if (initialSelectedColorOption) {
          setSelectedOptions((prev) => ({
            ...prev,
            Cor: initialSelectedColorOption,
          }));
          // Aplica o filtro de tamanho com base na cor inicial selecionada
          const selectedGrade = grades.find(
            (g) => g.id === selectedColorFromParent.id
          );
          if (selectedGrade && selectedGrade.gradeSizes) {
            setFilteredOptions((prev) => ({
              ...prev,
              Tamanho: selectedGrade.gradeSizes.map((size) => ({
                id: size.id || "",
                name: size.size,
              })),
            }));
          } else {
            setFilteredOptions((prev) => ({ ...prev, Tamanho: [] }));
          }
        }
      }
      if (selectedSizeFromParent && selectedSizeFromParent.id) {
        const initialSelectedSizeOption = (
          (grades.find((g) => g.id === selectedColorFromParent?.id) || {})
            .gradeSizes || []
        ).find((size) => size.id === selectedSizeFromParent.id);

        if (initialSelectedSizeOption) {
          setSelectedOptions((prev) => ({
            ...prev,
            Tamanho: {
              id: initialSelectedSizeOption.id || "",
              name: initialSelectedSizeOption.size,
            },
          }));
        }
      }
    }
  }, [
    grades,
    transformGradesToOptions,
    selectedColorFromParent,
    selectedSizeFromParent,
  ]);

  const filterOptions = useCallback(
    (
      currentSelectedCategory: string,
      currentSelectedOption: SelectedOption,
      currentSelectedOptionsState: Record<string, SelectedOption> // Passar o estado atualizado
    ) => {
      const newFilteredOptions: Record<string, SelectedOption[]> = {
        ...options,
      };

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
        // Se a cor mudou, limpa a seleção de tamanho
        if (currentSelectedOptionsState["Tamanho"]) {
          setSelectedOptions((prev) => ({
            ...prev,
            Tamanho: {} as SelectedOption,
          }));
          onSizeSelect("", ""); // Notifica o pai para limpar o tamanho também
        }
      }
      setFilteredOptions(newFilteredOptions);
    },
    [grades, options, onSizeSelect]
  );

  const handleOptionSelect = useCallback(
    (category: string, option: SelectedOption) => {
      setSelectedOptions((prev) => {
        const newState = { ...prev, [category]: option };
        filterOptions(category, option, newState); // Passa o novo estado
        return newState;
      });

      // Notifica o hook pai sobre a seleção
      if (category === "Cor") {
        onColorSelect(option.name, option.image, option.id);
        onSizeSelect("", ""); // Sempre limpa o tamanho no pai ao mudar a cor
      } else if (category === "Tamanho") {
        onSizeSelect(option.name, option.id);
      }
    },
    [onColorSelect, onSizeSelect, filterOptions]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, category: string) => {
      const container = scrollContainerRefs.current[category];
      if (!container) return;
      container.dataset.isDragging = "true";
      container.dataset.startX = `${e.pageX - container.offsetLeft}`;
      container.dataset.scrollLeft = `${container.scrollLeft}`;
      container.style.cursor = "grabbing";
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent, category: string) => {
      const container = scrollContainerRefs.current[category];
      if (!container || container.dataset.isDragging !== "true") return;
      e.preventDefault();
      const startX = parseFloat(container.dataset.startX || "0");
      const scrollLeft = parseFloat(container.dataset.scrollLeft || "0");
      const x = e.pageX - container.offsetLeft;
      container.scrollLeft = scrollLeft - (x - startX);
    },
    []
  );

  const handleMouseUpOrLeave = useCallback((category: string) => {
    const container = scrollContainerRefs.current[category];
    if (container) {
      container.dataset.isDragging = "false";
      container.style.cursor = "grab";
    }
  }, []);

  return {
    options: filteredOptions,
    selectedOptions,
    onOptionSelect: handleOptionSelect,
    handleMouseDown,
    handleMouseMove,
    handleMouseUpOrLeave,
    scrollContainerRefs, // Retorna a ref para o componente UI
  };
}
