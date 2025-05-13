import { Button } from "@/components/ui/button"
import { UsersManagementTable } from "./UsersManagementTable"

export function UsersManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Product Management</h1>
        <div className="flex gap-2">
            
        </div>
      </div>
      <UsersManagementTable />
    </div>
  )
}
