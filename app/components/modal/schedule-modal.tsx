import React from 'react'
import { Button, Input, Label } from '../ui'
import { DialogTitle,Dialog, DialogContent, DialogDescription, DialogHeader, DialogFooter, DialogClose } from '../ui/dialog'
import SelectDropdown from '../select-dropdown'


const ScheduleModal = ({open, onOpenChange} : {open: boolean, onOpenChange: (open: boolean) => void}) => {

    const AM_PM = [
      { index: 1, label: "AM", value: "AM" },
      { index: 2, label: "PM", value: "PM" }
    ]

    const type = [
        { index: 1, label: "feeding", value: "feeding" }
    ]

    const frequently = [
      { index: 1, label: "daily", value: "daily" },
      { index: 2, label: "weekly", value: "weekly" },
      { index: 3, label: "monthly", value: "monthly" },
      { index: 4, label: "custom", value: "custom" }
    ]

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>New Feeding Schedule</DialogTitle>
            <DialogDescription>
            Create an automated feeding schedule
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-4">

            <SelectDropdown
            label="Type"
            placeholder="Select type"
            options={type}
            value={'feeding'}/>

            <SelectDropdown
            label="Frequency"
            placeholder="Select frequency"
            options={frequently}
            value={'daily'}/>

            <div className="flex gap-4">
              <div className="w-7/10">
                <Input type="number" placeholder="Hour" className="mb-2" />
              </div>
              <div className="w-3/10">
                <SelectDropdown
                  label=""
                  placeholder="Select frequency"
                  options={AM_PM}
                  value={'AM'}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" size="lg" >Cancel</Button>
            </DialogClose>
            <Button size="lg">Create Schedule</Button>
          </DialogFooter>

        </DialogContent>

      </Dialog>
    )
}

export default ScheduleModal