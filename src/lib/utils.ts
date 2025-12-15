import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatUsd(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export type RoiInputs = {
  employeeCount: number
  avgSalary: number | null | undefined
  turnoverRatePct: number
  reductionPct: number
}

export type RoiOutputs = {
  expectedTurnover: number
  employeesRetained: number
  replacementCost: number
  totalAnnualSavings: number
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

export function calcRoi(i: RoiInputs): RoiOutputs {
  const empCount = Math.max(0, Math.floor(Number(i.employeeCount) || 0))
  const avgSalary = Math.max(0, Number(i.avgSalary) || 50000)
  const tr = Math.max(0, Math.min(100, Number(i.turnoverRatePct) || 0)) / 100
  const red = Math.max(0, Math.min(100, Number(i.reductionPct) || 0)) / 100

  const expectedTurnover = Math.round(empCount * tr)
  const employeesRetained = Math.floor(expectedTurnover * red)

  const replacementCostRaw = avgSalary * 0.30
  const replacementCost = clamp(replacementCostRaw, 8000, 35000)

  const totalAnnualSavings = employeesRetained * replacementCost

  return {
    expectedTurnover,
    employeesRetained,
    replacementCost: Math.round(replacementCost),
    totalAnnualSavings: Math.round(totalAnnualSavings),
  }
}
