import { describe, it, expect } from 'vitest'
import { calcRoi } from './utils'

describe('calcRoi', () => {
  it('calculates correctly for base case: 300 emp, 50k salary, 16% turnover, 5% reduction', () => {
    const result = calcRoi({
      employeeCount: 300,
      avgSalary: 50000,
      turnoverRatePct: 16,
      reductionPct: 5,
    })

    expect(result.expectedTurnover).toBe(48)
    expect(result.employeesRetained).toBe(2)
    expect(result.replacementCost).toBe(15000)
    expect(result.totalAnnualSavings).toBe(30000)
  })

  it('calculates correctly with higher salary: 300 emp, 80k salary', () => {
    const result = calcRoi({
      employeeCount: 300,
      avgSalary: 80000,
      turnoverRatePct: 16,
      reductionPct: 5,
    })

    expect(result.expectedTurnover).toBe(48)
    expect(result.employeesRetained).toBe(2)
    expect(result.replacementCost).toBe(24000)
    expect(result.totalAnnualSavings).toBe(48000)
  })

  it('clamps replacement cost to minimum: 300 emp, 20k salary', () => {
    const result = calcRoi({
      employeeCount: 300,
      avgSalary: 20000,
      turnoverRatePct: 16,
      reductionPct: 5,
    })

    expect(result.expectedTurnover).toBe(48)
    expect(result.employeesRetained).toBe(2)
    expect(result.replacementCost).toBe(8000)
    expect(result.totalAnnualSavings).toBe(16000)
  })

  it('uses default 50k salary when salary is null', () => {
    const result = calcRoi({
      employeeCount: 300,
      avgSalary: null,
      turnoverRatePct: 16,
      reductionPct: 5,
    })

    expect(result.replacementCost).toBe(15000)
    expect(result.totalAnnualSavings).toBe(30000)
  })

  it('uses default 50k salary when salary is undefined', () => {
    const result = calcRoi({
      employeeCount: 300,
      avgSalary: undefined,
      turnoverRatePct: 16,
      reductionPct: 5,
    })

    expect(result.replacementCost).toBe(15000)
    expect(result.totalAnnualSavings).toBe(30000)
  })

  it('uses default 50k salary when salary is 0', () => {
    const result = calcRoi({
      employeeCount: 300,
      avgSalary: 0,
      turnoverRatePct: 16,
      reductionPct: 5,
    })

    expect(result.replacementCost).toBe(15000)
    expect(result.totalAnnualSavings).toBe(30000)
  })

  it('clamps replacement cost to maximum for very high salary', () => {
    const result = calcRoi({
      employeeCount: 300,
      avgSalary: 200000,
      turnoverRatePct: 16,
      reductionPct: 5,
    })

    expect(result.expectedTurnover).toBe(48)
    expect(result.employeesRetained).toBe(2)
    expect(result.replacementCost).toBe(35000)
    expect(result.totalAnnualSavings).toBe(70000)
  })

  it('rounds expected turnover to nearest whole number', () => {
    const result = calcRoi({
      employeeCount: 100,
      avgSalary: 50000,
      turnoverRatePct: 12.7,
      reductionPct: 5,
    })

    expect(result.expectedTurnover).toBe(13)
  })

  it('floors employees retained', () => {
    const result = calcRoi({
      employeeCount: 100,
      avgSalary: 50000,
      turnoverRatePct: 16,
      reductionPct: 7.5,
    })

    expect(result.employeesRetained).toBe(1)
  })

  it('handles 7.5% reduction rate', () => {
    const result = calcRoi({
      employeeCount: 300,
      avgSalary: 50000,
      turnoverRatePct: 16,
      reductionPct: 7.5,
    })

    expect(result.expectedTurnover).toBe(48)
    expect(result.employeesRetained).toBe(3)
    expect(result.totalAnnualSavings).toBe(45000)
  })

  it('handles 10% reduction rate', () => {
    const result = calcRoi({
      employeeCount: 300,
      avgSalary: 50000,
      turnoverRatePct: 16,
      reductionPct: 10,
    })

    expect(result.expectedTurnover).toBe(48)
    expect(result.employeesRetained).toBe(4)
    expect(result.totalAnnualSavings).toBe(60000)
  })

  it('handles zero employee count', () => {
    const result = calcRoi({
      employeeCount: 0,
      avgSalary: 50000,
      turnoverRatePct: 16,
      reductionPct: 5,
    })

    expect(result.expectedTurnover).toBe(0)
    expect(result.employeesRetained).toBe(0)
    expect(result.totalAnnualSavings).toBe(0)
  })

  it('handles edge case at exact minimum replacement cost', () => {
    const result = calcRoi({
      employeeCount: 300,
      avgSalary: 26667,
      turnoverRatePct: 16,
      reductionPct: 5,
    })

    expect(result.replacementCost).toBe(8000)
  })

  it('handles edge case at exact maximum replacement cost', () => {
    const result = calcRoi({
      employeeCount: 300,
      avgSalary: 116667,
      turnoverRatePct: 16,
      reductionPct: 5,
    })

    expect(result.replacementCost).toBe(35000)
  })
})
