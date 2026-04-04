import React from 'react'
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog'
import { Label } from '../ui'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const ScheduleModal = () => {
    return (
      <AlertDialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>New Feeding Schedule</DialogTitle>
            <AlertDialogDescription>Automate your feeding with scheduled times</DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-4">
            {/* Schedule Type */}
            <div className="space-y-2.5">
              <Label htmlFor="type" className="text-sm font-semibold text-foreground">
                Feed Type
              </Label>
              <Select
                value={newSchedule.type}
                onValueChange={(value) =>
                  setNewSchedule({ ...newSchedule, type: value as 'row' | 'column' })
                }
              >
                <SelectTrigger id="type" className="h-10 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="row">Row</SelectItem>
                  <SelectItem value="column">Column</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Groups Selection */}
            <div className="space-y-2.5">
              <Label className="text-sm font-semibold text-foreground">Select Groups</Label>
              <div className="space-y-2 max-h-48 overflow-y-auto border border-border/30 rounded-lg p-3 bg-muted/20">
                {groups.map((group) => (
                  <div key={group.id} className="flex items-start space-x-3">
                    <Checkbox
                      id={group.id}
                      checked={newSchedule.groups.includes(group.id)}
                      onCheckedChange={() => toggleGroupSelection(group.id)}
                      className="mt-0.5"
                    />
                    <div className="flex-1 min-w-0">
                      <Label
                        htmlFor={group.id}
                        className="text-sm font-medium cursor-pointer text-foreground block"
                      >
                        {group.name}
                      </Label>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {group.dispensers.length} dispensers
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Time and Portion */}
            <div className="grid gap-4 grid-cols-2">
              <div className="space-y-2.5">
                <Label htmlFor="time" className="text-sm font-semibold text-foreground">
                  Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={newSchedule.time}
                  onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })}
                  className="h-10 text-sm"
                />
              </div>
              <div className="space-y-2.5">
                <Label htmlFor="portion" className="text-sm font-semibold text-foreground">
                  Amount (g)
                </Label>
                <Input
                  id="portion"
                  type="number"
                  min="1"
                  value={newSchedule.portion}
                  onChange={(e) =>
                    setNewSchedule({ ...newSchedule, portion: parseInt(e.target.value) || 50 })
                  }
                  className="h-10 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={() => setShowScheduleModal(false)}
              variant="ghost"
              className="flex-1 h-10 text-sm font-medium"
            >
              Cancel
            </Button>
            <Button
              onClick={addSchedule}
              disabled={newSchedule.groups.length === 0}
              className="flex-1 bg-foreground text-background hover:bg-foreground/90 h-10 text-sm font-medium disabled:opacity-50"
            >
              Create Schedule
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
}

export default ScheduleModal