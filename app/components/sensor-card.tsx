import React from 'react'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from './ui/card'
import type { LucideIcon } from 'lucide-react'
import { Progress } from './ui/progress'

type SensorCardProps = {
  Icon: LucideIcon
  description: string
  value: string,
  rangesDescription?: string,
  percentage: number
}

const SensorCard = ({Icon,description, value, rangesDescription,percentage}: SensorCardProps) => {
  return (
    <Card>

      <CardHeader>
        <CardTitle>
          <Icon />
        </CardTitle>
        
        <CardDescription>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {description}
          </h4>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {value}
          </h3>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="grid gap-6">
        <Progress value={percentage} />
      </CardContent>
      
      <CardFooter>
        {rangesDescription && (
          <p className="text-muted-foreground text-md">
            {rangesDescription}
          </p>
        )}
      </CardFooter>
    </Card>
  )
}

export default SensorCard