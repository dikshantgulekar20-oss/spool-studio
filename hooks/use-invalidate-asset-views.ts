"use client"

import { useQueryClient } from "@tanstack/react-query"

export function useInvalidateAssetViews(): () => void {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({ queryKey: ["board"] })
    queryClient.invalidateQueries({ queryKey: ["assets"] })
    queryClient.invalidateQueries({ queryKey: ["approvals"] })
    queryClient.invalidateQueries({ queryKey: ["planner"] })
  }
}
