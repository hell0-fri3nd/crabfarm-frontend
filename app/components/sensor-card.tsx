import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import type { LucideIcon } from 'lucide-react'

type SensorCardProps = {
  Icon: LucideIcon
  description: string
  value: string
}

const SensorCard = ({Icon,description, value}: SensorCardProps) => {
  return (
    <Card>
      <CardHeader>

        <CardTitle>
          <Icon />
        </CardTitle>
        
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="grid gap-6">
        {value}
      </CardContent>
      
      <CardFooter>
        progress bar
      </CardFooter>
    </Card>
  )
}

export default SensorCard