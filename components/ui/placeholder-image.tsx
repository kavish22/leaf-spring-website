import React from 'react'

export function PlaceholderImage({ width, height }: { width: number; height: number }) {
  return (
    <div 
      className="bg-gray-200 animate-pulse" 
      style={{ width, height }}
    />
  )
}