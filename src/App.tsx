import { useState } from 'react'
import { motion } from 'framer-motion'
import { CaretDown, Info } from '@phosphor-icons/react'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Breakdown } from '@/components/Breakdown'
import { formatUsd } from '@/lib/utils'

function App() {
  const [employeeCount, setEmployeeCount] = useState(250)
  const [salary, setSalary] = useState(60000)
  const [turnoverRate, setTurnoverRate] = useState(15)
  const [reductionPercent, setReductionPercent] = useState('5')
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(false)

  const expectedTurnoverEmployees = Math.round(employeeCount * (turnoverRate / 100))
  const retainedEmployees = Math.round(expectedTurnoverEmployees * (Number(reductionPercent) / 100))
  const annualSavings = retainedEmployees * 15000

  const handleEmployeeCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '') {
      setEmployeeCount(0)
      return
    }
    const parsed = parseInt(value)
    if (!isNaN(parsed) && parsed >= 0) {
      setEmployeeCount(parsed)
    }
  }

  return (
    <div className="min-h-screen bg-paper relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-sky-200/40 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      <div 
        className="absolute top-20 right-20 w-32 h-32 bg-mint/20 rounded-3xl animate-float pointer-events-none hidden lg:block"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <header className="mb-12 md:mb-16">
          <div className="inline-flex items-center px-3 py-1.5 bg-mint-200 rounded-full mb-6">
            <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-ink">
              Employee Recognition Tool
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink leading-[1.1] mb-4">
            ROI{' '}
            <span className="relative inline-block">
              <span className="absolute inset-x-0 bottom-1 h-3 bg-mint/40 rounded-lg -z-10" />
              <span className="relative">Calculator</span>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-ink/70 max-w-2xl leading-relaxed">
            Estimate annual savings from reduced turnover with effective recognition.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          <Card className="p-6 md:p-8 bg-paper shadow-lg border border-[#e8eef7] rounded-2xl">
            <div className="space-y-6">
              <div>
                <Label htmlFor="employee-count" className="text-sm font-medium text-ink mb-2 block">
                  Current employee count?
                </Label>
                <Input
                  id="employee-count"
                  type="number"
                  value={employeeCount || ''}
                  onChange={handleEmployeeCountChange}
                  className="text-lg h-12 bg-white border-ink/20"
                  min="0"
                  placeholder="250"
                />
              </div>

              <div>
                <div className="flex justify-between items-end mb-3">
                  <Label className="text-sm font-medium text-ink">
                    What is your average employee salary?
                  </Label>
                  <span className="inline-flex items-center px-3 py-1 bg-brand-blue/10 text-brand-blue rounded-full text-sm font-semibold">
                    {formatUsd(salary)}
                  </span>
                </div>
                <Slider
                  value={[salary]}
                  onValueChange={([value]) => setSalary(value)}
                  min={20000}
                  max={100000}
                  step={5000}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-ink/50 mt-1">
                  <span>$20k</span>
                  <span>$100k</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-3">
                  <Label className="text-sm font-medium text-ink">
                    Average annual turnover rate?
                  </Label>
                  <span className="inline-flex items-center px-3 py-1 bg-coral/20 text-coral rounded-full text-sm font-semibold">
                    {turnoverRate}%
                  </span>
                </div>
                <Slider
                  value={[turnoverRate]}
                  onValueChange={([value]) => setTurnoverRate(value)}
                  min={5}
                  max={50}
                  step={1}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-ink/50 mt-1">
                  <span>5%</span>
                  <span>50%</span>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-ink mb-3 block">
                  Conservative assumptions
                </Label>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-ink/70 mb-2">Reduction in turnover</p>
                    <ToggleGroup
                      type="single"
                      value={reductionPercent}
                      onValueChange={(value) => value && setReductionPercent(value)}
                      className="justify-start gap-2"
                    >
                      <ToggleGroupItem 
                        value="5" 
                        className="data-[state=on]:bg-brand-blue data-[state=on]:text-white px-6 py-2 border-2 data-[state=on]:border-brand-blue"
                      >
                        5%
                      </ToggleGroupItem>
                      <ToggleGroupItem 
                        value="7.5"
                        className="data-[state=on]:bg-brand-blue data-[state=on]:text-white px-6 py-2 border-2 data-[state=on]:border-brand-blue"
                      >
                        7.5%
                      </ToggleGroupItem>
                      <ToggleGroupItem 
                        value="10"
                        className="data-[state=on]:bg-brand-blue data-[state=on]:text-white px-6 py-2 border-2 data-[state=on]:border-brand-blue"
                      >
                        10%
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-sm text-ink/70">Replacement cost per employee</p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-ink/10 hover:bg-ink/20 transition-colors">
                              <Info size={12} weight="bold" className="text-ink/60" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="text-sm">
                              This is a conservative, round estimate commonly used in HR modeling based on recruitment, onboarding, training, and productivity loss costs.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="inline-flex items-center px-4 py-2 bg-ink/5 text-ink rounded-lg text-sm font-semibold border border-ink/10">
                      $15,000 (fixed)
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-ink/50 pt-4 border-t border-ink/10">
                Illustrative only. Results vary by organization.
              </p>
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="p-8 md:p-10 bg-brand-blue rounded-2xl shadow-xl border-0 text-white">
              <motion.div
                key={annualSavings}
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-sm uppercase tracking-wider opacity-90 mb-2">Annual Savings</p>
                <p className="text-5xl md:text-6xl font-bold mb-1 leading-tight">
                  {formatUsd(annualSavings)}
                </p>
                <p className="text-sm opacity-80">annually</p>
              </motion.div>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => setIsBreakdownOpen(!isBreakdownOpen)}
                variant="outline"
                className="flex-1 h-12 border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition-colors font-semibold"
              >
                <span>View Breakdown</span>
                <CaretDown 
                  size={16} 
                  weight="bold" 
                  className={`ml-2 transition-transform ${isBreakdownOpen ? 'rotate-180' : ''}`}
                />
              </Button>
              <Button
                asChild
                className="flex-1 h-12 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold"
              >
                <a 
                  href="https://schedule.qualified.com/HGnsQph" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Book a Call
                </a>
              </Button>
            </div>
          </div>
        </div>

        <Breakdown
          isOpen={isBreakdownOpen}
          employeeCount={employeeCount}
          turnoverRate={turnoverRate}
          reductionPercent={Number(reductionPercent)}
          expectedTurnoverEmployees={expectedTurnoverEmployees}
          retainedEmployees={retainedEmployees}
          annualSavings={annualSavings}
        />
      </div>

      <div className="sticky bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-paper via-paper to-transparent pointer-events-none">
        <div className="max-w-7xl mx-auto pointer-events-auto">
          <Button
            asChild
            className="w-full h-14 md:h-16 bg-mint hover:bg-mint/90 text-ink font-semibold text-base md:text-lg rounded-full shadow-lg"
          >
            <a 
              href="https://schedule.qualified.com/HGnsQph" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Explore what a tailored recognition experience looks like
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default App
