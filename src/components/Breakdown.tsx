import { motion, AnimatePresence } from 'framer-motion'
import { formatUsd } from '@/lib/utils'

interface BreakdownProps {
  isOpen: boolean
  employeeCount: number
  turnoverRate: number
  reductionPercent: number
  expectedTurnoverEmployees: number
  retainedEmployees: number
  replacementCost: number
  annualSavings: number
}

export function Breakdown({
  isOpen,
  turnoverRate,
  reductionPercent,
  expectedTurnoverEmployees,
  retainedEmployees,
  replacementCost,
  annualSavings,
}: BreakdownProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="overflow-hidden"
        >
          <div className="pt-8">
            <h3 className="text-2xl font-bold text-ink mb-6">Breakdown of ROI</h3>
            
            <div className="bg-cloud rounded-2xl p-6 md:p-8 border border-[#e8eef7]">
              <div className="space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-ink/10">
                  <span className="text-ink/70 text-sm md:text-base">Expected turnover</span>
                  <span className="font-semibold text-ink text-base md:text-lg">
                    {expectedTurnoverEmployees} employees
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-ink/10">
                  <span className="text-ink/70 text-sm md:text-base">Cost to replace*</span>
                  <span className="inline-flex items-center px-3 py-1 bg-coral/20 text-coral rounded-full text-sm font-semibold">
                    {formatUsd(replacementCost)} per employee
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-ink/10">
                  <span className="text-ink/70 text-sm md:text-base">Reduction in turnover*</span>
                  <span className="inline-flex items-center px-3 py-1 bg-mint/30 text-ink rounded-full text-sm font-semibold">
                    {reductionPercent}%
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-ink/10">
                  <span className="text-ink/70 text-sm md:text-base">Employees retained</span>
                  <span className="font-semibold text-ink text-base md:text-lg">
                    {retainedEmployees} employees
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-4 mt-2">
                  <span className="text-lg md:text-xl font-bold text-ink">Total Annual Savings</span>
                  <span className="text-2xl md:text-3xl font-bold text-brand-blue">
                    {formatUsd(annualSavings)}
                  </span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-ink/10 space-y-2 text-xs text-ink/60">
                <p>* Cost per replacement shown as a conservative estimate.</p>
                <p>* Reduction in turnover depends on manager consistency and program adoption.</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
